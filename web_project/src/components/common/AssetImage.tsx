import { useEffect, useState } from "react"

const AssetImage = (props: IAssetImage) => {

    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);

    const calculateSize = () => {
        switch (props.assetType) {
            case 1:
                setImageHeight(200)
                setImageWidth(150)
                break;
            case 2:
                setImageHeight(200)
                setImageWidth(200)
                break;
            case 3:
                setImageHeight(100)
                setImageWidth(200)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        calculateSize()
        if (typeof props.assetType) { setImageHeight(props.assetType.height), setImageWidth(props.assetType.width) }
    })

    const { src, assetName } = props;

    return (
        <div className="m-4 rounded-md text-center flex-colum width-fix">
            <img className="object-contain rounded-md mx-auto" src={src} key={src} height={imageHeight} width={imageWidth} />
            <div className="m-4">
                <h1 className="text-sm text-white max-w-sm">{assetName}</h1>
            </div>
        </div>
    )
}

export default AssetImage;