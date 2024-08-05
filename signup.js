function handleSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Send the data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Signup successful!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
