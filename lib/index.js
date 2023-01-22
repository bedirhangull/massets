"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require("fs");
var fse = require("fs-extra");
var sizeOf = require("image-size");
var spawn = require("cross-spawn");
var glob = require("glob");
var ncp = require('ncp');
function readTheConfigFile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fse.readFile("massets.config.json", "utf-8")
                .then(function (data) {
                var assetsPath = JSON.parse(data).path;
                start(assetsPath);
            })
                .catch(function (err) { return console.log("You don't have a massets.config.json in main route"); });
            return [2 /*return*/];
        });
    });
}
function openWebProject() {
    console.log("Web project has been started in localhost http://localhost:4007/");
    var result = spawn.sync("sh", ["./node_modules/massets/web_project/hi.sh"], { encoding: "utf8" });
    return false;
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
function _detectImageValues(path) {
    var dimensions = sizeOf(path);
    if (dimensions.width * dimensions.height < 16384) {
        return { height: dimensions.height, width: dimensions.width };
    }
    if (dimensions.width / dimensions.height < 1) {
        return 1;
    }
    else if (dimensions.width / dimensions.height == 1) {
        return 2;
    }
    else if (dimensions.width / dimensions.height > 1) {
        return 3;
    }
}
function start(assetsPath) {
    var images = [];
    glob("".concat(assetsPath, "/**/*.{png,gif,jpg,svg,jpeg,webp,PNG,JPG,JPEG}"), function (er, files) {
        return __awaiter(this, void 0, void 0, function () {
            var index, _assetType, parts, fileName, asset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < files.length)) return [3 /*break*/, 4];
                        _assetType = files[index].slice(-3);
                        parts = files[index].split("/");
                        fileName = parts.pop();
                        asset = files[index];
                        images.push({
                            assetType: _detectImageValues(asset),
                            src: files[index],
                            assetName: fileName,
                            svg: _assetType,
                            title: parts[parts.length - 1],
                            //base64: _getBase64Value(asset),
                        });
                        return [4 /*yield*/, _createAssetFolder(asset.replace("./", ""))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4:
                        _createJSONFile(images);
                        return [2 /*return*/];
                }
            });
        });
    });
}
/**
 * this function create the asset folder in web project
 */
function _createAssetFolder(assetPath) {
    return __awaiter(this, void 0, void 0, function () {
        var srcDir, distDir, copied, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    srcDir = "./" + assetPath;
                    distDir = "./node_modules/massets/web_project/public/" + assetPath;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fse.copy(srcDir, distDir, { overwrite: true })];
                case 2:
                    copied = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * this function create the json file for mapping icons in the main page
 */
function _createJSONFile(assets) {
    console.log("All assets added in massets \"\u2705\"");
    fs.writeFile("./node_modules/massets/web_project/src/utils/data/assets.json", JSON.stringify(assets), function (err) {
        if (err) {
            console.error("Crap happens");
        }
        openWebProject();
    });
}
readTheConfigFile();
