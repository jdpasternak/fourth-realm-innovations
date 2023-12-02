import React, { useState } from "react";
import { data } from "../static.js";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material";

const ServiceCard = (props) => {
  return (
    <Card sx={{}}>
      <CardMedia
        component="img"
        alt=""
        aria-hidden
        height="400"
        image={`/img/${props.service.name}.png`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.service.name}
        </Typography>
        <Typography component="ul" color="text.secondary">
          {props.service.bullets.map((bullet) => (
            <Typography component={"li"}>{bullet}</Typography>
          ))}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

const ServiceListItem = React.memo(({ service }) => {
  const Icon = Icons[service.iconName] || Icons.Computer; // Replace DefaultIcon with an actual default icon
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon alt={`${service.name} icon`} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h5" sx={{}}>
            {service.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {service.bullets.map((bullet) => (
            <ListItem>
              <ListItemText>{bullet}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
});

const ServicesPage = () => {
  const servicesData = data.pages.find((x) => x.name === "Services");

  if (!servicesData) {
    return <div>Loading or error message...</div>; // Replace with an actual loading or error message
  }

  return (
    <Container maxWidth={"md"} sx={{ mb: 2 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {servicesData.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {servicesData.introduction}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {servicesData.list.map((service, i) => (
          // <ServiceListItem key={service.id || i} service={service} />
          <Grid item xs={12} lg={6}>
            <ServiceCard key={service.id || i} service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServicesPage;
