

const initalState = {
    allDogs: [],
    allTemps: [],
}

const Reducer = (state = initalState, action)=>{
    const allDogsCopy = [...state.allDogs]
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state, allDogs: action.payload
            }
        case 'GET_TEMPS':
            return{
                ...state, allTemps: action.payload.sort((a,b) => a.name.localeCompare(b.name))
            }
        case 'ORDER_BY_ALPHABET':
            
            return{
                ...state,
                allDogs: action.payload === "A" ? 
                    allDogsCopy.sort((a,b) => {

                        return a.name.localeCompare(b.name);
                    })
                    :  allDogsCopy.sort((a,b) => {

                        return a.name.localeCompare(b.name) * -1;
                    })
                
            }      
        case "ORDER_BY_WEIGHT":
            return{
                ...state,
                allDogs: action.payload === "ASC"?
                    allDogsCopy.sort((a,b) =>{
                        const [aMin, aMax] = a.weight.split(" - ").map(Number);
                        const [bMin, bMax] = b.weight.split(" - ").map(Number);

                        
                            const aWeight = (aMin + aMax) / 2;
                            const bWeight = (bMin + bMax) / 2;
                            return aWeight - bWeight;
                        
                    })
                    : allDogsCopy.sort((a,b) => {
                        const [aMin, aMax] = a.weight.split(" - ").map(Number);
                            const [bMin, bMax] = b.weight.split(" - ").map(Number);
    
                            
                                const aWeight = (aMin + aMax) / 2;
                                const bWeight = (bMin + bMax) / 2;
                                return( aWeight - bWeight) * -1;
                            
                })
                } 
        
        case 'ORDER_BY_ORIGIN':
            if(action.payload === "api"){
                return{
                    ...state,
                    allDogs: allDogsCopy.filter(dog => Number(dog.id))
                }
            }else if(action.payload === "db"){
                return{
                    ...state,
                    allDogs: allDogsCopy.filter(dog => isNaN(dog.id))
                }
            }else{
                return{
                    ...state,
                    ...allDogs
                }
            }
        
        case 'ORDER_BY_TEMP':
            return{
                ...state,
                allDogs: allDogsCopy.filter((dog) => dog.temperament? dog.temperament.includes(action.payload) : null)
                
            }
        
            default: return {...state}
    }
}

export default Reducer