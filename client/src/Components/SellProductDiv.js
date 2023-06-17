import React, { useState } from 'react'
import "../Stylesheets/OwnerDiv.css";


function SellProductDiv (props) {

	const[productId, setProductId] = useState("");
	const[customer, setCustomer] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault()
		const { account, contract } = props
		try {
			await contract.methods.updateOwnership(productId, customer).send({ from: account })
			window.alert(`Product sold to\n${customer}`)
		}
		catch (e) {
			console.log(e)
			window.alert("Error occured!")
		}
	}

		return (
			<div className="add-user-container">
				<div className='add-user-div'>
				<h5 className="text-center">Transfer Ownership</h5>

					<form className="my-3" onSubmit={handleSubmit}>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Enter product ID"
								name="productId"
								value={productId} onChange={(e)=>{setProductId(e.target.value)}}
							/>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Enter customer's address"
								name="customer"
								value={customer} onChange={(e)=>{setCustomer(e.target.value)}}
							/>
						</div>
						<button type="submit" className="btn btn-primary btn-block">Sell</button>
					</form>
				</div>

			</div>
		);
	}

export default SellProductDiv;