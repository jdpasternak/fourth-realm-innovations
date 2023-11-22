import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { data } from "../static.js";
import ApplicationContext from "../Context.js";

const useHomePageData = () => {
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    const fetchedData = data.pages.find((x) => x.name === "Home Page");
    setHomePageData(fetchedData);
  }, []);

  return homePageData;
};

const HomePageSection = React.memo(({ section }) => {
  const handleSetCurrentPage = (component) => {
    window.scrollTo(0, 0);
    setCurrentPage(() => component);
  };

  const { setCurrentPage } = useContext(ApplicationContext);
  return (
    <Box sx={{ my: 4 }}>
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
          onClick={() => handleSetCurrentPage(section.button.linkComponent)}
        >
          {section.button.text}
        </Button>
      )}
    </Box>
  );
});

const HomePage = () => {
  const homePageData = useHomePageData();

  if (!homePageData) {
    return;
  }

  return (
    <>
      {!homePageData ? (
        <Typography variant={"h5"}>Loading...</Typography>
      ) : (
        <Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
              {homePageData.heading}
            </Typography>
          </Box>

          {homePageData.sections.map((section) => (
            <HomePageSection
              key={section.id || section.title}
              section={section}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default HomePage;
