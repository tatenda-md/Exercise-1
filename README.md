ALL DEAD

ALL DEAD is a 9-part short story project by Tatenda Mudavanhu.

The episodes of the story are stored in a MongoDB database and can be dynamically accessed, created, updated, and deleted through a Node.js and Express.js backend.

## Features
- CRUD (Create, Read, Update, Delete) operations for story episodes
- View individual episodes dynamically
- Responsive UI (frontend served statically)
- MongoDB integration for storing episodes
- Simple form-based episode management

## Prerequisites

Before running the project locally, ensure you have the following installed on your system:

- **Node.js** (v12.x or later)
- **npm** (comes with Node.js)
- **MongoDB** (Ensure MongoDB is installed and running locally)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tatenda-md/Exercise-1.git
```

Navigate to the project directory:

```bash
cd all-dead
```

### 2. Install Dependencies

Run the following command to install all required Node.js dependencies:

```bash
npm install
```

### 3. Set Up MongoDB

Make sure MongoDB is running locally on your machine. If you're using the default MongoDB settings, it should be available at:

```
mongodb://127.0.0.1:27017
```

The database used in this project is called `alldead`.

If MongoDB isn't running, start it with the command:

```bash
mongod
```

### 4. Running the Application

You can start the server using Node.js by running:

```bash
node server.js
```

If everything is configured correctly, the server will start on `http://localhost:3000` by default.

### 5. Accessing the Project

- **Home Page**: Visit [http://localhost:3000](http://localhost:3000) to view the main page.
- **Create Episodes**: Visit [http://localhost:3000/create](http://localhost:3000/create) to add new episodes.
- **List Episodes**: Visit [http://localhost:3000/list](http://localhost:3000/list) to see all created episodes.
- **Update Episodes**: You can update any episode by clicking the "Update" link next to each episode in the list.
- **Delete Episodes**: You can delete any episode by clicking the "Delete" link next to each episode in the list.
- **View Episodes**: Visit `http://localhost:3000/episode/<epNum>` where `<epNum>` corresponds to the episode's path (e.g., `/episode/1` for episode 1).

### 6. File Structure

- `server.js` - The main server file handling backend routes and logic.
- `public/` - Contains static files such as the homepage (`index.html`) and the "About" page (`about.html`).
- `styles.css` - Stylesheet for the frontend.

### 7. Adding Episodes

- **Path**: A unique identifier for the episode, which you will use to dynamically access it.
- **Title**: The title of the episode.
- **Content**: The body of the story episode.

You can add new episodes through the `/create` route or by directly interacting with the MongoDB database.

---

## Contributing

Feel free to fork the repository and submit pull requests with improvements. If you encounter any issues or have suggestions, please open an issue.

## License

This project is open-source and free to use. No specific license applied.

---

## Troubleshooting

### Common Errors:
1. **Error: Cannot find module 'express'**:
   - Run `npm install express` to install the missing `express` module.

2. **Error: MongoDB connection failed**:
   - Ensure that MongoDB is installed and running on your local machine.

3. **Episode Not Found**:
   - Make sure that the correct episode path is used, and the episode exists in the database.

If you need further assistance, feel free to reach out through the Issues section on GitHub.
