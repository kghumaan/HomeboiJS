require('dotenv').config();
const axios = require('axios');
const { concat } = require('ethers/lib/utils');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path')

const API_URL="https://eth-rinkeby.alchemyapi.io/v2/zQZBzA3E8J5W8U2c8V-4SvX7znBP52-c"
const PRIVATE_KEY="192cbc4c51c0c8759f364e4e5480a1fbc6f3c8433f2c665b433f5072fd11dee2"
const PUBLIC_KEY="0x100f2616B6f76d17F1aA75e85F8B8793f01AB195"
const PINATA_API_KEY="46551923dcf1fc23282a"
const PINATA_API_SECRET_KEY="0c1249fe2690fe0d88efe7312fefc5d9d1b6ea20f9d48ff63c02ac561211bba7"

// const { PINATA_API_KEY, PINATA_API_SECRET_KEY, API_URL } = process.env;  -- can't access env file

const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;

    return axios
        .get(url, {
            headers: {
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_API_SECRET_KEY
            }
        })
        .then(function (response) {
            console.log(`SUCCESS: Got response: ${response.data.message}`)
        })
        .catch(function (error) {
            console.log(`FAILURE: Got response: ${error}`)
        });
};

const hash = null;

const pinFileToIPFS = (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file from the API for this example, but you can gather the file from anywhere
    let data = new FormData();
    data.append('file', file);

    return axios.post(url, data, 
        {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    })
    .then(function (response) {
        hash = response.data.IpfsHash
        console.log(`Hash ${hash}`)
    }).catch(function (error) {
        msg = error.response.data
        console.log(`FAILURE: Got response: ${msg}`)
    });
};


const pinJSONtoIPFS = (obj) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file from the API for this example, but you can gather the file from anywhere
    let data = new FormData();
    data.append('file', file);

    return axios.post(url, data, 
        {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    })
    .then(function (response) {
        hash = response.data.IpfsHash
        console.log(`Hash ${hash}`)
    }).catch(function (error) {
        msg = error.response.data
        console.log(`FAILURE: Got response: ${msg}`)
    });
};


// testAuthentication();
await pinFileToIPFS(fs.createReadStream(path.join(__dirname, '../Squirtle.png')));

console.log(`HASH: ${hash}`)
metadata = {
    "attributes": [
      {
        "trait_type": "Breed",
        "value": "Turtle"
      },
      {
        "trait_type": "Color",
        "value": "Blue"
      }
    ],
    "description": "Squirtle!",
    "image": `https://gateway.pinata.cloud/ipfs/${hash}`,
    "name": "MyGAIII"
  }
  

pinJSONtoIPFS(metadata);