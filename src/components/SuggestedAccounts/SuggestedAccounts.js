import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

const accounts = [
    {
        nickname: 'tandz',
        full_name: 'Phan Văn Tấn',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/c70de446b06fbde54c0934bbe3cc3221~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1713002400&x-signature=z3fW2YOYoyA7E7LU8i0nHKJsn7s%3D',
        tick: true,
    },
    {
        nickname: 'tandz',
        full_name: 'Phan Văn Tấn',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/c70de446b06fbde54c0934bbe3cc3221~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1713002400&x-signature=z3fW2YOYoyA7E7LU8i0nHKJsn7s%3D',
    },
    {
        nickname: 'tandz',
        full_name: 'Phan Văn Tấn',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/c70de446b06fbde54c0934bbe3cc3221~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1713002400&x-signature=z3fW2YOYoyA7E7LU8i0nHKJsn7s%3D',
    },
];

function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>{label}</h2>
            {accounts.map((result, i) => (
                <AccountItem key={i} data={result} />
            ))}
            <span className={cx('more-btn')}>See more</span>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
