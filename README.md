# MedHelp
The problem statement revolves around addressing the common scenario where users search the net for their symptoms, often leading to inaccurate self-diagnoses due to the abundance of information online. To mitigate this, MedHelp utilizes a robust algorithm to analyze user symptoms and predict probable diseases, thereby minimizing the chance of incorrect assumptions about their condition. The solution is a comprehensive web application that not only recommends doctors with matching specialties and aligned schedules but also enables users to book appointments, rate doctors, and filter them based on various criteria such as ratings, fees, and timings. Additionally, the system includes administrative functionalities such as approving doctor requests and managing user and doctor profiles, ensuring a seamless healthcare recommendation experience.


## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
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
Set up the enivronment variable by taking refernce from the .env.example file
Set values for the following in your .env file
```
MONGO_URL="your_mongodb_url"
JWT_SECRET="your_secret_key_for_jwt"
PORT="8080"
DEV_MODE=development
```

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
python app.py
```

## Usage
Access the MERN app by visiting http://localhost:3000 in your web browser.
The Flask API endpoints can be accessed at http://localhost:5000



