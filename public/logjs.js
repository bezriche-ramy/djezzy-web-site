async function fetchUserData() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { users: [] }; 
    }
}

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usersData = await fetchUserData();

    const user = usersData.users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = 'djeezy.html'; 
    } else {
        alert("Invalid credentials, please try again.");
    }
}