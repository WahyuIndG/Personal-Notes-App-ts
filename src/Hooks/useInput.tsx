import { useState } from 'react';

const useInput = (
  defaultValue = ''
): [
  string,
  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
] => {
  const [value, setValue] = useState(defaultValue);

  function onValueChangeHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setValue(event.target.value);
  }

  return [value, onValueChangeHandler];
};

export default useInput;
