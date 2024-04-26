# MedHelp

### Overview
The MedHelp repository hosts the source code for a comprehensive healthcare management platform that utilizes AI for disease prediction and doctor recommendation.The problem statement revolves around addressing the common scenario where users search the net for their symptoms, often leading to inaccurate self-diagnoses due to the abundance of information online. To mitigate this, MedHelp utilizes a robust algorithm to analyze user symptoms and predict probable diseases, thereby minimizing the chance of incorrect assumptions about their condition. The solution is a comprehensive web application that not only recommends doctors with matching specialties and aligned schedules but also enables users to book appointments, rate doctors, and filter them based on various criteria such as ratings, fees, and timings. Additionally, the system includes administrative functionalities such as approving doctor requests and managing user and doctor profiles, ensuring a seamless healthcare recommendation experience.


### Project Features
1. **Symptom Analysis and Disease Prediction**:
   - Users can input their symptoms into the system, which utilizes a machine learning algorithm to predict probable diseases based on the symptoms provided.
   - The prediction model combines the outputs of multiple classifiers, such as Support Vector Classifier, Naive Bayes Classifier, and Random Forest Classifier, to enhance prediction accuracy.

2. **Doctor Recommendation**:
   - Upon receiving a predicted disease, MedHelp recommends doctors specializing in the treatment of the identified condition.
   - Users can filter and sort doctors based on various criteria such as specialties, timings, ratings, fees etc facilitating informed decision-making.

3. **Appointment Booking**:
   - Users have the option to book appointments with preferred doctors directly through the platform accroding to thier preferred time slots.

4. **User Ratings**:
   - After consulting with a doctor, users can rate their experience on a scale of 1 to 5 stars.
   - Users have the ability to view average ratings for each doctor.

5. **Administrator Controls**:
   - Administrators have access to backend functionalities for managing user and doctor profiles, approving doctor requests, and overseeing system operations.



## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TeekshaHarish/MedHelp.git
cd MedHelp
```

### 2. Setting Up the MERN App
Navigate to the MedHelp Webapp directory and install dependencies.
``` bash
cd "MedHelp Webapp"
npm install
cd frontend
npm install
cd ..
```

### 3. Set up the environment variables
To set up the environment variables, you can create a copy of the .env.example file provided in the project. Follow these steps:

1. Create Copy of .env.example: Duplicate the .env.example file in the root directory of your project and rename the copy to .env.
2. Edit .env File: Open the newly created .env file in a text editor and set values for the following variables:
```
MONGO_URL="your_mongodb_url"
JWT_SECRET="your_secret_key_for_jwt"
PORT="8080"
DEV_MODE=development
```
Replace "your_mongodb_url" with the actual URL of your MongoDB database, and "your_secret_key_for_jwt" with a secret key for JWT (JSON Web Tokens) used for authentication. The PORT variable specifies the port on which the server will run, and DEV_MODE indicates the development mode of your application. Adjust these values according to your specific requiremen
### 4. Setting Up the ML Model and Flask API
Navigate to the ml-flask-api directory and install dependencies.
``` bash
cd ../"ML Model"
pip install -r requirements.txt
```

### 5. Running the MERN App
Ensure MongoDB is running on your local machine or update the MongoDB URI in mern-app/server/config/db.js.

``` bash
cd ../"MedHelp Webapp"
npm run dev
```

### 6. Running the ML Model and Flask API
Ensure Python and Flask are installed on your local machine.
Navigate to the ml-flask-api directory and Start the Flask API:

``` bash
cd ../"ML Model"
python flaskapi.py
```

## Usage
Access the MERN app by visiting http://localhost:3000 in your web browser.
The Flask API endpoints can be accessed at http://localhost:5000/predictapi through POST method



