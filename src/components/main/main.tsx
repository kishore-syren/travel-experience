import {useEffect, useState} from "react";
import Styles from './main.module.css';
import {IPostData} from './main.types';
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCountPostsMutation } from "../../api/userApi";

const Main : React.FC = () : React.JSX.Element=> {
    const userName : string = useSelector((state : any) => state.user.name)
    const profileURL: string = useSelector((state : any) => state.user.pic)
    const [total,setTotal] = useState(0);
    const [countPosts] =useCountPostsMutation();

    useEffect(() => {
      const count = async () => {
             const data = await countPosts({userName}).unwrap();
             setTotal(data.total);
      };
      count();    
    }, [])
  
    return (
        <>
           {/* <CgProfile className={styles['profile']}/> */}
           <img src={profileURL} alt='image not found' title="profile" width={150} height={150}/>
           <h1>{userName}</h1>
           <h1>{total} Posts</h1>
           <Link to='/experience'>Add Experience</Link>
           <Link to='/feed'>Feed</Link>
           <Link to='/myposts'>My Posts</Link>
        </>
        );
}

export default Main;