import React, { useState, useRef, useEffect } from "react";
import "./Select.css";

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export interface SelectProps {
  label?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: (Option | OptionGroup)[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  style?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  dropdownClassName?: string;
  notFoundContent?: React.ReactNode;
  mode?: 'multiple' | 'tags';
  maxTagCount?: number;
  maxTagTextLength?: number;
  maxTagPlaceholder?: (omittedValues: string[]) => React.ReactNode;
  loading?: boolean;
  size?: 'large' | 'middle' | 'small';
  bordered?: boolean;
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onDropdownVisibleChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: Option) => void;
  onDeselect?: (value: string, option: Option) => void;
  onClear?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const isGroup = (opt: Option | OptionGroup): opt is OptionGroup => {
  return (opt as OptionGroup).options !== undefined;
};

const Select: React.FC<SelectProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  multiple = false,
  allowClear = false,
  showSearch = false,
  style,
  dropdownStyle,
  dropdownClassName = "",
  notFoundContent = "No data",
  mode,
  maxTagCount,
  maxTagTextLength,
  maxTagPlaceholder,
  loading = false,
  size = 'middle',
  bordered = true,
  suffixIcon,
  clearIcon,
  removeIcon,
  menuItemSelectedIcon,
  getPopupContainer,
  onDropdownVisibleChange,
  onSearch,
  onSelect,
  onDeselect,
  onClear,
  onBlur,
  onFocus,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    value ? (Array.isArray(value) ? value : [value]) : 
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : 
    []
  );
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected values when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setOpen(!open);
      onDropdownVisibleChange?.(!open);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchValue(searchText);
    onSearch?.(searchText);
  };

  const handleSelect = (option: Option) => {
    if (option.disabled) return;

    let newSelectedValues: string[];
    
    if (multiple || mode === 'multiple' || mode === 'tags') {
      if (selectedValues.includes(option.value)) {
        newSelectedValues = selectedValues.filter(v => v !== option.value);
        onDeselect?.(option.value, option);
      } else {
        newSelectedValues = [...selectedValues, option.value];
        onSelect?.(option.value, option);
      }
    } else {
      newSelectedValues = [option.value];
      onSelect?.(option.value, option);
      setOpen(false);
    }

    setSelectedValues(newSelectedValues);
    onChange?.(multiple || mode === 'multiple' || mode === 'tags' ? newSelectedValues : newSelectedValues[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(multiple || mode === 'multiple' || mode === 'tags' ? [] : '');
    onClear?.();
  };

  const handleRemoveTag = (e: React.MouseEvent, tagValue: string) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(v => v !== tagValue);
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
    
    const option = findOptionByValue(tagValue);
    if (option) {
      onDeselect?.(tagValue, option);
    }
  };

  const findOptionByValue = (value: string): Option | undefined => {
    for (const opt of options) {
      if (isGroup(opt)) {
        const found = opt.options.find(o => o.value === value);
        if (found) return found;
      } else if (opt.value === value) {
        return opt;
      }
    }
    return undefined;
  };

  const getOptionLabel = (value: string): string => {
    const option = findOptionByValue(value);
    return option ? option.label : value;
  };

  const renderTags = () => {
    if (!multiple && mode !== 'multiple' && mode !== 'tags') {
      return selectedValues.length > 0 ? getOptionLabel(selectedValues[0]) : null;
    }

    if (maxTagCount && selectedValues.length > maxTagCount) {
      const displayedTags = selectedValues.slice(0, maxTagCount);
      const omittedValues = selectedValues.slice(maxTagCount);
      
      return (
        <>
          {displayedTags.map(value => (
            <span key={value} className="nox-select-selection-item">
              <span className="nox-select-selection-item-content">
                {maxTagTextLength && getOptionLabel(value).length > maxTagTextLength
                  ? `${getOptionLabel(value).slice(0, maxTagTextLength)}...`
                  : getOptionLabel(value)}
              </span>
              <span 
                className="nox-select-selection-item-remove"
                onClick={(e) => handleRemoveTag(e, value)}
              >
                {removeIcon || '×'}
              </span>
            </span>
          ))}
          {maxTagPlaceholder ? (
            maxTagPlaceholder(omittedValues)
          ) : (
            <span className="nox-select-selection-item">
              <span className="nox-select-selection-item-content">
                +{selectedValues.length - maxTagCount} ...
              </span>
            </span>
          )}
        </>
      );
    }

    return selectedValues.map(value => (
      <span key={value} className="nox-select-selection-item">
        <span className="nox-select-selection-item-content">
          {maxTagTextLength && getOptionLabel(value).length > maxTagTextLength
            ? `${getOptionLabel(value).slice(0, maxTagTextLength)}...`
            : getOptionLabel(value)}
        </span>
        <span 
          className="nox-select-selection-item-remove"
          onClick={(e) => handleRemoveTag(e, value)}
        >
          {removeIcon || '×'}
        </span>
      </span>
    ));
  };

  const renderDropdown = () => {
    if (!open) return null;

    const filteredOptions = options.filter(opt => {
      if (isGroup(opt)) {
        return opt.options.some(o => 
          o.label.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else {
        return opt.label.toLowerCase().includes(searchValue.toLowerCase());
      }
    });

    const hasOptions = filteredOptions.some(opt => 
      isGroup(opt) ? opt.options.length > 0 : true
    );

    return (
      <div 
        className={`nox-select-dropdown ${dropdownClassName}`}
        style={dropdownStyle}
        ref={dropdownRef}
      >
        {loading ? (
          <div className="nox-select-dropdown-loading">
            <span className="nox-select-dropdown-loading-icon"></span>
            <span className="nox-select-dropdown-loading-text">Loading...</span>
          </div>
        ) : !hasOptions ? (
          <div className="nox-select-dropdown-empty">
            {notFoundContent}
          </div>
        ) : (
          <ul className="nox-select-dropdown-menu">
            {filteredOptions.map((opt, i) => 
              isGroup(opt) ? (
                <li key={i} className="nox-select-dropdown-menu-item-group">
                  <div className="nox-select-dropdown-menu-item-group-title">
                    {opt.label}
                  </div>
                  <ul className="nox-select-dropdown-menu-item-group-list">
                    {opt.options.map(subOpt => (
                      <li 
                        key={subOpt.value}
                        className={`nox-select-dropdown-menu-item ${
                          selectedValues.includes(subOpt.value) ? 'nox-select-dropdown-menu-item-selected' : ''
                        } ${subOpt.disabled ? 'nox-select-dropdown-menu-item-disabled' : ''} ${
                          hoveredOption === subOpt.value ? 'nox-select-dropdown-menu-item-active' : ''
                        }`}
                        onMouseEnter={() => setHoveredOption(subOpt.value)}
                        onMouseLeave={() => setHoveredOption(null)}
                        onClick={() => handleSelect(subOpt)}
                      >
                        <span className="nox-select-dropdown-menu-item-content">
                          {subOpt.label}
                        </span>
                        {selectedValues.includes(subOpt.value) && menuItemSelectedIcon && (
                          <span className="nox-select-dropdown-menu-item-selected-icon">
                            {menuItemSelectedIcon}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li 
                  key={opt.value}
                  className={`nox-select-dropdown-menu-item ${
                    selectedValues.includes(opt.value) ? 'nox-select-dropdown-menu-item-selected' : ''
                  } ${opt.disabled ? 'nox-select-dropdown-menu-item-disabled' : ''} ${
                    hoveredOption === opt.value ? 'nox-select-dropdown-menu-item-active' : ''
                  }`}
                  onMouseEnter={() => setHoveredOption(opt.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={() => handleSelect(opt)}
                >
                  <span className="nox-select-dropdown-menu-item-content">
                    {opt.label}
                  </span>
                  {selectedValues.includes(opt.value) && menuItemSelectedIcon && (
                    <span className="nox-select-dropdown-menu-item-selected-icon">
                      {menuItemSelectedIcon}
                    </span>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`nox-select-wrapper ${className} ${size} ${!bordered ? 'nox-select-borderless' : ''}`}
      style={style}
      ref={selectRef}
    >
      {label && <label className="nox-select-label">{label}</label>}
      <div 
        className={`nox-select ${open ? 'nox-select-open' : ''} ${disabled ? 'nox-select-disabled' : ''}`}
        onClick={handleToggleDropdown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <div className="nox-select-selector">
          <div className="nox-select-selection-search">
            <input
              ref={inputRef}
              className="nox-select-selection-search-input"
              value={searchValue}
              onChange={handleSearch}
              placeholder={selectedValues.length === 0 ? placeholder : ''}
              disabled={disabled}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="nox-select-selection-item-container">
            {renderTags()}
          </div>
        </div>
        <span className="nox-select-arrow">
          {suffixIcon || (
            <span className="nox-select-arrow-icon">
              <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M884 256H140c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h744c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
          )}
        </span>
        {allowClear && selectedValues.length > 0 && !disabled && (
          <span className="nox-select-clear" onClick={handleClear}>
            {clearIcon || (
              <span className="nox-select-clear-icon">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.8 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                </svg>
              </span>
            )}
          </span>
        )}
      </div>
      {renderDropdown()}
    </div>
  );
};

export default Select;
