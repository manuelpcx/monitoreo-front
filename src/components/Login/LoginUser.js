import "./LoginUser.css"
import {useHistory} from 'react-router-dom'
import {useContext, useState} from 'react'
import { Context} from '../../store/appContext'
const LoginUser = () => {
    const history = useHistory()
    const {actions} = useContext(Context)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        actions.loginUser(user, history, "/turnos")
    }
    return (
        <>
            <div className="container col-5 mt-5 login-user">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                            onChange={(e) => handleChange(e)}
                            />
                            
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(e) => handleChange(e)}
                            />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        >Submit</button>
                </form>
            </div>
        </>
    )
}

export default LoginUser;