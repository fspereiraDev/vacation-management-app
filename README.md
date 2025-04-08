# Vacation Management App

This is a vacation management web application that allows users to apply for and manage vacation requests. Admins can approve, deny, and track vacation statuses.

## Features
- User authentication (login/logout)
- Admin Dashboard to manage vacation requests
- Pagination for vacation request tables
- Status update for vacation requests (Pending, Approved, Denied)
- Calendar view to highlight approved vacation days

## Technologies Used
- **React** for the frontend
- **React Router** for navigation
- **Local Storage** for storing user data and vacation requests
- **TailwindCSS** for styling
- **React-Calendar** for calendar view and date picking

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vacation-management-app.git
   
2. Navigate to the project directory:

- cd vacation-management-app

3. Install the dependencies:
   
- npm install

4. Start the development server:

- npm run dev
  
5. Open your browser and go to http://localhost:3000 to see the app in action.

## Usage
Login: Use the login form to authenticate. User data is stored in the local storage.

Right now there are 2 users:
Admin and User
Their credetials can be checked on the users.json file.

Request Vacation: From the dashboard, click on the "Request Vacation" button. You can pick start and end dates, and add optional notes.

Manage Requests: Admins can view vacation requests, approve/deny them, and track the statuses.

Calendar View: Vacation days that are approved will be highlighted on the calendar.
