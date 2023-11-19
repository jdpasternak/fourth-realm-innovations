import { React } from "react";
import { data } from "../static.js";
import { Box, Grid, Paper, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

const Services = () => {
  const servicesData = data.pages.find((x) => x.name === "My Services");
  //   let Icon = {};
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {servicesData.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {servicesData.introduction}
        </Typography>
      </Box>
      {servicesData.list.map((service, i) => {
        // Icon = Icons[service.iconName];
        return (
          <Box sx={{ my: 4 }} key={i}>
            <Box display="flex" alignItems={"center"}>
              {/* <Icon /> */}
              {/* &nbsp; */}
              <Typography variant="h5" sx={{ mb: 2 /*textAlign: "center"*/ }}>
                {service.name}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {service.bullets.map((bullet) => {
                return (
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Paper
                      elevation={3}
                      sx={{ maxWidth: "75%", p: 5 }}
                      display="flex"
                      justifyContent="center"
                    >
                      <Typography variant="body1">{bullet}</Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

export default Services;
