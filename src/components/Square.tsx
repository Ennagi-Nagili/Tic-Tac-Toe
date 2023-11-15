import { useState } from 'react';

export const Square = (props: {value: string, onSquareClick: () => void}) => {

    return <button className="square" onClick={props.onSquareClick}>{props.value}</button>;
}