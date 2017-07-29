import { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import App from "../components/App";
import Header from "../components/Header";
import { isAuthenticated } from "../lib/auth";
import { getUsers } from "../services/userApi";

export default class Index extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    authenticated: PropTypes.bool
  };

  static async getInitialProps(ctx) {
    const response = await getUsers();

    return {
      users: response.data,
      authenticated: isAuthenticated(ctx)
    };
  }

  render() {
    const { authenticated, url, users } = this.props;
    return (
      <App>
        <Header authenticated={authenticated} pathname={url.pathname} />
        <h1>Users</h1>
        <ul>
          {users.map(user =>
            <li key={user.id}>
              <Link prefetch href={`/user?id=${user.id}`}>
                <a>
                  {user.name}
                </a>
              </Link>{" "}
              | {user.email}
            </li>
          )}
        </ul>
        <style jsx>{`
          h1 {
            font-size: 20px;
          }
        `}</style>
      </App>
    );
  }
}
