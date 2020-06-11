const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
    findAllScrips: function(req, res) {
        if (req.params.patId) {
          db.Patient
            .find({ _id: req.params.patId })
            .populate({ path: "prescriptions", options: { sort: { 'startDate': 1 } } })
            .then(patient => {
              res.json({ prescriptions: patient[0].prescriptions });
            })
            .catch(err => res.status(422).json(err));
        } else {
          return res.json({ prescriptions: null });
        }
      },
      createScrip: function(req, res) {
        db.Prescription
          .create(req.body)
          .then(dbScrip => {
            return db.Patient.findOneAndUpdate({ _id: req.params.patId }, { $push: { prescriptions: dbScrip._id } }, { new: true });
          })
          .then((dbPat) => {
            // If the Patient was updated successfully, send it back to the client
            res.json(dbPat);
          })
          .catch(err => res.status(422).json(err));
      },
      updateScrip: function(req, res) {
        db.Prescription
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbScrip => {
            res.json(dbScrip);
          })
          .catch(err => res.status(422).json(err));
      },
      removeScrip: function(req, res) {
        db.Patient.findOneAndUpdate({ _id: req.params.patId }, { $pull: { prescriptions: new ObjectId(req.params.id) } }, { new: true })
          .then(() => {
            db.Prescription
              .findOneAndDelete({ _id: req.params.id })
              .then(dbScrip => res.json(dbScrip))
              .catch(err => res.status(422).json(err));
          });
      }
}