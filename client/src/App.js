import './App.css';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {
  const mentor = "Mentor4";
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
         
            <Route exact path="/" element={<Students mentor={mentor}/>}/>
            <Route exact path="/dashboard" element={<Dashboard mentor={mentor}/>}/>
          
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
