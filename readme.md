# Recipe Finder Web Application

![Recipe Finder Demo](demo.gif)

Recipe Finder is a full-stack web application built using Node.js, Adonis.js (Express.js is also supported), Vue.js, and the Spoonacular API. It allows users to search for recipes based on keywords or filters, view recipe details, and save their favorite recipes. This README provides an overview of the project, installation instructions, and other relevant information.

## Table of Contents

- [Features](#features)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Additional Requirements](#additional-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication using OAuth
- Recipe search and display using the Spoonacular API
- Saving,deleting and viewing favorite recipes
- Responsive design for cross-browser compatibility
- Error handling with meaningful messages
- Pagination for search results

## Backend Development

The backend of the Recipe Finder web application is built using Node.js ,Express.js. It implements RESTful API endpoints to handle recipe search, user preferences, and more. User registration and authentication are achieved using OAuth, and user preferences (e.g., saved recipes,delete saved recipe,view recipe details) are stored in a Mongodb database.

## Frontend Development

The frontend of the Recipe Finder web application is built using React.js. It features a user-friendly interface for recipe search and display. Users can search for recipes using keywords or filters and view recipe details, including ingredients and nutritional information. They can also save their favorite recipes and view their saved recipes or delete saved recipe.

## Additional Requirements

- Git is used for version control, and the repository is well-structured.
- The code is clean, maintainable, and documented according to best practices and industry standards.
- Loading indicators are implemented during API calls and other asynchronous operations.
<!-- - Enhancements are added to improve the user experience, such as sorting, filtering, and categorization of recipes. -->

## Installation

To run the Recipe Finder web application, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/recipe-finder.git`
2. Navigate to the project directory: `cd recipe-finder`
3. Install backend dependencies: `cd backend && npm install`
4. Install frontend dependencies: `cd frontend && npm install`

## Usage

- Start the backend server: `cd backend && npm run start`
- Start the frontend development server: `cd frontend && npm run serve`
- Visit `http://localhost:8080` in your browser to use the application

## API Documentation

You can find detailed API documentation in the [API.md](backend/API.md) file in the backend folder.

## Contributing

Contributions to the Recipe Finder web application are welcome! To contribute, follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your fork
5. Create a pull request to the main repository

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify and expand upon this README as needed for your project. Additionally, you can include details like prerequisites, deployment instructions, and any other information relevant to your project. Good luck with your Recipe Finder web application!
