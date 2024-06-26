import React, { useEffect } from 'react'
import './form.css'

function Form() {

    useEffect(()=>{

        const link="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"
        const script = document.createElement("script")
        script.src=link
        document.body.appendChild(script)

        const js = `$(document).ready(function () {
            // Init
            $('.image-section').hide();
            $('.loader').hide();
            $('#result').hide();
      
            // Upload Preview
            function readURL(input) {
              if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                  $('#imagePreview').hide();
                  $('#imagePreview').fadeIn(650);
                }
                reader.readAsDataURL(input.files[0]);
              }
            }
            $("#imageUpload").change(function () {
              $('.image-section').show();
              $('#btn-predict').show();
              $('#result').text('');
              $('#result').hide();
              readURL(this);
            });
      
            // Predict
            $('#btn-predict').click(function () {
              var form_data = new FormData($('#upload-file')[0]);
      
              // Show loading animation
              $(this).hide();
              $('.loader').show();
      
              // Make prediction by calling api /predict
              $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5000/predict',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                async: true,
                // dataType: 'json',
                success: function (data) {
                  // Get and display the result
                  $('.loader').hide();
                  $('#result').fadeIn(600);
                  $('#result').text(' Result:  ' + data);
                  console.log('Success!');
                },
                error: function (xhr, status, error) {
                  console.log('Error:', error);
                }
              });
            });
      
          });`
          
          const script1 = document.createElement("script")
          script1.textContent = js

          document.body.appendChild(script1)
    },[])

    return (
        <React.Fragment>
            <br/>
            <div className="header-container">
              <h1 className="mt-4 healthcare-title">Pneumonia Detection</h1>
            </div>

            <div className="form-card" style={{ width: "25rem" }}>
            
                <h5 className="form-card-title pt-4">Drop Your Chest X-Ray Here</h5>
                <div className="form-card-body">
                    <div id="content">
                        <form id="upload-file" method="post" encType="multipart/form-data">
                            <label htmlFor="imageUpload" className="upload-label">
                                Select Image
                            </label>
                            <input type="file" name="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
                        </form>

                        <div className="image-section" style={{ display: "none" }}>
                            <div className="img-preview">
                                <div id="imagePreview">
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary btn-lg " id="btn-predict">Predict!</button>
                            </div>
                        </div>

                        <div className="loader" style={{ display: "none" }}></div>

                        <h3 id="result">
                            <span> </span>
                        </h3>
                    </div>
                </div>
                <br />
            </div>
            <br />
        </React.Fragment>
    )
}

export default Form