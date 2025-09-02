## AskConnect
AskConnect is a community-based FAQ forum where users can share questions, engage in discussions, and provide answers with an interactive voting system. It is built with React, Next.js, Material-UI, GraphQL, Node.js, MongoDB, JWT, and bcrypt, etc.. offering secure authentication, role-based authorization, real-time notifications, and an admin dashboard for complete oversight.

### Core Features
#### User Features
Authentication & Authorization:

Secure login & registration with JWT-based authentication.

Role-based authorization using AuthContext.

#### Profile Dashboard:
View personal details, created questions, and answers.

##### Questions & Answers:
Post questions and answer others’ queries.

Like/Dislike questions and answers.

Search questions with results shown on the homepage.

##### Password Reset:
Forgot password recovery via Nodemailer.

#### Admin Features
##### Admin Dashboard:
Access profile details and manage users.

##### User Management:
View all users, change roles, and delete accounts.

##### Question Management:
View all questions with actions to delete or review them.

##### Live Notifications:
Receive real-time updates when users create questions or post answers via GraphQL Subscriptions.

Security
JWT Authentication ensures all user sessions are protected.

Role-Based Access Control restricts unauthorized users from manipulating data.

bcrypt is used for secure password hashing.

Tech Stack
Frontend:
React.js, Next.js, Material-UI

### Backend:
Node.js, Express.js

### Database:
MongoDB (Mongoose ODM)

### Authentication:
JWT, bcrypt

### API Layer:
GraphQL (Queries, Mutations, Subscriptions)

### Email Service:
Nodemailer (for password recovery)

### State Management:
React Context (AuthContext)

System Flow
User registers/login → Authenticated with JWT.

##### Role-based redirection:
User → User Profile (questions, answers, account details).

Admin → Admin Dashboard (user management, question moderation).

Ask/Answer → Stored in MongoDB, instantly updated on the homepage.

Like/Dislike system → Helps highlight popular content.

Search → Finds relevant questions across the platform.

Subscriptions → Admin gets real-time notifications for user actions.

### Key Highlights
Community-driven Q&A forum with chat-like interaction.

Fully authenticated & authorized workflows.

Real-time admin notifications with GraphQL Subscriptions.

Modern, responsive UI with Material-UI.

Scalable architecture built on the MERN + GraphQL stack.

### Future Enhancements
User-to-user direct chat or messaging.

Upvote/downvote analytics dashboard for admins.

Tagging & categorization of questions.

Push/email notifications for users on activity in their questions.

Contribution
Contributions are welcome! Please fork the repo and create a pull request.
