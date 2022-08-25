import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import Header from "./Header";
import MenuAgent from "./MenuAgent";
import Footer from "./Footer";

function ReadCsv() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const addData = async (e) => {
    e.preventDefault();

    // const { name, email, phone, city, zip, interest, state, address } = data;
    // console.log(data);
    const res = await fetch(`/api/inputcsv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        // name,
        // email,
        // phone,
        // city,
        // zip,
        // interest,
        // state,
        // address,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      //   toast.error("Error Occured");
    } else {
      // history.push("/users")
      //   setData(data);
      console.log("data added");
      //   toast.success("Data added successfully");
    }
  };

  return (
    <div>
      <Header />
      <MenuAgent />
      <div className="content-wrapper">
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Read CSV file</h1>
        </div>
        <div className="card mt-5">
          <section className="content ">
            <div className="container-fluid">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
              <button
                type="submit"
                onClick={addData}
                className="btn btn-primary"
              >
                Submit
              </button>
              <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReadCsv;
