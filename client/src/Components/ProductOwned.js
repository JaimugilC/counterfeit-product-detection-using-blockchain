import React, { useState, useEffect } from 'react'
import "../Stylesheets/ProductOwned.css";


function GenerateCards(props){

}


function ProductOwned (props) {

	const[ownedProducts, setOwnedProducts] = useState(null);
	

	useEffect(()=>{

		const {account, contract } = props;

		const fetchData = async () => {
			try{
				const owned = await contract.methods.getProductsOwned().call({from:account});
				setOwnedProducts(owned);
			}
			catch(e){
				console.log(e);
			}
			if(ownedProducts && ownedProducts.length === 0){
				setOwnedProducts(null);
			}

			console.log(ownedProducts);
		}

	fetchData();
	},[])

		return (
			<div className="product-main-div">
				<div className='owned-product-div'>
					<h4>Products Owned by Me</h4>
				</div>
				{console.log(ownedProducts)}
			</div>
		);
	}

export default ProductOwned;