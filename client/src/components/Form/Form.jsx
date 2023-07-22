import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postDog } from "../../Redux/actions"
import styles from "./Form.module.css"


const Form = () => {

    const temps = useSelector((state) => state.allTemps)

    const dispatch = useDispatch()

    const [check, setCheck] = useState(false)

    const [newDog, setNewDog] = useState({
        name: "",
        image: "",
        maxHeight: null,
        minHeight: null,
        maxWeight: null,
        minWeight: null,
        minLife_span: null,
        maxLife_span: null,
        temperament: []
    })

    const [errors, setErrors] = useState({
        name: "El nombre es obligatorio",
        image: "La imagen es obligatoria",
        maxHeight: "La altura minima es obligatoria",
        minHeight: "La altura maxima es obligatoria",
        maxWeight: "El peso maximo es obligatorio",
        minWeight: "El peso minimo es obligatorio",
        minLife_span: "La edad minima es obligatoria",
        maxLife_span: "La edad maxima es obligatoria",
        temperament: "Debe seleccionar al menos un temperamento"
    })

    useEffect(() => {
        if (newDog.temperament.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, temperament: "Debe seleccionar al menos un temperamento" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, temperament: "" }));
        }
    }, [newDog.temperament]);

    const validateName = (input) => {
        const updateErrors = {
            ...errors,
            name: ""
        }
        const regex = /^[A-Za-z\s]+$/


        if(input.name.length < 5 || input.name.length > 20) updateErrors.name = "El nombre debe tener entre 5 y 20 caracteres"

        if(!(regex.test(input.name))) updateErrors.name = "El nombre no puede contener numeros"

        setErrors(updateErrors)
    }

    const validateimage = (input) => {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/

        const updateErrors = {
            ...errors,
            image: ""
        }

        if(!(regex.test(input.image))) updateErrors.image = "La imagen debe ser una url"

        setErrors(updateErrors)
    }

    const validateMinHeight = (input) => {
        const updatedErrors = {
            ...errors,
            minHeight: '',
        };

        if(input.minHeight.length === 0){
            updatedErrors.minHeight = "La altura mínima es obligatoria"
        }

        if (parseInt(input.maxHeight) < parseInt(input.minHeight)) {
            updatedErrors.minHeight = 'La altura minima no puede ser mayor a la altura maxima';
        }

        if (isNaN(input.minHeight)) {
            updatedErrors.minHeight = 'Debe ingresar un número';
        }
        
        setErrors(updatedErrors);
    }

    const validateMaxHeight = (input) => {
        const updatedErrors = {
            ...errors,
            maxHeight: '',
        };

        if(input.maxHeight.length === 0){
            updatedErrors.maxHeight = "La altura mínima es obligatoria"
        }
        if (parseInt(input.maxHeight) < parseInt(input.minHeight)) {
            updatedErrors.maxHeight = 'La altura máxima no puede ser menor a la altura mínima';
        }
        if (isNaN(input.maxHeight)) {
            updatedErrors.maxHeight = 'Debe ingresar un número';
        }
        
        setErrors(updatedErrors);
    }

    const validateMinWeight = (input) => {

        const updatedErrors = {
            ...errors,
            minWeight: '',
        };

        if(input.minWeight.length === 0){
            updatedErrors.minWeight = "El peso mínimo es obligatorio"
        }

        if (parseInt(input.maxWeight) < parseInt(input.minWeight)) {
            updatedErrors.minWeight = 'El peso minimo no puede ser mayor al peso maximo';
        }

        if (isNaN(input.minWeight)) {
            updatedErrors.minWeight = 'Debe ingresar un número';
        }
        

        setErrors(updatedErrors);
    }

    const validateMaxWeight = (input) => {
        const updatedErrors = {
            ...errors,
            maxWeight: '',
        };

        if(input.maxWeight.length === 0){
            updatedErrors.maxWeight = "El peso máximo es obligatorio"
        }

        if (parseInt(input.maxWeight) < parseInt(input.minWeight)) {
            updatedErrors.maxWeight = 'El peso máximo no puede ser menor al peso mínimo';
        }
        if (isNaN(input.maxWeight)) {
            updatedErrors.maxWeight = 'Debe ingresar un número';
        }
        
        setErrors(updatedErrors);
    }

    const validateMinLife_span = (input) => {
        const updateError = {
            ...errors,
            minLife_span: ""
        }

        if(input.minLife_span.length === 0){
            updateError.minLife_span = "La edad mínima es obligatoria"
        }
        
        if(parseInt(input.maxLife_span) < parseInt(input.minLife_span)) updateError.minLife_span = "La edad minima no puede ser mayor a la edad maxima"

        if(isNaN(input.minLife_span)) updateError.minLife_span = "Debe ingresar un número"

        setErrors(updateError)
    }

    const validateMaxLife_span = (input) => {
        const updateError = {
            ...errors,
            maxLife_span: ""
        }

        if(input.maxLife_span.length === 0){
            updateError.maxLife_span = "La edad máxima es obligatoria"
        }

        if(parseInt(input.maxLife_span) < parseInt(input.minLife_span)) updateError.maxLife_span = "La edad máxima no puede ser menor a la edad mínima"

        if(isNaN(input.maxLife_span)) updateError.maxLife_span = "Debe ingresar un número"

        setErrors(updateError)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(postDog(newDog))
    }


    const handleChange = (e) => {
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })

        if(e.target.name === "name") validateName({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "image") validateimage({...newDog, [e.target.name]: e.target.value})
        
        if(e.target.name === "minHeight") validateMinHeight({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "maxHeight") validateMaxHeight({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "minWeight") validateMinWeight({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "maxWeight") validateMaxWeight({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "minLife_span") validateMinLife_span({...newDog, [e.target.name]: e.target.value})

        if(e.target.name === "maxLife_span") validateMaxLife_span({...newDog, [e.target.name]: e.target.value})
        
    }



    const handleChecked = (e) => {
        const value = e.target.value

        if(e.target.checked){
            
            setNewDog((newDog) => ({...newDog, temperament: [...newDog.temperament, value]}))
        }else{
            const index= newDog.temperament.indexOf(value)
            if(index > -1){
                const updatedTemps = [...newDog.temperament]
                updatedTemps.splice(index, 1)
                setNewDog({...newDog, temperament: updatedTemps})
            }
        }

        
}

    const disabled = () => {
        let disabled = true;
        for(let error in errors){
            if(errors[error] === "") disabled = false;
            else{
                disabled = true;
                break;
            }
        }
        return disabled;
    }


    return(
        <div className={styles.div_cont}>
            
            <div >

            <form onSubmit={handlesubmit}>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Nombre: </label>
                    <input type="text" name="name" placeholder="ingrese nombre" onChange={handleChange}/>
                    {errors.name && <div className={styles.errors}>{errors.name}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Altura Minima: </label>
                    <input type="text" name="minHeight" placeholder="ingrese altura minima" onChange={handleChange}/>
                    {errors.minHeight && <div className={styles.errors}>{errors.minHeight}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Altura Maxima: </label>
                    <input type="text" name="maxHeight" placeholder="ingrese altura maxima" onChange={handleChange}/>
                    {errors.maxHeight && <div className={styles.errors}>{errors.maxHeight}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Peso Minimo: </label>
                    <input type="text" name="minWeight" placeholder="ingrese peso minimo" onChange={handleChange}/>
                    {errors.minWeight && <div className={styles.errors}>{errors.minWeight}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Peso Maximo: </label>
                    <input type="text" name="maxWeight" placeholder="ingrese peso maximo" onChange={handleChange}/>
                    {errors.maxWeight && <div className={styles.errors}>{errors.maxWeight}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Años de vida minimo: </label>
                    <input type="text" name="minLife_span" placeholder="ingrese el minimo de años de vida" onChange={handleChange}/>
                    {errors.minLife_span && <div className={styles.errors}>{errors.minLife_span}</div>}
                </div>
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Años de vida maximo: </label>
                    <input type="text" name="maxLife_span" placeholder="ingrese el maximo de años de vida" onChange={handleChange}/>
                    {errors.maxLife_span && <div className={styles.errors}>{errors.maxLife_span}</div>}
                </div>
                <div className={styles.etiquetas}>Temperamentos:</div>
                <div className={styles.cont_temp}>
                    {temps.map((temp) => {
                        return(
                            <div key={temp.id} className={styles["temp-item"]}>
                                <label>
                                    <input type="checkbox" onChange={handleChecked} value={temp.id} name="temperament"/>
                                </label>
                                {temp.name}
                            </div>
                        )
                    })}
                </div>
                    {errors.temperament && <div className={styles.errors}>{errors.temperament}</div>}
                <div className={styles.div_inputs}>
                    <label className={styles.etiquetas}>Imagen</label>
                    <input type="text" name="image" placeholder="ingrese url de imagen" onChange={handleChange}/>
                    {errors.image && <div className={styles.errors}>{errors.image}</div>}
                </div>

                <button type="submit" disabled={disabled()} className={styles.boton}>Crear</button>
            </form>
            </div>
        </div>
    )
}

export default Form