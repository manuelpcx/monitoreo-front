import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/appContext'
import { Link, useHistory } from 'react-router-dom'

const Turnos = () => {
	const history = useHistory()
	const { store, actions } = useContext(Context)
	const [parametros, setParametros] = useState({
		semana: false,
		servicio: false
	})
	const [userCont, setUserCont] = useState({
		benja: 0,
		ernesto: 0,
		barbara: 0
	})
	const [semana, setSemana] = useState("")
	const [servicios, setServicio] = useState("")

	const handleChange = (e) => {


		if (e.target.name === "semana") {
			setParametros({
				...parametros,
				semana: true
			})
			setSemana({
				semana: e.target.value
			})
		} else {
			setParametros({
				...parametros,
				servicio: true
			})
			setServicio({
				servicios: e.target.value
			})
		}
	}
	var cantidadTurnos = []
	var count = 0
	store.turnos.forEach((value, i) => {
		if (value.usuario === store.turnos[i].usuario) {
			if (value.dia === store.turnos[i].dia) {

				count = count + 1
				console.log(count)
			}
		}
	})
	const editar = () => {
		actions.getTurno(history, "/editTurnos", semana.semana, servicios.servicios)
	}



	let dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
	let semanas = ["semana 1", "semana 2", "semana 3", "semana 4", "semana 5"]
	let horarioLV = ["19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"]
	let horarioSD = ["10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00",
		"20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"]
	useEffect(() => {
		actions.allServicios()
		actions.allTurnos();
	}, [])

	return (
		<>
			<h1>Turnos</h1>
			<div className="container">
				<div className="parametros col-3">
					<label>Servicio a trabajar</label>
					<select type="select" name="servicio" onChange={(e) => handleChange(e)} className="form-select">
						<option>Elejir...</option>
						{store.allservicios.length !== 0 &&
							store.allservicios.map((value, i) => {
								return (
									<>
										<option>{value.name}</option>
									</>
								)
							}
							)}
					</select>

					<label>Semana a trabajar</label>
					<select type="select" name="semana" onChange={(e) => handleChange(e)} className="form-select">
						<option>Elejir..</option>
						{semanas.map(value => {
							return (
								<option>{value}</option>
							)
						})}
					</select>

				</div>
				{parametros.semana === true && parametros.servicio === true ?
					<>

						<button className="btn btn-success mt-5" onClick={editar}>Editar Turno</button>

						<div className="col-3 mt-5">
							<table class="table">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Benjamin</th>
										<th scope="col">Ernesto</th>
										<th scope="col">Barbara</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row"></th>
										<td>{userCont.benja}</td>
										<td>{userCont.ernesto}</td>
										<td>{userCont.barbara}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="container mt-5">
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
																	{store.turnos.map((turno, j) => {
																		// turno.usuario === "Benjamin" ? setUserCont({...userCont, benja: userCont.benja +1}) : 
																		// turno.usuario === "Ernesto" ? setUserCont({...userCont, ernesto: userCont.ernesto +1}) :
																		//  setUserCont({...userCont, barbara: userCont.barbara +1})
																		return (
																			<>
																				{turno.semana === semana.semana && turno.dia === value && turno.position === i &&
																					<td style={{ background: `${turno.semana === semana.semana && turno.dia === value && turno.position === i && turno.color}` }}>
																						{turno.semana === semana.semana && turno.dia === value && turno.position === i && turno.usuario}
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
																			{store.turnos.map((turno, j) => {
																				return (
																					<>
																						{turno.semana === semana.semana && turno.dia === value && turno.position === i &&
																							<td style={{ background: `${turno.semana === semana.semana && turno.dia === value && turno.position === i && turno.color}` }}>
																								{turno.semana === semana.semana && turno.dia === value && turno.position === i && turno.usuario}
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
					:
					""
				}

			</div>
		</>
	)
}

export default Turnos;