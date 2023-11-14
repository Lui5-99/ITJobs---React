import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ description, setDescription }) => {
  return (
    <ReactQuill
      theme="snow"
      value={description || ""}
      onChange={setDescription}
      style={{ color: "#fff" }}
    />
  );
};

export default Editor;
