import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed({username}) {
  const [posts,setPost]=useState([]);


  useEffect(()=>{
    const getPost=async ()=>{
      const res = username       
       ?await axios.get("/post/profile/"+username)
       :await axios.get("post/timeline/62d916f25b054932d58f77c3");

      //  const res =await axios.get("post/timeline/62d916f25b054932d58f77c3");
      setPost(res.data);
    };
    getPost();
  },[username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
