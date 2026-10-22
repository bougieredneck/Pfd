# Send days to a private Google Sheet

The app keeps your days on the phone. The sheet is optional. If you leave the link blank, nothing is sent.

Do this once, on a computer, in the Google account that should own the sheet.

1. Open [Google Sheets](https://sheets.google.com) and make a blank spreadsheet. Name it The BR Effect.
2. Click **Extensions**, then **Apps Script**.
3. Delete the code that is already there.
4. Open this file and copy all of it: [apps-script/Code.gs](https://bougieredneck.github.io/Pfd/apps-script/Code.gs)
5. Paste it into Apps Script. Click the save icon.
6. Click **Deploy**, then **New deployment**.
7. Click the gear, and choose **Web app**.
8. Set **Execute as** to **Me**.
9. Set **Who has access** to **Anyone**.
10. Click **Deploy**. If Google asks you to allow the script, allow it. It only writes this spreadsheet.
11. If you see "Google hasn't verified this app", click **Advanced**, then **Go to … (unsafe)**. It is your script.
12. Copy the web app URL. It ends in `/exec`.
13. Open that URL once in the browser. You should see: The BR Effect sync is ready.
14. On the iPhone, open The BR Effect from the **home-screen icon**.
15. Tap **More**, then **Settings**.
16. Paste the URL into **Apps Script link**. Tap away. **Saved** appears.
17. Tap **Sync now**. Then open the spreadsheet. There is a **Days** tab with one row per day.

After that, each save sends that day. **Sync now** sends every day already on the phone.

The spreadsheet stays private. Anyone with the web app link can add rows, so don't share the link.

Safari and the home-screen icon do not share data. Paste the link in the home-screen app.

If you change the script later: **Deploy**, **Manage deployments**, pencil, **New version**, **Deploy**. Use the new URL only if Google gives you a different one.
