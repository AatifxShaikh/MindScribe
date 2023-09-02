# MindScribe - A Note-Taking Web Application

MindScribe is a web-based note-taking application that allows users to create, view, edit, and delete notes. It also provides the functionality to share notes with others.

![MindScribe Screenshot](./screenshot.png)

## Features

- Create new notes with a title and content.
- View and edit existing notes.
- Delete unwanted notes.
- Share notes with a unique link.
- User-friendly interface for efficient note management.

## Technologies Used

- **Front End**: React.js, React Router, Axios, Tailwind CSS
- **Back End**: Node.js, Express.js, MongoDB
- **Deployment**: Netlify (Front End), Heroku (Back End) (pending...)

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone this repository:

   ```js
   git clone https://github.com/your-username/mindscribe.git
   ```
2.Change into the project directory:
  ```js
     cd mindscribe
```
3.Install the dependencies for the front end and back end:
```js
cd client
npm install
cd ../server
npm install
```
4.Create a .env file in the server directory and add your MongoDB connection string as MONGODB_URI. For example:
```js
MONGODB_URI=mongodb://localhost:27017/mindscribe
```
5.Start the back end server:
cd server
npm start

6.
In a new terminal, start the front end development server:
cd client
npm start


Deployment
The application is deployed using Netlify for the front end and Heroku for the back end. You can deploy your own instance of this application by following these guides:

Deploying React Apps to Netlify
Heroku Node.js Deployment Guide
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository
Create a new branch for your feature: git checkout -b feature-name
Make your changes and commit them: git commit -m 'Add new feature'
Push to your forked repository: git push origin feature-name
Create a pull request to the main repository


