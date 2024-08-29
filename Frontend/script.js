document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message');
    const fileInput = document.getElementById('file-input');
    const messageDisplay = document.getElementById('message-display');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Function to display a message
    function displayMessage(message, isIncoming, mediaUrl = '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (isIncoming) {
            messageDiv.classList.add('incoming');
        } else {
            messageDiv.classList.add('outgoing');
        }
        if (mediaUrl) {
            const mediaElement = document.createElement(mediaUrl.endsWith('.mp4') ? 'video' : 'img');
            mediaElement.src = mediaUrl;
            mediaElement.classList.add('media');
            mediaElement.controls = mediaUrl.endsWith('.mp4');
            messageDiv.appendChild(mediaElement);
        } else {
            messageDiv.textContent = message;
        }

        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date().toLocaleTimeString();
        messageDiv.appendChild(timestamp);

        messageDisplay.appendChild(messageDiv);
        messageDisplay.scrollTop = messageDisplay.scrollHeight; // Scroll to bottom
    }

    // Function to send a message
    async function sendMessage() {
        const message = messageInput.value.trim();
        const file = fileInput.files[0];
        
        if (message || file) {
            // Display the outgoing message
            displayMessage(message, false);

            const data = {
                message: message,
                to: '+14155238886',  //recipient's number
            };
            if (file) {
               data={
                
               }
            }
            // console.log("formData ",formData);

            // Send the message to the backend
            try {
                const response = await fetch('http://localhost:3000/api/whatsapp/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.mediaUrl) {
                        displayMessage(message, false, result.mediaUrl);
                    }
                } else {
                    console.error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
            }

            messageInput.value = ''; // Clear the input
            fileInput.value = ''; // Clear the file input
        }
    }

    // Event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the Enter key to send messages
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Function to simulate receiving a message
    // (Replace with real implementation based on your backend)
    function receiveMessage(message, mediaUrl = '') {
        displayMessage(message, true, mediaUrl);
    }

    // Example of receiving a message after 5 seconds
    // receiveMessage('Hello! This is a test message.', '');
});
