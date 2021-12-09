import React, { useState } from 'react';
import Interviews from './components/interviews';
import NewInterview from './components/newInterview';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from "history";
const history = createHistory();

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <Router history={history}>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Interview Scheduler</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Interviews</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/newinterview">New Interview</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Route path="/" exact component={Interviews} />
                <Route path="/newinterview" component={NewInterview} />
            </Router>
        </div>
    );
}
export default Home;