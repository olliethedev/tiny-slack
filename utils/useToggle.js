import { useState } from 'react';

// Utility hook for stateful inputs and textarea elements.
export default function useToggle(
  {activeStyle, textPositive="On", textNegative="Off", initialValue=false}={}
) {
  const [value, setValue] = useState(initialValue);
  const toggle = (
    <>
      <button className={value?activeStyle:""} onClick={()=>setValue(true)}>{textPositive}</button>
      <button className={!value?activeStyle:""} onClick={()=>setValue(false)}>{textNegative}</button>
    </>
  );
  return [toggle, value];
}
