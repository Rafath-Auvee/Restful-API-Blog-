# Restful API Blog

- Authentication and authorization: The platform should allow users to sign up and log in using a secure authentication method like JSON Web Tokens (JWT). Each user should have a unique set of privileges that govern their ability to take certain activities (e.g. creating, updating, and deleting their own posts).

- CRUD operations: Users should be able to create, read, update, and remove their own blog articles (also known as CRUD operations). The API should also enable users to do keyword searches and retrieve a list of all blog entries.

- Commenting system: Visitors should be able to write comments on blogs. Users should be able to add, read, edit, and remove their own comments via the API.

- Pagination and sorting: The API should allow pagination and sorting to increase efficiency when retrieving large numbers of blog posts or comments.

- Error handling and logging: To aid with debugging and troubleshooting, the API should gracefully handle errors and log any pertinent information.

## Packages

Explanation of what each of these packages does:

- Express: A fast, minimalist web framework for Node.js that provides a set of powerful features for building web and mobile applications.
- Cors: A middleware package that enables Cross-Origin Resource Sharing (CORS) in your Express.js application.
- Helmet: A middleware package that adds security headers to your HTTP responses to protect against common web vulnerabilities.
- Morgan: A middleware package that logs HTTP requests to the console for debugging purposes.
- Bcrypt: A package for hashing passwords and verifying password hashes.
- Jsonwebtoken: A package for generating and verifying JSON Web Tokens (JWT) for secure authentication and authorization.
- Mongoose: An object data modeling (ODM) package for MongoDB that provides a simple and easy-to-use API for working with MongoDB databases.
- Dotenv: A package for loading environment variables from a .env file into your Node.js application.
