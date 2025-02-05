# Developer Documentation: Bank Library API

## Overview
The Bank Library API is a RESTful service built with Node.js and Express, using MongoDB as the database. The API requires JWT authentication for access control.

## Setup and Installation
### Prerequisites
- Node.js (v16+ recommended)
- MongoDB database
- Environment variables stored in a .env file

### Environment Variables
Create a .env file and include the following:
- DATABASE_URL=your_db_url
- SECRET_KEY=your_secret_key
- PORT=your_port

### Installation Steps
1. Clone the repository:
- git clone https://github.com/yourrepo/bank-library-api.git](https://github.com/bossbtl/bank-library-system-api.git
- cd bank-library-system-api

2. Install dependencies:
- npm install

3. Install and start MongoDB For MacOs
- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community

To restart
- brew services restart mongodb-community

4. Start the server:
- npm start

or Debug mode
- DEBUG=express-api:* npm run server
   
   
## API Endpoints

### Authentication
#### 1. Login
- Endpoint: POST /auth/login
- Description: Generates a JWT token for authentication.
- Request Body: json 
{
    "username": "admin",
    "password": "password"
}
- Response: json 
{
    "token": "your_jwt_token"
}

### Books Api for bank library system (Requires JWT Authentication)
#### 2. Add a Book
- Endpoint: POST /books
- Headers:
- Authorization: Bearer your_jwt_token
- Request Body: json 
{
    "title": "Title",
    "author": "Author",
    "category": "Category"
}
- Response: json 
{
    "title": "Title",
    "author": "Author",
    "category": "Category",
    "_id": "mongodb_auto_generate_id",
    "publishedDate": "2025-02-04T08:02:40.651Z",
    "__v": 0
}
#### 3. Update a Book
- Endpoint: PUT /books/:id
- Headers:
- Authorization: Bearer your_jwt_token
- Request Body: json 
{
    "title": "Title",
    "author": "Author",
    "category": "Category"
}

#### 4. Delete a Book
- Endpoint: DELETE /books/:id
- Headers:
- Authorization: Bearer your_jwt_token
- Response: 204 No Content

#### 5. Get All Books
- Endpoint /books
- Headers:
- Authorization: Bearer your_jwt_token
- Response: json 
[
    {
        "_id": "mongodb_auto_generate_id",
        "title": "Title",
        "author": "Author",
        "category": "Category",
        "publishedDate": "2025-02-04T08:02:40.651Z",
        "__v": 0
    }
]

#### 6. Search Books
- Endpoint: GET /books/search?title=:title&author=:author&category=:category&publishedDate=:publishedDate
- Headers:
- Authorization: Bearer your_jwt_token
- Query Parameters (Optional):
   - title (string)
   - author (string)
   - category (string)
   - publishedDate (String) e.g., 2025-02-04 or 2025-02-04T08:29:02.278Z
- Response: json 
[
    {
        "_id": "mongodb_auto_generate_id",
        "title": "Title",
        "author": "Author",
        "category": "Category",
        "publishedDate": "2025-02-04T08:02:40.651Z",
        "__v": 0
    }
]

## Security
- JWT authentication for all endpoints except /login
- Environment variables for sensitive data
