import classNames from 'classnames/bind';

import styles from './Content.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Content({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <div className={cx('download')}>
                <Button className={cx('download-btn')} rounded>
                    Download App
                </Button>
            </div>
        </div>
    );
}

export default Content;
