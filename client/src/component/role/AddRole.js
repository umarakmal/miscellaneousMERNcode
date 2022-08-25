import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Footer from '../Footer';
import Header from '../Header';
import Menu from '../Menu';
import { adddata } from './ContextProvider';

const AddRole = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
       role:"",
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


    const addinpdata = async (e) => {
        e.preventDefault();

        const { role, status } = inpval;

        const res = await fetch("/api/role/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               role,status
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/role")
            setUdata(data)
            console.log("data added");

        }
    }

    return (<>
        <Header />
        <Menu />
        <div className="container">
            <form className="mt-4">
            <div className="form-group">
                    <div className="form-group">
                        <label for="exampleInputRole" >Role</label>
                        <input style={{width:'50%'}} type="text" value={inpval.role} onChange={setdata} name="role" className="form-control" id="exampleInputRole" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                    <label for="exampleFormControlSelect1">Status</label>
                    <select style={{width:'50%'}} name='status' value={inpval.status} onChange={setdata} className="form-control" id='exampleFormControlSelect1' aria-label=".form-select-lg example">
                    <option selected >Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}
export default AddRole;