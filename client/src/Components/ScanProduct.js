import React, {useRef, useState } from 'react'
import "../Stylesheets/ScanProduct.css";
import QrScanner from 'qr-scanner';


function QRCodeReader({setAllRoles, setProduct, contract, account, setScanned}) {

	const [file, setFile] = useState(null);
	const fileRef = useRef();

	const handleClick = () =>{
		fileRef.current.click();

	}

	const handleChange = async (e)=>{
		const file = e.target.files[0];
		setFile(file);
		setScanned(true)
		const result = await QrScanner.scanImage(file)

		try {
			const data = JSON.parse(atob(result));
			const productId = data.productId;
			const product = await contract.methods.getProduct(productId).call({ from: account })
			const allRoles = await contract.methods.getAllRoles(productId).call({ from: account })
			if(product.name === data.name && product.model === data.model){
			setProduct(product);
			setAllRoles(allRoles);
			}
			else{
				setProduct(null);
				setAllRoles(null);
			}
		}
		catch (e) {
			console.log(e)
			window.alert("Invalid QR Code")
			setProduct(null);
			setAllRoles(null);
		}

	}
  
	return (
		<>
		<button className='btn btn-warning' onClick={handleClick} >
			<h5>Upload file</h5>
		</button>
		<input 
		ref={fileRef} 
		type='file' 
		accept='.png, .jpg, .jpeg' 
		className='d-none'
		onChange={handleChange}
		/>
		{file && 
		(<img src={URL.createObjectURL(file)} alt="QR Code" />)
		}
	  </>
	);
  }



function RenderProductInfo (props) {

		const { product } = props

		if (!product || !product.exists) {
			return( 
			<div className='product-header'>
				<h5>Authentication failed</h5>
				<h5>Invalid QR Code</h5>
			</div>
			)
		}
		
		return (
			<div className="mt-2">
				<div className='product-header'>
				<h5 >Authentication Successful</h5>
				<h5 >Product specifications:</h5>
				</div>
				<div className='product-details'>
				<p> <b>Product ID:</b> { product.id } </p>
				<p> <b>Product:</b> { product.name } </p>
				<p> <b>Brand:</b> { product.model } </p>
				<p> <b>Price:Rs</b> { product.price } </p>
				
				</div>
			</div>
		);
	}

function RenderOwnerList(props){

	const [toggleTable, setToggleTable] = useState(false);

	const renderOwnerAddress = (owners) => {
		if(owners)
		return owners.map((owner, i) => {
			return (
			<tr key={i}>
				<th>{i+1}</th>
				<td>{owner}</td>
			</tr>)
		})
	}

	const renderOwnerRole = (role) => {
		if(role)
		return role.map((r, i) => {
			return (
			<tr key={i}>
				<th>{i+1}</th>
				<td>{r}</td>
			</tr>)
		})
	}

	const handleClick = (e) => {
		e.preventDefault()
		setToggleTable((toggleTable) => !toggleTable);
	}

	const { product, allRoles } = props;

	if (!product || !product.exists) {
		return(
			 <div className='product-header'>
			<h5>Authentication failed</h5>
			<h5>Invalid QR Code</h5>
			</div>
		)
	}

	return(
		<div>
			<p> <b>Manufacturer:</b> { product.manufacturer } </p>
			<p> <b>Current Owner:</b> { product.curOwner } </p>
			<div>
				<table className='table'>
					{toggleTable ? (
					<>
					<thead className='thead-dark'>
						<th>#</th>
						<th className='table-header'>Address
						<button className='btn btn-light' onClick={handleClick} >
							<b>Show Roles</b>
						</button>
						</th>
						
					</thead>
					<tbody>
						{renderOwnerAddress(product.owners)} 
					</tbody>
					</>
					):(
					<>
					<thead className='thead-dark'>
						<th>#</th>
						<th className='table-header'>Roles
						<button className='btn btn-light' onClick={handleClick}  >
							<b>Show Addresses</b>
						</button>
						</th>
						
					</thead>
					<tbody>
						{renderOwnerRole(allRoles)} 
					</tbody>
					</>
					)}
				</table>
			</div>
		</div>
	)
}


function ProductOwnerList (props) {

	const [product, setProduct] = useState(null);
	const [allRoles, setAllRoles] = useState(null);
	const [scanned, setScanned] = useState(false);

	const { account, contract } = props;

		return (
			<div className='ScanProduct-container'>
				<div className='scanqr'>

				<h5 className="text-center">Scan QR Code</h5>
				{/* <button type="button" className="btn btn-primary btn-block" onClick={handleCreateProduct}>Add and Save QR</button> */}
					<QRCodeReader setAllRoles={setAllRoles} setProduct={setProduct} setScanned={setScanned} contract={contract} account={account} />

				</div>
				<div className='result-container'>
					<h5>Result</h5>
					{scanned && <RenderProductInfo product={product} />}
					
				</div>
				<div className='owner-container'>
					<h5>List of Owners</h5>
					{scanned && <RenderOwnerList product={product} allRoles={allRoles} />}
				</div>

			</div>
			
		);
	}

export default ProductOwnerList;