import { Container, Typography } from "@mui/material";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useBlogContent = (slug) => {
  const [blogContent, setBlogContent] = useState();
  const bucket = "fourthrealminnovations";
  const key = slug;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://s47hgo1zcb.execute-api.us-east-1.amazonaws.com/blogContent?bucket=${bucket}&key=${key}.md`
      );
      console.log("response", response);
      const data = await response.json();
      console.log(data);
      setBlogContent(data);
    };
    fetchData();
  }, []);
  return blogContent;
};

const BlogPost = () => {
  let { slug } = useParams();
  const blogContent = useBlogContent(slug);

  return (
    <Container>
      <h1>Blog Post</h1>
      <p>Now showing post: {slug}</p>
      {blogContent ? (
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(marked.parse(blogContent)),
          }}
        />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default BlogPost;
