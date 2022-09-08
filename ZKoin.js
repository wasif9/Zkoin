const SHA256 = require('crypto-js/sha256');  // installs crypto js library 
<<<<<<< HEAD

class Transaction{
    constructor(fromAddress, toAddress, amount){ // transaction recieves from to and amount
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block{ //creating a block 
    constructor(timestamp, transactions, Previoushash = ''){ //index tells us where the block sits on the chain, timestamp tells us when the block was created, data is self explanatory
        this.timestamp = timestamp; //note: the order of block is determined by their position in the array
        this.transactions = transactions; //keeping track of transactions within the block
=======
class Block{ //creating a block 
    constructor(index, timestamp, data, Previoushash = ''){ //index tells us where the block sits on the chain, timestamp tells us when the block was created, data is self explanatory
        this.index = index; //keep track of all values.
        this.timestamp = timestamp;
        this.data = data;
>>>>>>> f98a7534818f42cc0922d3ed9f898e977b8dfecb
        this.Previoushash = Previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0; // random variable because the hash of our block wont change if we dont change the content of our block
    } 

    calculateHash(){  //calculate hash fucntion of the block
        return SHA256(this.index + this.Previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString(); // using sha 56 in this case 
    }

<<<<<<< HEAD
//proof of work algorithm  (for exammple bitcoin requires all blocks in the chain to have certain amount of zeros in front of them, and since you cant influence the output of a hash funtion you simply have to try a lot of combinations and hope that one of them match  )
=======
//proof of work mechanism (for exammple bitcoin requires all blocks in the chain to have certain amount of zeros in front of them, and since you cant influence the output of a hash funtion you simply have to try a lot of combinations and hope that one of them match  )
>>>>>>> f98a7534818f42cc0922d3ed9f898e977b8dfecb
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
<<<<<<< HEAD
        this.pendingTransactions = [];// we need this because we only create blocks on a specific interval (for example in bitcoins case, the proof of work algorithm makes sure there is one block created every 10 mins)
        //all the transactions that are made in between blocks are temporarily stored in the pending transactions array so that they can be included in the next block
        this.miningReward = 100;//reward for miners
    }

    createGenesisBlock(){  // creates the first block of the chain 
        return new Block("27/04/2022", "Genesis Block", "0" ); // random data
=======
    }

    createGenesisBlock(){  // creates the first block of the chain 
        return new Block(0, "27/04/2022", "Genesis Block", "0" ); // random data
>>>>>>> f98a7534818f42cc0922d3ed9f898e977b8dfecb
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];// returns the latest block in the chain
    }

<<<<<<< HEAD
    minePendingTransaction(miningRewardAddress){ // this recieves the address of the miners wallet so when the block is successfully mined the miner recieves the reward there
        let block = new Block(Date.now(), this.pendingTransactions);// this includes or passes all the pending transactions while in real life miners choose which transaction to include in the block
        block.mineBlock(this.difficulty);

        console.log('block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)// this resets the pending transaction array (empty array) and creates a new transaction to give the miner his reward
        ];
    }

    createTransaction(transaction){//this method creates a transaction and adds it to the array
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){ //the method that checks if youre rich yet
        let balance = 0;

        for(const block of this.chain){ // for every block in the chain
            for(const trans of block.transactions){ //for every transaction in the block
                if(trans.fromAddress === address){ // if the transaction's fromAddress matches your address
                    balance -= trans.amount;// then reduce the balance by the amount in the transaction method
                }
                if(trans.toAddress === address){ //if transaction's to address matches with your address
                    balance += trans.amount;// then add the amount in the transaction to the balance
                }
            }
        }

        return balance;
=======
    addBlock(newBlock){  //adds new block to the chain 
        newBlock.Previoushash = this.getLatestBlock().hash; //  the hash of the latest block is the previous hash of the new block
        // newBlock.hash = newBlock.calculateHash();//calculates hash of the new block
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);// pushes new block on to the chain
>>>>>>> f98a7534818f42cc0922d3ed9f898e977b8dfecb
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
<<<<<<< HEAD
Zkoin.createTransaction(new Transaction('address1', 'address2', 100)); // in reality the addresses are public keys of peoples wallets
Zkoin.createTransaction(new Transaction('address2', 'address1', 50));
//transactions are now stuck in the pending transactions so its time to mine and add em to a new block!
console.log('\n Starting the miner...');
Zkoin.minePendingTransaction('Wasifs address');
console.log('\nBalance of wasifs account is', Zkoin.getBalanceOfAddress('Wasifs address'));

console.log('\n Starting the miner again...');
Zkoin.minePendingTransaction('Wasifs address');

console.log('\nBalance of wasifs account is', Zkoin.getBalanceOfAddress('Wasifs address')); // we are mining again because the reward transaction is added to the pending transaction which is being reset after the block is mined. when we mine the next block, the pending transaction array at that point includes the reward transaction which is then executed when the new block is added
=======


>>>>>>> f98a7534818f42cc0922d3ed9f898e977b8dfecb


    