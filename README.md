
![Logo](https://www.linkpicture.com/q/massets_icon.png)


## 

Massests is a assets managment tool for big projects. If you have big assets folder, you can use Massests.
You can see your assets in web project and search assets from asset name. Massets supports: PNG, JPEG, JPG, WEBP, SVG


## Installation

- For npm
    ```
    npm install massets
    ```
    For yarn
    ```
    yarn add massets
    ```
- You have to create massets.config.json file in main route
    #### massets.config.json
    ```http
        {
            "path": "<YOUR_ASSETS_FOLDER_PATH>"
        }
    ```
- You have to add script in your package.json
    #### package.json
    ```
        "scripts": {
            ...
            "massets": "massets-start",
        },
    ```
- npm run massets or yarn massets
- Then it will start in http://localhost:4007/
- that's it :) 

## Demo

massets
![Logo](https://s3.gifyu.com/images/massets.gif)

