import React from "react";
const fs = require("uxp").storage.localFileSystem;
const fileTypes = require("uxp").storage.fileTypes;

export const LabeledFilePicker = () => {
  const selectFiles = async () => {
    const files = await fs.getFileForOpening({
      allowMultiple: true,
      types: fileTypes.images,
    });
    if (files.length === 0) {
      console.log("no files selected");
    }
    console.log("files: ", files);
  };
  
  return (
    <div>
      <sp-heading size="XXS">Files</sp-heading>
      <sp-button
        style={{ width: "100%" }}
        variant="primary"
        onClick={selectFiles}
      >
        Choose Files
      </sp-button>
    </div>
  );
};
