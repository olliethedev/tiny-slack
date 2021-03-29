import { useState } from 'react';

// Utility hook for stateful inputs and textarea elements.
export default function useInput(
  {initialValue = "",
  type = "text",
  placeholder = "",
  elementTypeTextArea = false}={}
) {
  const [value, setValue] = useState(initialValue);
  const ElementType = elementTypeTextArea ? "textarea" : "input";
  const input = (
    <ElementType
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [input, value, setValue];
}
