import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getDogs } from '../../Redux/actions'
import Cards from '../Cards/Cards'
import styles from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch()

    const dogs = useSelector(state => state.allDogs)

    const ITEMS_PER_PAGE = 8;

    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState([]);
    

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



    return(
        <div>
            <div>

                <Cards dogs={items}/>
            
                <div className={styles.button}>
                    <button onClick={prevPage}>Prev</button>
                    <h3>{currentPage + 1}</h3>
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
            
            
            

        </div>
    )
}

export default Home