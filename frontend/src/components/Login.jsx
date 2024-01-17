import React, { Component } from "react";
import "../styles/Login.css";
import { login } from "../store/actions/usersAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function withNavigation(Component) {
  return (props) => <Component {...props} params={useNavigate()} />;
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  onButtonClick = async () => {
    const { email, password } = this.state;

    // Set initial error values to empty
    this.setState({ emailError: "", passwordError: "" });

    // Check if the user has entered both fields correctly
    if ("" === email) {
      this.setState({ emailError: "Please enter your email" });
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      this.setState({ emailError: "Please enter a valid email" });
      return;
    }

    if ("" === password) {
      this.setState({ passwordError: "Please enter a password" });
      return;
    }

    if (password.length < 7) {
      this.setState({
        passwordError: "The password must be 8 characters or longer",
      });
      return;
    }

    try {
      await this.props.login(email, password);
      console.log(this.props.user.res);
      const { status } = this.props.user.res;
      if (status === "USER_NOT_FOUND") {
        this.setState({ emailError: "User not found" });
        return;
      } else if (status === "INCORRECT_PASSWORD") {
        this.setState({ passwordError: "Incorrect password" });
        return;
      } else if (status === "success") {
        alert("Login successful");
        this.props.params("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;

    return (
      <div className="mainContainer">
        DEMO <br />
        Email: john@gmail.com <br />
        Password: 12345678
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => this.setState({ email: ev.target.value })}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => this.setState({ password: ev.target.value })}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            className="inputButton"
            type="button"
            onClick={this.onButtonClick}
            value="Log in"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default withNavigation(connect(mapStateToProps, { login })(Login));
