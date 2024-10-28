document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessageToChat('User', userInput);
        fetchMovieInfo(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addMessageToChat(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function fetchMovieInfo(query) {
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();

        if (data.movie) {
            const { Title, Year, Genre, Plot } = data.movie;
            addMessageToChat('Bot', `🎬 Title: ${Title}\n📅 Year: ${Year}\n🎭 Genre: ${Genre}\n📝 Plot: ${Plot}`);
        } else {
            addMessageToChat('Bot', '❌ Movie not found.');
        }
    } catch (error) {
        console.error('Error fetching movie info:', error);
        addMessageToChat('Bot', '⚠️ There was an error. Please try again.');
    }
}
