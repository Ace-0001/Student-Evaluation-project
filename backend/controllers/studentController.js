const student = require("../models/studentDetails");
const mentor = require("../models/mentorDetails");

exports.addStudent = async (req,res) =>{
    try{
        const studentInfo = req.body;
        // console.log(studentInfo);
        const studentData = await student.create(studentInfo);
        return res.status(200).json({studentData});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.getAllStudents = async (req,res) =>{
    try{
        const students = await student
        .find()
        .select('StudentID Name MentorAssigned')
      
        return res.status(200).json({students});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.getNotAssignedStudents = async (req,res) =>{
    try{
        
        const students = await student.find({MentorAssigned : 'Not Assigned'},'StudentID Name MentorAssigned EmailId').exec();
        
        const Mentor = req.params.id;
        const assigned = await mentor.findOne({MentorName : Mentor},'StudentsAssigned').exec();
        
        const response = {};
        response["stud"] = students;
        response["assgnd"] = assigned;
        return res.status(200).send({response});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};


exports.getStudentsAssignedForMentor = async (req,res) =>{
    try{
        const Mentor = req.params.id;
        const students = await student.find({MentorAssigned : Mentor}).exec();
        return res.status(200).json({students});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.updateMentorForStudents = async (req,res) =>{
    try{
        const Mentor = req.query.Mentor;
        const StudentsList = req.query.StudentsList;
        console.log(Mentor);
        console.log(StudentsList);
        const currMentor = await mentor.findOne({ MentorName: Mentor}).exec();
        currMentor.StudentsAssigned = currMentor.StudentsAssigned+StudentsList.length;
        await currMentor.save();
        
        for(let i=0;i<StudentsList.length;i++){
            // const doc = await student.findById(StudentsList[i]);
            const doc = await student.findOne({ StudentID: StudentsList[i].StudentID }).exec();
            doc.MentorAssigned = Mentor;
            await doc.save();
        }
        
        // const students = await student.find({MentorAssigned : Mentor},'StudentID Name MentorAssigned').exec();
        return res.status(200).json({Mentor});
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.removeMentorForStudents = async (req,res) =>{
    try{
        const Mentor = req.body.Mentor;
        const StudentsList = req.body.StudentsList;
        console.log(req.body);
        
        const currMentor = await mentor.findOne({ MentorName: Mentor}).exec();
        currMentor.StudentsAssigned = currMentor.StudentsAssigned-1;
        await currMentor.save();

        const doc = await student.findOne({ StudentID: StudentsList }).exec();
        doc.MentorAssigned = "Not Assigned";
        await doc.save();
        
        // const students = await student.find({MentorAssigned : Mentor},'StudentID Name MentorAssigned').exec();
        return res.status(200).json({Mentor});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.addMentor = async (req,res) =>{
    try{
        const mentorInfo = req.body;
        const mentorData = await mentor.create(mentorInfo);
        return res.status(200).json({mentorData});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.getNumberOfStudentsAssignedToMentor = async (req,res) =>{
    try{
        const Mentor = req.params.id;
        const assigned = await mentor.findOne({MentorName : Mentor},'StudentsAssigned').exec();
        return res.status(200).json({assigned});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

exports.updateMentorMarksOfStudent = async (req,res) =>{
    try{
        const Studentid = req.body.Studentid;
        const StudentsMarks = req.body.StudentsMarks[0];
        const isLocked = req.body.isLocked;
        
        const doc = await student.findOne({ StudentID: Studentid }).exec();
        doc.Marks[0].Ideation = StudentsMarks.Ideation;
        doc.Marks[0].Execution = StudentsMarks.Execution;
        doc.Marks[0].Viva = StudentsMarks.Viva;        
        doc.isLocked = isLocked;

        const val = parseInt(StudentsMarks.Ideation) + parseInt(StudentsMarks.Execution) + parseInt(StudentsMarks.Viva);
        doc.TotalMarks = val;        
        
        await doc.save();
        return res.status(200).json({doc});
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({error: error.message});
    }
};


