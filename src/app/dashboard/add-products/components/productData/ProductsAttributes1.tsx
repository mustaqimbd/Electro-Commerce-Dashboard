// "use client";
// import MultiSelectDropdown from "@/components/multi-input/MultiSelect";
// import { useState } from "react";

// const ProductsAttributes1 = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const [multiSelectedValues, setMultiSelectedValues] = useState([]);

//   const options = [
//     { label: "Option 1", value: "option1" },
//     { label: "Option 2", value: "option2" },
//     { label: "Option 3", value: "option3" },
//   ];

//   const handleSelectChange = (e) => {
//     setSelectedValue(e.target.value);
//   };

//   const handleMultiSelectChange = (e) => {
//     const selectedOptions = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setMultiSelectedValues(selectedOptions);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       {/* First select component */}
//       <select
//         value={selectedValue}
//         onChange={handleSelectChange}
//         className="border border-gray-300 rounded-md p-2 mr-2"
//       >
//         <option value="">Select an option</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {/* Second select component, rendered conditionally */}
//       {selectedValue && (
// <select
//   multiple
//   value={multiSelectedValues}
//   onChange={handleMultiSelectChange}
//   className="border border-gray-300 rounded-md p-2"
// >
//   {options.map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>
//         <MultiSelectDropdown />
//       )}
//     </div>
//   );
// };

// export default ProductsAttributes1;
