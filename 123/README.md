# Skin Decode

Assignment-ready Skin Decode website based on the supplied project files.

## Run in VS Code

Requires **Node.js 22+**.

```powershell
npm install
npm start
```

Open http://localhost:3000

### Database
The project uses **Node 22's built-in `node:sqlite`**. There are no native npm database packages, so Visual Studio C++ Build Tools are not required.

Data is stored in `skin-decode.db` and includes users, skin scans, saved ingredients and saved routines.

### Render
Push the project to GitHub and create a Render Web Service. The included `render.yaml` uses Node 22 and `npm ci`.

SQLite on a free/ephemeral Render service is suitable for an assignment/demo but may not survive instance replacement or redeploys. For durable production persistence, use a persistent disk or PostgreSQL.
