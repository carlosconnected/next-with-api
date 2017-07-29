import { Component } from "react";
import { signOut } from "../../lib/auth";

// Logout doesn't have to be a page, but I made it this way to keep
// consistency in the header component links.
export default class Logout extends Component {
  componentDidMount() {
    signOut();
    return {};
  }
  render() {
    return null;
  }
}
