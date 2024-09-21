**Backend Description**
Key Features
User Authentication: Users can sign up, log in, and log out securely. JWT is used for session management, and passwords are hashed using bcrypt.
Profile Management: CRUD operations on user profiles, allowing users to create, edit, or delete their profiles.
Post Handling: Supports creating, deleting, and editing posts, with file uploads for images and videos handled by Multer.
Real-time Messaging: Implemented using Socket.IO for real-time one-to-one messaging.
Notification System: Notifications are triggered when posts are liked or commented on.
Data Storage: MongoDB with Mongoose for schema-based document storage.
Secure Passwords: Passwords are hashed using bcrypt before saving to the database.
