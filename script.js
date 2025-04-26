const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');
const player = document.getElementById('player');

sendBtn.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) {
    alert('Please type how you feel.');
    return;
  }

  // 1. Show user message
  const userMsg = document.createElement('div');
  userMsg.textContent = 'You: ' + text;
  messages.appendChild(userMsg);

  // 2. Show “loading” reply
  const loading = document.createElement('div');
  loading.textContent = 'Bot: Generating your song…';
  messages.appendChild(loading);

  // 3. Call your back-end (we’ll build this later)
  try {
    const resp = await fetch('https://YOUR_FUNCTION_URL/generate-song', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ text })
    });
    const data = await resp.json();

    // Remove loading text
    messages.removeChild(loading);

    // 4. Show lyric
    const lyricMsg = document.createElement('div');
    lyricMsg.textContent = 'Bot (lyrics): ' + data.lyric;
    messages.appendChild(lyricMsg);

    // 5. Play audio
    player.src = data.audioUrl;
    player.hidden = false;

  } catch (err) {
    console.error(err);
    loading.textContent = 'Error generating song. Please try again.';
  }
});
