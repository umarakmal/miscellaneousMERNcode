import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './ContextProvider';
import { updatedata } from './ContextProvider'
import '../../css/home.css'
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';



const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("/api/role/findall", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    
    const deleteuser = async (id) => {

        const res2 = await fetch(`/api/role/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            // setDLTdata(deletedata)
            getdata();
        }

    }
   

    return (

        <>

           <Header />
           <Menu />
           <h1 style={{textAlign:'center'}}>Role Management</h1>
            <div className="mt-5">
                <div className="container " >
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/addrole" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table className="table">
                        <thead className='thead-dark'>
                            <tr style={{color:'black'}} className="table table-dark">
                                <th scope="col">#</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr key={id}>
                                                <th scope="row">{id + 1}</th>
                                                <td >{element.role}</td>
                                                <td>{element.status}</td>
                                                <td className="d-flex ">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><i className='nav-icon fas fa-eye'/></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><i className='nav-icon fas fa-edit'/></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><i className='nav-icon fas fa-trash'/></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
















