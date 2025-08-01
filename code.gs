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

  // --- Email Id Write Here ---

  var recipientEmail = "Your Email goes Here"; // <<< Your Email Id Goes Here
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

  // --- Email Coding End Here ---

  // Return a success response (important for the client-side JavaScript)
  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() })).setMimeType(ContentService.MimeType.JSON);
}
