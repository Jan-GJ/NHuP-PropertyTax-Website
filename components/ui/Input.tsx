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
  nonEditable = false,
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

    if (allowedEndResults && value.length > 0) if (!allowedEndResults.includes(value)) newError = `${value} ist kein(e) ${title}`;

    if (value.length === 0 && required) newError = "Dieses Feld ist erforderlich";
    setError(newError);
    setIsCorrect(newIsCorrect);
    if (!newError) setError("");
    if (!newIsCorrect) setIsCorrect(false);
    if (!allowedEndResults && isCorrect) setIsCorrect(true);
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
        readOnly={nonEditable}
        placeholder={placeholder}
        className={`focus:outline-none p-1 ${width}
        ${
          error
            ? disabled || nonEditable
              ? "border-red-500/50 text-white/50"
              : "border-red-500"
            : isCorrect
            ? disabled || nonEditable
              ? "border-accent/50 text-white/50"
              : "border-accent"
            : disabled || nonEditable
            ? "border-gray-500/50 text-white/50"
            : "border-gray-500"
        }
          border-[3px]  ${!nonEditable ? "focus:border-accent" : ""}`}
        value={value}
        onChange={({ target }) => {
          if (!nonEditable) {
            setValue(target.value);
            checkValue(target.value);
            updateSuggestions(target.value);
          }
        }}
        onClick={(event) => {
          if (nonEditable) event.preventDefault();
          return false;
        }}
        title={error ? error : ""}
        type={type}
        pattern={pattern}
        disabled={disabled}
        maxLength={maxLength}
      />
      {loading ? <div className="loadingIndicator" /> : null}
      {showSuggestions ? (
        <div className="bg-white rounded-b">
          {filteredSuggestions?.map((suggestion, index) => (
            <div key={index}>
              {index + 1 > maxSuggestions ? null : (
                <div
                  className=" py-2 px-1 border-t-[2px] border-accent hover:bg-gray-300/50 cursor-pointer "
                  onClick={() => {
                    setValue(suggestion);
                    checkValue(suggestion);
                    updateSuggestions(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <p>{suggestion}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
