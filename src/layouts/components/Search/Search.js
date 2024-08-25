import { useEffect, useState, useRef } from 'react';
import { CrossCircle, Spinner, Search as SearchIcon } from 'react-flaticons';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './Search.module.scss';
import { searchService } from '~/services';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isFocus, setIsFocus] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);

    const searchRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService(debounced.trim());
            setSearchResult(result.data);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        searchRef.current.focus();
    };

    const handleHideResult = () => {
        setIsFocus(false);
    };

    const handleChange = (e) => {
        const searchInput = e.target.value;
        if (!searchInput.startsWith(' ')) {
            setSearchValue(searchInput);
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parenNode context
        <div>
            <HeadlessTippy
                appendTo={() => document.body}
                offset={[0, -5]}
                interactive
                visible={searchResult.length > 0 && isFocus}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PoperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PoperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search-wrapper')}>
                    <div className={cx('search')}>
                        <input
                            ref={searchRef}
                            value={searchValue}
                            type="text"
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            onChange={handleChange}
                            onFocus={() => {
                                if (searchValue) {
                                    setIsFocus(true);
                                }
                            }}
                        />

                        {loading && (
                            <button className={cx('loading')}>
                                <Spinner />
                            </button>
                        )}

                        {!!searchValue && !loading && (
                            <button className={cx('clear')} onClick={handleClearSearch}>
                                <CrossCircle className={cx('icon')} />
                            </button>
                        )}
                        <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                            <SearchIcon className={cx('icon')} />
                        </button>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
