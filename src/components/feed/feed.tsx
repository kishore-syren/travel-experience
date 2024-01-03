import {useState, useEffect} from 'react';
import Post from '../post/post';
import Styles from './feed.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
    const [posts,setPosts] = useState([]);

    

    useEffect(() => {
        fetch('http://localhost:3000/feed',{
            method : 'GET'
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
                    return <Post  details={post}/>
                         })}
             
        
         </div>
    );
}

export default Feed;