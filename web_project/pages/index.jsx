import React from 'react';
import { useEffect, useState } from 'react'
import '../src/app/globals.css'
import assets from '../src/utils/data/assets.json'

export default function Home() {

  const AssetImage = (props) => {

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
                <h1 className="text-sm text-black max-w-sm">{assetName}</h1>
            </div>
        </div>
    )
}

  const [groupedAssets, setGroupedAssets] = useState(new Map());
  const [searchAssets, setSearchAssets] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let tempGroupedAssets = new Map();
    for (let asset of assets) {
      if (!tempGroupedAssets.has(asset.title)) {
        tempGroupedAssets.set(asset.title, []);
      }
      tempGroupedAssets.get(asset.title).push(asset);
    }
    setGroupedAssets(tempGroupedAssets)
    setSearchAssets(assets);
    console.log(groupedAssets)
  }, [assets]);

  const _handleSearchText = (e) => {
    setSearchText(e.target.value);
    const test = assets.filter((asset) => {
      return (
        asset.assetName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setSearchAssets(test)
    console.log(searchAssets)
    if (e.target.value === '') setSearchAssets([])
  }

  const _searchArea = searchText == '' ? (null) : (
    <div className='px-20 py-8'>
      <h1 className='dark:text-black font-bold text-4xl'>Search Results</h1>
      <div className='grid md:grid-cols-6'>
        {searchAssets.map((asset) => (
          <div className='bg-gray-100 m-4 rounded-md justify-center shadow-md hover:scale-125 hover:bg-gray-300 duration-300 h-fit'>
            <AssetImage src={asset.src} assetType={asset.assetType} assetName={asset.assetName} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <nav className="p-10">
        <div className="container flex flex-wrap items-center mx-auto">
          <a className="flex items-center">
            <img src="../../massets.png" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">Massets</span>
          </a>
          <div className='ml-12 justify-between flex-row'>
            <a href="https://github.com/bedirhangull/massets" target="_blank" className='ml-8 text-gray-500'>GitHub</a>
            <a href="https://twitter.com/bedirhngl" target="_blank" className='ml-8 text-gray-500'>Twitter</a>
            <a href="https://github.com/bedirhangull/massets" target="_blank" className='ml-8 text-gray-500'>Contirbuters</a>
          </div>
        </div>
      </nav>
      <div className='grid bg-black min-h-full justify-center text-align-center p-10'>
        <div className='text-center'>
          <h1 className='dark:text-white font-bold text-6xl'>Search assets in your project</h1>
          <label className="relative block">
            <input onChange={_handleSearchText} className="p-5 placeholder:bold m-8 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm" placeholder="Search icons" type="text" name="search" />
          </label>
        </div>
      </div>
      {_searchArea}
      <div className='px-20 py-8'>
        <h1 className='dark:text-black font-bold text-4xl'>Assets</h1>
      </div>
      <div>
        {Array.from(groupedAssets.entries()).map(([title, assets]) => (
          <div className='px-20 mt-10' key={title}>
            <div className='bg-black p-2 inline-flex '>
              <h1 className='dark:text-white font-bold text-xl'>{title}</h1>
            </div>
            <div className='grid md:grid-cols-6'>
              {assets.map((asset) => (
                <div className='bg-gray-100 m-4 rounded-md justify-center shadow-md hover:scale-125 hover:bg-[#00ccb3] duration-300 h-fit'>
                  <AssetImage src={asset.src} assetType={asset.assetType} assetName={asset.assetName} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}