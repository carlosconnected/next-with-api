import { Component } from "react";
import Link from "next/link";
import App from "../../components/App";
import Header from "../../components/Header";
import Success from "../../components/Success";
import Error from "../../components/Error";
import { getCookie, removeCookie } from "../../lib/session";
import { signIn, redirectIfAuthenticated } from "../../lib/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {};
    }

    const success = getCookie("success", ctx.req);
    if (success) {
      removeCookie("success");
    }
    return {
      success
    };
  }

  render() {
    const { url, success } = this.props;
    const { error } = this.state;
    return (
      <App>
        <Header authenticated={false} pathname={url.pathname} />
        {success && <Success message={success} />}
        {error && <Error message={error} />}
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">Submit</button>
        </form>

        <p>
          {"Don't have a user? "}
          <Link prefetch href="/register">
            <a>Register</a>
          </Link>
        </p>
        <style jsx>{`
          form {
            padding-bottom: 20px;
            margin-bottom: 20px;
            text-align: center;
          }
          p {
            text-align: center;
          }
          h1 {
            font-size: 20px;
          }
          input,
          button {
            display: block;
            margin: auto;
            margin-bottom: 10px;
          }
        `}</style>
      </App>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const error = await signIn(email, password);

    if (error) {
      this.setState({
        error
      });
      return false;
    }
  };
}
