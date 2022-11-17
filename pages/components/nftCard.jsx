import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
// Thanks to Alberto Gómez Rodríguez for the imports! What a help these libraries are.
export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex flex-col flex-auto shadow-xl ">
        <div className="rounded-md shadow-xl ">
            <img className="object-cover h-128 w-full rounded-t-md " src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-4 px-1 py-3 bg-slate-100 rounded-b-md h-110  border-solid border-gray-300 border-2 ">
            <div>
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-sm text-gray-600 ">ID: 0x: ...{nft.id.tokenId.substring(62)}</p>
                <div className="text-xs text-gray-600">
                <CopyToClipboard text={nft.contract.address}>
                    <div className="italic inline">
                    ID:{nft.contract.address.substring(0,5)} ...{nft.contract.address.substring(34)}&nbsp;
                        <Tooltip title="Copy to clipboard" placement="right" arrow>
                            <img className="pb-1 cursor-pointer w-4 inline align-middle" src="https://ipfs.filebase.io/ipfs/QmVHXgcYpna4ua4pHcTEd8G4zJTFtCsw3y89pfn2PJPmKV/Qmd5Sio842NBrZt9811BmqZFuvMPGpdpHPr892hkrPxm7M"></img>
                        </Tooltip>
                    </div>
                </CopyToClipboard>    
                </div>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description}</p>
            </div>
            <div className="flex justify-center mb-1">
                    <a target={"_blank"} href={`https://mumbai.polygonscan.com/address/${nft.contract.address}`} className="py-2 px-4 bg-blue-500 rounded-xl w-1/2 text-center text-white cursor-pointer">View on polygonscan</a>
                </div>
        </div>

    </div>
    )
}