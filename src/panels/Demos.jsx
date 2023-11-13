import React, { useState } from "react";
const fs = require("uxp").storage.localFileSystem;
const fileTypes = require("uxp").storage.fileTypes;
const app = require("photoshop").app;
const core = require("photoshop").core;

export const openFileAsDocument = async (file) => {
  async function openDocument() {
    await app.open(file);
    // Todo
    // handle main logic here
  }
  try {
    return await core.executeAsModal(openDocument, {
      command: "opening file",
    });
  } catch (error) {
    console.log("error opening file as document", error);
  }
};

export const Demos = () => {
  const [selectedFiles, setSelectedFiles] = useState();
  const numberOfFiles = selectedFiles?.length || 0;

  const selectFiles = async () => {
    const files = await fs.getFileForOpening({
      allowMultiple: true,
      types: fileTypes.images,
    });
    setSelectedFiles(files);
  };

  const handleCreate = () => {
    selectedFiles.forEach((file) => openFileAsDocument(file));
  };

  return (
    <div>
      <div>
        <sp-heading size="XXS">Files </sp-heading>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <sp-button
            size="s"
            variant="primary"
            onClick={selectFiles}
            style={{ marginRight: 6, width: 100 }}
          >
            Choose Files
          </sp-button>
          <sp-body size="XS" style={{ margin: 0 }}>
            {numberOfFiles} file{numberOfFiles === 1 ? "" : "s"} selected
          </sp-body>
        </div>
      </div>
      <div>
        <sp-heading size="XXS">Output folder </sp-heading>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <sp-button
            size="s"
            variant="primary"
            onClick={selectFiles}
            style={{ marginRight: 6, width: 100 }}
          >
            Choose Folder
          </sp-button>
          <sp-body size="XS" style={{ margin: 0 }}>
            /output
          </sp-body>
        </div>
      </div>
      <sp-button
        onClick={handleCreate}
        disabled={undefined}
        style={{ marginTop: 20, width: "100%" }}
      >
        Create
      </sp-button>
    </div>
  );
};
