import React, { useContext, useEffect, useState } from "react";
import "./Centerbar.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Centerbar({ username }) {
  const [posts, setPosts] = useState([]);
  const {user}= useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username ?
      
         await axios.get("/api/posts/profile/" + username)
          : await axios.get("/api/posts/timeline/" +user._id);
          setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt);
        }));
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username ,user._id]);

  return (
    <div className="centerbar">
      {(!username || username === user.username) && <Share />}
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default Centerbar;
