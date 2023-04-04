import './updateEmployee.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateEmployee = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        dob: '',
        profession: ''
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const empID = params.empID.toString();
        axios.get(`${process.env.REACT_APP_BASE_URL}/employees/${empID}`).then(response => {
            setEmployeeDetails(response.data[0]);
            console.log(response)
        }).catch(err => {
            console.log('Error: ', err);
        })
    }, [params.empID]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const empID = params.empID.toString();
        const updateEmployee = {...employeeDetails};
        try{
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employees/${empID}`, updateEmployee);
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
            <h3>Update an Employee</h3>
            {(
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" id="name" type="text"  onChange={(e) => handleForm({name: e.target.value}) } />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" id="email" type="text" onChange={(e) => handleForm({email: e.target.value}) }  />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input className="form-control" id="mobileNumber" type="text"  onChange={(e) => handleForm({mobileNumber: e.target.value}) } />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input className="form-control" id="address" type="text"  onChange={(e) => handleForm({address: e.target.value}) }  />
                    </div>
                    <div className="form-group">
                        <label>Date of birth</label>
                        <input className="form-control" id="dob" type="text"   onChange={(e) => handleForm({dob: e.target.value}) } />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <input className="form-control" id="role" type="text"  onChange={(e) => handleForm({profession: e.target.value}) } />
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" value="Update" type="submit"  />
                    </div>
                </form>
            )}
        </div>
    )
}

export default UpdateEmployee;