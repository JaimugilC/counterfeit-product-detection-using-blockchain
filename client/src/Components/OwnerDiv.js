import React, { useState } from 'react'
import "../Stylesheets/OwnerDiv.css";


function OwnerDiv (props) {

	const[name, setName] = useState("");
	const[address, setAddress] = useState("");
	const[role, setRole] = useState("");

	const handleCreateManufacturer = async (e) => {
		e.preventDefault()
		const { account, contract } = props

		try {
			await contract.methods.createPerson(name, address, role).send({ from: account })
			window.alert(`Created a manufacturer\n${name}\n${role}\n${address}`)
		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}
	
		return (
			<div className="add-user-container">
				<div className='add-user-div'> 
				<h5 className="text-center text-dark">Add a User</h5>
				
				<form className="my-3" onSubmit={handleCreateManufacturer}>
					
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter name"
							name="name"
							value={name} onChange={(e)=>{setName(e.target.value)}}
						/>
					</div>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter address"
							name="address"
							value={address} onChange={(e)=>{setAddress(e.target.value)}}
						/>
					</div>

					<div className="form-group">
						<input type="text" className="form-control" placeholder="Enter Role"
							name="role"
							value={role} onChange={(e)=>{setRole(e.target.value)}}
						/>
					</div>

					<button type="submit" className="btn btn-primary btn-block">Add</button>
				</form>
				</div>
			</div>
		);
	}

export default OwnerDiv;