import {useState} from  "react";
import {useNavigate} from "react-router-dom";
import Styles from './signUp.module.css';
import {  useDispatch } from "react-redux";
import {getUser} from '../../slices/user.ts'; // ../../  --->move up 2 levels,  ./ --->same directory,   ../ --->move up 1 level
import { useUserSignUpMutation } from "../../api/userApi.ts";

const SignUp : React.FC = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [addUser, response] = useUserSignUpMutation();
    const [pic, setPic] = useState<File>({} as File);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserName = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const getPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const updatePic = (e : React.ChangeEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        if (element.files){
            setPic(element.files[0]);
        }
        
    }         

    const submitForm = async (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();//prevent deafult reloading of page when form is submitted
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append(pic.name, pic);
        
        setPassword("");
        setUserName("");
        try {
                // const response = await fetch('http://localhost:3000/signup',{
                //     method : 'POST',
                //     body: formData
                // });
                // const data = await response.json();
                const response = await addUser(formData).unwrap();
                if ('userName' in response){
                    dispatch(getUser({data : response.userName, pic : response.url}));
                    window.alert('succesfully signed up');
                    navigate('/main');
                } else {
                    window.alert('username already in use');
                }
        }
        catch (error) {
                console.log(error);
                navigate('/error');
        }
      
      }
    

    return (
            <form onSubmit={submitForm} className={Styles['form']}>
                     <div>
                        <label> UserName : </label>
                        <input type="text" value={userName} onChange={getUserName} required></input>
                     </div>
                     <div>
                        <label> Password : </label>
                        <input type="password" value={password} onChange={getPassword} required></input>
                     </div>
                     <div>
                        <label>Profile Pic : </label>
                        <input type='file' multiple={false}  accept=".png, .jpg, .jpeg" onChange={updatePic} required></input>
                     </div>
                     <button type="submit">Sign Up</button>
            </form>
           );
}

export default SignUp;