import React, { useState } from "react";

const UploadImageComponent = () => {
  const [file, setFile] = useState<string>("");

  const handleChange = (e: any) => {
    console.log("file: ", e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container m-3">
      <div className="p-4 d-flex justify-content-center flex-column">
        <input
          type="file"
          onChange={handleChange}
          name=""
          id=""
          style={{
            cursor: "pointer",
          }}
        />

        <img
          style={{
            width: "250px",
            height: "250px",
          }}
          src={file}
          alt=""
        />
      </div>
    </div>
  );
};

export default UploadImageComponent;
