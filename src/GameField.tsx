import React from 'react';
import './App.css';

function GameField(props: { gameField:number[][]}) {
  return (
      <table>
        <tbody>
          {props.gameField.map((items, index) => {
            return (
            <tr>
              {items.map((subItem, index) => {
                let cellType = "";
                switch (subItem)
                {
                  case 1: cellType = "bg-red";
                  break;
                  case 2: cellType = "bg-black";
                  break;
                }
                return (
                  <td className={cellType}></td>
                  );})}
            </tr>
          );})}
        </tbody>
      </table>
  );
}

export default GameField;
