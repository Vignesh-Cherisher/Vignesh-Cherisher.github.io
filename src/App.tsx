import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import OutputField from "./components/OutputField";
import TextField from "./components/TextField";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ReducedResourceItem, ResourceItem } from "./types/types";

export const emptyResourceItemObj: ReducedResourceItem = {
  name: "",
  parameters: [
    {
      name: "",
    },
  ],
};

function App() {
  const [resourceItem, setResourceItem] = useState<ReducedResourceItem>(emptyResourceItemObj);

  const submitHandler = (resourceItemObj: ReducedResourceItem) => {
    setResourceItem(resourceItemObj);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Reduce Resource Items</p>
      </header>
      <main className="App-main">
        <TextField
          handleSubmit={submitHandler}
        ></TextField>
        <FontAwesomeIcon
          icon={faRightLong}
          size="2xl"
          style={{ color: "#c7c7c7" }}
        />
        <OutputField reducedResourceItemObj={resourceItem}></OutputField>
      </main>
    </div>
  );
}

export default App;
