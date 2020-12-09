import React from "react";

import { Link } from "react-router-dom";

export default function Navigation({ user }) {
  function onLogout() {
    fetch("/logout").then((res) => (window.location.href = "/"));
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {user ? (
            <div>
              <div>Welcome {user}</div>{" "}
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
