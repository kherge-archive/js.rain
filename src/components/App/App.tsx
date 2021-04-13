import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Sound from "../Sound";
import Typography from "@material-ui/core/Typography";
import VolumeMute from "@material-ui/icons/VolumeMute";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { getColorScheme } from "@kherge/prefers-color-scheme";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

import "./App.css";
import { useMemo, useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    fontSize: "3rem",
    marginBottom: "0.4rem",
  },
}));

const sounds = [
  {
    label: "Rain",
    url: "static/mp3/rain.mp3",
  },
  {
    label: "Splashing",
    url: "static/mp3/splashing.mp3",
  },
  {
    label: "Storm",
    url: "static/mp3/storm.mp3",
  },
  {
    label: "Thunder",
    url: "static/mp3/thunder.mp3",
  },
  {
    label: "Window",
    url: "static/mp3/window.mp3",
  },
];

const App = () => {
  console.debug(`<App/>`);

  const [globalMute, setGlobalMute] = useState(false);

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
              <IconButton onClick={() => setGlobalMute(!globalMute)}>
                {!globalMute && <VolumeUp color="action" />}
                {globalMute && <VolumeMute color="secondary" />}
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
        {sounds.map((sound) => (
          <Sound
            key={sound.label}
            {...{
              globalMute,
              ...sound,
            }}
          />
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default App;
