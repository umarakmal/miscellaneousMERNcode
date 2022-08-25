import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { saveAs } from "file-saver";

const Appointment = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [name, setName] = useState("");
  const [employeeid, setEmployeeid] = useState("");

  const getdata = async () => {
    const res = await fetch("/api/user/findall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  const createAndDownloadPdf = async (id) => {
    console.log(id);
    var body = { name, employeeid };

    axios
      .post(`/create-pdf/${id}`, body)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res], { type: "application/pdf" });
        saveAs(pdfBlob, "generatedDocument.pdf");
      });
  };

  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Appointment Letter</h1>
        </div>
        <div className="card mt-5">
          <section className="content ">
            <div className="container-fluid">
              <table className="table">
                <thead className="thead-dark">
                  <tr style={{ color: "black" }} className="table table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getuserdata.map((element, id) => {
                    return (
                      <>
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>{element.name}</td>
                          <td>{element.employeeid}</td>
                          <td>{element.email}</td>
                          <td>{element.role.role ?? ""}</td>

                          <td className="d-flex ">
                            <button
                              onClick={() => createAndDownloadPdf(element._id)}
                              className="btn btn-danger"
                            >
                              <i className="nav-icon fas fa-file-pdf" />
                            </button>
                            {/* </NavLink> */}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointment;
