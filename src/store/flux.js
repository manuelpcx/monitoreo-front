const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      turnos: [],
      currentUser: [],
      allservicios: [],
      userTurno: [],
      semanaElejida: "",
      servicioElejido: ""
    },
    actions: {
     allTurnos: async () => {
        const resp = await fetch('http://localhost:3000/turnos_trabajados',{
          method:'GET',
          headers: {"Content-Type":"application/json"}
        });

        const data = await resp.json();
       
        setStore({ turnos: data })
     },

     loginUser: async (user, history, path) => {
       try {
         const resp = await fetch("http://localhost:3000/users/sign_in",{
           method: 'POST',
           headers: { "Content-Type":"application/json"},
           body: JSON.stringify(user)
          })
          const data = await resp.json()
          console.log( data)
          setStore({ currentUser: data})
        history.push("/turnos")
        
      } catch (error) {
        console.log(error)
      }
     },
     allServicios: async () => {
       try {
         const resp = await fetch("http://localhost:3000/servicios",{
           method: "GET",
           headers: { "Content-Type":"application/json"}
         });
         const data = await resp.json();
         setStore({ allservicios: data})
       } catch (error) {
         console.log(error)
       }
     },
     getTurno: async (history, path, semana, servicios) => {
      const store = getStore();
      const resp = await fetch("http://localhost:3000/turnos_trabajados/"+ store.currentUser.id);
      const data = await resp.json();
      setStore({ userTurno: data})
      setStore({ semanaElejida: semana})
      setStore({ servicioElejido: servicios})
      history.push(path)
     },
     crearTurno: async (semana, servicio, dia, position) => {
       const store = getStore()
       const body = {
         semana: semana,
         servicioElejido: servicio,
         position: position,
         dia: dia,
         user_id: store.currentUser.id
       }
       const resp = await fetch("http://localhost:3000/turnos_trabajados",{
         method: "POST",
         headers: { "Content-Type":"application/json"},
         body: JSON.stringify(body)
       });
       const data = await resp.json();
     }
    },
  };
};
export default getState;
