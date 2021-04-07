import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Sound from "../Sound";
import Typography from "@material-ui/core/Typography";
import { getColorScheme } from "@kherge/prefers-color-scheme";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

import "./App.css";
import { useMemo } from "react";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: "3rem",
    marginBottom: "0.4rem",
  },
}));

const App = () => {
  console.debug(`<App/>`);

  const scheme = getColorScheme();
  const styles = useStyles();
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: scheme,
        },
      }),
    [scheme]
  );

  return (
    <ThemeProvider theme={theme}>
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
        <Sound label="Rain" url="static/mp3/rain.mp3" />
        <Sound label="Splashing" url="static/mp3/splashing.mp3" />
        <Sound label="Storm" url="static/mp3/storm.mp3" />
        <Sound label="Thunder" url="static/mp3/thunder.mp3" />
        <Sound label="Window" url="static/mp3/window.mp3" />
      </Container>
    </ThemeProvider>
  );
};

export default App;
