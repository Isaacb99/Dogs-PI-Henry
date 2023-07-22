import { NavLink } from "react-router-dom";

import styles from "./LandingPage.module.css"


const LandingPage = () =>{

    return(
        
            <div className={styles.div_cont}>

                <div className={styles.div_bien}>
                </div>
                <h2 className={styles.titulo}>Bienvenidos</h2>
                    <NavLink to="/home">
                        <button className={styles.boton}>Acceder</button>
                    </NavLink>
                
                
            </div>
            
    )

}

export default LandingPage