import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { customButtonType, iconListType } from "../types/types";

const CustomButton: React.FC<customButtonType> = ({ iconName, content, onClick, isDisabled }) => {
  const iconList: iconListType = {
    copy: faCopy,
    submit: faPaperPlane
  };

  return (
    <button className={`App-button ${isDisabled && 'disable-button'}`} onClick={onClick} disabled={isDisabled}>
      <FontAwesomeIcon icon={iconList[iconName]} style={{ color: "#b0b0b0" }} />
      {content && (
        <>
          <p className="button-text">{content}</p>
        </>
      )}
    </button>
  );
};

export default CustomButton;
