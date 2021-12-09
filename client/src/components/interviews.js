import React from 'react';
import { Button, Table } from 'reactstrap';
import UpdateInterview from './updateInterview';
class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            showUpdate: false,
            updateInterview: null
        }
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    // Get list of interviews when the page loads
    componentDidMount() {
        this.getInterviews();
    }
    
    // Remove Update Interview Component when interview is updated
    unsetUpdate = () => {
        this.setState({
            showUpdate: false,
            updateID: null
        });
        this.getInterviews();
    }
    
    // fetch list of interviews
    getInterviews = () => {
        // Get the passwords and store them in state
        fetch('/interviews', {
            "method": "GET" 
        })
            .then(res => res.json())
            .then(interviews => this.setState({ interviews }))
            .catch(err => console.log(err));
    }

    //Update interviews
    update = (e) => {
        console.log("Update: ", e);
        this.setState({
            showUpdate: true,
            updateInterview: e
        })
    }

    // Delete interview on the basis of Interview ID
    delete = (e) => {
        console.log("Delete: ", e);
        var url = '/interviews/' + e;
        console.log(url);
        fetch(url, {
            "method": "DELETE",
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.getInterviews();
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { interviews } = this.state;
        return (
            <div>
                {
                    this.state.showUpdate ?
                        <UpdateInterview interview={this.state.updateInterview} unsetUpdate={this.unsetUpdate} />
                        : null
                }
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Interview ID</th>
                            <th>Interviewer Name</th>
                            <th>Interviewee Name</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>End Date</th>
                            <th>End Time</th>
                            <th>Edit Interview</th>
                            <th>Delete Interview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            interviews.map(interview =>
                                <tr key={interview.id}>
                                    <td>{interview.id}</td>
                                    <td>{interview.Interviewer}</td>
                                    <td>{interview.Interviewee}</td>
                                    <td>{interview.startDate}</td>
                                    <td>{interview.startTime}</td>
                                    <td>{interview.endDate}</td>
                                    <td>{interview.endTime}</td>
                                    <td><Button id={interview.id} name={interview.id} onClick={() => this.update(interview)} > Update </Button></td>
                                    <td><Button id={interview.id} name={interview.id} onClick={() => this.delete(interview.id)}> Delete </Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

            </div>
        )
    }
}
export default Interviews;