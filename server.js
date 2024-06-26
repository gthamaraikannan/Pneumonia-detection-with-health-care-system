const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const userApi = require('./APIS/userApi');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, './build')));

// DB connection URL
const DBurl = "mongodb://localhost:27017";

// Connect to MongoDB server
MongoClient.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    // Get database object
    const db = client.db("pneumonia");

    // Create collection objects
    const userCollection = db.collection("usercollection");

    // Share collection objects with APIs
    app.set("userCollection", userCollection);

    console.log("DB connection success");
  })
  .catch(err => console.log('Error in DB connection ', err));

// Routes
app.use("/user-api", userApi);

// Handling invalid paths
app.use((req, res) => {
  res.status(404).json({ message: `Path ${req.url} is invalid` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Assign port number
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}..`));
