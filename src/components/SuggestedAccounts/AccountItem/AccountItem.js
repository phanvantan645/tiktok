import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './AccountItem.module.scss';
import Image from '~/components/Image';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data, className }) {
    const renderPreview = (attrs) => (
        <div className={cx('user-preview')} tabIndex="-1" {...attrs}>
            <PoperWrapper>
                <AccountPreview data={data} />
            </PoperWrapper>
        </div>
    );

    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context
        <div>
            <Tippy interactive delay={[1000, 200]} placement="bottom" offset={[100, 0]} render={renderPreview}>
                <Link to={`/@${data.nickname}`} className={cx('wrapper', className)}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                    <div className={cx('info')}>
                        <p className={cx('username')}>
                            {data.nickname}
                            {data.tick && <CheckCircleIcon className={cx('user-check')} />}
                        </p>
                        <span className={cx('name')}>{data.full_name}</span>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object,
};

export default AccountItem;
