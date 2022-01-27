
# Guide - Book Management API
# Requirements
  - MongoDB
  - NodeJs v16.2.0
  - API Client example: postman
# Usage
  - Download or clone Book Management API
  - Run npm install
  - Run npm start

# Endpoints Guide
  # Register an author
    - method: POST
    - api: http://localhost:3000/api/author/register
    - sample format:
        {
            "name": "Lester Joe",
            "email": "lest@gmail.com",
            "password": "12345"
        }
  # Author login
    - method: POST
    - api: http://localhost:3000/api/author/login
    - sample format:
        {
            "email": "lest@gmail.com",
            "password": "12345"
        }
    - sample response:
        {
            "success": true,
            "id": "61f26201eef4186bc471b1d9",
            "author": "Teryo",
            "email": "teryo@gmail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.     eyJhdXRob3JJZCI6IjYxZjI2MjAxZWVmNDE4NmJjNDcxYjFkOSIsImF1dGhvck5hbWUiOiJUZXJ5byIsImF1dGhvckVtYWlsIjoidGVyeW9AZ21haW      wuY29tIiwiaWF0IjoxNjQzMjg2NjgyLCJleHAiOjE2NDMzNzMwODJ9.f_CaOhoHOXzP690Chiw31Cd9mr9b_KOibK15O6dFsPg"
        }
 
  # Display All books populated with author
    - method: GET
    - api: http://localhost:3000/api/books
    - sample response:
        {
            "success": true,
            "data": [
                {
                    "_id": "61f28725e57dbaf9a94b5754",
                    "title": "Book 8",
                    "description": "Book 8 description.",
                    "author": {
                        "_id": "61f1ff00fc5c4bbab16cf70f",
                        "name": "Lester Jainz"
                    },
                    "image": "http://localhost:3000/public/uploads/riff.jpg-1643284261266.jpeg",
                    "dateCreated": "2022-01-27T11:50:31.341Z",
                    "__v": 0
                },
                {
                    "_id": "61f28852d8e942454b91a3bd",
                    "title": "Book 9",
                    "description": "Book 9 description.",
                    "author": {
                        "_id": "61f1ff00fc5c4bbab16cf70f",
                        "name": "Lester Jainz"
                    },
                    "genre": "Horror",
                    "image": "http://localhost:3000/public/uploads/riff.jpg-1643284562818.jpeg",
                    "dateCreated": "2022-01-27T11:55:46.822Z",
                    "__v": 0
                }
            ]
        }

  # Display All books for a specific author
    - method: GET
    - api: http://localhost:3000/api/books/author/:author_id
    - ie: author_id = "61f1ff00fc5c4bbab16cf70f",
    - sample response:
        {
            "success": true,
            "data": [
                {
                    "image": "",
                    "_id": "61f24e961b07ba95fcc294e8",
                    "title": "Book 4",
                    "description": "This is book 4 sample description.",
                    "author": "61f1ff00fc5c4bbab16cf70f",
                    "dateCreated": "2022-01-27T07:49:23.562Z",
                    "__v": 0
                },
                {
                    "_id": "61f2851b7979e9915abc7725",
                    "title": "Book 7",
                    "description": "Book 7 description.",
                    "author": "61f1ff00fc5c4bbab16cf70f",
                    "image": "http://localhost:3000/public/uploads/riff.jpg-1643283739276.jpeg",
                    "dateCreated": "2022-01-27T11:39:50.144Z",
                    "__v": 0
                },
                {
                    "_id": "61f28725e57dbaf9a94b5754",
                    "title": "Book 8",
                    "description": "Book 8 description.",
                    "author": "61f1ff00fc5c4bbab16cf70f",
                    "image": "http://localhost:3000/public/uploads/riff.jpg-1643284261266.jpeg",
                    "dateCreated": "2022-01-27T11:50:31.341Z",
                    "__v": 0
                },
                {
                    "_id": "61f28852d8e942454b91a3bd",
                    "title": "Book 9",
                    "description": "Book 9 description.",
                    "author": "61f1ff00fc5c4bbab16cf70f",
                    "genre": "Horror",
                    "image": "http://localhost:3000/public/uploads/riff.jpg-1643284562818.jpeg",
                    "dateCreated": "2022-01-27T11:55:46.822Z",
                    "__v": 0
                }
            ]
        }
# Delete books 
    - method: DELETE
    - api: http://localhost:3000/api/books/author/:author_id/:book_id
    - ie: author_id = "61f1ff00fc5c4bbab16cf70f", book_id = "61f28852d8e942454b91a3bd"
    - sample response:
        {
            "success": true,
            "message": "Book has been deleted successfully."
        }

# Update books 
    - method: PUT
    - api: http://localhost:3000/api/books/:book_id - sample response:
        {
            "success": true,
            "message": "Book has been successfully."
        }