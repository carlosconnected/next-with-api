import { Component } from "react";
import Link from "next/link";
import App from "../../components/App";
import Header from "../../components/Header";
import Error from "../../components/Error";
import { signUp, redirectIfAuthenticated } from "../../lib/auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getInitialProps(ctx) {
    redirectIfAuthenticated(ctx);

    return {};
  }

  render() {
    const { url } = this.props;
    const { error } = this.state;
    return (
      <App>
        <Header authenticated={false} pathname={url.pathname} />
        {error && <Error message={error} />}
        <form onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <input type="text" placeholder="name" name="name" />
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input
            type="password"
            placeholder="confirm password"
            name="password_confirmation"
          />
          <span>{`Password, 8 characters min`}</span>
          <button type="submit">Submit</button>
          <style jsx>{`
            form {
              padding-bottom: 20px;
              margin-bottom: 20px;
              text-align: center;
            }
            h1 {
              font-size: 20px;
            }
            span {
              font-size: 10px;
              color: red;
            }
            input,
            button {
              display: block;
              margin: auto;
              margin-top: 5px;
              margin-bottom: 5px;
            }
          `}</style>
        </form>
      </App>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password_confirmation = e.target.elements.password_confirmation.value;

    const error = await signUp(name, email, password, password_confirmation);

    if (error) {
      this.setState({
        error
      });
      return false;
    }
  };
}
