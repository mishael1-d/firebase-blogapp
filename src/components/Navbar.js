import React from "react";
import { Link } from "react-router-dom";
function Navbar({ isAuth, signOut }) {
  return (
    <>
      <nav className="navbar">
        <h2 className="logo">
          Blog <span>Website</span>
        </h2>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          {!isAuth ? (
            <Link className="link" to="/login">
              Login
            </Link>
          ) : (
            <>
              <Link className="link" to="/createpost">
                Create Post
              </Link>
              <button className="link logout" onClick={signOut}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
