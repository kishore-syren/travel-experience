import {IPost} from '../../types/post.types'
import Styles from "./post.module.css";
import { FaLocationDot } from "react-icons/fa6";
import {useState} from "react";
import PopUpModal from '../popUpModal/popUpModal.tsx';
import { useSelector } from 'react-redux';
import { useDeletePostMutation } from '../../api/userApi.ts';


const Post : React.FC<{details : IPost, myPost : boolean, updatePosts : Function, posts : IPost[]}> = ({details, myPost, updatePosts, posts}) : React.JSX.Element => {
    const userName = useSelector((state : any) => state.user.name);
    const [show, setShow] = useState<boolean>(false);
    const [deletepost] = useDeletePostMutation();

    const unHideModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    const deletePost = async (e : React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
          const body = {
              id : details._id
          }

        //   const response = await fetch('http://localhost:3000/deletepost',{
        //                                     method : 'POST',
        //                                     headers : {
        //                                         'Content-Type' : 'application/json'
        //                                     },
        //                                     body : JSON.stringify(body)
        //                           })
        //   const data = await response.json()
          const data = await deletepost(body).unwrap();
          if (data.deleted){
            const newPosts = posts.filter((post) => post._id !== details._id);
            
            updatePosts(newPosts);
            setTimeout(() => alert('Post deleted successfully'), 500);
            
          } else {
            alert('post delete unsuccessful');
          }
    }

    return (
        <div className={Styles.main}>
          <div className={Styles["flex-container"]}>
                <div className = {Styles.container}>
                    <div>
                        <FaLocationDot className ={Styles.icon} /> 
                    </div>
                    <p className={Styles.location}>{details.place +","+  details.state + "," + details.country}</p>
                </div>
                <p>{details.date}</p>
          </div>
           
           <p>{details.experience}</p>
           <div onClick = {unHideModal}>
                    <label>Images : {
                            details.files.map((url) => {
                                return <img src={url} width={200} height={200} />
                            })}
                    </label>
           </div>
           <h1>Posted by {details.user} </h1>
           {myPost && <button onClick={deletePost}>Delete</button>}

           <PopUpModal show={show} onHide={hideModal} modalHeader={details.place} imageURL={details.files}/>

        </div>
    );
}

export default Post;