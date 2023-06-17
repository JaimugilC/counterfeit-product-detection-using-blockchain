import React from 'react'
import { Link } from 'react-router-dom'
import "../Stylesheets/NavBar.css";


function NavBar (props) {

		return (
      <React.Fragment>

        <div className="headerDiv">
          <h1 className="projectTitle">Supply Chain</h1>
          <h5 className="currUser">Current User: {props.role}</h5>
        </div>

        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            {props.role === "Admin" ? (
            <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active-" to="/">Scan</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="admin">Add User</Link>
              </li>
            </ul>
              </>
              ):(
              <>
              {props.role === "Manufacturer" ? (
              <>
              <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active-" to="/">Scan</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="manufacturer">Add Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="owned">Owned By Me</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="sell">Transfer Product</Link>
              </li>
              </ul>
              </>
              ):(
              <>
              <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active-" to="/">Scan</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="owned">Owned By Me</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active-" to="sell">Transfer Product</Link>
              </li>
            </ul>
              </>
              )}
              </>
              )}
          </div>

        </nav>

      </React.Fragment>
		);
	}

export default NavBar;