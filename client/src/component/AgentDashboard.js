import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuAgent from "./MenuAgent";
import { ToastContainer, toast } from "react-toastify";
const AgentDashboard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    state: "",
    zip: "",
    address: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { name, email, phone, city, zip, interest, state, address } = values;
    console.log(values);
    const res = await fetch(`/api/inputform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phone,
        city,
        zip,
        interest,
        state,
        address,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      toast.error("Error Occured");
    } else {
      // history.push("/users")
      // setUdata(data)
      console.log("data added");
      toast.success("Data added successfully");
    }
  };

  return (
    <div>
      <Header />
      <MenuAgent />
      <ToastContainer />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
            </ol>
          </div> */}
            </div>
          </div>
        </div>
        <div className="card">
          <section className="content">
            <div className="container-fluid">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={values.name}
                      onChange={setdata}
                      id="inputName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={setdata}
                      id="inputEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputMobile">Phone No.</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={values.phone}
                      onChange={setdata}
                      id="inputMobile"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputInt">Interest</label>
                    <input
                      type="text"
                      className="form-control"
                      name="interest"
                      value={values.interest}
                      onChange={setdata}
                      id="inputInt"
                      placeholder="Interest"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select
                      id="inputState"
                      name="state"
                      value={values.state}
                      onChange={setdata}
                      className="form-control"
                    >
                      <option defaultValue="">--Choose State--</option>
                      <option>Haryana</option>
                      <option>Delhi</option>
                      <option>Uttar Pardesh</option>
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Kerala</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCity">City</label>
                    <select
                      id="inputCity"
                      name="city"
                      value={values.city}
                      onChange={setdata}
                      className="form-control"
                    >
                      <option defaultValue="">--Choose City--</option>
                      <option>Noida</option>
                      <option>South Delhi</option>
                      <option>Gurugram</option>
                      <option>Bangalore</option>
                      <option>Lucknow</option>
                      <option>Azamgarh</option>
                      <option>Kanpur</option>
                      <option>Pune</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      value={values.zip}
                      onChange={setdata}
                      id="inputZip"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    name="address"
                    value={values.address}
                    onChange={setdata}
                    placeholder="1234 Main St"
                  />
                </div>
                <button
                  type="submit"
                  onClick={addData}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentDashboard;
