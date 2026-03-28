// import React from 'react'
// import { useRef } from "react";

// export default function Focus() {

//      const inputRef = useRef(null);    
//     //  inputRef = { current: null }

//      function handleClick() {
//         inputRef.current.focus();
//   }

//   return (
//     <>
//       <input ref={inputRef} />  
//       {/* Connect Ref to Input Element */}
//       {/* Here React attaches the ref to the DOM element. */}

//       <button onClick={handleClick}>Focus Input</button>
//       {/* moves the cursor into the input field. */}

//     </>
//   )
// }

import React, { useRef, forwardRef } from "react";

/* Child Component */
const InputBox = forwardRef((props, ref) => {
  return (
    <div>
      <input ref={ref} placeholder="Type something..." />
    </div>
  );
});

/* Parent Component */
function App() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <InputBox ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default App;