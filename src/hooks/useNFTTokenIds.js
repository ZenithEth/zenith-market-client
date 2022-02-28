// import { ContactsOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import {
  // useMoralisWeb3Api,
  // useMoralisWeb3ApiCall,
  // useMoralis,
  useWeb3Contract,
  useNFTBalances,
} from "react-moralis";
// import { useIPFS } from "./useIPFS";
import contractABI from "contracts/Market.json";

export const useNFTTokenIds = () => {
  const { getNFTBalances, data, error, isLoading } = useNFTBalances();
  // const { token } = useMoralisWeb3Api();
  // const { chainId } = useMoralis();
  // const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [totalNFTs, setTotalNFTs] = useState();
  const [fetchSuccess, setFetchSuccess] = useState(true);
  // const {
  //   fetch: getNFTTokenIds,
  //   data,
  //   error,
  //   isLoading,
  // } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
  //   chain: chainId,
  //   address: "0x88Ac49473922216A1723c90f277aE48b410303ee",
  // });
  const {
    data: marketNfts,
    runContractFunction,
    // isFetching,
  } = useWeb3Contract({
    abi: contractABI.abi,
    contractAddress: "0x88Ac49473922216A1723c90f277aE48b410303ee",
    functionName: "fetchMarketItems",
  });

  console.log(data, error, marketNfts);
  const handleNfts = async () => {
    // getNFTBalances({
    //   params: {
    //     chain: "0x13881",
    //     address: "0x88Ac49473922216A1723c90f277aE48b410303ee",
    //   },
    // });
    if (data?.result) {
      const NFTs = data.result;
      setTotalNFTs(data.total);
      setFetchSuccess(true);
      setNFTTokenIds(NFTs);
      // for (let NFT of NFTs) {
      //   if (NFT?.metadata) {
      //     NFT.metadata = JSON.parse(NFT.metadata);
      //     NFT.image = resolveLink(NFT.metadata?.image);
      //   } else if (NFT?.token_uri) {
      //     try {
      //       await fetch(NFT.token_uri)
      //         .then((response) => response.json())
      //         .then((data) => {
      //           NFT.image = resolveLink(data.image);
      //         });
      //     } catch (error) {
      //       setFetchSuccess(false);

      //  !!Temporary work around to avoid CORS issues when retrieving NFT images!!
      //     Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
      //     Replace <your url here> with your proxy server_url below
      //     Remove comments :)

      // try {
      //   await fetch(
      //     `https://boiling-hamlet-14727.herokuapp.com/${NFT.token_uri}`,
      //   )
      //     .then((response) => response.json())
      //     .then((data) => {
      //       NFT.image = resolveLink(data.image);
      //     });
      // } catch (error) {
      //   setFetchSuccess(false);
      // }
      //   }
      //   }
      // }
    }
  };

  useEffect(() => {
    handleNfts();
  }, [data]);

  return {
    marketNfts,
    runContractFunction,
    getNFTBalances,
    NFTTokenIds,
    totalNFTs,
    fetchSuccess,
    error,
    isLoading,
  };
};
