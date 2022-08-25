import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { CsvToHtmlTable } from "react-csv-to-table";

const File = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const [file, setFile] = useState("");
  const history = useHistory();
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const addFile = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("csvfile", file);

    const res = await fetch(`/api/user-profile`, {
      method: "POST",
      body: formData,
    });

    formData = await res.json();
    console.log(formData);

    if (res.status === 422 || !formData) {
      console.log("error ");
    } else {
      history.push("/file");
      // setUdata(data)

      console.log("data added");
    }
  };
  //   useEffect(() => {
  //     getdata();
  //   }, []);

  //   const getdata = async () => {
  //     const res = await fetch("/api", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();

  //     if (res.status === 422 || !data) {
  //       console.log("error ");
  //     } else {
  //       setUserdata(data);
  //       console.log(data);
  //     }
  //   };

  return (
    <div>
      <Header />
      <Menu />
      <div className="container" style={{ marginRight: "50px" }}>
        <form className="mt-4" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload File
            </label>
            <input
              filename="csvfile"
              onChange={handleFile}
              style={{ width: "50%" }}
              className="form-control"
              type="file"
              id="file"
            />
          </div>
          <button type="submit" onClick={addFile} className="btn btn-primary">
            Upload
          </button>
        </form>
        {/* <CsvToHtmlTable
            data={`/public/${filename}`}
            csvDelimiter=","
            tableClassName="table table-striped table-hover"
            /> */}
        <div>
          {/* <table className="table">
                        <thead className='thead-dark'>
                            <tr style={{color:'black'}} className="table table-dark">
                                <th scope="col">#</th>
                                <th scope="col">File</th>
            </tr>
                        </thead>
                        <tbody>

                {
                    getuserdata.map((element, id) => {
                        return (
                            <>
                                <tr key={id} >
                                    <th scope="row">{id + 1}</th>
                                    <td >{element.csvfile}</td>
                                    </tr>
                                    </>
                                    )
                                })
                            }
                        </tbody>
                    </table> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default File;
