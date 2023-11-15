import React, { useState } from "react";
import { createSafeZoneFromPngs } from "./libs/create-safezone";
import { truncate } from "lodash";
const fs = require("uxp").storage.localFileSystem;
const fileTypes = require("uxp").storage.fileTypes;
const app = require("photoshop").app;

function reverseString(str) {
  return str.split("").reverse().join("");
}

const CheckMark = () => (
  <sp-icon
    size="l"
    style={{ color: "#22c55e", paddingTop: 2 }}
    name="ui:CheckmarkMedium"
  ></sp-icon>
);

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

  const handleCreate = async () => {
    await createSafeZoneFromPngs(selectedFiles, selectedFolder);
    setSelectedFiles(undefined);
    setSelectedFolder(undefined);
    app.showAlert("Tạo safezone thành công!");
  };

  return (
    <div style={{ padding: "0 6px" }}>
      <div>
        <sp-heading
          size="XS"
          style={{ margin: 0, fontSize: 15, lineHeight: 1.4 }}
        >
          Files (.png) {!!numberOfFiles && <CheckMark />}
        </sp-heading>
        {!!numberOfFiles && (
          <sp-body size="S" style={{ margin: 0 }}>
            Đã chọn {numberOfFiles} file
          </sp-body>
        )}
        <sp-button
          variant="primary"
          onClick={selectFiles}
          style={{ marginRight: 6, width: 120, marginTop: 4 }}
        >
          Chọn file
        </sp-button>
      </div>
      <div style={{ marginTop: 16 }}>
        <sp-heading
          size="XS"
          style={{ margin: 0, fontSize: 15, lineHeight: 1.4 }}
        >
          Thư mục lưu file {!!selectedFolder && <CheckMark />}
        </sp-heading>
        {selectedFolder?.nativePath && (
          <sp-body size="S" style={{ margin: 0 }}>
            {reverseString(truncate(reverseString(selectedFolder?.nativePath)))}
          </sp-body>
        )}
        <sp-button
          variant="primary"
          onClick={selectFolder}
          style={{ marginRight: 6, width: 120, marginTop: 4 }}
        >
          Chọn thư mục
        </sp-button>
      </div>
      <sp-button
        size="L"
        onClick={handleCreate}
        disabled={selectedFolder && selectedFiles?.length ? undefined : true}
        style={{ marginTop: 20, width: "100%" }}
      >
        Bắt đầu
      </sp-button>
    </div>
  );
};
