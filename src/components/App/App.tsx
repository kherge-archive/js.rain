import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Sound from "../Sound";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "3rem",
    marginBottom: "0.4rem",
  },
}));

const App = () => {
  console.debug(`<App/>`);

  const styles = useStyles();

  return (
    <Container disableGutters={true}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            align="center"
            className={styles.title}
            component="h1"
            variant="h1"
          >
            Rain
          </Typography>
        </Grid>
      </Grid>
      <Sound label="Rain" />
      <Sound label="Splashing" />
      <Sound label="Storm" />
      <Sound label="Thunder" />
      <Sound label="Window" />
    </Container>
  );
};

export default App;
