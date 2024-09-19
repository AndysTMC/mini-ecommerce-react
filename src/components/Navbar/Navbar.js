import React from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

export default class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            active_page: "home",
        }
    }
    render() {
        return (
            <div className="navbar bg-dark p-0 d-flex justify-content-space-between">
                <div className="navbar-start-items d-flex justify-content-start">
                    <NavLink
                        to="/"
                        className={`nav-link text-white px-4 py-1 fw-bolder fs-5 ${this.state.active_page === "home" ? "bg-dark88-573" : ""}`}>
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={`nav-link text-white px-4 py-1 fw-bolder fs-5 ${this.state.active_page === "products" ? "bg-dark88-573" : ""}`}>
                        About
                    </NavLink>
                </div>
                <div className="navbar-end-items">
                    {this.props.loggedIn &&
                        <NavLink
                            to="/"
                            className={`nav-link text-dark px-4 py-1 fw-bolder fs-5 bg-dark-subtle justify-self-end`}
                            onClick={this.props.logout}
                            replace
                        >
                            Logout
                        </NavLink>
                    }
                    {!this.props.loggedIn &&
                        <div className="d-flex">
                            <NavLink
                                to="/register"
                                className={`nav-link text-dark px-4 py-1 fw-bolder fs-5 bg-dark-subtle justify-self-end`}
                            >
                                Register
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={`nav-link text-dark px-4 py-1 fw-bolder fs-5 bg-dark-subtle justify-self-end`}
                            >
                                Login
                            </NavLink>
                        </div>
                    }
                </div>


            </div>
        )
    }
}