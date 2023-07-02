import { ReactNode } from 'react';
import RadioContext from './RadioContext';

interface Props {
  label?: string;
  children: ReactNode;
  value: string;
  onChange: (key: string) => void;
}

export default function RadioGroup({ label, children, ...rest }: Props) {
  return (
    <>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
      {/* {children} */}
    </>
  );
}
