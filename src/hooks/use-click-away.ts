import { RefObject, useEffect } from 'react';

type ClickAwayEventHandler = (event: MouseEvent) => void;

export const useClickAway = (ref: RefObject<HTMLElement>, onClickAway: ClickAwayEventHandler) => {
    useEffect(() => {
        const handleClickAway = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickAway(event);
            }
        };

        document.addEventListener('mousedown', handleClickAway);

        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, [ref, onClickAway]);
};
