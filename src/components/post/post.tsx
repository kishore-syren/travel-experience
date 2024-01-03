import {IPost} from '../../types/post.types'
import Styles from "./post.module.css";
import { FaLocationDot } from "react-icons/fa6";
import {useState} from "react";
import PopUpModal from '../popUpModal/popUpModal.tsx';


const Post : React.FC<{details : IPost}> = ({details}) : React.JSX.Element => {
    const [show, setShow] = useState<boolean>(false);

    const unHideModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
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

           <PopUpModal show={show} onHide={hideModal} modalHeader={details.place} imageURL={details.files}/>

        </div>
    );
}

export default Post;