import { createContext } from 'react';
interface RadioContextProp {
  value: string;
  onChange: (key: string) => void;
  disabled?: boolean;
}
const RadioContext = createContext({} as RadioContextProp);
export default RadioContext;
