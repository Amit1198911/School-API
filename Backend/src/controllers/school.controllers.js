
const pool = require('../db/index.js');


const isValidLatLng = function (lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (Number.isNaN(lat) || Number.isNaN(lng)) return false;
  if (lat < -90 || lat > 90) return false;
  if (lng < -180 || lng > 180) return false;
  return true;
}

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'name, address, latitude and longitude are required' });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isValidLatLng(lat, lng)) {
      return res.status(400).json({ success: false, message: 'Invalid latitude/longitude values' });
    }

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, lat, lng]
    );

    return res.status(201).json({
      success: true,
      message: 'School added',
      data: { id: result.insertId, name, address, latitude: lat, longitude: lng }
    });
  } catch (err) {
    console.error('addSchool error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

const listSchools = async (req, res) => {
  try {
    const latParam = req.query.lat;
    const lngParam = req.query.lng;
    if (latParam === undefined || lngParam === undefined) {
      return res.status(400).json({ success: false, message: 'Query params lat and lng are required. Example: /listSchools?lat=12.34&lng=56.78' });
    }

    const userLat = parseFloat(latParam);
    const userLng = parseFloat(lngParam);
    if (!isValidLatLng(userLat, userLng)) {
      return res.status(400).json({ success: false, message: 'Invalid lat/lng' });
    }

    // Pagination optional
    const limit = Math.min(parseInt(req.query.limit || "100", 10), 1000);
    const offset = parseInt(req.query.offset || "0", 10);
    // Haversine-like formula in MySQL (distance in kilometers)
    const sql = `
        SELECT id, name, address, latitude, longitude,
        (6371 * ACOS(
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            COS(RADIANS(longitude) - RADIANS(?)) +
            SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )) AS distance_km
        FROM schools
        ORDER BY distance_km ASC
        LIMIT ${limit} OFFSET ${offset};
    `;

    const params = [userLat, userLng, userLat];
    const [rows] = await pool.execute(sql, params);

    // Round distances for readability
    const result = rows.map(r => ({
      id: r.id,
      name: r.name,
      address: r.address,
      latitude: r.latitude,
      longitude: r.longitude,
      distance_km: r.distance_km !== null ? Number(r.distance_km.toFixed(3)) : null
    }));


    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error('listSchools error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}



module.exports = { addSchool, listSchools };
