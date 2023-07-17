import { NavLink } from "react-router-dom";



const LandingPage = () =>{

    return(
        <div>
            <h2>Landing Page</h2>
            <NavLink to="/home">
                <button>Bienvenido</button>
            </NavLink>
        </div>
    )

}

export default LandingPage