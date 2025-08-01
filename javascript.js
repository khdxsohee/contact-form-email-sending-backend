
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]'); // Submit button code

    // Loading effect shuru karein
    submitButton.classList.add('loading');
    submitButton.disabled = true; // Button ko disable karein taakey baar baar click na ho

    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxFhDZ53HQ8uZlaumg-36nGz74fzC777LTYuHLmJvG1TFGf94n5siJBcLpBAIwyTK7VjQ/exec'; // Google Apps Script Web App URL

    fetch(scriptURL, {
        method: 'POST',
        body: searchParams
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Message sent successfully!');
            form.reset(); // Clear the form
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('There was an error sending your message. Please try again later.');
    })
    .finally(() => {
        // Loading effect khatam karein, chahey success ho ya error
        submitButton.classList.remove('loading');
        submitButton.disabled = false; // Button ko dobara enable karein
    });
});
