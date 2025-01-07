require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get("/api/rentals", (req, res) => {
    const query = "SELECT * FROM rentals";
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching rentals" });
      } else {
        res.json(results);
      }
    });
  });
  app.get("/api/home-video", (req, res) => {
    const query = "SELECT url FROM videos WHERE is_homepage = 1 LIMIT 1";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching home video URL:", err);
        return res.status(500).json({ error: "Failed to fetch video URL" });
      }
      if (result.length > 0) {
        res.json({ url: result[0].url });
      } else {
        res.status(404).json({ error: "No video found for homepage" });
      }
    });
  });
  app.get("/api/about", (req, res) => {
    // Fetch about data from about_us table
    const aboutQuery = "SELECT description, image_url FROM about_us LIMIT 1";
    db.query(aboutQuery, (err, aboutResult) => {
      if (err) {
        console.error("Error fetching about data:", err);
        return res.status(500).json({ error: "Failed to fetch about data" });
      }
  
      // Fetch team members from team_members table
      const teamQuery = "SELECT name, position, image_url FROM team_members";
      db.query(teamQuery, (err, teamResult) => {
        if (err) {
          console.error("Error fetching team data:", err);
          return res.status(500).json({ error: "Failed to fetch team data" });
        }
  
        if (aboutResult.length > 0) {
          const aboutData = aboutResult[0];
          res.json({
            description: aboutData.description,
            imageUrl: aboutData.image_url,
            team: teamResult, // Return the team members from team_members table
          });
        } else {
          res.status(404).json({ error: "No about data found" });
        }
      });
    });
  });
  
  app.get("/api/folders", (req, res) => {
    const query = "SELECT * FROM folders";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching folders:", err);
        res.status(500).json({ error: "Failed to fetch folders" });
      } else {
        res.json(results);
      }
    });
  });


  app.get("/api/rentals-page", (req, res) => {
    const categoryQuery = "SELECT * FROM rental_categories";
    const rentalsQuery = "SELECT * FROM rentals";

    db.query(categoryQuery, (categoryErr, categoryResults) => {
        if (categoryErr) {
            console.error("Error fetching categories:", categoryErr);
            return res.status(500).json({ error: "Failed to fetch categories" });
        }

        db.query(rentalsQuery, (rentalsErr, rentalResults) => {
            if (rentalsErr) {
                console.error("Error fetching rentals:", rentalsErr);
                return res.status(500).json({ error: "Failed to fetch rentals" });
            }

            // Organize rentals under their categories
            const categoriesWithRentals = categoryResults.map((category) => ({
                ...category,
                rentals: rentalResults.filter((rental) => rental.category_id === category.id),
            }));

            res.json(categoriesWithRentals);
        });
    });
});




  
  
  
//   app.post("/api/about", (req, res) => {
//     const { description, imageUrl } = req.body;
//     const query = "UPDATE about_us SET description = ?, image_url = ? WHERE id = 1";
//     db.query(query, [description, imageUrl], (err, result) => {
//       if (err) {
//         console.error("Error updating about data:", err);
//         return res.status(500).json({ error: "Failed to update about data" });
//       }
//       res.json({ message: "About data updated successfully" });
//     });
//   });
    
  

//ADMIN DASHBOARD

app.post("/api/videos/homepage", (req, res) => {
    const { videoId } = req.body;
    const resetQuery = "UPDATE videos SET is_homepage = 0";
    const setQuery = "UPDATE videos SET is_homepage = 1 WHERE id = ?";
  
    db.query(resetQuery, (err) => {
      if (err) {
        console.error("Error resetting homepage videos:", err);
        return res.status(500).json({ error: "Failed to reset homepage videos" });
      }
  
      db.query(setQuery, [videoId], (err, result) => {
        if (err) {
          console.error("Error setting homepage video:", err);
          return res.status(500).json({ error: "Failed to set homepage video" });
        }
        res.json({ message: "Homepage video updated successfully" });
      });
    });
  });
  app.get("/api/videos", (req, res) => {
    const query = "SELECT id, title FROM videos";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching videos:", err);
        return res.status(500).json({ error: "Failed to fetch videos" });
      }
  
      res.json(results);
    });
  });
  

  
  app.post("/api/folders", (req, res) => {
    const { name, thumbnail } = req.body;
    const query = "INSERT INTO folders (name, thumbnail) VALUES (?, ?)";
  
    db.query(query, [name, thumbnail], (err, result) => {
      if (err) {
        console.error("Error creating folder:", err);
        return res.status(500).json({ error: "Failed to create folder" });
      }
      res.json({ message: "Folder created successfully", folder_id: result.insertId });
    });
  });
  

  
  app.post("/api/videos", (req, res) => {
    const { title, url, folder_id, thumbnail } = req.body; // Destructure folder_id and thumbnail
    const query = "INSERT INTO videos (title, url, folder_id, thumbnail) VALUES (?, ?, ?, ?)";
  
    db.query(query, [title, url, folder_id, thumbnail], (err, result) => {
      if (err) {
        console.error("Error adding video:", err);
        return res.status(500).json({ error: "Failed to add video" });
      }
      res.json({ message: "Video added successfully", videoId: result.insertId });
    });
  });
  

  
  app.post("/api/about", (req, res) => {
    const { description, imageUrl } = req.body;
    const query = "UPDATE about_us SET description = ?, image_url = ? WHERE id = 1";
  
    db.query(query, [description, imageUrl], (err) => {
      if (err) {
        console.error("Error updating about data:", err);
        return res.status(500).json({ error: "Failed to update about data" });
      }
      res.json({ message: "About Us updated successfully" });
    });
  });

  


 

  app.delete("/api/folders/:id", (req, res) => {
    const { id } = req.params;
  
    const deleteVideosQuery = "DELETE FROM videos WHERE folder_id = ?";
    const deleteFolderQuery = "DELETE FROM folders WHERE id = ?";
  
    // First delete related videos
    db.query(deleteVideosQuery, [id], (err) => {
      if (err) {
        console.error("Error deleting videos for folder:", err);
        return res.status(500).json({ error: "Failed to delete videos for folder" });
      }
  
      // Then delete the folder
      db.query(deleteFolderQuery, [id], (err) => {
        if (err) {
          console.error("Error deleting folder:", err);
          return res.status(500).json({ error: "Failed to delete folder" });
        }
  
        res.json({ message: "Folder and its videos deleted successfully" });
      });
    });
  });
  
  
  
  app.delete("/api/videos/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM videos WHERE id = ?";
    
    db.query(query, [id], (err) => {
      if (err) {
        console.error("Error deleting video:", err);
        return res.status(500).json({ error: "Failed to delete video" });
      }
      res.json({ message: "Video deleted successfully" });
    });
  });

  
  




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
