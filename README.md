# Web App Documentation

This documentation provides information on how to set up and run the node js app "E-learning" made using the MERN stack.

## Installation

To install the web app, follow these steps:

1. Clone the repository to your local machine:
```
   git clone https://github.com/gauravsahdz/e-learning.git
   ```

2. Navigate to the project directory:
```
   cd your-repo
   ````
3. There are two directories: frontend and backend, open both folders in seperate terminals or as you like,
```
 cd frontend
```
in another terminal do:
```
 cd backend
```

4. Install the dependencies in both terminals:
```
   npm install
   ```

## Running the App

To run the web app locally, use the following command:
    ```
    npm start
    ```

## Important files

.env in the backend, which is provided with JWT_SECRET and MONGO_URL necessary ones

## Technologies Used

- [Node. js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [REACT](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)

## Pages

The web app has the following pages:

- Landing Page (URL: /)
   - Displays some sections about the website
- Course List page (URL: /courses)
  - Displays the list of courses in card views with a search bar for search functionality.
- Dashboard
  - Logged in user dashboard for the enrolled courses with Mark as Completed button
- Login
  - Demo email and password provided for login
  - AccessToken and routes protection enabled so without login, can't access the dashboard
