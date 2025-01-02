require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

// Fetch folders
app.get('/api/folders', (req, res) => {
    const query = `SELECT * FROM folders`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const folders = results.map((folder) => ({
            ...folder,
            videos: []
        }));

        const videoQuery = `SELECT * FROM videos`;
        db.query(videoQuery, (err, videoResults) => {
            if (err) return res.status(500).json({ error: err.message });

            videoResults.forEach((video) => {
                const folder = folders.find((f) => f.id === video.folder_id);
                if (folder) folder.videos.push(video);
            });

            res.json(folders);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
