import CustomButton from "./CustomButton";
import { outputFieldType } from "../types/types";
import { emptyResourceItemObj } from "../App";

const OutputField: React.FC<outputFieldType> = ({reducedResourceItemObj}) => {
  const copyTextToClipboard = async(text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const outputObject = {
    value: JSON.stringify(reducedResourceItemObj,null, 2)
  }

  const handleClick = () => {
    copyTextToClipboard(outputObject.value);
  }

  if(reducedResourceItemObj === emptyResourceItemObj) {
    outputObject.value = ""
  }

  return (
    <div className="text-field-container">
      <div>
        <p>Reduced Resource Item Object: </p>
        <div className="output-field">{outputObject.value}</div>
      </div>
      <CustomButton iconName={"copy"} content="Copy" onClick={handleClick}></CustomButton>
    </div>
  );
}

export default OutputField