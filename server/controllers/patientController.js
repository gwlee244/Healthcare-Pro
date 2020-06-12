const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
  findAllPatients: function(req, res) {
    if (req.params.docId) {
      db.Doctor
        .find({ _id: req.params.docId })
        .populate({ path: "patients", options: { sort: { 'lastName': 1 } } })
        .then(doctor => {
          res.json({ patients: doctor[0].patients });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ patients: null });
    }
  },
  createPatientWithDoc: function(req, res) {
    db.Patient
      .create(req.body)
      .then(dbPatient => {
        return db.Doctor.findOneAndUpdate({ _id: req.params.docId }, { $push: { patients: dbPatient._id } }, { new: true });
      })
      .then((dbDoctor) => {
        // If the Doctor was updated successfully, send it back to the client
        res.json(dbDoctor);
      })
      .catch(err => res.status(422).json(err));
  },
  createPatient: function(req, res) {
    db.Patient
      .create(req.body)
      .then(dbPatient => {
        res.json(dbPatient);
      })
      .catch(err => res.status(422).json(err));
  },
  updatePatient: function(req, res) {
    db.Patient
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbPatient => {
        res.json(dbPatient);
      })
      .catch(err => res.status(422).json(err));
  },
  updatePatientDoc: function(req, res) {
    db.Doctor
        .findOneAndUpdate({ _id: req.params.docId }, { $push: { patients: req.params.id } }, { new: true })
        .then((dbDoctor) => {
            // If the Doctor was updated successfully, send it back to the client
            res.json(dbDoctor);
        })
        .catch(err => res.status(422).json(err));
  },
  removePatientFromDoc: function(req, res) {
    db.Doctor
        .findOneAndUpdate({ _id: req.params.docId }, { $pull: { patients: new ObjectId(req.params.id) } }, { new: true })
        .then((dbDoctor) => {
            // If the Doctor was updated successfully, send it back to the client
            res.json(dbDoctor);
        })
        .catch(err => res.status(422).json(err));
  },
  removePatient: function(req, res) {
    db.Doctor.findOneAndUpdate({ _id: req.params.docId }, { $pull: { patients: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Patient
          .findOneAndDelete({ _id: req.params.id })
          .then(dbPatient => res.json(dbPatient))
          .catch(err => res.status(422).json(err));
      });
  }
};
