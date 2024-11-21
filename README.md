# MoringaPair

MoringaPair is a student pairing system designed to eliminate the cumbersome and laborious process of manually pairing students based on factors like performance or preferences. The current challenge is that Technical Mentors (TMs) often have to manually pair students, keep track of these pairs, and ensure that no duplications occur. MoringaPair aims to simplify and automate this process.

## 🚀 Problem Statement
Pairing students manually and tracking the pairs each week is time-consuming and inefficient. TMs currently rely on intuition, performance data, and other factors to make pairings. Keeping track of these pairs without duplication is a challenge, especially when pairing students on a weekly basis.

## 💡 Solution
MoringaPair provides an automated system that:
- **Randomly pairs students** based on a system that tracks previous pairings.
- **Ensures no duplicate pairings** unless explicitly needed.
- **Updates pairings weekly**, providing a fresh set of pairings each week to optimize collaboration and learning opportunities.

## 🎯 Future Considerations
- Pair students based on their **strengths and weaknesses**, using data like quiz results to match students with complementary skill sets.
- Integrate a **quiz/test system** that allows students to identify their weaknesses, helping the system suggest optimal pairings based on individual performance metrics.

## 🛠 Minimum Viable Product (MVP)
The MVP will include the following key features:
1. **User Authentication**:
   - Login & Create an Account for TMs and students.
   
2. **Student Pairing**:
   - Random pairing of students every week.
   - The system ensures no duplicate pairings across weeks.
   
3. **Data Visualization**:
   - Display pairing history over weeks.
   - Ability to filter and view past pairings (e.g., "Who was paired with whom this week?").
   
4. **History Tracking**:
   - TMs can access the history of pairings for review and management.

## 🖥 Technical Stack
- **Backend**: Python with Flask 🐍
- **Database**: PostgreSQL 🗃️
- **Frontend**: ReactJS with Redux Toolkit (for state management) ⚛️
- **Testing**: Jest & Minitests 🧪
- **Wireframes**: Figma (mobile-friendly design) 📱

## 🔧 Installation

To get started with MoringaPair locally, follow the steps below:

### 1. Clone the Repository
```bash
git clone https://github.com/chememlil/ForPair
cd ForPair
```

### 2. Backend Setup
- **Install Python dependencies**:
```bash
pip install -r backend/requirements.txt
```
- **Set up the PostgreSQL database**:
```bash
# Create the PostgreSQL database
psql -U yourusername -c "CREATE DATABASE moringapair;"

# Apply migrations to set up the database schema
flask db upgrade
```

### 3. Frontend Setup
- **Install Node.js dependencies**:
```bash
cd frontend
npm install
```

### 4. Running the Application
- **Backend**: Start the Flask backend server:
```bash
flask run
```
- **Frontend**: Start the React development server:
```bash
npm start
```

### 5. Access the Application
Once both the backend and frontend servers are running, open your browser and navigate to:
```
http://localhost:3000
```

## 🧑‍💻 Usage
- **Log in** as a Technical Mentor (TM) or a student.
- **Create an account** if you don't have one.
- **Pair students** automatically and track pairings on a weekly basis.
- **View past pairings** using the data visualization tools.

## 📊 Data Visualization
MoringaPair features filters to track student pairings week by week. TMs can:
- **Filter pairings by week**.
- **View the pairing history** for each student, ensuring no duplication unless necessary.

## 🤖 Testing
Unit tests and integration tests are provided for both the frontend and backend. Use the following commands to run tests:

- **Backend tests** (using Minitests):
```bash
python -m unittest discover backend/tests
```
- **Frontend tests** (using Jest):
```bash
npm test
```

## Live Demo
Check out the live demo [here](https://for-pair-jealcs-projects.vercel.app/).

## 🤝 Contributing
We welcome contributions! Please follow the steps below if you'd like to contribute to MoringaPair:

1. Fork this repository.
2. Create a new branch for your changes.
3. Commit your changes with clear messages.
4. Push your changes to your forked repository.
5. Open a pull request for review.

## 🌍 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 GitHub Repository
You can find the code repository at:
https://github.com/chememlil/ForPair

---

