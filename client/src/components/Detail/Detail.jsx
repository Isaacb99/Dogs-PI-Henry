import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Detail.module.css"; 

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});

    useEffect(() => {
    async function fetchData() {
        try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        setDog(response.data);
    } catch (error) {
        window.alert(`No se encontró el perro con id: ${id}`);
    }
    }
    fetchData();
    return setDog({});
}, [id]);

    return (
    <div className={styles.container}>
        <h1>{dog.name && dog.name}</h1>
        <img src={dog.image && dog.image} alt={dog.name && dog.name} className={styles.image} />
        <h2 className={styles.detailText}>Peso: {dog.weight && dog.weight}</h2>
        <h2 className={styles.detailText}>Altura: {dog.height && dog.height}</h2>
        <h2 className={styles.detailText}>Temperamento: {dog.temperament && dog.temperament}</h2>
        <h2 className={styles.detailText}>Esperanza de vida: {dog.life_span && dog.life_span}</h2>
        <NavLink to="/home" className={styles.link}>
        <button className={styles.button}>Regresar</button>
        </NavLink>
    </div>
    );
};

export default Detail;