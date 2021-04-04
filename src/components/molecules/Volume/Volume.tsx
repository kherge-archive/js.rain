import Button from "components/atoms/Button";
import Icon, {
  IconDefinition,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
} from "components/atoms/Icon";
import styles from "./Volume.module.scss";

type Props = {
  /**
   * The muted state.
   */
  muted: boolean;

  /**
   * The onClick event handler.
   */
  onClick: () => void;

  /**
   * The volume level.
   */
  volume: number;
};

const Volume = ({ muted, onClick, volume }: Props) => {
  let icon: IconDefinition;
  let variant = "outline-dark";

  if (muted) {
    icon = faVolumeMute;
    variant = "outline-danger";
  } else if (volume >= 50) {
    icon = faVolumeUp;
  } else if (volume > 0) {
    icon = faVolumeDown;
  } else {
    icon = faVolumeOff;
  }

  return (
    <Button className={styles.button} onClick={onClick} variant={variant}>
      <Icon icon={icon} />
    </Button>
  );
};

export default Volume;
