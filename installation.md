**Tool Installation**
=====================

1.  copy the VIDEO\_ANNOTATION folder to your system.
2.  install node.js in your system and
3.  Go to the folder using terminal and use command npm start.
4.  The application will run on port 4200, you can go to localhost:4200 in your browser.

**To login use **

**email: admin@gmail.com**

**password: 123456**

**connect to your local server**
================================

Front end is connected to a remote server,if you want to run the server on your pc, just open another terminal and 

traverse to the folder location and type the command node server.js

This will run a node server on port 3200.

Go to environment.ts file and use

 backendUrl: 'http://localhost:3200/api' to connect to your local server

**connect to your local/own database**
======================================

The server is connected to a remote database. If you want to connect to your own/local datase. Just create a database with annotation\_tool.sql file in your mysql server and go to server,js file and change the connection to your own database.