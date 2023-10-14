const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/mentorAssignment";

const connectDatabase = mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected Successfully"))
    .catch((err) => {
    console.error(err);
});

module.exports = connectDatabase
