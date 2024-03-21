# Node.js API Starter Kit
<img src="https://github.com/mustafaalpyanikoglu/NodeJS-API/assets/79158705/18211251-da8f-4383-b439-794669490cff" width="680" height="377" alt="">

This Node.js API is a general-purpose web service built using Express. The API includes a set of libraries and features to meet basic requirements, allowing you to save time when starting a new project.

## Features
 - Express: A powerful web framework for building fast web applications.
 - JWT Authentication: Provides authentication using JSON Web Tokens.
 - MongoDB Integration with Mongoose: Interacts with MongoDB database using Mongoose.
 - Security: Secures the API with security measures like Helmet and CORS.
 - Logging: Allows logging of information, errors, and debugging messages using Winston.
 - Encryption and Authentication: Provides encryption and authentication operations using Bcryptjs and Crypto.js.
 - API Validation: Validates incoming requests using Express-validator.
 - Environment Variables Management: Manages environment variables using dotenv.
## Installation
1. Navigate to the project directory.
2. Run npm install command to install dependencies.
3. Copy .env.example file to .env and set the required environment variables.
## Usage
 - To run in development mode: npm start
 - To watch the code and reload automatically: npm run start
## Dependencies
### Core Libraries
 - **Express:** ^4.18.3 - A powerful web framework for building fast web applications.
 - **MongoDB Integration with Mongoose:** ^8.2.1 - Interacts with MongoDB database using Mongoose.
### Authentication and Security
 - **JWT Authentication:** ^9.0.2 - Provides authentication using JSON Web Tokens.
 - **Helmet:** ^7.1.0 - Helps secure the application with various HTTP headers.
 - **CORS:** ^2.8.5 - Enables Cross-Origin Resource Sharing for the API.
### Validation and Error Handling
 - **Express-validator:** ^7.0.1 - Validates incoming requests and handles errors effectively.
### Encryption and Authentication:
 - **Bcryptjs:** ^2.4.3 - Provides password hashing functionality.
 - **Crypto.js:** ^3.2.1 - Offers cryptographic functions.
### Logging
 - **Winston:** ^3.12.0 - Facilitates logging of information, errors, and debugging messages.
### Miscellaneous
 - **dotenv:** ^16.4.5 - Loads environment variables from a .env file.
 - **uuid:** ^9.0.1 - Generates RFC-compliant UUIDs.
 - **body-parser:** ^1.20.2 - Parses incoming request bodies.
 - **jsonwebtoken:** ^9.0.2 - Generates and verifies JSON Web Tokens.
 - **morgan:** ^1.10.0 - HTTP request logger middleware.
 - **multer:** ^1.4.5-lts.1 - Middleware for handling multipart/form-data.
### Code Quality and Style
 - **eslint:** ^8.57.0
 - **eslint-config-google:** ^0.14.0
## Dev Dependencies
 - **nodemon:** ^3.1.0 - Monitors changes in the source code and automatically restarts the server during development.
## Contribution
 - Fork the project and make your improvements.
 - Send a pull request for any enhancements.
## License
 - This project is licensed under the ISC License. For more information, see the LICENSE file.
## Postman Collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 256px; height: 64px;">](https://app.getpostman.com/run-collection/20862553-6fa4725c-2fd3-4aa4-893f-6cb07d62cedf?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20862553-6fa4725c-2fd3-4aa4-893f-6cb07d62cedf%26entityType%3Dcollection%26workspaceId%3D5034bb44-b60c-4804-8826-4d156826be0c)

## Installation
Download and install the Postman application.
Click the "Run in Postman" button below to import the collection into Postman.
## 
This README provides a general guide on how to use the project and contribute to it. Feel free to customize it according to your needs.
