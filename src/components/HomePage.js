import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { data } from "../static.js";

const HomePage = () => {
  const homePageData = data.pages.find((x) => x.name === "Home Page");
  useEffect(() => {
    console.log(homePageData);
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            {homePageData.heading}
          </Typography>
        </Box>

        {homePageData.sections.map((section, i) => {
          return (
            <Box sx={{ my: 4 }} key={i}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {section.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {section.content}
              </Typography>
              {section.button && (
                <Button
                  variant={section.button.variant}
                  color="primary"
                  href={section.button.href}
                >
                  {section.button.text}
                </Button>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default HomePage;
