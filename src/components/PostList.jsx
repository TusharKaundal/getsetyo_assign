import React from "react";
import { useFetch } from "../hooks/use_fetch";
import "./postlist.css";
const PostCard = ({ title, description }) => {
  return (
    <div className="postcard">
      <h2 className="postcard_text">{title}</h2>
      <hr />
      <p className="postcard_content">{description}</p>
    </div>
  );
};

const PostList = () => {
  const { data, error, loading, retry } = useFetch(
    "https://dummyjson.com/posts/search?q=love"
  );
  if (loading) {
    return (
      <div className="loader">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error_card">
        <p className="error_text">Error while loading posts.</p>
        <button className="error_btn" onClick={retry}>
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="posts_wrapper">
      <h1>Posts</h1>

      {data?.posts.map((post) => (
        <PostCard key={post.id} title={post.title} description={post.body} />
      ))}
    </div>
  );
};

export default PostList;
