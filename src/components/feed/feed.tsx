import {useState, useEffect} from 'react';
import Post from '../post/post';
import Styles from './feed.module.css';
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPost } from '../../types/post.types';

const Feed : React.FC<{myPost : boolean}> = ({myPost}) => {
    const [posts,setPosts] = useState<IPost[]>([]);
    const userName : string = useSelector((state : any) => state.user.name)

    

    useEffect(() => {
        const body = {
            userName : myPost?userName:undefined
        }

        fetch('http://localhost:3000/feed',{
            method : 'POST',
            body : JSON.stringify(body),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
               setPosts(data.documents);
        });
    },[])

    return (<div className = {Styles.main} data-testid='main' style = {{backgroundColor : 'red'}}>
             
                  {posts.map((post) => {
                    return <Post  details={post} myPost={myPost} updatePosts={setPosts} posts={posts}/>
                         })}
             
        
         </div>
    );
}

export default Feed;