import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../common/Button";

function HistroyItem() {
  return (
    <ItemContainer>
      <ItemBox>
        <ID>J0xvk2Ekloe</ID>
        <UserName>개발중독자</UserName>
        <Product>천왕성 특가 패키지 상품</Product>
        <TotalOrderAmount>25,000원</TotalOrderAmount>
        <TransactionTime>2023-06-01 17:00:40</TransactionTime>
      </ItemBox>
      <CancelBtn admin>거래취소</CancelBtn>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
  border-radius: 5px;
  font-size: 18px;
  display: flex;
  height: 70px;
  width: 100%;
  margin-bottom: 10px;
`;

const ItemBox = styled.div`
  display: flex;
  width: 100%;
`;

const ID = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 15%;
`;

const UserName = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 15%;
`;

const Product = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: 700;
  display: flex;
  width: 35%;
`;

const TotalOrderAmount = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 15%;
`;

const TransactionTime = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  display: flex;
  width: 20%;
`;

const CancelBtn = styled(Button)`
  margin: auto 26px auto 0;
`;

export default HistroyItem;
