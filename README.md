## AskConnect
AskConnect is a community-based FAQ forum where users can share questions, engage in discussions, and provide answers with an interactive voting system. It is built with React, Next.js, Material-UI, GraphQL, Node.js, MongoDB, JWT, and bcrypt, etc.. offering secure authentication, role-based authorization, real-time notifications, and an admin dashboard for complete oversight.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-52-46" src="https://github.com/user-attachments/assets/08dc634b-be89-4335-8e0e-1fe5e1c01302" />


<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-53-14" src="https://github.com/user-attachments/assets/35319da4-349f-4558-b499-23c717fc2dda" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-53-42" src="https://github.com/user-attachments/assets/008b6a2f-3d93-4665-8140-0687b5a4e1b5" />

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 12-09-17" src="https://github.com/user-attachments/assets/4e02e933-778a-4246-8130-147d36d2fb75" />


### Core Features
#### User Features
Authentication & Authorization:

Secure login & registration with JWT-based authentication.

Role-based authorization using AuthContext.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-53-59" src="https://github.com/user-attachments/assets/5e035052-b913-4381-be41-74bf72308b1f" />



#### Profile Dashboard:
View personal details, created questions, and answers.

##### Questions & Answers:
Post questions and answer others’ queries.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-57-59" src="https://github.com/user-attachments/assets/ada7fecf-5463-44c0-8e4c-2bd746a60ce7" />

Like/Dislike questions and answers.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 12-04-37" src="https://github.com/user-attachments/assets/00ff63c1-2009-4e9a-a9be-d09e45a50d80" />


Search questions with results shown on the homepage.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-53-42" src="https://github.com/user-attachments/assets/99e7fa89-7a69-47b4-bfd7-7f8e7ca6c314" />


##### Password Reset:
Forgot password recovery via Nodemailer.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-54-04" src="https://github.com/user-attachments/assets/781c4554-f685-4d05-b7c5-179e4c077426" />
<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-54-33" src="https://github.com/user-attachments/assets/a68ff<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-54-43" src="https://github.com/user-attachments/assets/d3ea5be0-1ab5-41b8-afc0-46289b794bf0" />
47a-115a-4dc6<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-54-54" src="https://github.com/user-attachments/assets/634efc70-31ca-4012-a82c-4d6613833c78" />
-bbb2-a6c9f635d9de" />




#### Admin Features
##### Admin Dashboard:
Access profile details and manage users.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-57-21" src="https://github.com/user-attachments/assets/72b33f14-5bf9-4896-b2a1-c64d9d2c46be" />




##### User Management:
View all users, change roles, and delete accounts.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-57-25" src="https://github.com/user-attachments/assets/f083b2dc-2ebb-411b-a755-a170d0fa873b" />


##### Question Management:
View all questions with actions to delete or review them.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-57-28" src="https://github.com/user-attachments/assets/c54b3f3d-ed08-4515-881c-9c2b8f7e992d" />


##### Live Notifications:
Receive real-time updates when users create questions or post answers via GraphQL Subscriptions.

<img width="1920" height="1080" alt="Screenshot from 2025-09-19 11-57-32" src="https://github.com/user-attachments/assets/d6ad7c22-2297-4118-8c92-640689e73d44" />

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

## Contribution
Contributions are welcome! Please fork the repo and create a pull request.
