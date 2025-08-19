# School-API

> An API that returns a sorted list of schools based on geographic coordinates (latitude & longitude).

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Request Example](#request-example)
  - [Response Example](#response-example)
- [Project Structure](#project-structure)
- [Contact](#contact)

---

## Features
- Returns school listings sorted by proximity to a given location.
- Lightweight JavaScript-based API.
- Easily configurable and extensible.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn package manager

### Installation
```bash
git clone https://github.com/Amit1198911/School-API.git
cd School-API
npm install
```
## Configuration

Create a `.env` file in the root directory and define required environment variables. For instance:

```
PORT=
DB_HOST=
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_PORT=
```

#### Add your own variables here (e.g., API keys, DB connection strings, etc.)

# Usage

### API Endpoints

-   `POST /addSchool`
    
    -   Adds the school to the database 

-   `GET /listSchools?lat={latitude}&lng={longitude}`
    
    -   Returns a JSON array of schools sorted by distance to the specified location.
### Request Example
```bash     
 "http://localhost:3000/listSchools?lat=23.2599&lng=77.4126"
```
### Response Example
```
[
  {
    "id": 1,
    "name": "ABC School",
    "latitude": 23.2600,
    "longitude": 77.4125,
    "distance": 0.01
  },
  {
    "id": 2,
    "name": "XYZ School",
    "latitude": 23.2700,
    "longitude": 77.4150,
    "distance": 1.15
  }
]

```
## Project Structure
```
School-API/
├── src
│   ├── controllers   
│   ├── db           
│   ├── routes       
│   ├── server.js        
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contact

For any questions or suggestions, feel free to reach out:

-   **Author**: Amit Ahirwar
    
-   **GitHub**: [Amit](https://github.com/Amit1198911)
    
-   **Email**: amitahirwar1198911@gmail.com
