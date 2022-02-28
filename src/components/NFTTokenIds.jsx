import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNativeByChain } from "helpers/networks";
// import { getCollectionsByChain } from "helpers/collections";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Modal, Badge, Alert, Spin } from "antd";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";

import { useWeb3ExecuteFunction } from "react-moralis";
import contractABI from "contracts/Market.json";
import MarketCard from "components/MarketCard";

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    //borderRadius: "10px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    // positon: "relative",
    // marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
};

function NFTTokenIds() {
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { getNFTBalances, NFTTokenIds, marketNfts, runContractFunction } =
    useNFTTokenIds();
  const marketAddress = "0x88Ac49473922216A1723c90f277aE48b410303ee";
  const { account: walletAddress, chainId } = useMoralis();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = contractABI.abi;
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("MarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ]),
  );
  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "0x13881",
        address: "0x88Ac49473922216A1723c90f277aE48b410303ee",
      },
    });
    runContractFunction();
  }, []);

  const marketNFTsForSale = [];
  // for (let x of marketNfts) {
  //   console.log(x.tokenId?.toNumber());
  //   // let found = marketNfts?.find(
  //   //   (e) => e.nftContract.toString() == x?.token_address,
  //   // );
  //   console.log("FOUND", x);
  // }

  console.log(fetchMarketItems, NFTTokenIds, marketNfts, marketNFTsForSale);
  const purchaseItemFunction = "createMarketSale";
  // const NFTCollections = getCollectionsByChain(chainId);

  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: () => {
        setLoading(false);
        failPurchase();
      },
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true,
    );
    return result;
  };

  return (
    <>
      <div>
        <StyledBalances style={styles.NFTs}>
          {NFTTokenIds.length > 0 ? (
            NFTTokenIds?.map((nft, index) => (
              <MarketCard
                nft={nft}
                index={index}
                handleBuyClick={handleBuyClick}
                chainId={chainId}
              />
            ))
          ) : (
            <div className="no-nft">
              <h1>The Market is Empty</h1>
            </div>
          )}
        </StyledBalances>
        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => purchase()}
            okText="Buy"
          >
            <Spin spinning={loading}>
              <div
                style={{
                  width: "250px",
                  margin: "auto",
                }}
              >
                <Badge.Ribbon
                  color="green"
                  text={`${
                    getMarketItem(nftToBuy).price / ("1e" + 18)
                  } ${nativeName}`}
                >
                  <img
                    src={nftToBuy?.image}
                    style={{
                      width: "250px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </Spin>
          </Modal>
        ) : (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
            <img
              src={nftToBuy?.image}
              style={{
                width: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <Alert
              message="This NFT is currently not for sale"
              type="warning"
            />
          </Modal>
        )}
      </div>
    </>
  );
}

const StyledBalances = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 0.4rem;
  grid-row-gap: 0.4rem;
  padding: 0.4rem;
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  .no-nft {
    padding: 8rem 0rem;
    width: 100%;
    h1 {
      text-align: center;
    }
  }
  @media (max-width: 900px) {
    padding: 0.35rem 0.35rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-column-gap: 0.35rem;
    grid-row-gap: 0.35rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

export default NFTTokenIds;
