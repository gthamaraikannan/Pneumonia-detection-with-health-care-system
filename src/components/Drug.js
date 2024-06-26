import React, { useState } from 'react';
import axios from 'axios';
import './drug.css';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

const Drug = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [description, setDescription] = useState('');
    const [precautions, setPrecautions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [diets, setDiets] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        sugarLevel: '',
        bpLevel: '',
        // Add more patient details fields as needed
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Convert symptoms array to a comma-separated string
            const symptomsString = symptoms.join(',');
            console.log(symptoms);
            // Send POST request to backend with symptoms as a string
            const response = await axios.post('http://localhost:3001/predict', { symptoms: symptomsString });

            // Process response data
            const { predicted_disease, dis_des, precautions, medications, rec_diet, workout } = response.data;
            setPrediction(predicted_disease);
            setDescription(dis_des);
            setPrecautions(precautions);
            setMedications(medications);
            setDiets(rec_diet);
            setWorkouts(workout);
        } catch (error) {
            console.error('Error in setting symptoms:', error);
        }
    };

    const generatePDFReport = () => (
        <Document>
            <Page style={pdfStyles.page}>
                <Text style={pdfStyles.title}>Patient Details:</Text>
                <Text style={pdfStyles.text}>Name: {patientDetails.name}</Text>
                <Text style={pdfStyles.text}>Age: {patientDetails.age}</Text>
                <Text style={pdfStyles.text}>Gender: {patientDetails.gender}</Text>
                <Text style={pdfStyles.text}>Blood Group: {patientDetails.bloodGroup}</Text>
                <Text style={pdfStyles.text}>Sugar Level: {patientDetails.sugarLevel}</Text>
                <Text style={pdfStyles.text}>BP Level: {patientDetails.bpLevel}</Text>
                {/* Add more patient details as needed */}
    
                <Text style={pdfStyles.title}>Predicted Disease: {prediction}</Text>
                <Text style={pdfStyles.title}>Description: {description}</Text>
                <Text style={pdfStyles.title}>Precautions:</Text>
                {precautions.map((precaution, index) => (
                    <Text key={index} style={pdfStyles.text}>{precaution}</Text>
                ))}
                <Text style={pdfStyles.title}>Medications:</Text>
                {medications.map((medication, index) => (
                    <Text key={index} style={pdfStyles.text}>{medication}</Text>
                ))}
                <Text style={pdfStyles.title}>Recommended Diet:</Text>
                {diets.map((diet, index) => (
                    <Text key={index} style={pdfStyles.text}>{diet}</Text>
                ))}
                <Text style={pdfStyles.title}>Workouts:</Text>
                {workouts.map((workout, index) => (
                    <Text key={index} style={pdfStyles.text}>{workout}</Text>
                ))}
            </Page>
        </Document>
    );
    
    return (
        <>
            <h1 className="mt-4 healthcare-title">Health Care Center</h1>

    <div className="container-with-bg-image" style={{backgroundImage: 'url("src/images/pnemonia.jpg")'}}>

        <div className='container'>
            <div className="patient-details-container">
             
                <div className="patient-details-container">
    <h3>Enter Patient Details:</h3>
    <br />
    <div className="patient-details">
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            id="name"
            value={patientDetails.name}
            onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
        />
    </div>
    <div className="patient-details">
        <label htmlFor="age">Age:</label>
        <input
            type="text"
            id="age"
            value={patientDetails.age}
            onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
        />
    </div>
    <div className="patient-details">
        <label htmlFor="gender">Gender:</label>
        <input
            type="text"
            id="gender"
            value={patientDetails.gender}
            onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
        />
    </div>
    <div className="patient-details">
        <label htmlFor="blood-group">Blood Group:</label>
        <input
            type="text"
            id="blood-group"
            value={patientDetails.bloodGroup}
            onChange={(e) => setPatientDetails({ ...patientDetails, bloodGroup: e.target.value })}
        />
    </div>
    <div className="patient-details">
        <label htmlFor="sugar-level">Sugar Level:</label>
        <input
            type="text"
            id="sugar-level"
            value={patientDetails.sugarLevel}
            onChange={(e) => setPatientDetails({ ...patientDetails, sugarLevel: e.target.value })}
        />
    </div>
    <div className="patient-details">
        <label htmlFor="bp-level">BP Level:</label>
        <input
            type="text"
            id="bp-level"
            value={patientDetails.bpLevel}
            onChange={(e) => setPatientDetails({ ...patientDetails, bpLevel: e.target.value })}
        />
    </div>
</div>

            </div>

            

        </div>
                    <div className="container my-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="symptoms">Select Symptoms:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="symptoms"
                                name="symptoms"
                                placeholder="Type symptoms separated by commas (e.g., itching, sleeping, aching)"
                                value={symptoms}
                                onChange={(e) => {
                                    // Split input value into an array of symptoms
                                    const inputSymptoms = e.target.value.split(',');
                                    // Remove any leading or trailing whitespace from each symptom
                                    const trimmedSymptoms = inputSymptoms.map(symptom => symptom.trim());
                                    // Update the state with the new array of symptoms
                                    setSymptoms(trimmedSymptoms);
                                }}
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger btn-lg">Predict</button>
                    </form>
                </div>
                <div className="pdf-download-link-container">
                {prediction && (
                    <PDFDownloadLink document={generatePDFReport()} fileName="patient_report.pdf">
                        {({ loading }) => (
                            <button className="pdf-download-button" disabled={loading}>
                                {loading ? 'Generating PDF...' : 'Download PDF Report'}
                            </button>
                        )}
                    </PDFDownloadLink>
                )}
            </div>
            
                {/* Results */}
                {prediction && (
                    <div className="container">
                        <div className="result-container">
                            <div className="result-card">
                                <h2>Predicted Disease: {prediction}</h2>
                                <h3>Description: {description}</h3>
                            </div>
                            <div className="result-card">
                                <h3>Precautions:</h3>
                                <ul>
                                    {precautions.map((precaution, index) => (
                                        <li key={index}>{precaution}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="result-card">
                                <h3>Medications:</h3>
                                <ul>
                                    {medications.map((medication, index) => (
                                        <li key={index}>{medication}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="result-card">
                                <h3>Recommended Diet:</h3>
                                <ul>
                                    {diets.map((diet, index) => (
                                        <li key={index}>{diet}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="result-card">
                                <h3>Workouts:</h3>
                                <ul>
                                    {workouts.map((workout, index) => (
                                        <li key={index}>{workout}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Drug;
