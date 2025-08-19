Nalanda Library Management System
Welcome to the Nalanda Library Management System — a comprehensive, scalable full-stack application designed to facilitate library management with modern technologies.

Technologies Used
Backend: Node.js, Javascript, Express, MongoDB, Mongoose, Apollo Server (GraphQL)
Frontend:HTML,Tailwind CSS, React
Authentication: JWT with role-based authorization
Notifications: React Toastify for user feedback
Query Language: REST and GraphQL for API interactions

Features
1. User Authentication

Secure login and registration using JWT authentication (with email/password)

Roles: Admin and Member with role-based access.

Only authorized users like Admin can add update and delete Books And also get reports of the website user can borrow and return the books

![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/lgin.png)
2. Book Management

Admins can add, update, delete books

Admin Can also get reports like Most Borrowed Books, Active Members, Book Availability

![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/admin.png)
![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/add.png)
![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/delete.png)

3.Borrowing System

Members can borrow available books and track borrowing history.

Return books securely with status updates.

![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/Borrow.png)
![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/my_brrw.png)

4.Reporting 

Generate reports for most borrowed books, Most Borrowed Books, Active Members, Book Availability

![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/mst_active.png)
![image_alt](https://github.com/VamsiKrishna0101/Nalanda_Library/blob/271c4c26714783b966f2e6828d9e417733fdb346/bok_vail.png)

APIs
RESTful APIs for all core functionalities.

Project Setup
1.Clone the repo
git clone https://github.com/VamsiKrishna0101/Nalanda_Library.git
cd nalanda-library-system
2.Install dependencies for backend and frontend
cd backend
npm install
cd ../frontend
npm install
3.Change Env variables
Change Mongo_uri,jwt_secret


