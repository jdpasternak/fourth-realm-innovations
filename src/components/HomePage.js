import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Paper, Grid } from "@mui/material";
import { data } from "../static.js";
import { Link } from "react-router-dom";

const useHomePageData = () => {
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    const fetchedData = data.pages.find((x) => x.name === "Home Page");
    setHomePageData(fetchedData);
  }, []);

  return homePageData;
};

const HomePageSection = React.memo(({ section, i }) => {
  const ImageGridItem = ({ section, reverse }) => {
    return (
      <Grid
        item
        lg={5}
        sx={{ display: "flex", justifyContent: "center", mr: { xs: 0, lg: 2 } }}
      >
        <Paper
          component={"img"}
          src={`/img/${section.title.replace("?", "")}.png`}
          sx={{ maxWidth: "100%", mr: { xs: 0, lg: 2 } }}
        />
      </Grid>
    );
  };

  const TextGridItem = ({ section, reverse }) => {
    return (
      <Grid item lg={5} sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            mr: { xs: 0, lg: 2 },
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: "justify" }}>
            {section.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
            {section.content}
          </Typography>
          {section.button && (
            <Button
              variant={section.button.variant}
              color="primary"
              disabled={section.button.disabled}
              component={Link}
              to={section.button.to}
            >
              {section.button.text}
            </Button>
          )}
        </Box>
      </Grid>
    );
  };
  return (
    // <Box sx={{ my: 4, display: "flex" }}>
    <Grid
      container
      spacing={2}
      sx={{
        my: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: { lg: "row", xs: i % 2 === 0 ? "row" : "row-reverse" },
      }}
    >
      {i % 2 === 0 ? (
        <>
          <ImageGridItem section={section} />
          <TextGridItem section={section} />
        </>
      ) : (
        <>
          <TextGridItem section={section} reverse />
          <ImageGridItem section={section} reverse />
        </>
      )}
    </Grid>

    // </Box>
  );
});

const HomePage = () => {
  const homePageData = useHomePageData();

  if (!homePageData) {
    return;
  }

  return (
    <Container>
      {!homePageData ? (
        <Typography variant={"h5"}>Loading...</Typography>
      ) : (
        <Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom textAlign={"center"}>
              {homePageData.heading}
            </Typography>
          </Box>

          {homePageData.sections.map((section, i) => (
            <HomePageSection
              key={section.id || section.title}
              section={section}
              i={i}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
