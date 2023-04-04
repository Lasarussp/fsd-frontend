import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <NavLink className='navbar-brand' to='/'>EmployeesApp</NavLink>
                </div>
                <div >
                    <NavLink className="nav-link" to="/employees/create">Create Employee</NavLink> 
                </div>
            </nav>
        </div>
    )
}

export default Header;