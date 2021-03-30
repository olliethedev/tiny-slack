import { useState } from 'react';

// Utility hook for stateful inputs and textarea elements.
export default function useToggle(
  { textPositive="On", textNegative="Off", initialValue=false}={}
) {
  const [value, setValue] = useState(initialValue);
  const toggle = (
    <div className="Toggle">
      <button className={value?"active":""} onClick={()=>setValue(true)}>{textPositive}</button>
      <button className={!value?"active":""} onClick={()=>setValue(false)}>{textNegative}</button>
    </div>
  );
  return [toggle, value, setValue];
}
