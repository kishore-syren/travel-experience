import {useState} from  "react";
import {useNavigate} from "react-router-dom";
import Styles from './signUp.module.css';
import {  useDispatch } from "react-redux";
import {getUser} from '../../slices/user.ts'; // ../../  --->move up 2 levels,  ./ --->same directory,   ../ --->move up 1 level

const SignUp : React.FC<{name : string, updateUser : Function}> = ({name , updateUser}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserName = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
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
                const response = await fetch('http://localhost:3000/signup',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentails)
                });
                const data = await response.json();
                if ('userName' in data){
                    updateUser(data.userName);
                    dispatch(getUser(data.userName));
                    window.alert('succesfully signed up');
                    navigate('/main');
                } else {
                    window.alert('username already in use');
                }
        }
        catch {
                navigate('/error');
        }
      
      }
    

    return (
            <form onSubmit={submitForm} className={Styles['form']}>
                     <div>
                        <label> UserName : </label>
                        <input type="text" value={userName} onChange={getUserName}></input>
                     </div>
                     <div>
                        <label> Password : </label>
                        <input type="password" value={password} onChange={getPassword}></input>
                     </div>
                     <button type="submit">Sign Up</button>
            </form>
           );
}

export default SignUp;