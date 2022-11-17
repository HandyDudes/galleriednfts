import Head from 'next/head'
import { useState } from 'react'
import { NFTCard } from "./components/nftCard"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection]=useState(false)
  const [nextTokString, setNextTokString]=useState("");
  const [nextPageKey, setNextPageKey]=useState("");
  const [b_text, setB_text]=useState("Fetch!");


  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = "WE9LjYnfollmRrf0Gv7Uimn-ZqUyI2zz"
    const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTs`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
      // if only the owner is specified, not the collection
      const fetchURL = `${baseURL}?owner=${wallet}&pageSize=6&pageKey=${nextPageKey}&withMetadata=${"true"}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&pageSize=6&pageKey=${nextPageKey}&withMetadata=${"true"}`;
      console.log("");
      console.log(fetchURL);
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
    if (nfts.pageKey!= undefined){
      setNextPageKey(nfts.pageKey)
      setB_text("Next Page");
      console.log("key=" + nfts.pageKey)
      console.log("Next_Key:" + nextPageKey);
    } else{
       setNextPageKey("")
       setB_text("Fetch!")

      }

    
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "WE9LjYnfollmRrf0Gv7Uimn-ZqUyI2zz"
      const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&startToken=${nextTokString}&limit=6&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
      //handle next page for collections...
      if (nfts.nextToken){
        setNextTokString(nfts.nextToken);
        setB_text("Next Page");
      } else{
        setNextTokString("");
        setB_text("Fetch!")
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Galleried NFT's</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-16 text-center">
        <div className="flex w-full flex-1 flex-col items-center justify-center px-16 text-center">
          <p className="font-sans font-extrabold text-4xl text-gray-600">Gallery of Non-fungible Tokens</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
          <div className="flex flex-col w-full justify-center items-center gap-y-2">
            <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
            <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add a collection address"></input>
            <label className="text-gray-600 py-4"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
            <button className={"disabled:bg-slate-500 text-white bg-blue-600 px-6 py-2 mt-3 rounded-sm w-1/2"} onClick={
               () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else{
              fetchNFTs()
            } 
                     
             }
             }>
              {b_text}
                </button>
          </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-full gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
      </main>
      
    </div>
  )
}

export default Home
