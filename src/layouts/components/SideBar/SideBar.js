import classNames from 'classnames/bind';
import {
    HomeIcon,
    UserPlusIcon,
    VideoCameraIcon,
    UserIcon,
    RectangleGroupIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeSolidIcon,
    UserPlusIcon as UserPlusSolidIcon,
    VideoCameraIcon as VideoCameraSolidIcon,
    UserIcon as UserSolidIcon,
    RectangleGroupIcon as RectangleGroupSolidIcon,
    UsersIcon as UsersSolidIcon,
} from '@heroicons/react/24/solid';

import styles from './SideBar.module.scss';
// import Button from '~/components/Button';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            {/* <Button outline large>
                Login
            </Button> */}
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeSolidIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserPlusIcon />}
                    activeIcon={<UserPlusSolidIcon />}
                />
                <MenuItem
                    title="Friends"
                    to={config.routes.friends}
                    icon={<UsersIcon />}
                    activeIcon={<UsersSolidIcon />}
                />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    icon={<RectangleGroupIcon />}
                    activeIcon={<RectangleGroupSolidIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<VideoCameraIcon />}
                    activeIcon={<VideoCameraSolidIcon />}
                />
                <MenuItem
                    title="Profile"
                    to={config.routes.profile}
                    icon={<UserIcon />}
                    activeIcon={<UserSolidIcon />}
                />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" />
        </aside>
    );
}

export default SideBar;
