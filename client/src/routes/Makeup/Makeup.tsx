import { useState, useEffect } from 'react';
import GlobalStyle from '../../styles/GlobalStyles';
import styled from 'styled-components';
import MakeupList from './MakeupList';
import MakeupFilter from './MakeupFilter';
import { getProductList } from '../../apis/api';

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
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

function Makeup() {
  const [tags, setTags] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  

  const handleTagSelect = (selectedTags: string[]) => {
    setTags(selectedTags);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        let data = [];
        if (tags.length === 0) {
          data = await getProductList({ searchText: '', searchTags: tags });
        } else {
          const promises = tags.map((tag) =>
            getProductList({ searchText: '', searchTags: [tag] })
          );
          const results = await Promise.all(promises);
          data = results.reduce((acc, curr) => [...acc, ...curr], []);
        }
        setItems(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchProductData();
  }, [tags]);
  

  return (
    <div>
      <GlobalStyle />
      <Container>
        <Title>메이크업</Title>
        <MakeupFilter onSelectTags={handleTagSelect} />
        <MakeupList items={items} />
      </Container>
    </div>
  );
}

export default Makeup;
