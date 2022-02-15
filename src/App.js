import './App.css';

const axios = require('axios');
const FormData = require('form-data');

const pinataApiKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET;

function App() {
	async function pinFileToIPFS() {
		let myFile = document.getElementById('myFile').files;

		if (myFile) {
			let file = myFile[0];
			console.log(file);

			const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
			let data = new FormData();

			data.append('file', file);

			let metadata = JSON.stringify({
				name: 'testing image only',
				keyvalues: {
					exampleKey: 'exampleValue',
				},
			});
			data.append('pinataMetadata', metadata);

			return axios
				.post(url, data, {
					maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
					headers: {
						'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
						pinata_api_key: pinataApiKey,
						pinata_secret_api_key: pinataSecretApiKey,
					},
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}

	async function pinFolderToIPFS() {
		const pinataApiKey = 'be67cdd4748df26a52ba';
		const pinataSecretApiKey = '5c3967e4bf11dd1181b2cfd7d1571bf3ac90e3d534095a12b56612175ae23438';

		let myFile = document.getElementById('myFile').files;

		if (myFile) {
			let file = myFile[0];
			console.log(file);

			const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
			let data = new FormData();

			data.append('file', file);

			const pinataOptions = JSON.stringify({
				wrapWithDirectory: true,
			});
			data.append('pinataOptions', pinataOptions);

			let metadata = JSON.stringify({
				name: 'testing directory please',
				keyvalues: {
					exampleKey: 'exampleValue',
				},
			});
			data.append('pinataMetadata', metadata);

			return axios
				.post(url, data, {
					maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
					headers: {
						'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
						pinata_api_key: pinataApiKey,
						pinata_secret_api_key: pinataSecretApiKey,
					},
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}

	return (
		<div className='App'>
			<div>
				<label htmlFor='nftName'>NFT Name</label>
				<br></br>
				<input type='text' id='nftName' name='nftName' />
				<br></br>
				<br></br>
				<label htmlFor='nftDescription'>NFT Description</label>
				<br></br>
				<input type='text' id='nftDescription' name='nftDescription' />
				<br></br>
				<br></br>
				<br></br>
				<input type='file' id='myFile' name='myFile' />
				<br></br>
				<br></br>
				<button type='button' onClick={pinFileToIPFS}>
					Upload NFT image
				</button>
			</div>
		</div>
	);
}

export default App;
