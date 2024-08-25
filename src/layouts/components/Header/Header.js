import { Link } from 'react-router-dom';
import {
    CircleStackIcon,
    LanguageIcon,
    QuestionMarkCircleIcon,
    ArrowRightStartOnRectangleIcon,
    ChatBubbleBottomCenterIcon,
    EllipsisVerticalIcon,
    Cog6ToothIcon,
    UserIcon,
    PlusIcon,
    PaperAirplaneIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Languge',
            data: [
                { code: 'en', title: 'English', type: 'language' },
                { code: 'vi', title: 'Tiếng Việt', type: 'language' },
            ],
        },
    },
    { icon: <QuestionMarkCircleIcon />, title: 'Feedback and help', to: '/feedback' },
    { icon: <AdjustmentsHorizontalIcon />, title: 'Keyboard and shortcuts' },
];

function Header() {
    const currentUser = true;
    const userMenu = [
        { icon: <UserIcon />, title: 'View profile', to: '/@vantan' },
        { icon: <CircleStackIcon />, title: 'Get coins', to: '/coin' },
        { icon: <Cog6ToothIcon />, title: 'Setting', to: '/setting' },
        ...MENU_ITEMS,
        { icon: <ArrowRightStartOnRectangleIcon />, title: 'Log out', to: '/logout', separate: true },
    ];

    const handleMenuChange = (menuitem) => {};

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo-wrapper')}>
                    <Link to={config.routes.home} className={cx('logo')}>
                        <img src={images.logo} alt="Tiktok" />
                    </Link>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Button className={cx('upload-btn')} text to={config.routes.upload} leftIcon={<PlusIcon />}>
                        Upload
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Contact" placement="bottom">
                                <div className={cx('acction-wrapper')}>
                                    <button className={cx('action-btn')}>
                                        <PaperAirplaneIcon />
                                    </button>
                                </div>
                            </Tippy>
                            <Tippy content="Message" placement="bottom">
                                <div className={cx('acction-wrapper')}>
                                    <button className={cx('action-btn', 'message-btn')}>
                                        <ChatBubbleBottomCenterIcon />
                                        <div className={cx('message-count')}>
                                            <span>99+</span>
                                        </div>
                                    </button>
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary to={config.routes.login}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu hideOnClick={false} items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/c70de446b06fbde54c0934bbe3cc3221~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1713002400&x-signature=z3fW2YOYoyA7E7LU8i0nHKJsn7s%3D"
                                alt="avatar"
                            />
                        ) : (
                            <div className={cx('more-wrapper')}>
                                <button className={cx('more-btn')}>
                                    <EllipsisVerticalIcon />
                                </button>
                            </div>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
