const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

module.exports = {
    createDoc: function(req, res) {
        db.Doctor
            .create(req.body)
            .then((dbDoctor) => {
                // If the Doctor was updated successfully, send it back to the client
                res.json(dbDoctor);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    updateDoc: function(req, res) {
        db.Doctor
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbDoctor => {
                res.json(dbDoctor);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    removeDoc: function(req, res) {
        db.Doctor
            .findOneAndDelete({_id: req.params.id })
            .then(dbDoctor => {
                res.json(dbDoctor);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    findAllDocs: function(req, res) {
        db.Doctor
            .find({})
            .then(doctors => {
                res.json(doctors);
            })
            .catch(err => {
                res.status(422).json(err);
            })
    },
    findDocById: function(req, res) {
        db.Doctor
            .find({_id: req.params.id})
            .then(dbDoctor => {
                res.json(dbDoctor);
            })
            .catch( err => {
                res.status(422).json(err);
            })
    }
}