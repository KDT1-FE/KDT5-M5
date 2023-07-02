import { useState } from 'react';

interface Props {
  //value?: string;
  defaultValue?: string;
  maxLength?: number;
  //onChange?: (key: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export default function Input({ defaultValue, maxLength, id }: Props) {
  const [a, setA] = useState('');
  return (
    <>
      <input
        type="text"
        //value={value ? value : ''}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={(e) => {
          setA(e.target.value);
        }}
        id={id}
      />
      {`[ ${a ? a.length : 0} / ${maxLength} ]`}
    </>
  );
}
