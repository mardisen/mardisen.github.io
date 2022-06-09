import type { JSX, ParentComponent, ParentProps } from 'solid-js';

type Props = {
    class?: string;
};

const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
    (event) => {
        console.info(event.clientX, event.clientY);
    };

const SwipeCard: ParentComponent<Props> = (props: ParentProps<Props>) => {
    return <div
        class={props.class}
        onMouseMove={onMouseMove}
    >
        {props.children}
    </div>;
};

export default SwipeCard;
