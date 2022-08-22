import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

console.log('Creating Participant Accounts');
const [accCreator, accDonor] = await stdlib.newTestAccounts(2, startingBalance);

console.log('Launching Contracts');
const ctcCreator = accCreator.contract(backend);
const ctcDonor = accDonor.contract(backend, ctcCreator.getInfo());

await promise.All([backend.Creator(ctcCreator, {
    ...stdlib.hasRandom,
    //Creator Interact Object Goes Here 
}),
backend.Donor(ctcDonor, {
    ...stdlib.hasRandom,
    //Donor Interact Object Goes Here 
})
]);

console.log('Generating NFT');
const theNFT = await stdlib.launchToken(accCreator, "Donate2MyArt", "NFT", {supply: 1});
const nftId = theNFT.id;
const minPrice = stdlib.parseCurrency(1);
const lenInBlocks = 10;
const params = {nftId, minPrice, lenInBlocks};

await accDonor.tokenAccept(params.nftId); 



let done = false;
const bidders = [];
const startBidders = async () => {
    let bid = minBid;
    const runBidder = async (who) => {
        const inc = stdlib.parseCurrency(Math.random() * 10);
        bid = bid.add(inc);

        const acc = await stdlib.newTestAccount(startingBalance);
        acc.setDebuglabel(who);
        await acc.tokenAccept(nftId);
        bidders.push([who, acc]);
        const ctc = acc.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(acc));

        console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        try {
            const [ lastBidder, lastBid] = await ctc.apus.Bidder.bid(bid);
            console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}.`)
        }
        catch (e) {
                console.log(`${who} failed to bid, because the auction is over`);
            }
    }
        console.log(`${who} balance after is ${await getBal()}`);
        await runBidder('Alice');
        await runBidder('Bob');
        await runBidder('Claire');
        while (! done) {
            await stdlib.wait(1);
        }
    };  

const ctcCreator = accCreator.contract(backend);
await ctcCreator.participants.Creator({
    getSale: () => {
        console.log('Creator sets paramets of sale: ', params );
        return params;
    },   
    auctionReady: () => {
        startBidders();
    },
    seeBid: (who, amt) => {
        console.log(`Creator saw that ${stdlib.formatAddress(who)} bid ${stdlib.formatCurrency(amt)}.`);

    },
    showOutcome: (winner, amt) => {
        console.log(`Creator saw that ${stdlib.formatAddress(winner)} won with ${stdlib.formatCurrency(amt)}`);
    },
});





for (const [who, acc] of bidders) {
    const [amt, amtNFT] = await stdlib.balancesOf(acc, [null, nftId]);
    console.log(`${who} had ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit} and ${amtNFT}`)
}
done = true;








