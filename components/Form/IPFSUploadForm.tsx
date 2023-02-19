import { Button } from "@nextui-org/react";
import { FC, FormEvent, useState } from "react";
import { uploadFile } from "../../libs/ipfsUpload";

const IFPSUploadForm: FC = () => {
  const [buffer, setBuffer] = useState<Buffer | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const captureFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0] as Blob;
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader: FileReader) => {
    const buffer = await Buffer.from(reader.result as any);
    setBuffer(buffer);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let fileUrl: string;

    if (buffer) {
      setIsUploading(true);
      fileUrl = await uploadFile(buffer);
      setFileUrl(fileUrl);
      console.log("File uploaded to ipfs, url:", fileUrl);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center w-full">
        {!buffer ? (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={captureFile}
              className="hidden"
            />
          </label>
        ) : (
          <>
            {!isUploading ? (
              <div className="flex text-white flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <p className="text-lg pb-10">File loaded, click on upload</p>
                <Button type="submit" color="primary" auto bordered>
                  Upload
                </Button>
              </div>
            ) : (
              <div className="flex text-white flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                {!fileUrl ? (
                  <p className="text-lg pb-10">Uploading to ipfs...</p>
                ) : (
                  <p className="text-lg pb-10 text-center">
                    File uploaded <br />
                    <a
                      className="hover:underline"
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {fileUrl}
                    </a>
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default IFPSUploadForm;
