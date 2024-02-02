// FileUploader.tsx

import { useState } from "react";

const UploadFile: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    setSelectedFiles(fileList);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="w-full h-96 p-10 flex items-center justify-center">
      <div
        className=" flex flex-row justify-center items-center border-2 m-4 h-full w-full  border-dashed border-gray-300 p-4 rounded-md cursor-pointer"
        onClick={() => document.getElementById("fileInput")?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-500">Drag and drop files here</p>
          <input
            type="file"
            accept="*/*"
            className="hidden"
            onChange={handleFileInput}
            id="fileInput"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Select Files
          </button>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <p className="font-bold">Selected Files:</p>
            <input
              type="file"
              accept="*/*"
              className="hidden"
              onChange={handleFileInput}
            />
            <ul className="list-disc list-inside">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <button
                    className="text-red-500"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
