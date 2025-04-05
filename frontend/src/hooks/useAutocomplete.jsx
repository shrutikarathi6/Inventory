import { useState } from "react";

const useAutocomplete = (options, formData, setFormData, fieldName) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle user input and filter options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [fieldName]: value });

    if (!value) {
      setFilteredOptions([]);
      setShowDropdown(false);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().startsWith(value.toLowerCase()) // Case-insensitive filtering
      );
      setFilteredOptions(filtered);
      setShowDropdown(filtered.length > 0);
    }
  };

  // Handle selection from dropdown
  const handleSelect = (selectedValue) => {
    setFormData({ ...formData, [fieldName]: selectedValue });
    setShowDropdown(false);
  };

  return {
    filteredOptions,
    showDropdown,
    handleInputChange,
    handleSelect,
  };
};

export default useAutocomplete;
