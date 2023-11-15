import React, { useState } from "react";
import { createSafeZoneFromPngs } from "./libs/create-safezone";
import { truncate } from "lodash";
const fs = require("uxp").storage.localFileSystem;
const fileTypes = require("uxp").storage.fileTypes;

function reverseString(str) {
  return str.split("").reverse().join("");
}

export const Demos = () => {
  const [selectedFolder, setSelectedFolder] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const numberOfFiles = selectedFiles?.length || 0;

  const selectFiles = async () => {
    const files = await fs.getFileForOpening({
      allowMultiple: true,
      types: fileTypes.images,
    });
    setSelectedFiles(files);
  };

  const selectFolder = async () => {
    const folder = await fs.getFolder();
    setSelectedFolder(folder);
  };

  const handleCreate = () => {
    createSafeZoneFromPngs(selectedFiles, selectedFolder);
  };

  return (
    <div>
      <div>
        <sp-heading size="XXS" style={{ margin: 0 }}>
          Files{" "}
        </sp-heading>
        <sp-body size="XS" style={{ margin: 0 }}>
          {numberOfFiles} file{numberOfFiles === 1 ? "" : "s"} selected
        </sp-body>
        <sp-button
          size="s"
          variant="primary"
          onClick={selectFiles}
          style={{ marginRight: 6, width: 100, marginTop: 4 }}
        >
          Choose Files
        </sp-button>
      </div>
      <div style={{ marginTop: 16 }}>
        <sp-heading size="XXS" style={{ margin: 0 }}>
          Output folder{" "}
        </sp-heading>
        {selectedFolder?.nativePath && (
          <sp-body size="XS" style={{ margin: 0 }}>
            {reverseString(truncate(reverseString(selectedFolder?.nativePath)))}
          </sp-body>
        )}
        <sp-button
          size="s"
          variant="primary"
          onClick={selectFolder}
          style={{ marginRight: 6, width: 100, marginTop: 4 }}
        >
          Choose Folder
        </sp-button>
      </div>
      <sp-button
        onClick={handleCreate}
        disabled={selectedFolder && selectedFiles ? undefined : true}
        style={{ marginTop: 20, width: "100%" }}
      >
        Create
      </sp-button>
    </div>
  );
};
