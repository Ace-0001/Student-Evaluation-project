import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Students(props) {
  const [Totalstudents, setTotalstudents] = React.useState([ ]);
  const [students, setStudents] = React.useState([ ]);
  const [stud, setStud] = React.useState([]);
  const [total, setTotal] = React.useState();
  const navigate = useNavigate();

  const mentor = props.mentor;
  const updateStudents = async () => {
    axios({
      url: `http://localhost:4000/api/v1/getNotAssignedStudents/${mentor}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.response);
        setStudents(res.data.response.stud);
        setTotalstudents(res.data.response.stud);
        setTotal(res.data.response.assgnd.StudentsAssigned);
      })
      .catch((err) => {});
  };
  const [lt, setLt] = React.useState(0);
  const removeStudent = (index, e) => {
    const r = (lt-1);
    setLt(r);
    setStudents([...students, stud[index]]);
    const rem = [...stud];
    rem.splice(index, 1);
    setStud(rem);
  };

  const addStudent = (index, e) => {
    const r = (lt+1);
    setLt(r);
    setStud([...stud, students[index]]);
    console.log(index);
    const rem = [...students];
    rem.splice(index, 1);
    setStudents(rem);
  };
  const handlesubmit = async () => {
    axios({
      url: "http://localhost:4000/api/v1/updateMentorForStudents",
      method: "PUT",
      params: {
        "Mentor": mentor,
        "StudentsList": stud,
      }
    })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    updateStudents();
  }, []);
  return (
    <>
      <h1>SCALAR</h1>
      <h5 style={{ color: "red" }}>
        You Can Select Maximum {4-total} Students*
      </h5>
      <table class="table" style={{ width: "90%", marginLeft: "5%" }}>
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Student ID</th>
            <th scope="col">E-Mail</th>
            <button
                style={{
                  background: "red",
                  height:"2.5rem",
                  color: "white",
                  cursor: "pointer",
                  borderRadius:"10px"
                }}
                onClick={(e)=>navigate("/dashboard")}
              >
                Dashboard
              </button>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{student.Name}</td>
              <td>{student.StudentID}</td>
              <td>{student.EmailId}</td>
              {(lt<(4-total)) && (<button
                style={{
                  background: "green",
                  marginTop:"0.7rem",
                  color: "white",
                  cursor: "pointer",
                  borderRadius:"10px"
                }}
                onClick={(event) => { addStudent(index, event) }}
                name={student.StudentID}
              >
                ADD
              </button>)}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Selected Students</h3>
      <table class="table table-striped table-dark" style={{ width: "90%", marginLeft: "5%" }}>
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Student ID</th>
            <th scope="col">E-Mail</th>
          </tr>
        </thead>
        <tbody>
          {stud.map((student, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{student.Name}</td>
              <td>{student.StudentID}</td>
              <td>{student.EmailId}</td>
              <button
                style={{
                  background: "red",
                  marginTop:"0.7rem",
                  color: "white",
                  cursor: "pointer",
                  borderRadius:"10px"
                }}
                onClick={(event) => { removeStudent(index, event) }}
                name={student.StudentID}
              >
                Remove
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      {(lt<=(4-total)) && (lt>=(3-total)) && (lt>0) && (<button style={{
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                  borderRadius:"7px"
                }}
                onClick={handlesubmit}> SUBMIT </button>)}
    </>
  );
}

export default Students;
