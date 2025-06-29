import { useCallback, useState } from "react";

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onTrue = useCallback(() => setValue(true), []);
  const onFalse = useCallback(() => setValue(false), []);
  const onToggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, onTrue, onFalse, onToggle };
};

export default useBoolean;
