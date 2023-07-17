import style from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = (props) => {
            

    return (
        <div className={style.card_cont}>
            <Link to={`/detail/${props.id}`} className={style.link}>
            <img src={props.image } alt={props.name} className={style.image}/>
            <h2>{props.name}</h2>
            </Link>
            <h3>Temperamentos:</h3>
            <h4>{props.temperament}</h4>
            <h3>Peso: {props.weight}</h3>

        </div>
    )
}

export default Card