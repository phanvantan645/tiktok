import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import React, { useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import {
    FlagIcon,
    MusicalNoteIcon,
    ShieldExclamationIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import {
    PlayIcon,
    EllipsisHorizontalIcon,
    PauseIcon,
    HeartIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    BookmarkIcon,
    ShareIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/solid';

import styles from './RecommendVideo.module.scss';
import Button from '~/components/Button';
import ProgressSilder, { VerticalRangeSlider as VolumeSlider } from '~/components/RangeSlider';
import Tag from '../Tag';
import { useEffect } from 'react';
import { useVideoPlayer } from '~/hooks';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';
import { searchService } from '~/services';
import Menu from '../Popper/Menu';

const cx = classNames.bind(styles);

const currentVolume = 50;

const moreMenu = [
    { icon: <ShieldExclamationIcon />, title: 'Get coins', to: '/coin' },
    { icon: <FlagIcon />, title: 'Setting', to: '/setting' },
];

function RecommendVideo({ data }) {
    const vidRef = useRef(null);
    const { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, onVideoEnded, toggleMute, getDuration } =
        useVideoPlayer(vidRef);
    const { isPlaying, isMuted, progress, duration } = playerState;
    const [videoSounder, setVideoSounder] = useState(!isMuted ? [100] : [0]);
    const [userData, setUserData] = useState({});

    function padNum(num) {
        if (num < 10 && num >= 0) {
            return String(num).padStart(2, '0');
        }
        return num;
    }

    const durationMinutes = padNum(Math.floor(duration / 60));
    const durationSeconds = padNum(Math.floor(duration % 60));
    const progressMinutes = padNum(Math.floor(progress / 60));
    const progressSeconds = padNum(Math.floor(progress % 60));

    useEffect(() => {
        const fetchUser = async () => {
            const result = await searchService(data.nickname);
            setUserData(result.data[0]);
        };

        fetchUser();
    }, [userData, setUserData, data]);

    useEffect(() => {
        const onVideoPlaying = setInterval(() => {
            if (isPlaying) {
                handleOnTimeUpdate();
                if (progress === 100) {
                    onVideoEnded();
                    return clearInterval(onVideoPlaying);
                }
            }
        }, 100);
        return () => {
            clearInterval(onVideoPlaying);
        };
    }, [isPlaying, progress, handleOnTimeUpdate, togglePlay, onVideoEnded, setVideoSounder]);

    const handleMuted = () => {
        toggleMute(true);
        setVideoSounder([0]);
    };
    const handleUnmuted = () => {
        toggleMute(false);
        setVideoSounder([currentVolume]);
    };

    const handleVideoLoad = () => {
        getDuration();
        return isMuted ? handleMuted : handleUnmuted;
    };

    const renderPreview = (attrs) => (
        <div className={cx('user-preview')} tabIndex="-1" {...attrs}>
            <PoperWrapper>
                <AccountPreview data={userData} isFollow={data.isFollow} />
            </PoperWrapper>
        </div>
    );

    const decsArr = data.description.split(' ');
    const result = decsArr.map((v, i) => {
        if (v.startsWith('#')) {
            return (
                <Fragment key={i}>
                    {' '}
                    <Tag to={`/${v}`}>{v}</Tag>
                </Fragment>
            );
        } else if (v.startsWith('@')) {
            return (
                <Fragment key={i}>
                    {' '}
                    <Tag className={cx('link')} to={`/${v}`}>
                        {v}
                    </Tag>{' '}
                </Fragment>
            );
        } else
            return (
                <Fragment key={i}>
                    <span>{v}</span>{' '}
                </Fragment>
            );
    });

    return (
        <div className={cx('wrapper')}>
            <>
                <Tippy interactive delay={[1000, 200]} placement="bottom-start" render={renderPreview}>
                    <Link className={cx('avatar')}>
                        <img src={userData.avatar} alt="avatar" />
                    </Link>
                </Tippy>
            </>
            <div className={cx('content')}>
                <div className={cx('decription')}>
                    {!data.isFollow && (
                        <Button className={cx('follow-btn')} outline>
                            Follow
                        </Button>
                    )}
                    <Tippy interactive delay={[1000, 200]} placement="bottom-start" render={renderPreview}>
                        <Link className={cx('author')}>
                            <h3 className={cx('username')}>{userData.nickname}</h3>
                            {userData.tick && <CheckCircleIcon className={cx('check')} />}
                            <h4 className={cx('display-name')}>{userData.full_name}</h4>
                        </Link>
                    </Tippy>
                    <div className={cx('video-decription')}>
                        <div className={cx('description-content')}>{result}</div>
                    </div>
                    <div className={cx('music')}>
                        <MusicalNoteIcon className={cx('music-icon')} />
                        <p className={cx('music-name')}>
                            nhạc nền -{' '}
                            <Link to={`/:@nickname}`} className={cx('display-name')}>
                                Phan Văn Tấn
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={cx('video')}>
                    <div className={cx('video-content')}>
                        <video
                            ref={vidRef}
                            loop={false}
                            controls={false}
                            onEnded={onVideoEnded}
                            onLoadedData={handleVideoLoad}
                            onClick={togglePlay}
                            className={cx('video-src')}
                        >
                            <source src={data.video} />
                        </video>
                        <Menu hideOnClick={false} items={moreMenu} placement="right-start">
                            <button className={cx('control-btn', 'more-btn')}>
                                <EllipsisHorizontalIcon />
                            </button>
                        </Menu>
                        <div className={cx('video-control')}>
                            <div className={cx('video-control')}>
                                <div className={cx('btn')}>
                                    <button className={cx('control-btn', 'play-btn')}>
                                        {playerState.isPlaying ? (
                                            <PauseIcon onClick={() => togglePlay()} />
                                        ) : (
                                            <PlayIcon onClick={() => togglePlay()} />
                                        )}
                                    </button>

                                    <button className={cx('control-btn', 'sound-btn')}>
                                        {!playerState.isMuted ? (
                                            <SpeakerWaveIcon onClick={handleMuted} />
                                        ) : (
                                            <SpeakerXMarkIcon onClick={handleUnmuted} />
                                        )}
                                        <div className={cx('sound-range')}>
                                            <VolumeSlider
                                                min={0}
                                                max={100}
                                                step={1}
                                                values={videoSounder}
                                                onChange={setVideoSounder}
                                                toggleMute={toggleMute}
                                            />
                                        </div>
                                    </button>
                                </div>
                                <div className={cx('timer-ranger')}>
                                    <ProgressSilder
                                        min={0}
                                        max={100}
                                        step={1}
                                        values={progress}
                                        onChange={handleVideoProgress}
                                    />
                                    <span className={cx('timer-value')}>
                                        {progressMinutes}:{progressSeconds}/{durationMinutes}:{durationSeconds}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('action-content')}>
                            <button className={cx('action-btn', 'like-btn', { active: data.isLiked })}>
                                <HeartIcon />
                            </button>
                            <span className={cx('action-value')}>100</span>
                        </div>
                        <div className={cx('action-content')}>
                            <button className={cx('action-btn', 'comment-btn')}>
                                <ChatBubbleOvalLeftEllipsisIcon />
                            </button>
                            <span className={cx('action-value')}>21</span>
                        </div>
                        <div className={cx('action-content')}>
                            <button className={cx('action-btn', 'bookmark-btn')}>
                                <BookmarkIcon />
                            </button>
                            <span className={cx('action-value')}>11</span>
                        </div>
                        <div className={cx('action-content')}>
                            <button className={cx('action-btn', 'share-btn')}>
                                <ShareIcon />
                            </button>
                            <span className={cx('action-value')}>44</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

RecommendVideo.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecommendVideo;
