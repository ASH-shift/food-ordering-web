const ImageKit = require("@imagekit/nodejs").default;
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(fileBuffer, fileName) {
  try {
    // Convert buffer → File object (required for new ImageKit SDK)
    const fileObject = await toFile(fileBuffer, fileName);

    const result = await imagekit.files.upload({
      file: fileObject,
      fileName: fileName
    });

    return result;
  } catch (err) {
    console.error("ImageKit Upload Error:", err);
    throw err;
  }
}

module.exports = { uploadFile };
