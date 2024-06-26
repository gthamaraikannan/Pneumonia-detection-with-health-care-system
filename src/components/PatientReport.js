import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const PatientReport = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  const generatePDF = () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Patient Report</Text>
            <Text style={styles.content}>Name: {patientDetails.name}</Text>
            <Text style={styles.content}>Age: {patientDetails.age}</Text>
            <Text style={styles.content}>Gender: {patientDetails.gender}</Text>
            {/* Add more details as needed */}
          </View>
        </Page>
      </Document>
    );

    return doc;
  };

  return (
    <div>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={patientDetails.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" name="age" value={patientDetails.age} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={patientDetails.gender} onChange={handleInputChange} />
        </div>
        {/* Add more input fields for other details */}
      </form>
      <div>
        <PDFDownloadLink document={generatePDF()} fileName="patient_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF Report'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PatientReport;
