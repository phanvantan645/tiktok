import { Range, getTrackBackground } from 'react-range';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './RangeSlider.module.scss';

const cx = classNames.bind(styles);

function ProgressSilder({ min, max, step, values, onChange, className }) {
    return (
        <Range
            step={step}
            min={min}
            max={max}
            values={[values]}
            onChange={(values) => {
                onChange(values[0]);
            }}
            renderTrack={({ props, children }) => (
                <div
                    className={cx('track-horizontal', { [className]: className })}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        backgroundColor: 'rgba(255, 255, 255, 0.34)',
                        cursor: 'pointer',
                        ...props.style,
                        height: '2px',
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <div
                        className={cx('active-track')}
                        ref={props.ref}
                        style={{
                            height: '2px',
                            width: '100%',
                            borderRadius: '6px',
                            background: getTrackBackground({
                                values: [values],
                                colors: ['var(--white)', 'rgba(255, 255, 255, 0.34)'],
                                min: min,
                                max: max,
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
                        height: '0',
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

ProgressSilder.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    values: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ProgressSilder;
