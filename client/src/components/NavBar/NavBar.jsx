import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import hueso from "../../utils/hueso.png"
import { useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import { getTemps, dogsByAlphabetOrder, dogsByOrigin, getDogs, dogsByTemp, dogsByWeight } from "../../Redux/actions"



const NavBar = () => {

    const allTemps = useSelector(state => state.allTemps)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTemps())
    },[])


    const handleOrder = (e) => {
        dispatch(dogsByAlphabetOrder(e.target.value))
    }

    const handleOrderKG = (e) => {
        dispatch(dogsByWeight(e.target.value))
    }

    const handleOrigin = async (e) => {
        await dispatch(getDogs())
        dispatch(dogsByOrigin(e.target.value))
    }

    const handleTemp = async(e) =>{
        dispatch(dogsByTemp(e.target.value))
    }

    const handleReset = () => {
        dispatch(getDogs())
    }

    return(
        <div className={styles.nav_cont}>
            
            <Link to="/home">
                <img src={hueso} alt="logo" className={styles.img}/>
            </Link>

            <Link to="/create">
                <button>Crear Raza</button>
            </Link>

            <button onClick={handleReset}>Resetear filtros</button>

            <div>
                <button onClick={handleOrderKG} value={"ASC"}>Peso ASC</button>
                <button onClick={handleOrderKG} value={"DES"}>Peso DES</button>
            </div>

            <div>
                <button onClick={handleOrder} value={"A"}>A-Z</button>
                <button onClick={handleOrder} value={"B"}>Z-A</button>
            </div>

            <select onChange={handleTemp}>
                <option selected disabled> Filter By Temperament</option>
                {allTemps.map(t => <option value={t.name}>{t.name}</option>)}
            </select>

            <select onChange={handleOrigin} >
                <option selected disabled>Filter By Origin</option>
                <option value="api">API</option>
                <option value="db">DB</option>
            </select>
            

        </div>
    )
}

export default NavBar