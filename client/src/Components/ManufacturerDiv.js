import React, { useState } from 'react'
import "../Stylesheets/ManufacturerDiv.css";
import QRCode from "qrcode.react";


function ManufacturerDiv (props) {

	const[name, setName]=useState("");
	const[model, setModel]=useState("");
	const[price, setPrice] = useState("")
	const[productId, setProductId] = useState(null);
	const[QRData, setQRData] = useState("");

	const generateQR = async (e) => {
		e.preventDefault()
		const { contract } = props;
		let productId;
		try{
			productId = await contract.methods.productId().call();
			setProductId(productId);
		}
		catch(e) {
			window.alert("Error occured!")
			console.log(e)
		}
		const data = {
			productId: productId,
			name: name,
			model: model,
			price: price
		};

		setQRData(JSON.stringify(data));

	}

	const handleCreateProduct = async (e) => {
		e.preventDefault()
		const { account, contract } = props;
		try {
			await contract.methods.createProduct(name, model, price).send({ from: account })
			downloadQR();
			window.alert(`Created a product\n${name}\n${model}`)

		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}

	const downloadQR = () => {
		const canvas = document.getElementById("qridentity");
		const pngUrl = canvas
		  .toDataURL("image/png")
		  .replace("image/png", "image/octet-stream");
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = model + productId + ".png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	
		return (

			<div className='Manufacturer-container'>
				<div className='add-product'>

				<h5 className="text-center">Add a product</h5>
				
				<form className="my-3" onSubmit={generateQR}>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter Product Name"
							name="name"
							value={name} onChange={(e)=>{setName(e.target.value)}}
						/>
					</div>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter Brand Name"
							name="model"
							value={model} onChange={(e)=>{setModel(e.target.value)}}
						/>
					</div>
					<div className="form-group">
						<input type="number" className="form-control" placeholder="Enter Price"
							name="price"
							value={price} onChange={(e)=>{setPrice(e.target.value)}}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">Generate QR code</button>					
				</form>
				<button type="button" className="btn btn-primary btn-block" onClick={handleCreateProduct}>Add and Save QR</button>


				</div>
				<div className='generate-qr'>
					<h4>QR Code</h4>
					<div>
					<QRCode
    					id="qridentity"
    					value={btoa(QRData)}
						size={200}
						level={"H"}
						includeMargin={true}
					/>
					</div>
					
				</div>

			</div>
	
		);
	}

export default ManufacturerDiv;