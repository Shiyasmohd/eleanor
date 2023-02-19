import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_ID +
      ":" +
      process.env.NEXT_PUBLIC_INFURA_SECRET_KEY
  ).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const uploadFile: (buffer: Buffer) => Promise<string> = async (
  buffer: Buffer
) => {
  console.log("Uploading started");

  let fileUrl;

  if (buffer)
    await ipfs
      .add(buffer)
      .then((response) => {
        fileUrl = `https://ipfs.io/ipfs/${response.path}`;
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please check the console");
      });
  else return "Buffer error";

  if (fileUrl) return fileUrl;
  else return "Upload error";
};

export { uploadFile };
