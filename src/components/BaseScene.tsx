import type { Component } from 'solid-js';
import { WebGLRenderer, PerspectiveCamera, Scene, LineBasicMaterial, Vector3, BufferGeometry, Line } from 'three';

type Props = {
    class: string;
};

const BaseScene: Component<Props> = (props: Props) => {
    const renderer = new WebGLRenderer();

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new Scene();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0xffffff, 0);
    renderer.render(scene, camera);
    renderer.domElement.className = props.class;
    return renderer.domElement;
};

export default BaseScene;
