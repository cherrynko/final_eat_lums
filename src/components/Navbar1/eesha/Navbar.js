import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./Navbar.css";

const HandleLogout = () => {
  localStorage.removeItem("token");
};

function Navbar() {
  const [user, setUser] = useState("");
  const isLoggedIn = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [name, setname] = useState("");

  const HandleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          {/* <Link className="navbar-brand fst-italic" to="/">
            eat@lums
          </Link> */}
          <Link to="/">
            <img
              src={require("./logo.png")}
              alt="logo"
              style={{ height: 40, marginRight: 25}}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="centre-div">
              <ul className="navbar-nav">
                {/* {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              )} */}

                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/login"
                      style={{ color: "white" }}
                    >
                      Login
                    </Link>
                  </li>
                )}

                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/signup"
                      style={{ color: "white" }}
                    >
                      Sign up
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/eateries"
                      style={{ color: "white" }}
                    >
                      Eateries
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/orders"
                      style={{ color: "white" }}
                    >
                      Orders
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/orders" //change to my orders
                      style={{ color: "white" }}
                    >
                      My Orders
                    </Link>
                  </li>
                )}

                {/* {isLoggedIn && (
          <li className="Profile">
          <Link className="Profile" to="/profile">Hey, {firstname}</Link>
        </li>
        )} */}

                {/* <ul className="navbar-nav">
        {isLoggedIn && (
          <li className="navbar-nav" >
            <Link className="nav-link" to="/profile">Hey, {name}! </Link>
          </li>
        )}
      </ul> */}

                {isLoggedIn && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-target="#"
                      aria-expanded="false"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ color: "white" }}
                    >
                      Actions
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/vieweateries">
                          view eateries
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/viewfavourites">
                          favourite meals
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orderhistory">
                          order history{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
            <div className="right-div">
              <ul className="navbar-nav">
                {isLoggedIn && (
                  <li className="cart">
                    <Link
                      className="nav-link"
                      to="/cart"
                      style={{ color: "white" }}
                    >
                      Cart
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={HandleLogout}
                      style={{ color: "white" }}
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
