# Taskify Project

Taskify is a robust task management application that helps users efficiently organize, track, and analyze their tasks. This project implements all the required features and functionalities as per the provided specifications.
## Frontend Deployed: https://taskify-frontend-rlw0.onrender.com
## Backend Deployed: https://taskifybackend-nb48.onrender.com


## Features Implemented

1. **Task Management**:
   - Tasks have title, start time, end time, priority (values from 1-5), and task status (pending or finished).
   - End time represents estimated completion time for pending tasks and actual completion time for finished tasks.
   - Tasks are assigned unique database IDs.
2. **Filtering and Sorting**:
   - Filter tasks by priority and completion status.
   - Sort tasks by start time and end time.
3. **Dashboard**:
   - View task statistics:
     - Total count of tasks.
     - Percentage of completed and pending tasks.
     - Time lapsed and balance estimated time left for pending tasks by priority.
     - Overall actual average time for completion.
4. **Time Calculations**:
   - Completed task time: `end time - start time`.
   - Pending task time lapsed: `current time - start time`.
   - Estimated time to finish pending tasks: `end time - current time` (zero if overdue).
5. **Authentication**:
   - Username (email-ID) and password-based authentication using JWT.
   - Private pages restricted to logged-in users.
   - Automatic redirection based on login status.
6. **Task Operations**:
   - CRUD operations for tasks, scoped to the logged-in user.
7. **API Endpoints**:
   - Endpoints designed for dynamic calculation of dashboard statistics.
8. **Validation and Security**:
   - Frontend and backend validations to ensure data integrity.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Hosting**:
  - Frontend: Render
  - Backend: Render
- **Other Tools**: Postman for API testing, Git/GitHub for version control

## Additional Details

- Followed MVC architecture for API design.
- Environment variables and secrets are securely managed.
- Efficient logic implemented for dashboard calculations.
- Edge cases and errors are gracefully handled.
- Code is structured for readability and maintainability.

