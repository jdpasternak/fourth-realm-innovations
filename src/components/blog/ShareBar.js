import { Email, Facebook, LinkedIn, Share, Twitter } from "@mui/icons-material";
import { Box, Button, ButtonGroup } from "@mui/material";

const ShareBar = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <ButtonGroup variant="contained" aria-label="share button group">
        <Button
          sx={{ p: 1 }}
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://www.fourthrealminnovations.com/blog/${props.slug}`
              )}`
            );
          }}
        >
          <Facebook />
        </Button>
        <Button
          sx={{ p: 1 }}
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=Check+out+this+article+by+@FourthRealmTech&url=${encodeURIComponent(
                `https://www.fourthrealminnovations.com/blog/
                  ${props.slug}`
              )}`
            );
          }}
        >
          <Twitter />
        </Button>
        <Button
          sx={{ p: 1 }}
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `https://www.fourthrealminnovations.com/blog/
                  ${props.slug}`
              )}`
            );
          }}
        >
          <LinkedIn />
        </Button>
        <Button
          sx={{ p: 1 }}
          component="a"
          href={`mailto:?subject=${encodeURIComponent(
            "Article from Fourth Realm Innovations"
          )}&body=${encodeURIComponent(
            `I just read this super informative tech article from Fourth Realm Innovations.  You've got to check it out!\n\nhttps://www.fourthrealminnovations.com/blog/${props.slug}`
          )}`}
        >
          <Email />
        </Button>
        <Button
          sx={{ p: 1 }}
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: "Fourth Realm Innovations",
                  url: "https://www.fourthrealminnovations.com",
                })
                .then(() => {
                  console.log("Thanks for sharing!");
                })
                .catch(console.error);
            }
          }}
        >
          <Share />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ShareBar;
