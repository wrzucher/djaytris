import { observer } from 'mobx-react-lite';
import './App.css';
import PacMan from './PacMan';

const PacManState = observer((props:{ pacman: PacMan }) => {
    if (props.pacman.life === 0) {
        return <span>YOU DIED!</span>
    }

    return <span>Pacman life: {props.pacman.life}</span>
});

export default PacManState;
