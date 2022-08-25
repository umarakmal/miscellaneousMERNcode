import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MenuAgent from "./MenuAgent";
import { ToastContainer, toast } from "react-toastify";

const SendMsg = () => {
  const [values, setValues] = useState({
    to: "",
    body: "",
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

    const { to, body } = values;
    console.log(values);
    const res = await fetch(`/sendmsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        to,
        body,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      toast.error("Please check credentials!");
    } else {
      console.log("Message Sent");
      toast.success("Message sent successfully!");
    }
  };

  return (
    <div>
      <Header />
      <MenuAgent />
      <ToastContainer />
      <div className="content-wrapper">
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Send Message</h1>
        </div>
        <div className="card mt-5">
          <section className="content ">
            <div className="container-fluid">
              <form>
                <div className="form-group ">
                  <label htmlFor="inputName">Enter your phone number.</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "50%" }}
                    value={values.to}
                    name="to"
                    onChange={setdata}
                    id="inputPhone"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="inputMsg">Enter Message.</label>
                  <input
                    style={{ width: "50%" }}
                    type="text"
                    className="form-control"
                    value={values.body}
                    name="body"
                    onChange={setdata}
                    id="inputMsg"
                    placeholder="Message"
                  />
                </div>
                <button
                  type="submit"
                  onClick={addData}
                  className="btn btn-primary"
                >
                  Send
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

export default SendMsg;
