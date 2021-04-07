import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeMute";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";

/**
 * Handles the change on volume level or being muted.
 *
 * @param volume The changed volume level.
 * @param muted  The changed mute state.
 */
export type OnChange = (volume: number, muted: boolean) => void;

export type Props = {
  /**
   * The unique identifier.
   */
  id: string;

  /**
   * The label for the sound.
   */
  label: string;

  /**
   * The initial muted state.
   */
  mute: boolean;

  /**
   * The volume level and muted state change handler.
   */
  onChange: OnChange;

  /**
   * The initial volume level.
   */
  volume: number;
};

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
  },
  volumeUp: {
    padding: "12px",
  },
}));

const View = ({ id, label, mute, onChange, volume }: Props) => {
  console.debug(
    `<Sound.View id="${id}" label="${label}" mute="${mute}" volume="${volume}"/>`
  );

  const ref = useRef<HTMLElement>(null);
  const styles = useStyles();

  // Show slider label on mouse over.
  const [showLabel, setShowLabel] = useState<"auto" | "on" | "off">("auto");

  useEffect(() => {
    if (ref.current) {
      ref.current.onmouseout = () => {
        setShowLabel("auto");
      };

      ref.current.onmouseover = () => {
        setShowLabel("on");
      };
    }
  }, [id, setShowLabel, showLabel]);

  // Allow scroll wheel to adjust the slider.
  useEffect(() => {
    if (ref.current) {
      ref.current.onwheel = (event) => {
        if (event.deltaY !== 0) {
          const sign = event.deltaY > 0 ? 1 : -1;
          const speed = 1;

          onChange(volume - speed * sign, mute);
        }
      };
    }
  }, [mute, onChange, ref, volume]);

  const handleMute = () => {
    onChange(volume, !mute);
  };

  const handleVolume = (_: any, value: any) => {
    onChange(value, mute);
  };

  return (
    <Box>
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={2} md={1}>
          <Typography
            align="right"
            className={styles.label}
            color={mute ? "textSecondary" : "textPrimary"}
            gutterBottom
            id={id}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleMute}>
            {!mute && <VolumeDown color="action" />}
            {mute && <VolumeMute color="secondary" />}
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            aria-labelledby={id}
            disabled={mute}
            onChange={handleVolume}
            ref={ref}
            value={volume}
            valueLabelDisplay={showLabel}
          />
        </Grid>
        <Grid item>
          <Box className={styles.volumeUp}>
            <VolumeUp color="action" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default View;
