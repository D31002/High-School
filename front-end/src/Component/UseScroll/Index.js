import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useScroll = (thresh = 0.4) => {
    const controls = useAnimation();
    const [element, view] = useInView({ threshold: thresh });

    useEffect(() => {
        if (view) {
            controls.start('show');
        } else {
            controls.start('hidden');
        }
    }, [view, controls]); // Depend on 'view' and 'controls' so that the effect runs when they change

    return [element, controls];
};
