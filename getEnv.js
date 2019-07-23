// we use :
// platform specific environemt
// local .env environment
// google storage .env environment -- TO BE TESTED

const fs = require("fs");
const dotEnvExists = fs.existsSync(".env");

if (!dotEnvExists) {
  console.log("try to download .env");
  const { Storage } = require("@google-cloud/storage");
  // Creates a client
  const gcs = new Storage();

  const bucketName = "envvars_spin4athletics";

  console.log("downloading .env from ", bucketName);
  gcs
    .bucket(bucketName)
    .file(".env")
    .download({ destination: ".env" })
    .then(() => {
      console.log("getEnv.js -- .env donwloaded successfully");
    })
    .catch(err => {
      console.log("errror downloading ", JSON.stringify(err, undefined, 2));
    });
}
