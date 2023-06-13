# Marvelous

Marvelous is a full-stack web application built with JavaScript, Node.js, and React. It allows users to browse, search, and favorite characters from the Marvel Comics universe, as well as create and manage their own custom collections using the [official Marvel API](https://developer.marvel.com/docs). 

 [Live link to my website here](https://marvelous.herokuapp.com/).
 
 ## Features and Technologies

* Utilized MD5 hashing to access the Marvel API and fetch data about characters for display in an intuitive and visually appealing way.
* Built the frontend of Marvelous using React, React Router, and React Hook Form, and styled it with Tailwind CSS.
* Utilized the Axios library to perform HTTP requests, as well as the Multer library to handle file uploads.
* Built the backend of Marvelous using Express, a popular Node.js web framework, and used pg as the PostgreSQL client library.
* Designed and implemented a RESTful API that exposed endpoints for user authentication, CRUD operations on characters and collections, and search functionality.
* Implemented user authentication and authorization functionality powered by JSON Web Tokens and Argon2 password hashing for enhanced security.
* Configured the server with Webpack, Babel, and nodemon for development, and deployed it to Heroku.

### User can search for a specific character to view details about them
![UserCanSearch](https://user-images.githubusercontent.com/117682160/226035816-4f1621ad-c28b-4bcf-a2f8-d8d2bfc01f69.gif)

### User can register for and log into and out of accounts
![UserAccount](https://user-images.githubusercontent.com/117682160/226069387-7dd7c62d-3e9a-423c-a0d6-23ba8053d501.gif)

### User can add and remove favorite characters from their account
![UserFavorites](https://user-images.githubusercontent.com/117682160/226069529-72301ef8-f720-41e9-adff-f6aaf93f7ee3.gif)

## If you'd like to run the Marvelous project on your local machine

* System Requirements:
  * Node.js: You will need to have Node.js installed on your computer. The minimum version of Node.js that your application requires is v14.15.1. You can download the latest version of Node.js from the official website: https://nodejs.org/en/download/
  * PostgreSQL: You will also need to have PostgreSQL installed on your computer. The minimum version of PostgreSQL that your application requires is v12. You can download the latest version of PostgreSQL from the official website: https://www.postgresql.org/download/
  * Git: You will need to have Git installed on your computer to clone the repository and manage your codebase. You can download Git from the official website: https://git-scm.com/downloads

1. Installing Dependencies
    * Make sure you have Node.js installed on your machine.
    * Clone the repository from GitHub: git clone `https://github.com/joseph-w-valdez/marvelous.git`.
    * Navigate to the cloned repository and run `npm install` to install all dependencies.
2. Creating Configuration Files
    * Create a new file called `.env` at the root level of the project.
    * Copy the contents of the `.env.example` file into the new .env file.
    * Replace the placeholder values in the `.env` file with your own configuration settings, such as your Marvel API keys and your PostgreSQL database credentials.
3. External Services or Accounts
    * You will need to sign up for a developer account with Marvel and obtain your own API keys. Follow the instructions on the Marvel Developer Portal to create an account and generate your API keys.
    * You may also need to set up a PostgreSQL database if you don't already have one. You can do this on your local machine or using a cloud service like Amazon RDS.
4. Updating Environment Variables
    * In the `.env` file, update the `MARVEL_API_PUBLIC_KEY` and `MARVEL_API_PRIVATE_KEY` variables with your own Marvel API keys.
    * If necessary, update the `DATABASE_URL` variable with your PostgreSQL database connection string.
5. Running Build Scripts
    * Run `npm run build` to build the project for production.
    * Alternatively, you can run `npm run dev` to start the project in development mode.
6. Creating a Database
    * If you need to create a new PostgreSQL database, run the following command in your terminal: `createdb <database-name>`.
    * Replace `<database-name>` with the name you want to give your new database.
7. Importing Database Files
    * If you need to import any database files, you can use the `psql` command in your terminal.
    * Run the following command to import a `.sql` file: `psql -U <username> -d <database-name> -f <path-to-sql-file>`.
    * Replace `<username>` with your PostgreSQL username, `<database-name>` with the name of your database, and `<path-to-sql-file>` with the file path to your `.sql` file.
