const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
    findAllDocApps: function(req, res) {
        if (req.params.docId) {
          db.Doctor
            .find({ _id: req.params.docId })
            .populate({ path: "appointments", options: { sort: { 'date': 1 } } })
            .then(doctor => {
              res.json({ appointments: doctor[0].appointments });
            })
            .catch(err => res.status(422).json(err));
        } else {
          return res.json({ appointments: null });
        }
      },
      findAllPatApps: function(req, res) {
        if (req.params.patId) {
          db.Patient
            .find({ _id: req.params.patId })
            .populate({ path: "appointments", options: { sort: { 'date': 1 } } })
            .then(patient => {
              res.json({ appointments: patient[0].appointments });
            })
            .catch(err => res.status(422).json(err));
        } else {
          return res.json({ appointments: null });
        }
      },
      createApp: function(req, res) {
        db.Appointment
          .create(req.body)
          .then(dbApp => {
            db.Patient.findOneAndUpdate({ _id: req.params.patId }, { $push: { appointments: dbApp._id } }, { new: true });
            db.Doctor.findOneAndUpdate({ _id: req.params.docId }, { $push: { appointments: dbApp._id } }, { new: true });
            res.json(dbApp);
          })
          .catch(err => res.status(422).json(err));
      },
      updateApp: function(req, res) {
        db.Appointment
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbApp => {
            console.log(dbApp);
            res.json(dbApp);
          })
          .catch(err => res.status(422).json(err));
      },
      removeApp: function(req, res) {
        db.Patient.findOneAndUpdate({ _id: req.params.patId }, { $pull: { appointments: new ObjectId(req.params.id) } }, { new: true });
        db.Doctor.findOneAndUpdate({ _id: req.params.docId }, { $pull: { appointments: new ObjectId(req.params.id) } }, { new: true })
          .then(() => {
            db.Prescription
              .findOneAndDelete({ _id: req.params.id })
              .then(dbScrip => res.json(dbScrip))
              .catch(err => res.status(422).json(err));
          });
      }
}