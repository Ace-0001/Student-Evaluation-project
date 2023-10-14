const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connecting to database (mongodb)
const url = "mongodb://localhost:27017/mentorAssignment";

const connectDatabase = mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected Successfully"))
.catch((err) => {
    console.error(err);
});

//starting the server
const server = app.listen(PORT,() => {
    console.log(`Server is Working http://localhost:${PORT}`)
}) 

const student = require("./routes/studentRoutes");

app.use("/api/v1", student);