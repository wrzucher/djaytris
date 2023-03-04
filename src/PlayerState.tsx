import { observer } from 'mobx-react-lite';
import React from 'react';
import './App.css';
import Tank from './Tank';

const PlayerState = observer((props:{ player: Tank }) => {
    if (props.player.life === 0) {
        return <span>YOU DIED!</span>
    }

    return <span>Tank life: {props.player.life}</span>
});

export default PlayerState;
