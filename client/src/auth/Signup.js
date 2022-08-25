import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../component/Layout';
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        employeeid: '',
        email: '',
        role: '',
        password: '',
        buttonText: 'Submit'
    });

    const [file , setFile]= useState("")

    const handlePhoto = (e) =>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const { name,employeeid, email,role, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const onSelectChange = name => event => {
        setValues({...values, [name]:event.target.value})
    }

    const [currentRolesssss, setCurrentRolesssss] =  useState([]);

    useEffect(() => {
        
        axios.get(`/api/role/findall`)
            .then((response) => {
                console.log(response.data)
                setCurrentRolesssss(response.data);
            })
    }, []);

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `/api/signup`,
            data: { name,employeeid, email, role, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', employeeid: '', email: '',role: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    
   



    const signupForm = () => (
        <form enctype="multipart/form-data">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Employee ID</label>
                <input onChange={handleChange('employeeid')} value={employeeid} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div class="form-group">
             <label htmlFor="file" class="form-label">Upload Profile Picture</label>
             <input  filename='photo'  onChange={handlePhoto}  class="form-control" type="file" id="file" />
             </div>

            <div className="form-group">
            <label className="text-muted">Role</label>
            <select value={role}  aria-label="Default select example" className="form-control" onChange={onSelectChange('role')}>
            <option className="text-muted" value="">Select</option>
            {
                currentRolesssss.map(rol => (
                    <option value={rol._id}>{rol.role}</option>
                       
                ))
            }
            </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-5 text-center">Register</h1>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
};

export default Signup;