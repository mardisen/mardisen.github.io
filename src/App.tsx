import type { Component } from 'solid-js';
import BaseScene from './components/BaseScene';
import SwipeCard from './components/SwipeCard';

//TODO: Use card based layout for information and animate it like tinder swipes
const App: Component = () => {
  return (
    <div class="flex flex-col">
      <div class="text-4xl text-green-700 text-center py-20 z-20 relative w-full">Hello tailwind!</div>
      <BaseScene class="z-10 absolute" />
      <SwipeCard class="z-20 relative h-24 w-24 justify-center m-auto flex items-center bg-slate-400 rounded">Card 1</SwipeCard>
    </div>
  );
};

export default App;
