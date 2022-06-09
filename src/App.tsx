import type { Component } from 'solid-js';
import BaseScene from './components/BaseScene';

//TODO: Use card based layout for information and animate it like tinder swipes
const App: Component = () => {
  return (
    <div class="relative">
      <div class="text-4xl text-green-700 text-center py-20 z-20 absolute w-full">Hello tailwind!</div>
      <div class="relative z-10">
        <BaseScene class="z-10 relative" />
      </div>
    </div>
  );
};

export default App;
