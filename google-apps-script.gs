/**
 * MONIX Portfolio - Google Apps Script for Google Sheets Lead Tracker
 * 
 * Instructions to set up:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new blank spreadsheet.
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace all code in Code.gs with this script.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type "Web app".
 * 6. Set "Execute as": "Me".
 * 7. Set "Who has access": "Anyone" (crucial so the website can post lead data).
 * 8. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 9. Set the URL in your environment variable: GOOGLE_SHEET_WEBAPP_URL="<YOUR_WEB_APP_URL>"
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Auto-create headers on first row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Program Type",
        "Program / Subject",
        "Custom Field",
        "Message",
        "Source Page",
        "URL"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#d4af37").setFontColor("#ffffff");
    }

    // Append lead entry row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.programType || "",
      data.program || data.subject || "",
      data.dynamicVal || "",
      data.message || "",
      data.source || "",
      data.url || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success", message: "Row appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "active", message: "MONIX Google Sheets API Endpoint Ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}
