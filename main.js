const SHA256 = require('crypto-js/sha256');  // installs crypto js library 
class Block{ //creating a block 
    constructor(index, timestamp, data, Previoushash = ''){ //index tells us where the block sits on the chain, timestamp tells us when the block was created, data is self explanatory
        this.index = index; //keep track of all values.
        this.timestamp = timestamp;
        this.data = data;
        this.Previoushash = Previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0; // random variable because the hash of our block wont change if we dont change the content of our block
    } 

    calculateHash(){  //calculate hash fucntion of the block
        return SHA256(this.index + this.Previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString(); // using sha 56 in this case 
    }

//proof of work mechanism (for exammple bitcoin requires all blocks in the chain to have certain amount of zeros in front of them, and since you cant influence the output of a hash funtion you simply have to try a lot of combinations and hope that one of them match  )
    mineBlock(difficulty){  //difficulty in this case is the number if zeros infront of the hash
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ // while the letters from the 0th letter to the difficulty th letter is not 0
            this.nonce++;
            this.hash = this.calculateHash(); //keep recalculating the hash

        }
        console.log("Block mined: " + this.hash); //when the desired number of zeros are reached output block mined
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //the chain contains the first block
        this.difficulty = 2; // added feature so calculating the hash of the block becomes difficult for miners
    }

    createGenesisBlock(){  // creates the first block of the chain 
        return new Block(0, "27/04/2022", "Genesis Block", "0" ); // random data
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];// returns the latest block in the chain
    }

    addBlock(newBlock){  //adds new block to the chain 
        newBlock.Previoushash = this.getLatestBlock().hash; //  the hash of the latest block is the previous hash of the new block
        // newBlock.hash = newBlock.calculateHash();//calculates hash of the new block
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);// pushes new block on to the chain
    }

    //An added block cannot be changed without invalidating the rest of the chain
    // to verfiy the integrity of the blockchain 
    checkValidity(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];  //tracking hash of the current block
            const previousBlock = this.chain[i-1]; // tracking hash of the previous  block
            if(currentBlock.hash !== currentBlock.calculateHash()){ //if the hash of the current block does not match the recalculation of the hash then return false
                return false;
            }

            if(currentBlock.Previoushash !== previousBlock.hash){ // if the hash of the previous block does not match the previous hash of the current block then return false
                return false;
            }
        }

        return true;
    }
}

let Zkoin = new Blockchain(); //defining zkoin, a block chain
console.log("mining block 1...")
Zkoin.addBlock(new Block(1, "10/03/2022",{ amount: 4})); //adding a new block to the chain 
console.log("mining block 2...")
Zkoin.addBlock(new Block(2, "12/03/2022",{ amount: 10}));

//Zkoin.chain[1].data = {amount: 100}; //checking if tampering with the block declares invalid

// console.log(JSON.stringify(Zkoin, null, 4));//outputting the contents of zcoin
// console.log("is chain valid?" + Zkoin.checkValidity()); //



    