# Chatspace (Backend)

# Backend Description

**Key Features**

**User Authentication:** Users can sign up, log in, and log out securely. JWT is used for session management, and passwords are hashed using bcrypt.

**Profile Management:** CRUD operations on user profiles, allowing users to create, edit, or delete their profiles.

**Post Handling:** Supports creating, deleting, and editing posts, with file uploads for images and videos.

**Real-time Messaging:** Implemented using Socket.IO for real-time one-to-one messaging.

**Notification System:** Notifications are triggered when posts are liked or commented on.

**Data Storage:** MongoDB with Mongoose for schema-based document storage.

**Secure Passwords:** Passwords are hashed using bcrypt before saving to the database.

# API Endpoints

# Auth
<b>GET</b> /api/auth/me : Get auth user

<b>POST</b> /api/auth/signup : Signin user

<b>POST</b> /api/auth/login : Login user

<b>POST</b>/api/auth/logout : Logout user

# User

<b>GET</b> /api/user/profile/:username : Get user profile

<b>GET</b> /api/user/suggested : Get suggested user

<b>GET</b> /api/user/users : Get user in chat conversation
 
<b>POST</b> /api/user/follow/:id : For follow and unfollow user

<b>POST</b> /api/user/update : Update user

# POST

<b>GET</b> /api/post/allpost : Get all post

<b>GET</b> /api/post/liked/:id : Get liked post

<b>GET</b> /api/post/followingPosts : Get following post

<b>GET</b> /api/post/user/:username : Get user posts

<b>Post</b> /api/post/create : Create post

<b>Post</b> /api/post/like/:id : Like and unlike post

<b>POST</b> /api/post/comment/:id : Comment post

<b>POST</b> /api/post/:id : Delete post

# Notification

<b>GET</b> /api/notification/ : Get notification 

<b>DELETE</b> /api/notification/ : Delete notification

# Message

<b>GET</b> /api/message/get/:id : Get messages

<b>POST</b> /api/message/send/:id : Send message
