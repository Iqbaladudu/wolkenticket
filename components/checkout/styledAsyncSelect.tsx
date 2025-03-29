import AsyncSelect from "react-select/async";

const StyledAsyncSelect = ({ ...props }) => (
  <AsyncSelect
    classNames={{
      control: (state) =>
        `!bg-white !border-gray-200 !rounded-md !shadow-sm !h-10 !min-h-10 ${
          state.isFocused ? "!border-blue-500 !ring-2 !ring-blue-100" : ""
        }`,
      placeholder: () => "!text-gray-400",
      input: () => "!text-gray-800",
      option: (state) =>
        `!py-2 !px-3 ${
          state.isFocused
            ? "!bg-blue-50 !text-blue-700"
            : state.isSelected
              ? "!bg-blue-500 !text-white"
              : "!text-gray-700"
        }`,
    }}
    {...props}
  />
);

export default StyledAsyncSelect;
