# Web App Documentation

This documentation provides information on how to set up and run the node js app "E-learning" made using MERN stack.

## Installation

To install the web app, follow these steps:

1. Clone the repository to your local machine:
```
   bash
   git clone https://github.com/gauravsahdz/e-learning.git
   ```

2. Navigate to the project directory:
```
   bash
   cd your-repo
   ````
3. There are two directory: frontend and backend, open both folder in seperate terminal or as you like,
```
 bash
 cd frontend
```
in another terminal do:
```
 bash
 cd backend
```

4. Install the dependencies in both terminal:
```
   bash
   npm install
   ```

## Running the App

To run the web app locally, use the following command:
    ```
    bash
    npm start
    ```

## Important files

.env in backend, that is provided with JWT_SECRET and MONGO_URL necessary ones

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [REACT](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)

## Pages

The web app has the following pages:

- Landing Page (url: /)
   - Displays some sections about website
- Course List page (url: /courses)
  - Displays the list of courses in card views with a seachbar for search functionality.
- Dashboard
  - Logged in user dashboard for the enrolled courses with Mark as Completed button
- Login
  - Demo email and password provided for login
  - AccessToken and routes protection enabled so without login, can't access dashboard
