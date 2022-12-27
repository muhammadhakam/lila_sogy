import "./login.css"
import { useContext, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)


  const handleCreate = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email1, password1)
      .then((userCredential)=> {
        const user1 = userCredential.user;
        console.log(user1)
        navigate("/")
      })
      .catch ((error) => {
        setError(true)
      })

  }
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=> {
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        console.log(user)
        navigate("/")
      })
      .catch ((error) => {
        setError(true)
      })
  }

  return (
    <div className = "bodyLogin">
    <div className = "main">
    <input type="checkbox" id="chk" aria-hidden="true"/>
        <div className="signup">
            <form onSubmit={handleCreate}>
                <label htmlFor="chk" aria-hidden="true">Sign up</label>
                <input type="email1" name="email1" placeholder="Email" onChange={(e) => setEmail1(e.target.value)} />
                <input type="password1" name="pswd1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                <button className="daftar">Sign up</button>
                {error && <span>Wrong email or password</span>}
            </form>
        </div>



        <div className="login">
        <form onSubmit = {handleLogin}>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="daftar">Login</button>
                {error && <span>Wrong email or password</span>}
            </form>
        </div>
    </div> 
    </div>
  )
}

export default Login