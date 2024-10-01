const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route 1: Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route 2: Static About Page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route 3: Dynamic Route for Episodes
app.get('/episode/:episodeNum', (req, res) => {
  const episodeNum = req.params.episodeNum;
  
  // Define episode titles based on episode number
  const episodeTitles = {
    1: "Ep 1 - A GREAT DAY",
    2: "Ep 2 - THE TRAM WRECK",
    3: "Ep 3 - HELP FROM THE TURKISH GUY"
  };

  // Check if the episode number exists
  if (episodeTitles[episodeNum]) {
    // Serve a template HTML for each episode dynamically
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${episodeTitles[episodeNum]}</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="container">
          <div class="box A1">
            <h1>${episodeTitles[episodeNum]}</h1>
          </div>
          <div class="box A2">
            <p>This is content for episode ${episodeNum}. You can add more specific content here.</p>
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.status(404).send('Episode not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
