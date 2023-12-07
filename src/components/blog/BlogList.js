import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";
import LoadingIcon from "../LoadingIcon";

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
    <Container maxWidth="md">
      <Typography variant="h1" sx={{ mb: 2 }}>
        Blog
      </Typography>
      {Items.length > 0 ? (
        Items?.map((post) => <BlogPostCard post={post} />)
      ) : (
        <LoadingIcon />
      )}
    </Container>
  );
};

export default BlogList;

/*
<li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li> 
*/
