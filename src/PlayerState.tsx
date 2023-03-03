import { observer } from 'mobx-react-lite';
import React from 'react';
import './App.css';
import Tank from './Tank';

const PlayerState = observer((props:{ player: Tank }) => <span>Life: {props.player.life}</span>)

export default PlayerState;
