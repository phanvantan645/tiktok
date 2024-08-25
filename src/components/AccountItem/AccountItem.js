import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data, className }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper', className)}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <p className={cx('username')}>
                    {data.nickname}
                    {data.tick && (
                        <CheckCircleIcon color={'#00000'} height="250px" width="250px" className={cx('user-check')} />
                    )}
                </p>
                <span className={cx('name')}>{data.full_name}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object,
};

export default AccountItem;
