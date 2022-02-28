import React, { useState } from "react";
import styled from "styled-components";
import { useMoralis, useNFTBalances } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";

import { Modal, Input, Spin, Button } from "antd";

// import AddressInput from "./AddressInput";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import NFTCard from "components/NFTCard";

import contractABI from "contracts/Market.json";

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    width: "100%",
    gap: "10px",
  },
};

function NFTBalance() {
  const { data: NFTBalances } = useNFTBalances();
  const { Moralis, chainId } = useMoralis();
  // const [receiverToSend, setReceiver] = useState(null);
  // const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  // const [isPending, setIsPending] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const contractABIJson = contractABI.abi;
  const listItemFunction = "createMarketItem";
  const ItemImage = Moralis.Object.extend("ItemImages");
  const { verifyMetadata } = useVerifyMetadata();
  const marketAddress = "0x88Ac49473922216A1723c90f277aE48b410303ee";

  // async function transfer(nft, amount, receiver) {
  //   console.log(nft, amount, receiver);
  //   const options = {
  //     type: nft?.contract_type?.toLowerCase(),
  //     tokenId: nft?.token_id,
  //     receiver,
  //     contractAddress: nft?.token_address,
  //   };

  //   if (options.type === "erc1155") {
  //     options.amount = amount ?? nft.amount;
  //   }

  //   setIsPending(true);

  //   try {
  //     const tx = await Moralis.transfer(options);
  //     console.log(tx);
  //     setIsPending(false);
  //   } catch (e) {
  //     alert(e.message);
  //     setIsPending(false);
  //   }
  // }

  // const handleTransferClick = (nft) => {
  //   setNftToSend(nft);
  //   setVisibility(true);
  // };

  // const handleChange = (e) => {
  //   setAmount(e.target.value);
  // };

  console.log("NFTBalances", NFTBalances);

  async function list(nft, listPrice) {
    setLoading(true);
    const p = listPrice * ("1e" + 18);
    const ops = {
      contractAddress: marketAddress,
      functionName: listItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nft.token_address,
        tokenId: nft.token_id,
        price: String(p),
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        addItemImage();
        succList();
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
        failList();
      },
    });
  }

  async function approveAll(nft) {
    setLoading(true);
    const ops = {
      contractAddress: nft.token_address,
      functionName: "setApprovalForAll",
      abi: [
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      params: {
        operator: marketAddress,
        approved: true,
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("Approval Received");
        setLoading(false);
        setVisibility(false);
        succApprove();
      },
      onError: () => {
        setLoading(false);
        failApprove();
      },
    });
  }

  const handleSellClick = (nft) => {
    setNftToSend(nft);
    console.log(nft);
    setVisibility(true);
  };

  function succList() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `Your NFT was listed on the marketplace`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function succApprove() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `Approval is now set, you may list your NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failList() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem listing your NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failApprove() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem with setting approval`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function addItemImage() {
    const itemImage = new ItemImage();

    itemImage.set("image", nftToSend.image);
    itemImage.set("nftContract", nftToSend.token_address);
    itemImage.set("tokenId", nftToSend.token_id);
    itemImage.set("name", nftToSend.name);

    itemImage.save();
  }

  return (
    <div>
      <StyledBalances style={styles.NFTs}>
        {/* <Skeleton loading={!NFTBalances?.result}> */}
        {NFTBalances?.result.length > 0 ? (
          NFTBalances.result.map((nft, index) => {
            //Verify Metadata
            nft = verifyMetadata(nft);
            return (
              <NFTCard
                nft={nft}
                index={index}
                chainId={chainId}
                handleSellClick={handleSellClick}
              />
            );
          })
        ) : (
          <div className="no-nft">
            <h1>You currently have no NFT on this network</h1>
          </div>
        )}
      </StyledBalances>
      {/* <Modal
        title={`Transfer ${nftToSend?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
        {nftToSend && nftToSend.contract_type === "erc1155" && (
          <Input
            placeholder="amount to send"
            onChange={(e) => handleChange(e)}
          />
        )}
      </Modal> */}

      <Modal
        title={`List ${nftToSend?.name} #${nftToSend?.token_id} For Sale`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => list(nftToSend, price)}
        okText="List"
        footer={[
          <Button onClick={() => setVisibility(false)}>Cancel</Button>,
          <Button onClick={() => approveAll(nftToSend)} type="primary">
            Approve
          </Button>,
          <Button onClick={() => list(nftToSend, price)} type="primary">
            List
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <img
            src={`${nftToSend?.image}`}
            style={{
              width: "250px",
              margin: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          <Input
            autoFocus
            placeholder="Listing Price in MATIC"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Spin>
      </Modal>
    </div>
  );
}

const StyledBalances = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 0.4rem;
  grid-row-gap: 0.4rem;
  padding: 0.4rem;
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

export default NFTBalance;
