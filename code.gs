//https://github.com/levinunnink/html-form-to-google-sheet/blob/master/appscript.js
function doGet(e) {
 
  var template = HtmlService.createTemplateFromFile('jeopardy')
  var html = template.evaluate()
    .setTitle('Jeopardy Scores');
  
  var htmlOutput = HtmlService.createHtmlOutput(html);
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;

}
function doPost(e) {
  var scores = JSON.parse(e.postData.contents);
  AddRecord(scores);
  return ContentService.createTextOutput(JSON.stringify(scores));
}

function AddRecord(scores) {
  var url = 'https://docs.google.com/spreadsheets/d/1UIF29GH_rH-4K9hgjcdT_DWZ9uUcJBv5hTfVQImaD1M/edit?gid=0#gid=0';
  var ss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Sheet1");

  scores.forEach(score => {
    //for each player, add a row to the sheet
    webAppSheet.appendRow([score.timeStamp, score.episode, score.name, score.score, score.final]);
  });

}