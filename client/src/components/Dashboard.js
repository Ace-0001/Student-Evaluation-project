import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
    const [students, setStudents] = React.useState([ ]);
    const mentor = props.mentor;
    const navigate = useNavigate();
    const updateStudents = async () => {
        axios({
          url: `http://localhost:4000/api/v1/getStudentsAssignedForMentor/${mentor}`,
          method: "GET",
        })
          .then((res) => {
            console.log(res.data.students);
            setStudents(res.data.students);
          })
          .catch((err) => {});
      };
      const submitmarks = async (index, e, isLocked) => {
        axios({
          url: "http://localhost:4000/api/v1/updateMentorMarksOfStudent",
          method: "POST",
          data:{
            Studentid : students[index].StudentID,
            StudentsMarks: students[index].Marks,
            isLocked: isLocked
          }
        })
          .then((res) => {
            console.log(res.data.students);
            updateStudents();
          })
          .catch((err) => {});
      };
      const removestudent = async (index, e) => {
        axios({
          url: "http://localhost:4000/api/v1/removeMentorForStudents",
          method: "PUT",
          data:{
            Mentor : mentor,
            StudentsList: students[index].StudentID
          }
        })
          .then((res) => {
            // console.log(res.data.students);
            updateStudents();
          })
          .catch((err) => {});
      };
      const updateField = (index, e) => {
        const updatedFields = [...students];
        updatedFields[index].Marks[0][e.target.name] = e.target.value;
        setStudents(updatedFields);
        // console.log(students[index]);
      };
    React.useEffect(() => {
        updateStudents();
      }, []);
  return (
    <>
    <h1 onClick={(e)=>navigate("/")} style={{cursor:"pointer"}}>SCALAR</h1>
    <h4>Dashboard</h4>
    <table class="table" style={{ width: "90%", marginLeft: "5%" }}>
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Student Id</th>
            <th scope="col">Email</th>
            <th scope="col">Ideation</th>
            <th scope="col">Execution</th>
            <th scope="col">Viva</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div style={{display:"flex", flexDirection:"column", gap:"1rem", width:"90%", marginLeft:"5%"}}>
        {students.map((student, index) => (
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center", backgroundColor:"black", color:"white"}}>
            <div>{student.Name}</div>
            <div>{student.StudentID}</div>
            <div>{student.EmailId}</div>
            {(student.isLocked===true) && (<div>{student.Marks[0].Ideation}</div>)}
            {(student.isLocked===false) && (<input type='number' name="Ideation" value={student.Marks[0].Ideation} style={{width:'3rem', marginTop:"0.3rem", marginBottom:"0.3rem"}} onChange={(e)=>updateField(index, e)}/>)}
            {(student.isLocked===true) && (<div>{student.Marks[0].Execution}</div>)}
            {(student.isLocked===false) && (<input type='number' name="Execution" value={student.Marks[0].Execution} style={{width:'3rem', marginTop:"0.3rem", marginBottom:"0.3rem"}} onChange={(e)=>updateField(index, e)}/>)}
            {(student.isLocked===true) && (<div>{student.Marks[0].Viva}</div>)}
            {(student.isLocked===false) && (<input type='number' name="Viva" value={student.Marks[0].Viva} style={{width:'3rem', marginTop:"0.3rem", marginBottom:"0.3rem"}} onChange={(e)=>updateField(index, e)}/>)}
            {(student.isLocked===true) && (<div>{student.TotalMarks}</div>)}
            {(student.isLocked===false) && (<div><button style={{backgroundColor:"blue", color:"white", borderRadius:"5px", fontWeight:"500", cursor:"pointer", marginRight:"0.5rem"}} onClick={(e)=>{submitmarks(index, e, false)}}>Save</button><button style={{backgroundColor:"green", color:"white", borderRadius:"5px", fontWeight:"500", cursor:"pointer", marginRight:"0.5rem"}} onClick={(e)=>{submitmarks(index, e, true)}}>Submit</button><button style={{backgroundColor:"red", color:"white", borderRadius:"5px", fontWeight:"500", cursor:"pointer"}} onClick={(e)=>{removestudent(index, e)}}>X</button></div>)}
        </div>
          ))}
    </div>
    </>
  )
}

export default Dashboard