import {IPost} from '../../types/post.types'
import Styles from "./post.module.css";

const Post : React.FC<{details : IPost}> = ({details}) : React.JSX.Element => {
    return (
        <div >
           <label>Country : {details.country}</label>
           <label>Place : {details.place}</label>
           <label>Date : {details.date}</label>
           <label>Experience : {details.experience}</label>
           <label>Images : {
                 details.files.map((url) => {
                    return <img src={url} width='100px' height="100px" />
                 })}
           </label>

        </div>
    );
}

export default Post;