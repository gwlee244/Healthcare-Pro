import axios from "axios";

export default {
  // Gets all Doctors
  getDocs: function() {
    return axios.get("/api/doctors");
  },
  // Gets the Doctor with the given id
  getDoc: function(id) {
    return axios.get("/api/doctors/" + id);
  },
  // Deletes the Doctor with the given id
  deleteDoc: function(id) {
    return axios.delete("/api/doctors/" + id);
  },
  // Updates the Doctor with the given id
  updateDoc: function(id, docData) {
    return axios.put("/api/doctors/" + id, docData);
  },
  // Saves a Doctor to the database
  saveDoc: function(docData) {
    return axios.post("/api/doctors", docData);
  },
  // Saves a Patient to database
  createPatient: function(patientData) {
    return axios.post("/api/patients/", patientData);
  },
  // Gets all patients for a specific doctor
  getPatients: function(docId) {
    return axios.get("/api/patients/" + docId);
  },
  // Saves a Patient to database and adds to doctor id
  createPatientWithDoc: function(docId, patientData) {
    return axios.post("/api/patients/" + docId, patientData);
  },
  // updates a patient
  updatePatient: function(id, patientData) {
    return axios.put("api/patients/" + id, patientData)
  },
  // Deletes the Patient with the given id and removes from specific doctor
  deletePatient: function(docId, id) {
    return axios.delete("/api/patients/" + docId + "/" + id);
  },
  // removes a patient from specific doctor
  removePatientFromDoc: function(id, docId) {
    return axios.put("/api/patients/" + docId + "/" + id)
  },
  // adds patient to doctor's list of patients
  updatePatientDoc: function(id, docId) {
    return axios.put("/api/patients/updatedoc/" + docId + "/" + id)
  },
  getScrips: function(patId) {
    return axios.get("/api/prescriptions/" + patId)
  },
  createsScrip: function(patId, scripData) {
    return axios.post("/api/prescriptions/" + patId, scripData)
  },
  updateScrip: function(id, scripData) {
    return axios.put("/api/prescriptions/" + id, scripData)
  },
  deleteScrip: function(patId, id) {
    return axios.delete("/api/prescriptions/" + patId + "/" + id)
  },
  getDocApps: function(docId) {
    return axios.get("/api/appointments/doctor/" + docId)
  },
  getPatApps: function(patId) {
    return axios.get("/api/appointments/patient/" + patId)
  },
  updateApp: function(id, appData) {
    return axios.put("/api/appointments/" + id, appData)
  },
  deleteApp: function(patId, docId, id) {
    return axios.delete("/api/appointments/" + patId + "/" + docId + "/"+ id)
  },
  createApp: function(patId, docId, id, appData) {
    return axios.post("/api/appointments/" + patId + "/" + docId + "/"+ id, appData)
  }
};
