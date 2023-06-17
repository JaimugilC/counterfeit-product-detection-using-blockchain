//SPDX-License-Identifier: MIT


pragma solidity >=0.8.0 <0.9.0;

contract MyApp {

	/*
		holds the address of the owner of the contract
		owner -> the address which deploys this smart contract on the network.
	*/
	address public owner;

	/*
		productId is used to provide a unique ID to every product that is added.
		It increments every time a new product is created.
	*/
	uint public productId = 0;

	// define all custom structs

	struct Person {
		bool exists;
		string name;
		string role;
		address _address;
	}

	struct Product {
		bool exists;
		uint id;
		string name;
		string model;
		string price;
		address manufacturer;
		address curOwner;
		address[] owners;
	}

	
	mapping(address => Person) public persons;
	mapping(uint => Product) products;


	
	event PersonCreated(string name, address _address, string role);
	event ProductCreated(uint id, address manufacturer);
	event OwnershipUpdated(uint id, address newOwner);


	
	constructor() {
		owner = msg.sender;
		Person storage m = persons[owner];
		m.exists = true;
		m.name = "Admin";
		m.role = "Admin";
		m._address = owner;
	}


	
	function createPerson(string memory _name, address _address, string memory _role) public {
		require(msg.sender == owner, "Only Admin is authorised to create a manufacturer!");
		require(persons[_address].exists == false, "User already exists");

		Person storage m = persons[_address];
		m.exists = true;
		m.name = _name;
		m.role = _role;
		m._address = _address;
		emit PersonCreated(_name, _address, _role);
	}


	
	function createProduct(string memory _name, string memory _model, string memory _price) public {
		require(persons[msg.sender].exists == true, "You are not a Manufacturer!");

		Product storage p = products[productId];
		p.exists = true;
		p.id = productId;
		p.name = _name;
		p.model = _model;
		p.price = _price;
		p.manufacturer = msg.sender;
		p.curOwner = msg.sender;
		// push cur owner(manufacturer) to owners array
		p.owners.push(msg.sender);

		productId++;
		emit ProductCreated(productId-1, msg.sender);
	}


	
	function getProduct(uint _id) public view returns(Product memory) {
		return products[_id];
	}

	function getUserRole(address _address) public view returns(string memory){
		return persons[_address].role;
	}

	function getAllRoles(uint _id) public view returns(string[] memory){

		address[] memory allAddress = products[_id].owners;
		string[] memory allRoles = new string[](allAddress.length);

		for(uint i=0; i<allAddress.length; i++){
			allRoles[i] = persons[allAddress[i]].role;
		}
		return allRoles;
	}

	function getProductsOwned() public view returns(Product[] memory){

		uint cnt = 0;

		for(uint i=0; i<productId; i++){
			if(products[i].curOwner == msg.sender){
				cnt++;
			}
		}

		Product[] memory ownedProducts = new Product[](cnt);

		for(uint i=0; i<productId; i++){
			if(products[i].curOwner == msg.sender){
				ownedProducts[i] = products[i];
			}
		}
		return ownedProducts;
	}

	
	function updateOwnership(uint _id, address _newOwner) public {
		Product storage p = products[_id];
		require(p.curOwner == msg.sender, "Not authorized");
		
		p.curOwner = _newOwner;
		p.owners.push(_newOwner);

		emit OwnershipUpdated(_id, _newOwner);
	}

}
