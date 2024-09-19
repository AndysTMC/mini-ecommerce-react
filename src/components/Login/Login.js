import React from "react";
import withRouter from "../../hocs/withRouter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import "./Login.css";
import * as Yup from "yup";
import { userLogin } from "../../api_services/userApiService";
import { userAuth } from "../../api_services/userApiService";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			status: "",
			user: {
				u_name: "",
				u_pwd: "",
			},
			schema: Yup.object({
				u_name: Yup.string().required("Please Enter Username"),
				u_pwd: Yup.string().required("Please Enter Password"),
			}),
		};
	}
	render() {
		return (
			<div className="bg-dark w-100 h-100 d-flex py-5">
				<div className="container mx-auto my-auto d-flex flex-column justify-content-center">
					<div className="bg-white rounded text-center align-self-center mb-4 py-2 border border-light">
						<h1 className="text-dark text-center mx-5 my-auto">
							Login
						</h1>
					</div>
					<Formik
						initialValues={this.state.user}
						validationSchema={this.state.schema}
						onSubmit={this.handleLogin}
					>
						<Form className="d-flex flex-column row-gap-3 mx-auto">
							<div className="form-group d-flex column-gap-3 flex-wrap justify-content-between align-items-center">
								<label
									htmlFor="u_name"
									className="rounded text-white fw-bolder fs-4 text-center"
								>
									Username
								</label>
								<div className="justify-self-end">
									<Field
										type="text"
										id="u_name"
										name="u_name"
										className="border rounded form-field"
									/>
									<ErrorMessage
										name="u_name"
										component="div"
										className="text-white fs-6"
									/>
								</div>
							</div>
							<div className="form-group d-flex column-gap-3 flex-wrap justify-content-between align-items-center">
								<label
									htmlFor="u_pwd"
									className="rounded text-white fw-bolder fs-4"
								>
									Password
								</label>
								<div className="justify-content-sm-between">
									<Field
										type="password"
										id="u_pwd"
										name="u_pwd"
										className="border rounded form-field"
									/>
									<ErrorMessage
										name="u_pwd"
										component="div"
										className="text-white fs-6"
									/>
								</div>
							</div>

							{this.state.status !== "loading" && (
								<div className="form-group mx-auto">
									<button
										type="submit"
										className="btn btn-light px-4 fw-semibold"
									>
										Submit
									</button>
								</div>
							)}

							{this.state.status === "loading" && (
								<div className="spinner-border text-white mx-auto"></div>
							)}
						</Form>
					</Formik>
				</div>
			</div>
		);
	}
	handleLogin = (values, { setSubmitting }) => {
		setSubmitting(false);
		const userObj = {
			u_name: values.u_name,
			u_pwd: values.u_pwd,
		};
		this.setState({ status: "loading" });
		userLogin(userObj).then((data) => {
			if (data.login === "success") {
				const token = data.token;
				this.setState({ status: "success" });
			} else {
				this.setState({ status: "error" });
			}
		});
	};
	componentDidUpdate() {
		if (this.state.status === "success") {
			this.props.navigate("/", { replace: true });
		}
	}
	componentDidMount() {
		this.checkTokenExpiration();
	}
	checkTokenExpiration = async () => {
		const res = await userAuth();
		if (res.auth === "success") {
			this.props.navigate("/", { replace: true });
		}
	};
}

export default withRouter(Login);
