import React, { ChangeEvent, useState } from "react";
import "../App.css";
import CustomButton from "./CustomButton";
import {
  inputFieldStateType,
  textFieldType,
  inputErrorStateType,
} from "../types/types";
import { isResourceItem, ParseError, convertIdKey, reduceResourceItemObj } from './utils';

const initialErrorState: inputErrorStateType = {
  isError: true,
  message: "",
};

const TextField: React.FC<textFieldType> = ({
  handleSubmit,
}) => {
  const [inputTextState, setInputTextState] = useState<inputFieldStateType>();
  const [inputErrorState, setInputErrorState] =
    useState<inputErrorStateType>(initialErrorState);

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedObject = convertIdKey(JSON.parse(event.target.value));
      console.log(parsedObject);
      if (isResourceItem(parsedObject)) {
        setInputErrorState((prevState) => ({
          ...prevState,
          isError: false,
          message: "",
        }));
        setInputTextState((prevState) => ({
          ...prevState,
          value: parsedObject
        }))
      } else {
        throw new ParseError(
          "Parsed object does not match ResourceItem interface"
        );
      }
    } catch (e: any) {
      if (e instanceof ParseError) {
        setInputErrorState((prevState) => ({
          ...prevState,
          isError: true,
          message: e.message,
        }));
        return;
      }
      setInputErrorState((prevState) => ({
        ...prevState,
        isError: true,
        message: "Not a valid JSON",
      }));
    }
  };

  const handleButtonClick = () => {
    if(inputTextState !== undefined) {
      handleSubmit(reduceResourceItemObj(inputTextState!.value))
    }
  };

  return (
    <div className="text-field-container">
      <div>
        <p>Enter The Resource Item Object here: </p>
        <textarea
          rows={42}
          className={`input-field ${inputErrorState.isError && "error-field"}`}
          onChange={onInputChange}
        ></textarea>
        {inputErrorState.isError && (
          <p className="error-text">{inputErrorState.message}</p>
        )}
      </div>
      <CustomButton
        iconName={"submit"}
        content="Submit"
        onClick={handleButtonClick}
        isDisabled = {inputErrorState.isError}
      ></CustomButton>
    </div>
  );
};

export default TextField;
