import { useEffect, useState } from "react";
// import addNotification from "react-push-notification"; // Correct import

const Data = () => {
  const current = 19;
  const productData = [
    { festival: "Diwali", expsale:},
    { product: "Apple", average: 51, minimum: 13, maximum: 104 },
    { month: "January", average: 32, minimum: 8, maximum: 70 },
    { average: 19, minimum: 4, maximum: 41 },
    { average: 16, minimum: 3, maximum: 36 },
    { average: 51, minimum: 17, maximum: 103 },
    { average: 51, minimum: 14, maximum: 115 },
    { average: 67, minimum: 24, maximum: 121 },
    { average: 45, minimum: 14, maximum: 94 },
    { average: 64, minimum: 16, maximum: 120 },
  ];


const data1=  {"1": {"average": 19, "minimum": 4, "maximum": 43}, "2": {"average": 51, "minimum": 13, "maximum": 104}, "3":
{"average": 32, "minimum": 8, "maximum": 70}, "4": {"average": 19, "minimum": 4, "maximum": 41}, "5": {"average": 16,
"minimum": 3, "maximum": 36}, "6": {"average": 51, "minimum": 17, "maximum": 103}, "7": {"average": 51, "minimum": 14,
"maximum": 115}, "8": {"average": 67, "minimum": 24, "maximum": 121}, "9": {"average": 45, "minimum": 14, "maximum":
94}, "10": {"average": 64, "minimum": 16, "maximum":120}};

  // useEffect(() => {
  //   productData.forEach((item) => {
  //     if (current - item.minimum < 5) {
  //       addNotification({
  //         title: "UNDERSTOCK!!!!",
  //         icon: "src/assets/image1.png", // Ensure this path is correct
  //         message: `RESTOCKING!!! for ${item.average}`,
  //         native: true,
  //       });
  //     }
  //   });
  //   // Optionally set a dependency array if you want this to run based on certain conditions
  // }, []); // Runs when productData changes

  return null; // Or return any JSX as needed
};

export default Data;
