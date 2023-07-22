import Card from "../Card/Card"
import style from "./Cards.module.css"


const Cards = ({dogs}) => {
    

    return (
        <div className={style.cards}>

            {dogs.map((dog) => {
                return(
                    <Card id ={dog.id} name={dog.name} image={dog.image} 
                    temperament={dog.temperament}
                    weight={dog.weight} key={dog.id}
                    />
                )
            })
            
        }
        </div>
    )
}

export default Cards