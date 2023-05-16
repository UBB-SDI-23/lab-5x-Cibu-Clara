import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const Statistics = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button style={{color:"#72648B", border: '1px solid #C8BEEA'}} component={Link} sx={{ mr: 3 }} to="/statistics/artists-ordered">
        Artists ordered by the average number of views of their performances
      </Button>


      <Button style={{color:"#72648B", border: '1px solid #C8BEEA'}} component={Link} sx={{ mr: 3 }} to="/statistics/songs-ordered">
       Songs ordered by the number of performances
      </Button>

    </Container>

  );
};