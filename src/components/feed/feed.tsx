import {useState, useEffect} from 'react';
import Post from '../post/post';
import Styles from './feed.module.css';
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPost } from '../../types/post.types';
import { useGetPostsMutation } from '../../api/userApi';

const Feed : React.FC<{myPost : boolean}> = ({myPost}) => {
    const [posts,setPosts] = useState<IPost[]>([]);
    const userName : string = useSelector((state : any) => state.user.name);
    const [getPosts] = useGetPostsMutation();

    

    useEffect(() => {
        const body = {
            userName : myPost?userName:undefined
        }
        const getposts = async () => {
            const data = await getPosts(body).unwrap();
            setPosts(data.documents);
        }
        getposts();
    },[])

    return (<div className = {Styles.main} data-testid='main' >
             
                  {posts.map((post) => {
                    return <Post  details={post} myPost={myPost} updatePosts={setPosts} posts={posts}/>
                         })}
             
        
         </div>
    );
}

export default Feed;