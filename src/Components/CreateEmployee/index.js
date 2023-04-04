import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './createEmployee.css';

const CreateEmployee = () => {
    const navigate = useNavigate();

    const [employeeDetails, setEmployeeDetails] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        dob: '',
        profession: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {...employeeDetails};
        try{
            const response = await axios.post(`${process.env.MONGO_URL}/employees`, newEmployee);
            if(response){
                setEmployeeDetails({
                    name: '',
                    email: '',
                    mobileNumber: '',
                    address: '',
                    dob: '',
                    profession: ''
                });

                navigate('/');
            }
        }catch(error){
            console.log('Error while adding a new employee.')
        }

    }

    const handleForm = (value) => {
        return setEmployeeDetails(employee => {
            return {...employee, ...value};
        })
    }


    return (
        <div>
            <h3>Create a new Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" id="name" type="text" value={employeeDetails.name} onChange={(e) => handleForm({name: e.target.value}) } />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" id="email" type="email" value={employeeDetails.email} onChange={(e) => handleForm({email: e.target.value}) }  />
                </div>
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control" id="mobileNumber" type="text" value={employeeDetails.mobileNumber}  onChange={(e) => handleForm({mobileNumber: e.target.value}) } />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input className="form-control" id="address" type="text" value={employeeDetails.address}  onChange={(e) => handleForm({address: e.target.value}) }  />
                </div>
                <div className="form-group">
                    <label>Date of birth</label>
                    <input className="form-control" id="dob" type="text"  value={employeeDetails.dob} onChange={(e) => handleForm({dob: e.target.value}) } />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <input className="form-control" id="role" type="text" value={employeeDetails.profession}  onChange={(e) => handleForm({profession: e.target.value}) } />
                </div>

                <div className="form-group">
                    <input className="btn btn-primary" value="Create an Employee" type="submit"  />
                </div>
            </form>
        </div>
    )
}

export default CreateEmployee;