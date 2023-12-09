import {useState, useEffect} from 'react';
import Post from '../post/post';

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

    return (<>
         {posts.map((post) => {
            return <Post  details={post}/>
         })}
    </>);
}

export default Feed;