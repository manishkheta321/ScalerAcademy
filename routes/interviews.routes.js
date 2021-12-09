module.exports = app => {
    const interviews = require("../controllers/interviews.controller.js");

    // Create a new interview
    app.post("/interviews", interviews.create);

    // Retrieve all interviews
    app.get("/interviews", interviews.findAll);

    // Update a interview with interviewId
    app.put("/interviews/:interviewId", interviews.update);

    // Delete a interview with interviewId
    app.delete("/interviews/:interviewId", interviews.delete);

};