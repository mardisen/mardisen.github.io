import type { JSX, ParentComponent, ParentProps } from 'solid-js';

// TODO: Calculate Speed DONE
// TODO: Calculate Angle DONE
// TODO: Animate basic Drag
    // TODO: Define transition
    // TODO: Define animation
// TODO: Animate on release
// TODO: Animate bring back

type Props = {
    class?: string;
};

type Coordinate = {
    x: number;
    y: number;
};

type Speed = Coordinate;

type TemporalCoordinate = Coordinate & {
    timestamp: number;
};

const calcSpeed = (oldCoords: TemporalCoordinate, newCoords: TemporalCoordinate): Speed => {
    const deltaX = newCoords.x - oldCoords.x;
    const deltaY = oldCoords.y - newCoords.y;
    const deltaT = (newCoords.timestamp - oldCoords.timestamp) / 1000;

    const x = deltaX / deltaT;
    const y = deltaY / deltaT;

    return { x, y };
};

const pythagoras = (coords: Coordinate): number => {
    return Math.sqrt(Math.pow(coords.x, 2) + Math.pow(coords.y, 2));
};

const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
    (event) => {
        console.info(event.clientX, event.clientY);
    };

const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> =
    (event) => {
        console.info(event.touches[0].clientX, event.touches[0].clientY);
    };

const SwipeCard: ParentComponent<Props> = (props: ParentProps<Props>) => {


    return <div
        class={props.class}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
    >
        {props.children}
    </div>;
};

export default SwipeCard;
