const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    StudentID:{
        type: String,
        unique : true,
        required: [true, "Please Enter Student ID"]
    },
    Name:{
        type: String,
        required: [true,"Please Enter Student Name"]
    },
    Marks:[
        {
        Ideation : Number,
        Execution : Number,
        Viva : Number,
        }
    ],
    EmailId:{
        type: String,
        required : true,
        unique : true,
    },
    TotalMarks:{
        type : Number,
        default : -1,
    },
    MentorAssigned:{
        type : String,
        default : "Not Assigned"
    },
    isLocked:{
        type : Boolean,
        default : false
    }
    },
    {timestamps : true}
);

module.exports = mongoose.model("StudentDetails", StudentSchema);
