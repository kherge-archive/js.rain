import Sound from "components/molecules/Sound";
import { Col, Container, Row } from "components/atoms/Grid";

type SoundOption = {
  /**
   * The unique identifier.
   */
  id: string;

  /**
   * The label of the sound.
   */
  label: string;

  /**
   * The initial muted state.
   */
  muted: boolean;

  /**
   * The handler for the muted state change.
   */
  onMutedChange: (muted: boolean) => void;

  /**
   * The handler for the volume level change.
   */
  onVolumeChange: (volume: number) => void;

  /**
   * The URL to the sound file.
   */
  url: string;

  /**
   * The initial volume level.
   */
  volume: number;
};

export type Props = {
  sounds: SoundOption[];
};

const View = ({ sounds }: Props) => {
  let tabIndex = 0;

  return (
    <Container fluid>
      <Row>
        <Col className="mt-3">
          {sounds.map((sound) => (
            <Sound key={sound.id} tabIndex={tabIndex++} {...sound} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default View;
