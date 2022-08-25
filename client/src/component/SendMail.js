import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MenuAgent from "./MenuAgent";
import { ToastContainer, toast } from "react-toastify";

const SendMail = () => {
  const [values, setValues] = useState({
    to: "",
    from: "",
    subject: "",
    text: "",
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

    const { to, from, subject, text } = values;
    console.log(values);
    const res = await fetch(`/sendmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        to,
        from,
        text,
        subject,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      toast.error("Please check credentials!");
    } else {
      console.log("Email Sent");
      toast.success("Email sent successfully!");
    }
  };

  return (
    <div>
      <Header />
      <MenuAgent />
      <ToastContainer />
      <div className="content-wrapper">
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Send Email</h1>
        </div>
        <div className="card mt-5">
          <section className="content ">
            <div className="container-fluid">
              <form>
                <div className="form-group ">
                  <label htmlFor="inputName">To.</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "50%" }}
                    value={values.to}
                    name="to"
                    onChange={setdata}
                    id="inputTo"
                    placeholder="Enter Reaciever's email"
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="inputName">From.</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "50%" }}
                    value={values.from}
                    name="from"
                    onChange={setdata}
                    id="inputfrom"
                    placeholder="Enter sender's email"
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="inputName">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "50%" }}
                    value={values.subject}
                    name="subject"
                    onChange={setdata}
                    id="inputsubject"
                    placeholder="Enter Subject"
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="inputMsg">Enter Text.</label>
                  <input
                    style={{ width: "50%" }}
                    type="text"
                    className="form-control"
                    value={values.text}
                    name="text"
                    onChange={setdata}
                    id="inputtext"
                    placeholder="Enter text"
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

export default SendMail;
