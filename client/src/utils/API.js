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
  updateDoc: function(id) {
    return axios.put("/api/doctors/" + id);
  },
  // Saves a Doctor to the database
  saveDoc: function(docData) {
    return axios.post("/api/doctors", docData);
  }
};
