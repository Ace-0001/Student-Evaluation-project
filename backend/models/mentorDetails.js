const mongoose = require("mongoose");

const MentorSchema = mongoose.Schema({
        MentorId:{
            type : String,
            unique : true,
            required: [true, "Please Enter Mentor ID"]
        },
        MentorName:{
            type: String,
            required: [true,"Please Enter Mentor Name"]
        },
        StudentsAssigned:
        {
            type : Number,
            default : 0
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("mentorDetails", MentorSchema);