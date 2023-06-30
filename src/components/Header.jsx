import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { searchProduct, authenticate } from '../store/UserAPI';
import './Header.css';

export default function Header(props) {
    // 검색
    // const search = searchProduct();

    // 검색어를 state에 저장
    const [searchText, setSearchText] = useState('');

    // 검색 input에서 변화가 발생할 때 입력값을 state에 저장
    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    // 검색 아이콘을 누르거나 엔터를 쳤을 때
    const handleSearch = async () => {
        if (searchText.trim() === '') {
            setSearchText('');
            return;
        }
        await searchProduct(searchText);
        return;
    };

    useEffect(()=>{
        console.log('로그인 여부 확인')
    },[])

    return (
        <header className="header_section">
            {props.Login ? (
                <section className="header_section-service">
                    <p>
                        <strong>{props.displayName}</strong>님, 안녕하세요.
                    </p>
                    <button type="button" onClick={props.handleClickLogoutBtn}>
                        로그아웃
                    </button>
                </section>
            ) : (
                <section className="header_section-service">
                    <Link to="/sign">회원가입</Link>
                    <Link to="/login">로그인</Link>
                </section>
            )}
            <div className="header_section-search">
                <Link to="">
                    <img className="header_section-logo" src="https://static.oliveyoung.co.kr/pc-static-root/image/comm/h1_logo.png" alt="logo" />
                </Link>
                <div className="header_section-inputWrap">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            id="search-input"
                            className="searchInput"
                            type="text"
                            value={searchText}
                            placeholder="검색어를 입력해 주세요"
                            onChange={handleChange}
                        />
                        <button
                            className="searchBtn"
                            aria-label="submit"
                            onClick={() => {
                                console.log("CLICK!!")
                                handleSearch();
                                setSearchText('');
                            }}>
                            <BiSearch size="24" color="rgb(95, 0, 128)" />
                        </button>
                    </form>
                </div>
                <div className="header_section-shopping-basket">
                    <Link to="/cart" className="cart">
                        <BsCart2 size="30" title="장바구니" />
                    </Link>
                    <Link to="/mypage">
                        <BsFillPersonFill size="30" title="마이페이지" color="rgb(95, 0, 128)" />
                    </Link>
                </div>
            </div>
            <nav>
                <ul className='navbar'>
                    <li className='navbar_skin'>
                        <Link to="/product/skincare">스킨케어</Link>
                    </li>
                    <li className='navbar_cleansing'>
                        <Link to="/product/cleansing">클렌징</Link>
                    </li>
                    <li className='navbar_makeup'>
                        <Link to="/product/makeup">메이크업</Link>
                    </li>
                </ul>
            </nav>
        </header >
    );
}
