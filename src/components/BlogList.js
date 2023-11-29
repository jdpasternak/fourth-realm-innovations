import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useBlogList = () => {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/blogs"
        );
        if (response.ok) {
          setBlogList(await response.json());
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };
    fetchData();
  }, []);
  console.log(blogList, blogList.length);
  return blogList;
};

const BlogList = (props) => {
  const Items = useBlogList();

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {Items.length > 0 ? (
          Items?.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </ul>
    </div>
  );
};

export default BlogList;
