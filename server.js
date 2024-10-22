//import mongoose from 'mongoose'
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/alldead')
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))

const storySchema = new mongoose.Schema({
  path: String,
  title: String,
  content: String
})
const Story = mongoose.model('Story', storySchema)

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Route 1: Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/create', (req, res) => {
  res.send(`
    <form action="/create" method="post">
      Path: <input type="text" name="path"><br>
      Title: <input type="text" name="title"><br>
      Content: <textarea name="content"></textarea><br>
      <input type="Submit">
    </form>
  `)
})

app.post('/create', async (req, res) => {
  console.log(req.body)

  const episode = new Story({
    path: req.body.path,
    title: req.body.title,
    content: req.body.content
  })
  await episode.save()

  res.redirect('/list')
})

app.get('/list', async (req, res) => {
  const episodes = await Story.find({}).exec()
  console.log(episodes)
  const episodeItem = (episode) => {
    return `<li>${episode.title} (${episode.path}) - <a href="/delete/${episode.path}">Delete</a></li>`
  }
  res.send(`
    <ul>
      ${episodes.map(episodeItem).join("\n")}
    </ul>
  `)
})

app.get('/delete/:path', async (req, res) => {
  await Story.findOneAndDelete({ path: req.params.path })
  res.redirect("/list")
})

// Route 2: Static About Page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route 3: Dynamic Route for Episodes
app.get('/episode/:epNum', (req, res) => {
  const epNum = req.params.episodeNum;
  
  // Define episode titles based on episode number
  const episodeTitles = {
    1: "Ep 1 - A GREAT DAY",
    2: "Ep 2 - THE TRAM WRECK",
    3: "Ep 3 - HELP FROM THE TURKISH GUY"
    
  };

  // Check if the episode number exists
  if (episodeTitles[epNum]) {
    // Serve a template HTML for each episode dynamically
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${episodeTitles[epNum]}</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="container">
          <div class="box A1">
            <h1>${episodeTitles[epNum]}</h1>
          </div>
          <div class="box A2">
            <p>This is content for episode ${epNum}. You can add more specific content here.</p>
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
