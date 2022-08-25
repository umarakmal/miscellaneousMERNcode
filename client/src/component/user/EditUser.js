import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import Menu from '../Menu'
import { updatedata } from '../role/ContextProvider'
import axios from 'axios'

const EditUser = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");
 
    const [name , setName]= useState("")
    const [employeeid , setEmployeeid]= useState("")
    const [email , setEmail]= useState("")
    const [file,setFile] = useState("")
    const [role , setRole]= useState("")
    const [password , setPassword]= useState("")
    // const [inpval, setINP] = useState({
    //     name:"",
    //     employeeid:"",
    //     email:"",
    //     role: "",
    //     password:"",
    //     photo:""

    // })

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

    const { id } = useParams("");
    console.log(id);

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
            // console.log(data['photo'])
            setName(data['name'])
            setEmployeeid(data['employeeid'])
            setEmail(data['email'])
            setRole(data['role'])
            setFile(data['photo'])
            setPassword(data['password'])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);

    
    const updateuser = async(e)=>{
        e.preventDefault();

        var formData= new FormData()
        
        formData.append("name",name)
        formData.append("employeeid",employeeid)
        formData.append("email",email)
        formData.append("role",role)
        formData.append("photo",file)
        formData.append("password",password)
        // const {name,employeeid,email,photo,role,password} = inpval;

        const res2 = await fetch(`/api/user/${id}`,{
            method: "PUT",
            headers: {
                // "Content-Type": "application/json"
            },
            body:formData
            // body:JSON.stringify({
            //     name,employeeid,email,photo,role,password
            // })
        });

        formData = await res2.json();
        console.log(formData);

        if(res2.status === 422 || !formData){
            alert("fill the data");
        }else{
            history.push("/users")
            // setUPdata(data2);
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
    
    return (
        <>
        <Header />
        <Menu />
        <NavLink to="/users">User Management</NavLink>
        <div className="container">
            <form className="mt-4"  enctype="multipart/form-data">
            <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="exampleInputName" >Name</label>
                        <input style={{width:'50%'}} type="text" value={name}  onChange={(e)=>setName(e.target.value)} name="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmp" >Employee ID</label>
                        <input style={{width:'50%'}} type="text" value={employeeid}  onChange={(e)=>setEmployeeid(e.target.value)} name="employeeid" className="form-control" id="exampleInputEmp" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" >Email</label>
                        <input style={{width:'50%'}} type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="formFile" class="form-label">Upload Profile Picture</label>
                  <input filename="photo"  onChange={handlePhoto} style={{width:'50%'}} className="form-control" type="file" id="formFile" />
                 
                    </div>

                    <div className="form-group">
                    <label for="exampleFormControlSelect1">Role</label>
                    <select style={{width:'50%'}} name='role' value={role._id}  onChange={(e)=>setRole(e.target.value)} className="form-control" id='exampleFormControlSelect1' aria-label=".form-select-lg example">
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
                        <input style={{width:'50%'}} type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" />
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default EditUser;




