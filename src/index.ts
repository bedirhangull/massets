const fs = require("fs");
const fse = require("fs-extra");
const sizeOf = require("image-size");
const spawn = require("cross-spawn");
const glob = require("glob");
const ncp = require('ncp')
var shell = require('shelljs');

async function readTheConfigFile() {
  fse.readFile("massets.config.json", "utf-8")
    .then((data: any) => {
    const assetsPath = JSON.parse(data).path;
    start(assetsPath);
    })
    .catch((err:String) => console.log("You don't have a massets.config.json in main route"))
}

function openWebProject() {
  console.log("Web project has been started in localhost http://localhost:4007/");
  shell.exec('bash ./web_project/hi.sh')
}

// async function _getBase64Value(path: String){
//   for (let i = 0; i < 100; i++) {
//     const image = await Jimp.read(path);
//     const buffer = await image.getBufferAsync(Jimp.AUTO);
//     return buffer
//   }
// }

/**
 * type -> 1 -> vertical rectangle
 * type -> 2 -> square
 * type -> 3 -> rectangle
 */
function _detectImageValues(path: String) {
  const dimensions = sizeOf(path);
  if (dimensions.width * dimensions.height < 16384) {
    return { height: dimensions.height, width: dimensions.width };
  }

  if (dimensions.width / dimensions.height < 1) {
    return 1;
  } else if (dimensions.width / dimensions.height == 1) {
    return 2;
  } else if (dimensions.width / dimensions.height > 1) {
    return 3;
  }
}

function start(assetsPath: String) {
  let images: Array<asset> = [];
  glob(
    `${assetsPath}/**/*.{png,gif,jpg,svg,jpeg,webp,PNG,JPG,JPEG}`,
    async function (er: String, files: Array<String>) {
      for (let index = 0; index < files.length; index++) {
        const _assetType = files[index].slice(-3);
        const parts = files[index].split("/");
        const fileName = parts.pop();
        const asset = files[index];
        images.push({
          assetType: _detectImageValues(asset),
          src: files[index],
          assetName: fileName,
          svg: _assetType,
          title: parts[parts.length - 1],
          //base64: _getBase64Value(asset),
        });
       await _createAssetFolder(asset.replace("./", ""));
      }
      _createJSONFile(images);
    }
  );
}

/**
 * this function create the asset folder in web project
 */
async function _createAssetFolder(assetPath: String) {
  const srcDir = "./" + assetPath;
  const distDir = "./node_modules/massets/web_project/public/" + assetPath;
    try {
      const copied = await fse.copy(srcDir,distDir,{overwrite: true})
  } catch (err) {
    console.error(err);
  }
}

/**
 * this function create the json file for mapping icons in the main page
 */
function _createJSONFile(assets: any): void {
  console.log('All assets added in massets \u{2705}')
  fs.writeFile(
    "./node_modules/massets/web_project/src/utils/data/assets.json",
    JSON.stringify(assets),
    function (err: String) {
      if (err) {
        console.error("Crap happens");
      }
      openWebProject();
    },
  );
}
openWebProject()

