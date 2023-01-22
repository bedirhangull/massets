declare const fs: any;
declare const fse: any;
declare const sizeOf: any;
declare const spawn: any;
declare const glob: any;
declare const ncp: any;
declare var shell: any;
declare function readTheConfigFile(): Promise<void>;
declare function openWebProject(): void;
/**
 * type -> 1 -> vertical rectangle
 * type -> 2 -> square
 * type -> 3 -> rectangle
 */
declare function _detectImageValues(path: String): 1 | 2 | 3 | {
    height: any;
    width: any;
} | undefined;
declare function start(assetsPath: String): void;
/**
 * this function create the asset folder in web project
 */
declare function _createAssetFolder(assetPath: String): Promise<void>;
/**
 * this function create the json file for mapping icons in the main page
 */
declare function _createJSONFile(assets: any): void;
