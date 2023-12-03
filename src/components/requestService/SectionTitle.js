import { Grid, Typography } from "@mui/material";

const SectionTitle = (props) => {
  return (
    <Grid item xs={12}>
      <Typography variant={"h5"}>{props.children}</Typography>
    </Grid>
  );
};

export default SectionTitle;
