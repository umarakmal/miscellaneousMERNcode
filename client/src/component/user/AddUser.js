import React, { useContext, useState,useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Footer from '../Footer';
import Header from '../Header';
import Menu from '../Menu';
import { adddata } from '../role/ContextProvider';
import axios from 'axios';

const AddUser = () => {

    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();
    // const [inpval, setINP] = useState({
    //     name:"",
    //     employeeid:"",
    //     email:"",  
    //     role:"",
    //     photo:"",
    //     password:""
    // })
    const [name , setName]= useState("")
    const [employeeid , setEmployeeid]= useState("")
    const [email , setEmail]= useState("")
    const [role , setRole]= useState("")
    const [file , setFile]= useState("")
    const [password , setPassword]= useState("")


    // const setdata = (e) => {
    //     console.log(e.target.value);
       
    //     const { name, value } = e.target;
    //     setINP((preval) => {
    //         return {
    //             ...preval,
    //             [name]: value
    //         }
    //     })
    // }
    
    const handlePhoto = (e) =>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    

    const addinpdata = async (e) => {
        e.preventDefault();

        // const { name,employeeid,email,photo,role,password } = inpval;
        // const {photo} = file;
   
        var formData= new FormData()
        
        formData.append("name",name)
        formData.append("employeeid",employeeid)
        formData.append("email",email)
        formData.append("role",role)
        formData.append("photo",file)
        formData.append("password",password)
        console.log(formData)
        const res = await fetch( `/api/signup`, {
            method: "POST",
            headers: {
                // 'content-type': 'multipart/form-data'
                
            },
            body:formData
            // body: JSON.stringify({
            //    name,employeeid,email,photo,role,password
            // })
        });

         formData = await res.json();
        console.log(formData);

        if (res.status === 422 || !formData) {
            console.log("error ");
           

        } else {
            history.push("/users")
            // setUdata(data)
            console.log("data added");

        }
    }

    const [currentRolesssss, setCurrentRolesssss] = useState([]);
    useEffect(() => {
            
        axios.get(`/api/role/findall`)
            .then((response) => {
                // console.log("helllo"+rol._id)
                setCurrentRolesssss(response.data);
            })
    }, []);


    return (<>
        <Header />
        <Menu />
        <div className="container">
            <form className="mt-4" enctype="multipart/form-data">
            <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="exampleInputName" >Name</label>
                        <input style={{width:'50%'}} type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmp" >Employee ID</label>
                        <input style={{width:'50%'}} type="text" value={employeeid} onChange={(e)=>setEmployeeid(e.target.value)} name="employeeid" className="form-control" id="exampleInputEmp" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" >Email</label>
                        <input style={{width:'50%'}} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="file" class="form-label">Upload Profile Picture</label>
                    <input  filename='photo'  onChange={handlePhoto} style={{width:'50%'}} class="form-control" type="file" id="file" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Role</label>
                    <select style={{width:'50%'}} name='role' value={role} onChange={(e)=>setRole(e.target.value)} className="form-control" id='exampleFormControlSelect1' aria-label=".form-select-lg example">
                    <option selected >Select</option>
                    
                   {  
                        currentRolesssss.map( rol => (
                            <option key={rol._id} value={rol._id}>{rol.role}</option>
                            
                        ))
                    }
                    </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPass" >Password</label>
                        <input style={{width:'50%'}} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" />
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}
export default AddUser;