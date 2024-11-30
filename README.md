## Technologies Used

This project utilizes several advanced technologies that provide real-time solutions and good performance:

- **Node.js**: A JavaScript runtime environment for server initialization and request handling.
- **Express.js**: A framework that simplifies API building and route management.
- **Socket.io**: Enables real-time interaction between the server and the client, allowing users to receive updates in real-time on room status, participant count, and actions taken by users.
- **MongoDB**: Manages the data and provides connections to collections.

## Directory and File Descriptions

### 1. **server.js**  
   Handles the server setup, route management, and database connection (MongoDB).  
   - Initializes the server using **Express.js**.
   - Configures middlewares, manages **CORS**, and parses requests.
   - Defines **API endpoints** for data retrieval and responses.

### 2. **db.service.js**  
   A service file that manages the connection to the **MongoDB** database and performs operations on collections.  
   - Establishes a connection to the database.
   - Provides functions for **data retrieval**.

### 3. **code.controller.js**  
   Handles **API requests**, passing data from the service to the client.  
   - Processes requests and responds accordingly.

### 4. **code.router.js**  
   Manages the **API routes** and maps them to the corresponding controller functions.  
   - Defines **API paths** and links them to appropriate controller functions.

### 5. **code.service.js**  
   Implements **business logic** for the system, including data retrieval from the database.  
   - Includes functions for performing core operations of the system.

### 6. **socket.service.js**  
   Handles **real-time interaction** between the server and clients using **Socket.io**.  
   - Enables real-time updates such as participant count in rooms and actions taken by users.
   - Allows restricting certain actions based on **user roles** within the room (mentor, student, or watcher).
