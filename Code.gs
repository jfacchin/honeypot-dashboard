// Honeypot Signup Board — Apps Script backend + host.
//  • /exec            → serves the dashboard page (index.html in this project)
//  • /exec?data=1     → returns the sign-up log as JSON (used by the page every minute)
// Deploy as Web app: Execute as "Me", Who has access "Anyone". The sheet stays private.

const SHEET_ID = "1snw2N4wurzZ7fWqs8lklKpGHw6ALYfSa2ef5c3FSglA";
const TABS = ["Amy Picle", "Adam Stride", "Luis Raft", "Kaedin Thompson", "Lorraine Smith"];

function doGet(e) {
  if (e && e.parameter && e.parameter.data) return getData_();
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Honeypot Signup Board")
    .addMetaTag("viewport", "width=device-width, initial-scale=1, viewport-fit=cover")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const out = {};
  TABS.forEach(t => { const s = ss.getSheetByName(t); out[t] = s ? s.getDataRange().getValues() : []; });
  out._updated = new Date().toISOString();
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
