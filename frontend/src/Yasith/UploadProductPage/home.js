// import React, { useState, useEffect } from 'react';

// function Clock() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timerID = setInterval(() => tick(), 1000);

//     return () => {
//       clearInterval(timerID);
//     };
//   }, []);

//   const tick = () => {
//     setTime(new Date());
//   };

//   return (
//     <div>
//       <h1>Hello, this is a simple clock!</h1>
//       <h2>It is {time.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// export default Clock;
