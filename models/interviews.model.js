const sql = require("./db.js");

// constructor
const Interview = function (interview) {
    this.Interviewer = interview.Interviewer;
    this.Interviewee = interview.Interviewee;
    this.startDate = interview.startDate;
    this.endDate = interview.endDate;
    this.startTime = interview.startTime;
    this.endTime = interview.endTime;
};

// Check for all values filled and Time enterred are valid
check = (newInterview, res) => {
    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = newInterview;
    var x = startDate + ' ' + startTime;
    var y = endDate + ' ' + endTime;
    // Check if all values are present
    if (!(Interviewer && Interviewee && startDate && startTime && endDate && endTime)) {
        return { message: "Enter all values" };
    }
    var start = new Date(x);
    var end = new Date(y);
    // Convert time in MiliSeconds and check if Start Time is less than End Time
    if (start.getTime() > end.getTime()) {
        return { message: "Start time is greater than end time" };
    }
    // return if no issues found
    return { message: "" };
}

// To Check if There is an overlap in Interviews
checkIfOverlaping = (q, newInterview, result) => {
    // Set Time according to Current Time Zone
    var d1 = new Date(newInterview.startDate);
    var d2 = new Date(newInterview.endDate);
    var x1 = d1.toDateString().substring(0, 10) + ' ' + newInterview.startTime;
    var y1 = d2.toDateString().substring(0, 10) + ' ' + newInterview.endTime;
    var newStart = new Date(x1);
    var newEnd = new Date(y1);
    console.log(newStart, newEnd);
    sql.query(q, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //Check if No results found
        if (res.length == 0) {
            result(null, null);
            return;
        }
        //Iterate over all interviews 
        for (var i = 0; i < res.length; i++) {
            var interview = res[i];
            var x = interview.startDate.toDateString().substring(0, 10) + ' ' + interview.startTime;
            var y = interview.endDate.toDateString().substring(0, 10) + ' ' + interview.endTime;
            var start = new Date(x);
            var end = new Date(y);
            // Check overlapping interviews
            if ((start.getTime() <= newStart.getTime() && end.getTime() >= newStart.getTime()) || (start.getTime() >= newStart.getTime() && start.getTime() <= newEnd.getTime())) {
                console.log("error: ", "Busy");
                result({ message: "Busy" }, null);
                break;
            }
            // Return if No overlaping found
            if (i + 1 == res.length) {
                result(null, null);
                break;
            }
        }
    });
}

// Check function to find if overlap exist for create
checkIfCreatePossible = (newInterview, result) => {
    // Check for Interviewer overlap
    checkIfOverlaping('SELECT * FROM interviews where Interviewer = "' + newInterview.Interviewer + '"', newInterview, (err, res) => {
        console.log("Check 1");
        if (err) {
            console.log("error: Interviewer Busy", err);
            result({ message: "Interviewer Busy" }, null);
            return;
        }
        // Check for Interviewee overlap
        checkIfOverlaping('SELECT * FROM interviews where Interviewee = "' + newInterview.Interviewee + '"', newInterview, (error, resu) => {
            console.log("Check 2");
            if (error) {
                console.log("error: Interviewee Busy", err);
                result({ message: "Interviewee Busy" }, null);
                return;
            }
            else {
                result(null, null);
                return;
            }
        });
    });
};

// Check function to find if overlap exist for create
checkIfUpdatePossible = (req, result) => {
    // Check for Interviewer overlap
    var interview = req.interview;
    checkIfOverlaping('SELECT * FROM interviews where Interviewer = "' + interview.Interviewer + '" and id NOT IN (' + req.id + ')', interview, (err, res) => {
        console.log("Check 1");
        if (err) {
            console.log("error: Interviewer Busy", err);
            result({ message: "Interviewer Busy" }, null);
            return;
        }
        // Check for Interviewee overlap
        checkIfOverlaping('SELECT * FROM interviews where Interviewee = "' + interview.Interviewee + '" and id NOT IN (' + req.id + ')', interview, (error, resu) => {
            console.log("Check 2");
            if (error) {
                console.log("error: Interviewee Busy", err);
                result({ message: "Interviewee Busy" }, null);
                return;
            }
            else {
                result(null, null);
                return;
            }
        });
    });
};

// Create method for Creating a new interview
Interview.create = (newInterview, result) => {

    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = newInterview;
    var start = new Date(startDate + ' UTC');
    var end = new Date(endDate + ' UTC');
    // Check valid entries and time
    const res = check(newInterview);
    if (res.message) {
        result(res, null);
        return;
    }
    else {
        // Check if any overlap exist
        checkIfCreatePossible(newInterview, (err, data) => {
            console.log("Back: ", err, data);
            if (err) {
                result(err, null);
            }
            else {
                // If no issues found than insert new interview
                sql.query("INSERT INTO interviews (Interviewer, Interviewee, startDate, endDate, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)", [Interviewer, Interviewee, start, end, startTime, endTime], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("Created interview: ", { id: res.insertId, ...newInterview });
                    result(null, { id: res.insertId, ...newInterview });
                });
            }
        });
    }
};

// GET all interviews
Interview.getAll = result => {
    sql.query(`SELECT * FROM interviews`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        res.map(interview => {
            var x = new Date(interview.startDate);
            interview.startDate = x.toLocaleDateString();
            var y = new Date(interview.endDate);
            interview.endDate = y.toLocaleDateString();
        });
        console.log("interviews: ", res);
        result(null, res);
    });
};

// Update interview by Interview ID
Interview.updateById = (id, interview, result) => {
    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = interview;
    var start = new Date(startDate + ' UTC');
    var end = new Date(endDate + ' UTC');
    // Check for Information Entered are valid and complete
    const res = check(interview);
    if (res.message) {
        result(res, null);
        return;
    }
    else {
        // Check if Updated interview have any conflicts
        checkIfUpdatePossible({ id, interview }, (err, data) => {
            if (err) {
                result(err, null);
                return;
            }
            else {
                sql.query(
                    "UPDATE interviews SET startDate = ?, endDate = ?, startTime = ?, endTime = ? WHERE id = ?", [start, end, startTime, endTime, id], (err, res) => {
                        // Check for errors
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        else if (res.affectedRows == 0) {
                            // not found Interview with the id
                            result({ kind: "not_found" }, null);
                            return;
                        }
                        // Return Updated Interview
                        else {
                            console.log("updated interview: ", { id: id, ...interview });
                            result(null, { id: id, ...interview });
                            return;
                        }
                    }
                );
            }
        });
    }

};

//Delete Interview on the basis of ID
Interview.remove = (id, result) => {
    // Query for Deleting interview
    sql.query("DELETE FROM interviews WHERE id = ?", id, (err, res) => {
        // Check if any error in Deleting
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // Check if Interview to be deleted does not exist
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        // Return if no conflicts found
        console.log("deleted interview with id: ", id);
        result(null, res);
    });
};

module.exports = Interview;