import type { Component } from 'solid-js';
import BaseScene from './components/BaseScene';

const App: Component = () => {
  return (<>
    <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
    <BaseScene />
  </>

  );
};

export default App;
