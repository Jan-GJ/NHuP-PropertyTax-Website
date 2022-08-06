import React, { useEffect, useState } from "react";
import { InputProps } from "../../types/global";

const Input = ({
  title,
  required = false,
  type = "text",
  pattern,
  allowedCharsRegExp = undefined,
  disabled = false,
  allowedEndResults = undefined,
  placeholder = "",
  suggestions = undefined,
  maxSuggestions = 4,
  maxLength = undefined,
  loading = false,
  width = "min-w-[200px]",
  valueState,
  errorState,
  isCorrectState,
}: InputProps) => {
  const [isCorrect, setIsCorrect] = isCorrectState;
  const [value, setValue] = valueState;
  const [error, setError] = errorState;

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestions as []);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const checkValue = (value: string) => {
    if (allowedCharsRegExp) setValue(value.replace(allowedCharsRegExp, "").replace(/(\..*)\./g, "$1"));
    let newError = "";
    let newIsCorrect = false;
    if (allowedEndResults) if (allowedEndResults.includes(value)) newIsCorrect = true; //TODO: for street name use google api to check this make special case for it so query street name with debounce

    if (allowedEndResults) if (!allowedEndResults.includes(value)) newError = `${value} ist kein(e) ${title}`;

    if (value.length === 0 && required) newError = "Dieses Feld ist erforderlich";
    setError(newError);
    setIsCorrect(newIsCorrect);
    if (!newError) setError("");
    if (!newIsCorrect) setIsCorrect(false);
  };

  const updateSuggestions = (value: string) => {
    if (suggestions) {
      if (value.length > 0 && !isCorrect) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
      setFilteredSuggestions(suggestions.filter((suggestion) => suggestion.toLocaleLowerCase().includes(value.toLowerCase())).slice(0, maxSuggestions));
    }
  };

  useEffect(() => {
    checkValue(value);
  }, [value]);

  return (
    <div className="">
      <div className="flex justify-between items-end">
        {title ? (
          <div className="flex flex-row">
            <h1 className={`${disabled ? "text-black/50" : "text-black"}`}>{title}</h1>
            {required ? <h1 className={`${disabled ? "text-red-500/50" : "text-red-500"} font-bold`}>{"*"}</h1> : null}
          </div>
        ) : null}
      </div>

      <input
        onKeyDown={({ key }) => {
          if (suggestions)
            if (key === "Enter" || key === "Tab") {
              if (filteredSuggestions[0] && value.length > 0) {
                setValue(filteredSuggestions[0]);
                checkValue(filteredSuggestions[0]);
                updateSuggestions(filteredSuggestions[0]);
                setShowSuggestions(false);
              }
            }
        }}
        placeholder={placeholder}
        className={`focus:outline-none p-1 ${width}
        ${
          error
            ? disabled
              ? "border-red-500/50"
              : "border-red-500"
            : isCorrect
            ? disabled
              ? "border-accent/50"
              : "border-accent"
            : disabled
            ? "border-gray-500/50"
            : "border-gray-500"
        }
          border-[3px] focus:border-accent`}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
          checkValue(target.value);
          updateSuggestions(target.value);
        }}
        title={error ? error : ""}
        type={type}
        pattern={pattern}
        disabled={disabled}
        maxLength={maxLength}
      />
      {loading ? <div className="loadingIndicator" /> : null}
      {showSuggestions ? (
        <div className="py-1">
          {filteredSuggestions?.map((suggestion, index) => (
            <div
              className="bg-gray-300 p-1 hover:bg-gray-300/50 cursor-pointer"
              onClick={() => {
                setValue(suggestion);
                checkValue(suggestion);
                updateSuggestions(suggestion);
                setShowSuggestions(false);
              }}
              key={index}
            >
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
