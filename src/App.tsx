import type { Component } from 'solid-js';
import BaseScene from './components/BaseScene';
import SwipeCard from './components/SwipeCard';

//TODO: Use card based layout for information and animate it like tinder swipes
const App: Component = () => {
  return (
    <div class="relative">
      <div class="text-4xl text-green-700 text-center py-20 z-20 absolute w-full">Hello tailwind!</div>
      <BaseScene class="z-10 relative" />
    </div>
  );
};

export default App;
