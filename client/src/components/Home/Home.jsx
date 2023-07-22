import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getDogs, dogsByTemp } from '../../Redux/actions'
import axios from "axios"
import Cards from '../Cards/Cards'
import styles from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch()

    const dogs = useSelector(state => state.allDogs)

    const temps = useSelector(state => state.allTemps)

    const ITEMS_PER_PAGE = 8;

    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("")
    const [searchedDog, setSearchedDog] = useState({})
    

    useEffect( () => {
        !(dogs.length) && dispatch(getDogs())
    }, [])


    useEffect(() => {
        setItems(dogs.slice(0, ITEMS_PER_PAGE));
    }, [dogs]);

    useEffect(() => {
        setCurrentPage(0); // setea la pagina a 0 cuando el arreglo de dogs cambia
    }, [dogs])

    const nextPage = () =>{
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_PER_PAGE;
        if(firstIndex >= dogs.length) return;
        setItems(dogs.slice(firstIndex, firstIndex + ITEMS_PER_PAGE));
        setCurrentPage(nextPage);
    }

    const prevPage = () =>{
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * ITEMS_PER_PAGE;
        if(prevPage < 0) return;
        setItems(dogs.slice(firstIndex, firstIndex + ITEMS_PER_PAGE));
        setCurrentPage(prevPage);
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async (name) => {
        try {
            dispatch(dogsByTemp(name))
            setItems(dogs)
            setSearch("")
        } catch (error) {
            alert(error.response.data.error)
        }
    }


    return(
        <div className={styles.div_cont}>
            
            <div className={styles.search}>
                <input type="text" onChange={handleChange} placeholder='ingrese temp a buscar' className={styles.input}/>
                <button onClick={() => handleSearch(search)} className={styles.boton_search}>Buscar</button>
            </div>
            

            <div className={styles.cards_cont}>
                <Cards dogs={items}/>
            </div>
                
            
            <div className={styles.button}>
                <button onClick={prevPage} className={styles.botonPrev}>Prev</button>
                <h3 className={styles.Current}>{currentPage + 1}</h3>
                <button onClick={nextPage} className={styles.botonNext}>Next</button>
            </div>
            
            
            
            

        </div>
    )
}

export default Home