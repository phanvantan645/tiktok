import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

import images from '~/assets/images';

const Image = forwardRef(({ src, alt, fallBack: outerFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(outerFallback);
    };

    return <img ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError} />;
});

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    outerFallback: PropTypes.string,
};

export default Image;
