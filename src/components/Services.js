import React from "react";
import { data } from "../static.js";
import { Box, Grid, Paper, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

const ServiceItem = React.memo(({ service }) => {
  const Icon = Icons[service.iconName] || Icons.Computer; // Replace DefaultIcon with an actual default icon

  return (
    <Box sx={{ my: 4 }}>
      <Box display="flex" alignItems={"center"}>
        <Icon alt={`${service.name} icon`} sx={{ mb: 2 }} />
        &nbsp;
        <Typography variant="h5" sx={{ mb: 2 }}>
          {service.name}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {service.bullets.map((bullet, index) => (
          <Grid
            key={index} // Ideally, replace this with a unique identifier
            item
            xs={12}
            lg={4}
            display={"flex"}
            justifyContent={"center"}
          >
            <Paper elevation={3} sx={{ maxWidth: "75%", p: 5 }}>
              <Typography variant="body1">{bullet}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

const Services = () => {
  const servicesData = data.pages.find((x) => x.name === "Services");

  if (!servicesData) {
    return <div>Loading or error message...</div>; // Replace with an actual loading or error message
  }

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
      {servicesData.list.map((service, i) => (
        <ServiceItem key={service.id || i} service={service} />
      ))}
    </>
  );
};

export default Services;
