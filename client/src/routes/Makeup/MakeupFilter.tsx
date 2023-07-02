import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

// 컴포넌트 Props 타입 정의
interface Props {
  onSelectTags: (tags: string[]) => void; // 태그 선택 시 실행될 콜백 함수
}

// 필터 컨테이너 스타일드 컴포넌트
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

// MakeupFilter 컴포넌트
const MakeupFilter = ({ onSelectTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 태그 변경 이벤트 핸들러
  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      // 선택한 태그 추가
      setSelectedTags((prevTags) => [...prevTags, value]);
    } else {
      // 선택 취소한 태그 제거
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };

  // 모든 태그 선택 해제 이벤트 핸들러
  const handleAllTags = () => {
    setSelectedTags([]);
  };

  // 선택한 태그 배열을 전달하여 분류 처리
  useEffect(() => {
    onSelectTags(selectedTags); // onSelectTags 콜백 함수 호출
  }, [selectedTags, onSelectTags]);
  

  

  return (
    <FilterContainer>
      <Label>
        <Checkbox
          type="checkbox"
          checked={selectedTags.length === 0}
          onChange={handleAllTags}
        />
        전체
      </Label>
      <Label>
        <Checkbox
          type="checkbox"
          value="페이스"
          onChange={handleTagChange}
        />
        페이스
      </Label>
      <Label>
        <Checkbox
          type="checkbox"
          value="립"
          onChange={handleTagChange}
        />
        립
      </Label>
      <Label>
        <Checkbox
          type="checkbox"
          value="아이"
          onChange={handleTagChange}
        />
        아이
      </Label>
    </FilterContainer>
  );
};

export default MakeupFilter;
