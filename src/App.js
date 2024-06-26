import logo from './images/VJ Schools.jpg';
import './App.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/home';
// import Users from './components/users';
// import Contact from './components/contact';
// import Usersign from './components/usersign';
import PatientReport from './components/PatientReport';
import Drug from './components/Drug';
import Info from "./components/info"
import { AiFillBank } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';


function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='row back pt-2 pb-2 '>
        <div className='col col-lg-2 col-md-2 col-sm-3 col-4 d-flex justify-content-center align-items-center'>
          <img className='icon ms-0 pe-0 ' src={logo} alt="logo" />
        </div>
        <div className='col col-lg-10 col-md-10 col-sm-9 col-8 text-light mt-3'>
          <h2>Pneumonia Detection with Health Care System</h2>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light navcol">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
            <ul className='navbar-nav h3 p-2 '>
              <li className='nav-item me-4'>
                <Link className="nav-link active textcolor ho" to="/" ><AiFillBank className='mb-2' /> Home</Link>
              </li>
              <li className='nav-item me-4'>
                <Link className="nav-link active textcolor ho" to="/info"><BiLogInCircle className='mb-2' /> Pneumonia Detection</Link>
              </li>
              <li className='nav-item me-4'>
                <Link className="nav-link active textcolor ho" to="/Drug"><BiLogInCircle className='mb-2' /> Healthcare</Link>
              </li>
              {/* <li className='nav-item me-4'>
                <Link className="nav-link active textcolor ho" to="/PatientReport"><BiLogInCircle className='mb-2' /> Patient Report</Link>
              </li> */}
              {
                localStorage.getItem("token") &&
                <li className='nav-item me-4'>
                  <button onClick={() => {
                    localStorage.clear()
                    navigate("/")
                  }} className="btn btn-primary nav-link active text-white ho" to="/course">Log out</button>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/Drug" element={<Drug />} />
        <Route path="/PatientReport" element={<PatientReport />} />
        {/* <Route path="/Contact" element={<Contact />} /> */}
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
