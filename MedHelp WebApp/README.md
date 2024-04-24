# DocAppointment

DocAppointment is a MERN stack application designed to streamline the process of connecting patients with healthcare providers. It offers a user-friendly interface for patients to find and book appointments with doctors efficiently. The application includes an admin dashboard for managing users, doctors, and appointment bookings. With search filters based on the specialty of doctors and a notification feature, DocAppointment aims to enhance user engagement and facilitate seamless communication between patients and healthcare providers.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Conrtibution Guidelines](#contribution-guidelines)
- [Setup Guidelines](#setup-guidelines)

## Tech Stack

- **MongoDB**: A NoSQL database used for storing user, doctor, and appointment data.
- **Express.js**: A web application framework for building RESTful APIs and handling server-side logic.
- **React.js**: A JavaScript library for building interactive user interfaces.
- **Node.js**: A JavaScript runtime environment used for server-side scripting.

## Features

- **User Authentication**: Secure user authentication and authorization.
- **Doctor Search**: Filter doctors by specialty to find the most suitable healthcare provider.
- **Appointment Booking**: Efficient appointment booking system for patients.
- **Admin Dashboard**: Admin dashboard for managing users, doctors, and appointments.
- **Notification System**: Notification feature to enhance user engagement.
- **Admin Control**: Full control for admin users, including user and doctor management, and approval of doctor applications.


## Contribution Guidelines

Thank you for considering contributing to this project! We welcome contributions from everyone.

Before contributing, please take a moment to review the following guidelines:

1. **Reporting Bugs**: If you encounter a bug, please open an issue and provide as much detail as possible, including steps to reproduce the bug.

2. **Feature Requests**: If you have a feature request, please open an issue and describe the feature you would like to see implemented.

3. **Fork the Repository**: To contribute, fork the repository to your GitHub account.

4. **Create a New Branch**: Create a new branch for your work based on the `main` branch.

5. **Make Changes**: Make your desired changes to the codebase.

6. **Commit Changes**: After making changes, commit them to your branch with clear and descriptive commit messages.

7. **Create a Pull Request**: Once you have made your changes, create a pull request to submit them for review.

8. **Documentation**: If you are contributing documentation, please ensure it follows our documentation style and is clear and informative.

9. **Code Reviews**: All contributions will be reviewed by our team. We may provide feedback or request changes before merging your contribution.

Thank you for helping improve our project! We appreciate your contributions.


## Setup Guidelines

To set up DocAppointment on your local machine, follow these steps:

1. **Clone this repository**: Begin by cloning the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/TeekshaHarish/DocAppointment.git
    ```

2. **Setup the backend**: Navigate to the cloned repository and install the required dependencies by running the following command:
    ```bash
    cd DocAppointment
    npm install
    ```
- **Setup the backend environment variables**: Copy the environment variables to `.env` and change the values

    ```shell
    cp .env.example .env
    ```

    The following environment variables must be set:

    - `MONGO_URL` - The connection string for the MongoDB database

    - `JWT_SECRET` - The secret key for JWT authentication

    - `PORT` - The port on which the backend server (default: 8080)

    - `DEV_MODE` - The development mode 


        ```env
        MONGO_URL="your_mongodb_url"
        JWT_SECRET="your_secret_key_for_jwt"
        PORT="8080"
        DEV_MODE=development
        ```

3. **Setup the frontend**: Navigate to the frontend directory and install the required dependencies by running the following command:

    ```bash
    cd frontend
    npm install
    ```

- **Setup the frontend environment variables**: Copy the environment variables to `.env` and change the values

    ```shell
    cp .env.example .env
    ```

    The following environment variables must be set:

    - `VITE_BACKEND_API` - The backend server url ( default: http://localhost:8080 )


4. **Run the project**: Once you have installed the dependencies and added the required environment variables, you are ready to run the project. 

    To start both the frontend and backend servers simultaneously, run the following command:

    if you are in frontend folder go back to root folder
     ```bash
    cd .. 
    npm run dev
    ```
    or if you are in root folder
    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

