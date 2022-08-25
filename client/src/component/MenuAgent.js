import React from "react";
import logo from "../images/logo3.png";
const MenuAgent = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: ".9", maxHeight: "45px" }}
          />
          <span className="brand-text font-weight-light invisible">Cogent</span>
        </a>
        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open mb-2">
                <a href="/private" className="nav-link active">
                  <i
                    className="nav-icon fas fa-tachometer-alt"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>
                    Dashboard
                    {/* <i className="right fas fa-angle-left" /> */}
                  </p>
                </a>
              </li>

              <li className="nav-item mb-2">
                <a href="/report" className="nav-link">
                  <i
                    className="nav-icon far fa-address-book"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>Report</p>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/sms" className="nav-link">
                  <i
                    className="nav-icon far fa-envelope"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>
                    Send Message
                  </p>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/mail" className="nav-link">
                  <i
                    className="nav-icon far fa-envelope"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>
                    Send Email
                  </p>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/read" className="nav-link">
                  <i
                    className="nav-icon far fa-file"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>Read Csv</p>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/csvv" className="nav-link">
                  <i
                    className="nav-icon far fa-envelope"
                    style={{ color: "white" }}
                  ></i>
                  <p style={{ color: "white", fontWeight: "400" }}>
                    Upload Csv
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default MenuAgent;
