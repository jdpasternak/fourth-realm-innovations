import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const BlogPostCard = (props) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia
        sx={{ height: { md: "200px", xs: "300px" } }}
        image={`img/${props.post.slug}-1.png`}
      />
      <CardContent>
        <Typography variant="h5">{props.post.title}</Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/blog/${props.post.slug}`}
          size="small"
        >
          View Article
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogPostCard;
