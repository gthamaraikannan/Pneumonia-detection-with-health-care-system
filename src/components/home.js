import React from 'react'
import logo1 from '../images/logo1.jpg'
import logo2 from '../images/Pulmonary-Doctor-Near-Me.jpeg'
import logo3 from '../images/logo3.jpeg'
import logo4 from '../images/images.png'
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Home() {
  
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position.coords);
        console.log(position.coords)
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={logo1} height='550px' alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={logo2} height='550px' alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={logo3} height='550px' alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev " href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      {/* <div className=' kgf pt-2'>
        <h3 className='text-center'>* Latest News *</h3>
        <ul>
          <marquee className="text-danger "><h4><li>Courses are available </li></h4></marquee>
        </ul>
      </div> */}

      <div className='child mt-5'>
        <h2 className='text-sucess text-center pb-3 pt-2'>Pneumonia Detection</h2>

        <div className='row pb-3'>

          <div className='col'>
            <h4 className='col text-center  ps-5 pe-5 mt-2'>
              Steps to be Followed:
            </h4>
            <ol>
              <li>Navigate to Pneumonia Detection and Click on the "Upload" button.Action: User interacts with the interface by clicking on the "Upload" button.</li>
              <li>Select the X-ray image from your file.</li>
<li>Action: User navigates to their file system and selects the X-ray image they wish to upload.</li>
<li>Submit the image.</li>
Action: User confirms their selection and submits the chosen X-ray image for analysis.
<li>The website will analyze your result.</li>
Action: The website processes the uploaded X-ray image to generate an analysis result.
<li>Fill the general medical details that are asked for.
Action: User provides additional medical information as requested by the website.</li>
<li>You can get drug recommendations according to your results.
Action: Based on the analysis result and provided medical details, the website suggests drug recommendations.</li>
              
            </ol>
          </div>
          <div className='col'>
            <img
              className='imgk d-block mx-auto'
              src={logo4}
              height="250px"
              alt="medicine"
            />
          </div>

        </div>
      </div>
            <LoadScript
              googleMapsApiKey="AIzaSyAnMC4am-IBqk0pFIkmD4ICfhrdvzDPRro"
            >
              <GoogleMap
                mapContainerStyle={{
                  height: "400px",
                  width: "100%"
                }}
                center={{
                  lat: position?.latitude,
                  lng: position?.longitude
                }}
                zoom={15}
              >
                <Marker position={{
                  lat: position?.latitude,
                  lng: position?.longitude
                }} />
              </GoogleMap>
            </LoadScript>
            
    </div>
  )
}

export default Home