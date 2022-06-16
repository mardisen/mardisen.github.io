import { createMemo, createSignal, JSX, ParentComponent, ParentProps } from 'solid-js';

// TODO: Calculate Speed DONE
// TODO: Calculate Angle DONE
// TODO: Animate basic Drag DONE
// TODO: Define transition DONE
// TODO: Define animation
// TODO: Animate on release
// TODO: Animate bring back
// TODO: Optional: Try using onDrag events

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

const mouseCoordinates = (event: MouseEvent): Coordinate => ({ x: event.clientX, y: event.clientY });
const touchCoordinates = (event: TouchEvent): Coordinate => ({ x: event.touches[0].clientX, y: event.touches[0].clientY });

const SwipeCard: ParentComponent<Props> = (props: ParentProps<Props>) => {
    const [isDragging, setIsDragging] = createSignal(false);
    const [offset, setOffset] = createSignal<Coordinate>({ x: 0, y: 0 });
    const [style, setStyle] = createSignal<JSX.CSSProperties>({});

    const handleMove = (coords: Coordinate) => {
        const finalPosition: Coordinate = { x: coords.x - offset().x, y: coords.y - offset().y };

        setStyle({
            transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)`
        });
    };

    const onMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
        event => {
            event.preventDefault();
            setIsDragging(true);
            setOffset(mouseCoordinates(event));
        };

    const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> =
        event => {
            event.preventDefault();
            setIsDragging(true);
            setOffset(touchCoordinates(event));
        };


    const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
        event => {
            event.preventDefault();
            if (isDragging())
                handleMove(mouseCoordinates(event));
        };

    const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> =
        event => {
            event.preventDefault();
            if (isDragging())
                handleMove(touchCoordinates(event));
        };

    const onDragEnd: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent | TouchEvent> =
        event => {
            event.preventDefault();
            setIsDragging(false);
        };

    return <div
        class={props.class}
        style={style()}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseLeave={onDragEnd}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
    >
        {props.children}
    </div>;
};

export default SwipeCard;
