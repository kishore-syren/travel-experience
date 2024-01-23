import {useEffect, useState} from "react";
import styles from './main.module.css';
import {IPostData} from './main.types';
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Main : React.FC<{name : string}> = ({name}) : React.JSX.Element=> {
    const userName : string = useSelector((state : any) => state.user.name)
    const [total,setTotal] = useState(0);

    useEffect( () => {
      

      fetch('http://localhost:3000/postscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({userName})
      })
      .then(response => response.json())
      .then(data => setTotal(data.total) )
         
    }, [])
    
    
    

    return (
        <>
           <CgProfile className={styles['profile']}/>
           <h1>{userName}</h1>
           <h1>{total} Posts</h1>
           <Link to='/experience'>Add Experience</Link>
           <Link to='/feed'>Feed</Link>
           <Link to='/myposts'>My Posts</Link>
        </>
        );
}

export default Main;