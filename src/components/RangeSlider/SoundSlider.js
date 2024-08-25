import { Range, getTrackBackground, Direction } from 'react-range';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './RangeSlider.module.scss';

const cx = classNames.bind(styles);

function SoundSlider({ values, min, max, step, onChange, toggleMute, className }) {
    return (
        <Range
            direction={Direction.Up}
            step={step}
            min={min}
            max={max}
            values={values}
            onChange={(values) => {
                if (values[0] === 0) {
                    onChange(values);
                    toggleMute(true);
                } else {
                    onChange(values);
                    toggleMute(false);
                }
            }}
            renderTrack={({ props, children }) => (
                <div
                    className={cx('track-vertical', className)}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        backgroundColor: 'rgba(255, 255, 255, 0.34)',
                        cursor: 'pointer',
                        ...props.style,
                        height: '50px',
                        display: 'flex',
                        width: '3px',
                    }}
                >
                    <div
                        className={cx('active-track')}
                        ref={props.ref}
                        style={{
                            height: '50px',
                            width: '3px',
                            borderRadius: '6px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['var(--white)', 'rgba(255, 255, 255, 0.34)'],
                                min: min,
                                max: max,
                                direction: Direction.Up,
                            }),
                            alignSelf: 'center',
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    className={cx('thumb')}
                    style={{
                        ...props.style,
                        height: '12px',
                        width: '12px',
                        backgroundColor: 'var(--white)',
                        borderRadius: '999px',
                        cursor: 'pointer',
                    }}
                />
            )}
        />
    );
}

SoundSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default SoundSlider;
