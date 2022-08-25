import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import Menu from '../Menu'
import { updatedata } from './ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({
        role: "",
       status:""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/api/role/${id}`, {
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
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {role,status} = inpval;

        const res2 = await fetch(`/api/role/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                role,status
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/role")
            setUPdata(data2);
        }

    }

    return (
        <>
        <Header />
        <Menu />
        <div className="container">
            <NavLink to="/role">Role Management</NavLink>
            <form className="mt-4">
            <div className="mb-3">
            <div className="form-group">
                        <label htmlFor="exampleInputRole" >Role</label>
                        <input style={{width:'50%'}} type="text" value={inpval.role} onChange={setdata} name="role" className="form-control" id="exampleInputRole" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Status</label>
                    <select style={{width:'50%'}} name='status' value={inpval.status} onChange={setdata} className="form-control" id='exampleFormControlSelect1' aria-label=".form-select-lg example">
                    <option >Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default Edit;




