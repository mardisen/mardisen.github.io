import { createSignal, JSX, mergeProps, ParentComponent, ParentProps } from 'solid-js';

export type SwipeCardRef = {
    bringBack?: () => void;
};

export type SwipeCardProps = {
    class?: string;
    threshold?: number;
    rotationMultiplier?: number;
    maxRotation?: number;
    bounce?: number;
    snapBackDuration?: number;
    ref?: SwipeCardRef;
};

type Coordinate = {
    x: number;
    y: number;
};

type Speed = Coordinate;

type TemporalCoordinate = Coordinate & {
    timestamp: number;
};

const PropsDefault: SwipeCardProps = {
    threshold: 300,
    rotationMultiplier: 7.5,
    maxRotation: 90,
    snapBackDuration: 300,
    bounce: 0.1
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

const SwipeCard: ParentComponent<SwipeCardProps> = (initialProps: ParentProps<SwipeCardProps>) => {
    const props = mergeProps(PropsDefault, initialProps);

    const [style, setStyle] = createSignal<JSX.CSSProperties>({});

    let isDragging: boolean = false;
    let isReleased: boolean = false;
    let rotation: number = 0;
    let speed: Speed = { x: 0, y: 0 };
    let lastPosition: TemporalCoordinate = {
        x: 0,
        y: 0,
        timestamp: new Date().getTime()
    };
    let offset: Coordinate = { x: 0, y: 0 };

    const handleMove = (coords: Coordinate) => {
        const finalPosition: TemporalCoordinate = {
            x: coords.x - offset.x,
            y: coords.y - offset.y,
            timestamp: new Date().getTime()
        };

        speed = calcSpeed(lastPosition, finalPosition);
        rotation = isDragging ? speed.x / 1000 * props.rotationMultiplier : 0;

        setStyle({
            transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
            rotate(${rotation}deg)`
        });

        lastPosition = finalPosition;
    };

    const snapBack = () => {
        if (isReleased) {
            isReleased = false;
            setStyle({
                transform: `translate(${lastPosition.x * -props.bounce}px, ${lastPosition.y * -props.bounce}px)
                rotate(${rotation * -props.bounce}deg)`,
                transition: `ease-out ${props.snapBackDuration / 1000}s`
            });

            setTimeout(() => setStyle({ transform: "none" }), props.snapBackDuration);

            speed = { x: 0, y: 0 };
        }
    };

    const release = () => {
        const velocity = pythagoras(speed);
        isDragging = false;
        if (velocity < props.threshold) {
            handleMove(offset);
        }
        else {
            const diagonal = pythagoras({ x: document.body.clientWidth, y: document.body.clientHeight });
            const multiplier = diagonal / velocity;

            const finalPosition: Coordinate = {
                x: lastPosition.x + (speed.x * multiplier),
                y: lastPosition.y + (-speed.y * multiplier),
            };

            const finalRotation = rotation + (props.maxRotation * (Math.random() - 0.5));

            setStyle({
                transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
                rotate(${finalRotation}deg)`,
                transition: `ease-out ${multiplier}s`
            });

            lastPosition = { ...lastPosition, ...finalPosition };
            isReleased = true;
        }
    };

    const onMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
        event => {
            event.preventDefault();
            isDragging = true;
            offset = mouseCoordinates(event);
        };

    const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> =
        event => {
            event.preventDefault();
            isDragging = true;
            offset = touchCoordinates(event);
        };


    const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> =
        event => {
            event.preventDefault();
            if (isDragging)
                handleMove(mouseCoordinates(event));
        };

    const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> =
        event => {
            event.preventDefault();
            if (isDragging)
                handleMove(touchCoordinates(event));
        };

    const onDragEnd: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent | TouchEvent> =
        event => {
            event.preventDefault();
            if (isDragging) {
                release();
            }
        };

    // Ref setup
    if (props.ref) {
        props.ref.bringBack = snapBack;
    }

    return <div
        class={`${!isDragging && "transition-all"} ` + props.class}
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
