# Node.js Todo API

This project is a simple Todo API built with Node.js and Express. It allows users to perform CRUD operations on todo items.

## Project Structure

```
nodejs-todo-api
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains the TodoController for handling requests
│   │   └── todoController.js
│   ├── models                # Defines the Todo model
│   │   └── todo.js
│   └── routes                # Defines the API routes
│       └── todoRoutes.js
├── package.json              # NPM configuration file
├── Dockerfile                # Dockerfile for building the application image
├── docker-compose.yml        # Docker Compose configuration for multi-container setup
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nodejs-todo-api.git
   cd nodejs-todo-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application locally, use the following command:
```
npm start
```

The API will be available at `http://localhost:3000`.

## Docker Setup

To build and run the application using Docker, use the following commands:

1. Build the Docker image:
   ```
   docker build -t nodejs-todo-api .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 nodejs-todo-api
   ```

Alternatively, you can use Docker Compose to start the application:
```
docker-compose up
```

## API Endpoints

- `POST /todos` - Create a new todo
- `GET /todos` - Retrieve all todos
- `PUT /todos/:id` - Update a todo by ID
- `DELETE /todos/:id` - Delete a todo by ID

## License

This project is licensed under the MIT License1.