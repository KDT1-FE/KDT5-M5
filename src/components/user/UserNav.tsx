import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BiChevronRight } from "react-icons/bi";

function UserNav() {
  const location = useLocation();

  return (
    <Navigator>
      <NavTitle>
        <TitleBar />
        <MyPage>마이페이지</MyPage>
      </NavTitle>
      <NavContainer>
        <Link to="/user">
          <NavList isOpen={location.pathname === "/user"}>
            <ListName>주문 내역</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="account">
          <NavList isOpen={location.pathname === "/user/account"}>
            <ListName>계좌 관리</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="like">
          <NavList isOpen={location.pathname === "/user/like"}>
            <ListName>찜한 상품</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="settings">
          <NavList isOpen={location.pathname === "/user/settings"}>
            <ListName>개인정보 수정</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
      </NavContainer>
    </Navigator>
  );
}

const Navigator = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavTitle = styled.div`
  display: flex;
  margin: 17px 0;
  align-items: center;
`;

const TitleBar = styled.div`
  width: 5px;
  height: 2.25rem;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.orange.main};
`;

const MyPage = styled.h2`
  font-weight: 700;
  font-size: 2.25rem;
  font-family: "GmarketSans";
`;

const NavContainer = styled.ul`
  display: grid;
  overflow: hidden;
  border-radius: 5px;
  grid-template-columns: 285px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-left: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-right: 1px solid ${(props) => props.theme.colors.gray[3]};
`;

const NavList = styled.li<{
  isOpen?: boolean;
}>`
  display: flex;
  transition: 0.1s;
  padding: 13px 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[3]};
  background-color: ${({ isOpen, theme }) => isOpen && theme.colors.gray[2]};

  .chebronRight {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[2]};

    span {
      font-size: 21px;
    }
  }
`;

const ListName = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
`;

export default UserNav;
