const express = require("express");

const {addStudent, getAllStudents, getNotAssignedStudents, getStudentsAssignedForMentor, updateMentorForStudents, addMentor, removeMentorForStudents, getNumberOfStudentsAssignedToMentor, updateMentorMarksOfStudent}  = require("../controllers/studentController");
const router = express.Router();

router.post("/addStudent", addStudent);
router.post("/addMentor", addMentor);
router.get("/getAllStudents", getAllStudents);
router.get("/getNotAssignedStudents/:id", getNotAssignedStudents);
router.get("/getStudentsAssignedForMentor/:id", getStudentsAssignedForMentor);
router.get("/getNumberOfStudentsAssignedToMentor/:id", getNumberOfStudentsAssignedToMentor);
router.put("/updateMentorForStudents", updateMentorForStudents);
router.put("/removeMentorForStudents", removeMentorForStudents);
router.post("/updateMentorMarksOfStudent", updateMentorMarksOfStudent);

module.exports = router;