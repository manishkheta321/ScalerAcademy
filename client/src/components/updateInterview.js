import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap';

class UpdateInterview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InterviewID: this.props.interview.id || "",
            Interviewer: this.props.interview.Interviewer || "",
            Interviewee: this.props.interview.Interviewee || "",
            startDate: this.props.interview.startDate || "",
            endDate: this.props.interview.endDate || "",
            startTime: this.props.interview.startTime || "",
            endTime: this.props.interview.endTime || "",
            err: ""
        };
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Set Date in our required format
    setDate(e) {
        var date = new Date(e);
        var x = date.getFullYear();
        if (parseInt(date.getMonth() + 1) <= 9) {
            x = x + '-0' + parseInt(date.getMonth() + 1);
        }
        else {
            x = x + '-' + parseInt(date.getMonth() + 1);
        }
        if (date.getDate() <= 9) {
            x = x + '-0' + date.getDate();
        }
        else {
            x = x + '-' + date.getDate();
        }
        return x;
    }
    
    // Set Start and End date in  required format 
    componentDidMount() {
        var x = this.setDate(this.state.startDate)
        this.setState({ startDate: x });
        x = this.setDate(this.state.endDate)
        this.setState({ endDate: x });
    }
    
    // Update state variables when we fill the form
    handleChange(changeObject) {
        this.setState(changeObject, () => { console.log(this.state) });
    }

    // Update Interview on the basis of ID
    update = () => {
        // add entity - PUT
        fetch(`/interviews/${this.state.InterviewID}`, {
            "method": "PUT",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                InterviewID: this.state.InterviewID,
                Interviewer: this.state.Interviewer,
                Interviewee: this.state.Interviewee,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message) {
                    this.handleChange({ err: response.message });
                    this.handleChange({ message: null });
                }
                else {
                    this.handleChange({ err: null });
                    this.props.unsetUpdate();
                    this.handleChange({ message: "Interview Succesfully Updated" });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <Container>
                <div style={{ textAlign: "center", fontSize: 30 }}>Update Interview</div>
                <Form>
                    <FormGroup row>
                        <Label sm={2}>Interview ID</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="InterviewID"
                                id="InterviewID"
                                placeholder="Interview ID"
                                value={this.state.InterviewID}
                                onChange={(event) => this.handleChange({ InterviewID: event.target.value })}
                                required
                                disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Interviewer </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="Interviewer"
                                id="Interviewer"
                                placeholder="Interviewer"
                                value={this.state.Interviewer}
                                onChange={(event) => this.handleChange({ Interviewer: event.target.value })}
                                required
                                disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Interviewee </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="Interviewee"
                                id="Interviewee"
                                placeholder="Interviewee"
                                value={this.state.Interviewee}
                                onChange={(event) => this.handleChange({ Interviewee: event.target.value })}
                                required
                                disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Start Date</Label>
                        <Col sm={10}>
                            <Input
                                type="date"
                                name="startDate"
                                id="startDate"
                                placeholder="Start Date"
                                value={this.state.startDate}
                                onChange={(event) => this.handleChange({ startDate: event.target.value })}
                                required
                            />

                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Start Time</Label>
                        <Col sm={10}>
                            <Input
                                type="time"
                                name="startTime"
                                id="startTime"
                                placeholder="Start Time"
                                value={this.state.startTime}
                                onChange={(e) => this.handleChange({ startTime: e.target.value })}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>End Date</Label>
                        <Col sm={10}>
                            <Input
                                type="date"
                                name="endDate"
                                id="endDate"
                                placeholder="End Date"
                                dateFormat="DD/MM/YYYY"
                                value={this.state.endDate}
                                onChange={(e) => this.handleChange({ endDate: e.target.value })}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>End Time</Label>
                        <Col sm={10}>
                            <Input
                                type="time"
                                name="endTime"
                                id="endTime"
                                placeholder="End Time"
                                value={this.state.endTime}
                                onChange={(e) => this.handleChange({ endTime: e.target.value })}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Submit</Label>
                        <Col sm={10}>
                            <Button onClick={this.update}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div style={{ textAlign: "center", color: "red" }}>{this.state.err}</div>
            </Container>

        )
    }
}
export default UpdateInterview;