const Interview = require("../models/interviews.model.js");


// Create and Save a new Interview
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // console.log(req);

    // Create a Interview
    const interview = new Interview({
        Interviewer: req.body.Interviewer,
        Interviewee: req.body.Interviewee,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
    // const { user1, user2, start, end } = req.body;
    

    // Save Interview in the database
    Interview.create(interview, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Interview."
            });
        else res.send(data);
    });
};

// Retrieve all Interviews from the database.
exports.findAll = (req, res) => {
    Interview.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving interviews."
            });
        else res.send(data);
    });
};

// Update a Interview identified by the interviewId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Interview.updateById(
        req.params.interviewId,
        new Interview(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: err.message || `Not found Interview with id ${req.params.interviewId}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message || "Error updating Interview with id " + req.params.interviewId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Interview with the specified interviewId in the request
exports.delete = (req, res) => {
    // console.log(req);
    Interview.remove(req.params.interviewId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Interview with id ${req.params.interviewId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Interview with id " + req.params.interviewId
                });
            }
        } else res.send({ message: `Interview was deleted successfully!` });
    });
};
