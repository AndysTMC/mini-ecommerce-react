import React from "react";
import { NavLink } from "react-router-dom";
import "./About.css";

export default class About extends React.Component {
    render() {
        return (
            <div className="about bg-dark h-100 d-flex flex-column justify-content-center align-items-center text-center text-white px-3">
                <div>
                    <h1 className="mb-4">Welcome to Mini-Ecommerce</h1>
                    <p className="lead">
                        Mini-Ecommerce is your one-stop shop for all your favorite products, offering a seamless and delightful shopping experience. Our platform is designed to cater to your needs with a wide range of products, easy navigation, and secure transactions.
                    </p>
                    <p className="mt-4">
                        This site is made, hosted, and managed by <strong>AndysTMC</strong>. We are committed to providing you with the best online shopping experience. Thank you for choosing Mini-Ecommerce.
                    </p>
                    <NavLink to="/" className="btn btn-primary mt-4" replace>
                        Go to Home Page
                    </NavLink>
                </div>
            </div>
        );
    }
}
