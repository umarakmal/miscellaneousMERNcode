import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Menu from '../Menu';

const DetailsUser = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {

        const res = await fetch(`/api/user/${id}`, {
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
            // console.log(getuserdata.role.role)
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/api/user/${id}`, {
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
            history.push("/users");
        }

    }


    return (
        <>
        <Header/>
        <Menu />
        <div className="container mt-3">
        <NavLink to="/users" >User Management</NavLink>
            <div className='card' style={{width:'18rem',textAlign:'center'}}>
                <div className='card-body' style={{textAlign:'center'}}>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><i className='nav-icon fas fa-edit'/></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><i className='nav-icon fas fa-trash'/></button>
                    </div>
                    <div className="mb-3">
                        <div className="card-text">
                            {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
                            <h3 className="mt-3">Name: <span >{getuserdata.name}</span></h3>
                            <h3 className="mt-3">Employee ID: <span >{getuserdata.employeeid}</span></h3>
                            <h3 className="mt-3">Email: <span >{getuserdata.email}</span></h3>
                            {/* <h3 className="mt-3">Role: <span >{getuserdata.role.role}</span></h3> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
        </>
        
    )
}

export default DetailsUser;