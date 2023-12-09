import {useState} from  "react";
import {useNavigate} from "react-router-dom";

export default function SignUp(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }
         

    const submitForm = async (e) => {
        e.preventDefault();//prevent deafult reloading of page when form is submitted
        console.log("form submitted");
        const credentails = {userName,password};
        setPassword("");
        setUserName("");
        try {
                const response = await fetch('http://localhost:3000/signup',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentails)
                });
                const data = await response.json();
                if (response.ok){
                    navigate('/main');
                }else{
                    navigate('/error');
                }
        }
        catch {
                navigate('/error');
        }
      
      }
    

    return (<form onSubmit={submitForm}>
                        <label>
                            UserName : 
                            <input type="text" value={userName} onChange={getUserName}></input>
                        </label>
                        <label>
                            Password : 
                            <input type="password" value={password} onChange={getPassword}></input>
                        </label>
                        
                        <button type="submit">Sign Up</button>
                        
            </form>
);
}