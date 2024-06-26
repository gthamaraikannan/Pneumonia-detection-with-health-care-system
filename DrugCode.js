import React, { useState } from 'react';
import axios from 'axios';

function Drug(){
    return (
        <>
           <h1 className="mt-4 my-4 text-center text-green">Health Care Center</h1>
           
           <div class="container my-4 mt-4" style="background: black; color: white; border-radius: 15px; padding: 40px;">
                <form action="http://localhost:3001/predict" method="post">
                    
                    <div class="form-group">
                        <label for="symptoms">Select Symptoms:</label>
                        <input type="text" class="form-control" id="symptoms" name="symptoms" placeholder="type systems such as itching, sleeping, aching etc"/>
                    </div>
                    <button type="submit" class="btn btn-lg" style="width: 100%; padding: 14px; margin-bottom: 5px;">Predict</button>
                </form>
            </div>
            
            
            
            {prediction && (
                <div className="container">
                    <div className="result-container">
                        <h2>Predicted Disease: {prediction}</h2>
                        <h3>Description: {description}</h3>
                        <h3>Precautions:</h3>
                        <ul>
                            {precautions.map((precaution, index) => (
                                <li key={index}>{precaution}</li>
                            ))}
                        </ul>
                        <h3>Medications:</h3>
                        <ul>
                            {medications.map((medication, index) => (
                                <li key={index}>{medication}</li>
                            ))}
                        </ul>
                        <h3>Recommended Diet:</h3>
                        <ul>
                            {diets.map((diet, index) => (
                                <li key={index}>{diet}</li>
                            ))}
                        </ul>
                        <h3>Workouts:</h3>
                        <ul>
                            {workouts.map((workout, index) => (
                                <li key={index}>{workout}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            
        </>
    );
};