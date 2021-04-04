import Form from "components/atoms/Form";
import Volume from "../Volume";
import styles from "./View.module.scss";
import { Col, Row } from "components/atoms/Grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Props = {
  /**
   * The unique identifier.
   */
  id: string;

  /**
   * The display label for the sound.
   */
  label: string;

  /**
   * The muted state.
   */
  muted: boolean;

  /**
   * The callback to handle mute state changes.
   */
  onMuted: (muted: boolean) => void;

  /**
   * The callbakc to handle volume changes.
   */
  onVolume: OnVolume;

  /**
   * The tab index for the input field.
   */
  tabIndex?: number;

  /**
   * The volume level.
   */
  volume: number;
};

/**
 * A function that accepts a new muted state.
 */
type OnMuted = (muted: boolean) => void;

/**
 * A function that accepts a new volume level.
 */
type OnVolume = (volume: number) => void;

/**
 * A function that sets the muted state.
 */
type SetMuted = Dispatch<SetStateAction<boolean>>;

/**
 * A function that set the volume level.
 */
type SetVolume = Dispatch<SetStateAction<number>>;

/**
 * Process the mute state change and maintains synchronization.
 *
 * @param setMuted The muted state manager.
 * @param onMuted  The muted callback.
 * @param muted    The current muted state.
 */
const handleMuted = (
  setMuted: SetMuted,
  onMuted: OnMuted,
  muted: boolean
) => () => {
  setMuted(!muted);
  onMuted(!muted);
};

/**
 * Processes the volume change and maintains synchronization.
 *
 * @param setVolume The volume state manager.
 * @param onVolume  The volume callback.
 */
const handleVolume = (setVolume: SetVolume, onVolume: OnVolume) => (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  let value: number = 0;

  if (event.target.value) {
    value = parseInt(event.target.value);

    if (isNaN(value)) {
      value = 0;
    }
  }

  setVolume(value);
  onVolume(value);
};

const View = ({ id, label, onMuted, onVolume, tabIndex, ...props }: Props) => {
  const [muted, setMuted] = useState(props.muted);
  const [volume, setVolume] = useState(props.volume);

  useEffect(() => {
    document.querySelectorAll("input").forEach((input) => {
      input.onkeydown = (event) => {
        if (event.key === "Escape") {
          (event.target as HTMLInputElement).blur();
        }
      };
    });
  }, [id]);

  return (
    <Row>
      <Col className="pt-1 text-right" xs={3}>
        <Form.Label className={styles.label} htmlFor={`${id}-input`}>
          {label}
        </Form.Label>
      </Col>
      <Col className="pt-2">
        <Form.Control
          disabled={muted}
          onChange={handleVolume(setVolume, onVolume)}
          max="100"
          min="0"
          tabIndex={tabIndex}
          type="range"
          value={volume}
        />
      </Col>
      <Col className="px-0" xs={3}>
        <div className={styles.container}>
          <Volume
            muted={muted}
            onClick={handleMuted(setMuted, onMuted, muted)}
            tabIndex={(tabIndex ?? 0) + 100}
            volume={volume}
          />
        </div>
        <div className={styles.container}>
          <Form.Control
            className={styles.input}
            disabled={muted}
            id={`${id}-input`}
            onChange={handleVolume(setVolume, onVolume)}
            tabIndex={(tabIndex ?? 0) + 1000}
            value={volume}
          />
        </div>
      </Col>
    </Row>
  );
};

export default View;
