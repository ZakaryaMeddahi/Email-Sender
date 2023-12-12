const email = document.getElementById('email');
const subscribe = document.getElementById('subscribe');
const message = document.getElementById('message');

subscribe.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await response.json();

    console.log(data);
    message.innerHTML = data.message;
    message.style.visibility = 'visible';
    message.style.color = data.status === 'success' ? 'green' : 'red';
  } catch (error) {
    console.error(error);
  }
});
