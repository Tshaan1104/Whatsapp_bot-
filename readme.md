WhatsApp Bot
A WhatsApp bot application that uses Twilio API for sending and receiving messages. This project includes a backend server built with Express.js and a frontend interface that interacts with the server to send messages and handle media files.

Features
Send Text and Media Messages: Send messages and media (images, videos) to WhatsApp numbers using Twilio.
Receive Incoming Messages: Handle incoming messages from WhatsApp via webhooks.
Frontend Interface: A simple web interface to interact with the bot, featuring dark mode and message display.
Technologies Used
Backend:

Node.js
Express.js
Twilio API
MongoDB (with Mongoose)
Frontend:

HTML
CSS
JavaScript (Fetch API or Axios for making requests)
Setup and Installation
Prerequisites
Node.js and npm
MongoDB (or a cloud-based MongoDB service)
Twilio Account with API credentials
Backend Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/Tshaan1104/Whatsapp_bot-.git
cd yourrepository
Install Dependencies:

bash
Copy code
cd Backend
npm install
Configure Environment Variables:

Create a .env file in the Backend directory with the following content:

env
Copy code
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
MONGO_URI=your_mongodb_connection_string
Start the Server:

bash
Copy code
npm start
The server will be running on http://localhost:6000.

Frontend Setup
Prepare Frontend Files:

Place your HTML, CSS, and JavaScript files in the Frontend directory. Ensure your JavaScript file is correctly set up to communicate with your backend.

Serve Frontend:

You can use a local server like Live Server in VSCode or another static file server to serve your frontend files. Make sure it is configured to use port 5500 if that’s where you intend to run it.

Testing with Postman
Send a Message:

Use Postman to send a POST request to http://localhost:6000/api/whatsapp/send-message with the form data message, to, and optionally file.

Receive Messages:

Set up a webhook in Twilio to point to http://localhost:6000/api/whatsapp/webhook to receive incoming messages.

Handling Secrets
Push Protection:

Ensure that sensitive information such as Twilio credentials is not committed to your repository. Use environment variables and .gitignore to secure your secrets.

Troubleshooting
405 Method Not Allowed: Ensure that your backend route matches the route used in your frontend request.

500 Server Error: Check server logs for specific error messages. Ensure all required environment variables are correctly set.

Contributing
Feel free to submit issues or pull requests to improve the project. Make sure to follow the coding guidelines and ensure that all tests pass before submitting.
