import React, {useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import getWeb3 from "./Utils/getWeb3";
import "./Stylesheets/App.css";
import MyApp from "./contracts/MyApp.json";
import NavBar from "./Components/NavBar";
import OwnerDiv from "./Components/OwnerDiv";
import ManufacturerDiv from "./Components/ManufacturerDiv";
import ProductOwnerList from "./Components/ScanProduct";
import SellProductDiv from "./Components/SellProductDiv";
import ProductOwned from "./Components/ProductOwned";

function App () {
	const [web3, setWeb3] = useState(null);
	const [account, setAccount] = useState(null);
	const [contract, setcontract] = useState(null);
	const [role, setRole] = useState(null);

	useEffect(()=> {

		const fetchData = async()=>{
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const [account] = await web3.eth.getAccounts();
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = MyApp.networks[networkId];
			if (!deployedNetwork) {
				window.alert('OOPS...');
				return;
			}
			const instance = new web3.eth.Contract( MyApp.abi, deployedNetwork.address,);
			const role = await instance.methods.getUserRole(account).call({from:account});

			setWeb3(web3);
			setAccount(account);
			setcontract(instance);
			setRole(role);

		}
		catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
			console.error(error);
		}
	}
	fetchData()
	},[]);

	window.ethereum.on("accountsChanged", ()=>{
		window.location.reload();
	});

		if (!web3) {
			return <div>Loading...</div>;
		}

		return (
			<React.Fragment>
				<div className="MainDiv">

				<NavBar account = {account} role={role}/>

							<Switch>

								<Route path = "/admin"
									render = {(props) => <OwnerDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/manufacturer"
									render = {(props)=> <ManufacturerDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/sell"
									render = {(props) => <SellProductDiv account = {account} contract = {contract} />}
								/>

								<Route path = "/owned"
									render = {(props) => <ProductOwned account = {account} contract = {contract} />}
								/>

								<Route path = "/"
									render = {(props) => <ProductOwnerList account = {account} contract = {contract} />}
								/>
							
							</Switch>

				</div>
				
			</React.Fragment>
		);
	}

export default App;
