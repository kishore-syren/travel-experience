import {useState} from  "react";
import {useNavigate} from "react-router-dom";
import { getUser } from "../../slices/user";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "../../api/userApi";

const  Login : React.FC = () : React.JSX.Element => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userLogin ] = useUserLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                const data = await userLogin(credentails).unwrap();
                if (data.exist){
                    dispatch(getUser({data : data.userName, pic : data.url}));
                    navigate('/main');
                }else{
                    window.alert('user with given credentails not found')
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