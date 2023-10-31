import { useState } from 'react';

// type Event = {
//   target: {
//     value: string;
//   };
// };

const useInput = (
  defaultValue = ''
): [string, (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void] => {
  const [value, setValue] = useState(defaultValue);

  function onValueChangeHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setValue(event.target.value);
  }

  return [value, onValueChangeHandler];
};

export default useInput;
