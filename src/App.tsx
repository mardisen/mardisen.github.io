import type { Component } from 'solid-js';
import BaseScene from './components/BaseScene';
import SwipeCard from './components/swipe-card';
import { SwipeCardRef } from './components/swipe-card/types';

const App: Component = () => {
  const swipeCardRef: SwipeCardRef = {};

  return (
    <div class="flex flex-col">
      <div class="text-4xl text-green-700 text-center py-20 relative w-full">Hello tailwind!</div>
      <BaseScene class="z-[-10] absolute" />
      <SwipeCard
        apiRef={swipeCardRef}
        class="z-10 relative h-24 w-24 justify-center m-auto flex items-center bg-slate-400 rounded"
      >Card 1</SwipeCard>
      <button onClick={swipeCardRef.bringBack}>Bring Back</button>
    </div>
  );
};

export default App;
