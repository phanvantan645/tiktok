import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data, isFollow }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt="Avatar" />
                {!isFollow && <Button outline>Follow</Button>}
            </div>
            <Link className={cx('info')}>
                <p className={cx('username')}>
                    {data.nickname}
                    {data.tick && <CheckCircleIcon className={cx('check')} />}
                </p>
                <span className={cx('name')}>{data.full_name}</span>
            </Link>
            <div className={cx('footer')}>
                <div className={cx('followers-wrapper')}>
                    <span className={cx('value')}>1.2M</span>
                    <span className={cx('label')}>Followers</span>
                </div>
                <div className={cx('likes-wrapper')}>
                    <span className={cx('value')}>512.6M</span>
                    <span className={cx('label')}>Like</span>
                </div>
            </div>
            <div className={cx('bio')}>
                <span>{data.bio}</span>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
    isFollow: PropTypes.bool,
};

export default AccountPreview;
