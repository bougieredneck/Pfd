var HEADERS = [
  "Date",
  "Items done",
  "Score",
  "Prayed",
  "One more",
  "Who Not How task",
  "Handed to",
  "Win 1",
  "Win 2",
  "Win 3",
  "Weight",
  "POC count"
];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Days");
  if (!sh) sh = ss.insertSheet("Days");
  if (String(sh.getRange(1, 1).getValue() || "") !== "Date") {
    sh.insertRowBefore(1);
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  }
  sh.getRange("A:A").setNumberFormat("yyyy-mm-dd");
  return sh;
}

function dateKey_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  var text = String(value || "").trim();
  var match = text.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function rowValues_(row) {
  if (!row || typeof row !== "object") return null;
  var date = dateKey_(row.date);
  if (!date) return null;
  return [
    date,
    String(row.itemsDone || ""),
    String(row.score || ""),
    String(row.prayed || ""),
    String(row.oneMore || ""),
    String(row.whoTask || ""),
    String(row.who || ""),
    String(row.win1 || ""),
    String(row.win2 || ""),
    String(row.win3 || ""),
    String(row.weight || ""),
    row.pocCount === 0 || row.pocCount ? String(row.pocCount) : ""
  ];
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = {};
    try {
      body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    } catch (err) {
      body = {};
    }
    var rows = body && Array.isArray(body.days) ? body.days : [body];
    var sh = sheet_();
    var last = sh.getLastRow();
    var index = {};
    if (last >= 2) {
      var dates = sh.getRange(2, 1, last - 1, 1).getValues();
      for (var i = 0; i < dates.length; i++) {
        var key = dateKey_(dates[i][0]);
        if (key) index[key] = i + 2;
      }
    }
    rows.forEach(function (row) {
      var values = rowValues_(row);
      if (!values) return;
      var at = index[values[0]];
      if (at) sh.getRange(at, 1, 1, values.length).setValues([values]);
      else {
        sh.appendRow(values);
        index[values[0]] = sh.getLastRow();
      }
    });
    return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("The BR Effect sync is ready.").setMimeType(ContentService.MimeType.TEXT);
}
