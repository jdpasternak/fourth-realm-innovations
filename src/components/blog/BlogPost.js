import { Container, Typography } from "@mui/material";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShareBar from "./ShareBar";
import LoadingIcon from "../LoadingIcon";

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
      console.log(data.trim());
      setBlogContent(data.trim());
    };
    fetchData();
  }, []);
  return blogContent;
};

const BlogPost = () => {
  let { slug } = useParams();
  const blogContent = useBlogContent(slug);

  return (
    <Container maxWidth="md">
      <ShareBar slug={slug} />
      {blogContent ? (
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(blogContent),
          }}
        />
      ) : (
        <LoadingIcon />
      )}
    </Container>
  );
};

export default BlogPost;
