import React, { useState } from "react";
import "./postlist.css";
import { useFetch } from "../../hooks/use_fetch";

const PostCard = ({ title, description }) => {
  return (
    <div className="postcard">
      <h2 className="postcard_text">{title}</h2>
      <hr />
      <p className="postcard_content">{description}</p>
    </div>
  );
};

const LIMIT = 6;

const PostList = () => {
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);

  const url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
  const { data, loading, error, retry } = useFetch(url);

  return (
    <div className="posts_wrapper">
      <h1>Posts</h1>

      {data?.posts.map((post) => (
        <PostCard key={post.id} title={post.title} description={post.body} />
      ))}

      {loading && <p className="loader">Loading...</p>}

      {error && (
        <div className="error_card">
          <p className="error_text">{error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <button
          className="loadMoreBtn"
          onClick={() => setSkip((prev) => prev + limit)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
