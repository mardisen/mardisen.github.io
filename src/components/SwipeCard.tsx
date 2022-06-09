import type { JSX, ParentComponent, ParentProps } from 'solid-js';

// TODO: Calculate Speed
// TODO: Calculate Angle
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
