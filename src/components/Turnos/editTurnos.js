import { useState, useContext } from "react"
import { Context } from '../../store/appContext'

const EditTurnos = () => {
    const { store, actions } = useContext(Context)

    let dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    let semanas = ["semana 1", "semana 2", "semana 3", "semana 4", "semana 5"]
    let horarioLV = ["19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"]
    let horarioSD = ["10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00",
        "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"]


    const crearturno = (e, i) => {
        actions.crearTurno(store.semanaElejida, store.servicioElejido, e.target.value, i)
    }
    return (
        <>
            <div class="container mt-5">
                <h1>{store.servicioElejido}</h1>
                <h5>{store.semanaElejida}</h5>
                <div class="row">
                    {dias.map((value, i) => {
                        return (
                            <div key={i} class="col">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">{value}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value !== "sabado" && value !== "domingo" ?

                                            horarioLV.map((bloque, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <th scope="row">{bloque}</th>
                                                        {store.userTurno.map(turno => {
                                                            return (
                                                                <>
                                                                    {turno.semana === store.semanaElejida && turno.dia === value && turno.position === i ?
                                                                        <td>
                                                                            {turno.semana === store.semanaElejida && turno.dia === value && turno.position === i &&
                                                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked></input>
                                                                            }
                                                                        </td>

                                                                        :
                                                                        <td>
                                                                            <input class="form-check-input" type="checkbox" value={`${value}`} id="flexCheckChecked" onClick={(e) => crearturno(e, i)}></input>
                                                                        </td>
                                                                    }

                                                                </>


                                                            )

                                                        })}



                                                    </tr>


                                                )
                                            })

                                            :
                                            <tr>
                                                {
                                                    horarioSD.map((bloque, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <th scope="row">{bloque}</th>
                                                                {store.userTurno.map(turno => {
                                                                    return (
                                                                        <>
                                                                            {turno.semana === store.semanaElejida && turno.dia === value && turno.position === i ?
                                                                                <td>
                                                                                    {turno.semana === store.semanaElejida && turno.dia === value && turno.position === i &&
                                                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked></input>
                                                                                    }
                                                                                </td>

                                                                                :
                                                                                <td>
                                                                                    <input class="form-check-input" type="checkbox" value={`${value}`} id="flexCheckChecked" onClick={(e) => crearturno(e, i)}></input>
                                                                                </td>
                                                                            }

                                                                        </>


                                                                    )

                                                                })}


                                                            </tr>
                                                        )
                                                    })

                                                }
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default EditTurnos;