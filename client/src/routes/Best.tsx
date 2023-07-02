import { useState, useEffect, useMemo } from 'react';
import GlobalStyle from '../styles/GlobalStyles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Best = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemType[]>([]);

  interface ItemType {
    id: string;
    src: string;
    category: string;
    name: string;
    price: string;
  }
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
  `;

  const Title = styled.h1`
    font-family: 'Noto Sans KR';
    text-align: center;
    margin-top: 40px;
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: 700;
  `;

  const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    max-width: 1250px;
    margin: 0 auto;
    gap: 10px;
  `;

  const Image = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border: 1px solid #8E8E8E;
    border-radius: 8px;

    &:hover {
      border: 2px solid #FFA9BE;
    }
  `;

  const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      outline: 3px solid #FFA9BE;
    }

    &:hover ${Image} {
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 3px solid #FFA9BE;
    }
  `;

  const TitleText = styled.h1`
    font-size: 18px;
    margin-top: 10px;
  `;

  const Price = styled.h3`
    font-size: 16px;
    margin: 15px 0px;
  `;



  const itemList = useMemo(() => [
    {
      id: '6O8YPJIMZbOcyNDMn8YU',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw73a7bdcc/hi-res/NARS_SP22_SpringEdit_Afterglow_PDPCrop_Soldier_Afterglow_Lipshine_LoverToLover_GLBL_2000x2000.jpg?sw=856&sh=750&sm=fit',
      category: '에프터글로우 립 샤인',
      name: '러버 투 러버',
      price: '37,000'
    },
    {
      id: 'i3yOg0gUQXpVb6n5Yah6',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw594c7940/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Heat_Wave_Matte_GLBL_B_square_0607845029618.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '히트 웨이브',
      price: '40,000',
    },
    {
      id: 'KuVFr4I445aq3zjQoE4M',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f48591b/hi-res/0607845053347.jpg?sw=856&sh=750&sm=fit',
      category: '하드와이어 아이섀도우',
      name: '멜로즈',
      price: '32,000',
    },
    {
      id: 'wbzDFBshCidi0naEotyK',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dwab29559f/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Chelsea_Girls_Sheer_GLBL_B_square_0607845029595.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '첼시 걸스',
      price: '40,000',
    },
    {
      id: 'mdUg1DmAkefBYlftcUnq',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw856e9a59/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Casablanca_Satin_GLBL_B_square_0607845029205.jpg?sw=856&sh=750&sm=fit',
      category: '오리지널 립스틱',
      name: '카사블랑카',
      price: '40,000',
    },
    {
      id: 'v51IqksbGctAov6qMuDn',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw5471c7eb/hi-res/0607845053095.jpg?sw=856&sh=750&sm=fit',
      category: '싱글 아이섀도우',
      name: '네팔',
      price: '30,000',
    },
    {
      id: 'L8JdI5hyPUb9g1KU4UXs',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw8f736413/hi-res/NARS_FA19_Lipstick_Soldier_LPS_Instant_Crush_Sheer_GLBL_B_square_0607845029557.jpg?sw=856&sh=750&sm=fit',
      category: '립스틱',
      name: '인스턴트 크러쉬',
      price: '40,000',
    },
    {
      id: 'ASGoSP7sbNvePBLvIn0D',
      src: 'https://www.narscosmetics.co.kr/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_NARS/default/dw53a64a5e/hi-res/0607845039273.jpg?sw=856&sh=750&sm=fit',
      category: '듀오 아이섀도우',
      name: '샤레이드',
      price: '49,000',
    },

  ], []);
  

  const handleClickItem = (id: string) => {
    navigate('/ProductDetail', {
      state: {
        id,
      },
    });
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = itemList;
        setItems(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchProductData();
  }, [itemList]);

  return (
    <div>
      <GlobalStyle />
      <Container>
        <Title>Best</Title>
        <ListContainer>
          {items.map((item) => (
            <ItemContainer key={item.id}>
              <Image src={item.src} alt="상품 이미지" onClick={() => handleClickItem(item.id)} />
              <TitleText>{item.name}</TitleText>
              <Price>{item.price}원</Price>
            </ItemContainer>
          ))}
        </ListContainer>
      </Container>
    </div>
  );
};

export default Best;
