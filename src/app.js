import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// Pages
import Login from "./pages/login";
import EmployeeList from "./pages/employees";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();

        this.state = {
            jwt: cookies.get("jwt"),
            user: {},
            isAuthenticated: false
        };
    }

    componentDidMount() {
        axios.get("https://comp3123-backend.herokuapp.com/api/user/get_logged_in_user", {
            headers: { "Authorization": `Bearer ${this.state.jwt}` }
        }).then(res => {
            this.setState({ user: res.data.user, isAuthenticated: true });
        }).catch(error => {
            this.setState({ isAuthenticated: false });
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header user={this.state.user} isAuthenticated={this.state.isAuthenticated} />
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }} >
                        <Routes>
                            <Route path="/" element={this.state.isAuthenticated && <EmployeeList />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}