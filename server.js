const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Handle the signup route
app.post('/signup', (req, res) => {
    const userData = req.body;

    // Read the existing user data
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        // Parse the existing data
        const users = data ? JSON.parse(data) : [];

        // Add the new user
        users.push(userData);

        // Write the updated user data back to the file
        fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ message: 'Error writing to file' });
            }

            console.log('File successfully written');
            res.json({ message: 'Signup successful' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
