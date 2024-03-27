import { Helmet } from "react-helmet-async";
import { Link, Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Typography, Container, Box } from "@mui/material";
import { Button } from "@/components/ui/button";
import img404 from "../../assets/images/404.png";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h5" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={img404}
            sx={{ height: 160, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Link to="/" className="">
            <Button>Go Home</Button>
          </Link>
        </StyledContent>
      </Container>
    </>
  );
}
