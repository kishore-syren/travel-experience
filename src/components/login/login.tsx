import {useState} from  "react";
import {useNavigate} from "react-router-dom";

const  Login : React.FC= () : React.JSX.Element => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const getUserName = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        console.log(e.target.value);
    }

    const getPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
         

    const submitForm = async (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();//prevent deafult reloading of page when form is submitted
        console.log("form submitted");
        const credentails = {userName,password};
        setPassword("");
        setUserName("");
        try {
                const response = await fetch('http://localhost:3000/login',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentails)
                });
                const data = await response.json();
                if (data.exist){
                    navigate('/main');
                }else{
                    navigate('/error');
                }
        }
        catch {
                navigate('/error');
                console.log("hi");
        }
      
      }
    

    return (<form  onSubmit={submitForm}>
                        <label>
                            UserName : 
                            <input type="text" value={userName} onChange={getUserName}></input>
                        </label>
                        <label>
                            Password : 
                            <input type="password" value={password} onChange={getPassword}></input>
                        </label>
                        
                        <button type="submit">Login</button>
                        
            </form>
);
}

export default Login;