import React, { useState } from "react";
import './login.css';
import { useNavigate} from "react-router-dom";

function LoginPage({setLoggedIn}) {

    const [username, setuserName] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useNavigate();

    const handleSignin = (e) => {

        e.preventDefault();
        setLoggedIn(username, password);
        history('/quotation');

        // const uName = 'BajarangiAdmin';
        // const pw = 'BajarangiAdmin@2024';
        

        // if (username == uName && password == pw) {

        // }
        // else{
        //     alert('Login Unsuccessful');
        // }
    }

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',width:'100%',background:'#070F2B',resize:'cover'}}>
            <div class="form-container">
            <p class="title">Login</p>
            <form class="form">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder=""  value={username} onChange={(abhi) => {setuserName(abhi.target.value)}}/>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="" value={password} onChange={(a) => {setPassword(a.target.value)}}/>
                   
                </div>
                <button class="sign"  onClick={handleSignin}>Sign in</button>
            </form>
           
        </div>
        </div>
        
    );
}

export default LoginPage;

