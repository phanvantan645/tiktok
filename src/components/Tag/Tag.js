import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

function Tag({ children, to }) {
    return (
        <Link to={to} className={cx('tag')}>
            {children}
        </Link>
    );
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

export default Tag;
