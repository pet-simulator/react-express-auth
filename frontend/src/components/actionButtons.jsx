import React from 'react';

function EatButton({ onClick }) {
  return <button onClick={() => onClick('Eat')}>Eat</button>;
}

function SleepButton({ onClick }) {
  return <button onClick={() => onClick('Sleep')}>Sleep</button>;
}

function PlayButton({ onClick }) {
  return <button onClick={() => onClick('Play')}>Play</button>;
}

function BatheButton({ onClick }) {
  return <button onClick={() => onClick('Bathe')}>Bathe</button>;
}

export { EatButton, SleepButton, PlayButton, BatheButton };
