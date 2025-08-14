import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

const SearchFilter = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="relative max-w-md mb-6 transition-all duration-200">
      <div
        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all ${
          isFocused ? "text-cyan-400" : "text-gray-400"
        }`}
      >
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search posts..."
        className={`block w-full pl-10 pr-8 py-2.5 bg-gray-700 border rounded-md text-gray-200 focus:outline-none transition-all duration-200 ${
          isFocused
            ? "border-cyan-400 shadow-lg shadow-cyan-400/10"
            : "border-gray-600 hover:border-gray-500"
        }`}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
