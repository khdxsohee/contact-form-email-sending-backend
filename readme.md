### Email Sending Apps Script

This project provides a simple yet effective solution for a contact form using Google Apps Script. It integrates a front-end HTML form with a Google Sheet for data storage and sends email notifications upon submission.

### Project Files

  * `code.gs`: The Google Apps Script that acts as the backend to process form submissions.
  * `contact.html(javascript)`: The front-end HTML file containing the contact form and client-side JavaScript.
  * `contactform`: (id="contactForm) - This id is used in the html form.

### `code.gs`

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Your Sheet Name Goes Here
  var rowData = [];

  // Get current timestamp
  rowData.push(new Date());

  // Get data from form submission
  var name = e.parameter.name;
  var email = e.parameter.email;
  var phone = e.parameter.phone;
  var subject = e.parameter.subject;
  var msg = e.parameter.msg;

  rowData.push(name);
  rowData.push(email);
  rowData.push(phone);
  rowData.push(subject);
  rowData.push(msg);

  // Append the data as a new row to the Google Sheet
  sheet.appendRow(rowData);
  // --- Email Bhejney Wala Code Yahan Se Shuru Hota Hai ---

  var recipientEmail = "Your Email Goes Here";
  // <<< Apni email ID yahan daalen
  var emailSubject = "New Contact Form Submission: " + subject;
  var emailBody = "Aap ko ek naya contact form submission mila hai:\n\n" +
                  "Name: " + name + "\n" +
                  "Email: " + email + "\n" +
                  "Phone: " + phone + "\n" +
                  "Subject: " + subject + "\n" +
                  "Message:\n" + msg;
  try {
    MailApp.sendEmail(recipientEmail, emailSubject, emailBody);
    Logger.log("Email sent successfully to: " + recipientEmail);
  } catch (error) {
    Logger.log("Failed to send email: " + error.toString());
  }

  // --- Email Bhejney Wala Code Yahan Par Khatam Hota Hai ---

  // Return a success response (important for the client-side JavaScript)
  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() })).setMimeType(ContentService.MimeType.JSON);
}
```

### `contact.html` - Relevant JavaScript Code

```javascript
<script>
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]'); // Submit button ko select karein

    // Loading effect shuru karein
    submitButton.classList.add('loading');
    submitButton.disabled = true; // Button ko disable karein taakey baar baar click na ho

    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxFhDZ53HQ8uZlaumg-36nGz74fzC777LTYuHLmJvG1TFGf94n5siJBcLpBAIwyTK7VjQ/exec'; // Aapki Apps Script Web App URL

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
</script>
```

-----

### Installation Guide

Follow these steps to set up the contact form and its backend functionality.

#### Step 1: Create and Prepare a Google Sheet

1.  Open [Google Sheets](https://docs.google.com/spreadsheets/) and create a new spreadsheet.
2.  Rename the first sheet to "Sheet1".
3.  In the first row of the sheet (the header row), add the following column titles: `Timestamp`, `Name`, `Email`, `Phone`, `Subject`, `Message`. [cite\_start]These headers correspond to the data the script will append[cite: 2, 3, 4].

#### Step 2: Set up the Apps Script

1.  In your Google Sheet, go to `Extensions` \> `Apps Script`. This will open a new tab with the Apps Script editor.
2.  Copy the entire code from the `code.gs` file provided above.
3.  Paste the code into the Apps Script editor, replacing any existing code.
4.  [cite\_start]**Configuration**: Locate the line `var recipientEmail = "Example@gmail.com";`[cite: 5, 6]. Replace `"khalid817014@gmail.com"` with the email address where you want to receive the contact form submissions.
5.  Save the project by clicking the floppy disk icon or pressing `Ctrl + S`.

#### Step 3: Deploy the Apps Script as a Web App

1.  [cite\_start]Click the `Deploy` button in the top-right corner of the Apps Script editor and select `New deployment`[cite: 1, 11].
2.  Click on the gear icon (`⚙️`) and choose `Web app`.
3.  In the deployment settings, configure the following:
      * `Execute as`: Select `Me` (`your-email@gmail.com`).
      * `Who has access`: Select `Anyone`. This is essential for the form to work for all visitors.
4.  Click `Deploy`.
5.  Google will ask you to authorize the script. Follow the prompts:
      * Click `Authorize access`.
      * Select your Google account.
      * Click `Advanced` and then `Go to [Your Project Name] (unsafe)`.
      * Click `Allow` to grant the necessary permissions for the script to access your spreadsheet and send emails.
6.  Once deployed, a dialog box will appear with the **Web app URL**. Copy this URL, as you will need it in the next step.

#### Step 4: Integrate the Web App URL into the HTML

1.  Open your `contact.html` file in a code editor.
2.  Scroll down to the `<script>` block at the bottom of the file.
3.  Find the `const scriptURL` line.
4.  Replace the placeholder URL with the Web app URL you copied in the previous step.
5.  Save the `contact.html` file.

The setup is now complete. When a user submits the form on `contact.html`, the data will be sent to your Google Sheet and you will receive an email notification.
