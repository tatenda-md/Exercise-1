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

// *** Changes below to dynamically fetch content from the database ***

// Route 3: Dynamic Route for Episodes
app.get('/episode/:epNum', async (req, res) => {
  const epNum = req.params.epNum;

  // ** Fetch the episode content from MongoDB based on the path (epNum) **
  try {
    const episode = await Story.findOne({ path: epNum });

    // Check if the episode exists
    if (episode) {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${episode.title}</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            <div class="box A1">
              <h1>${episode.title}</h1>
            </div>
            <div class="box A2">
              <p>${episode.content}</p> <!-- Displaying the actual content from the database -->
            </div>
          </div>
        </body>
        </html>
      `);
    } else {
      res.status(404).send('Episode not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving episode');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

