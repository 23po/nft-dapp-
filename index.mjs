import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

console.log('Creating Accounts');
const accCreator = await stdlib.newTestAccount(startingBalance);


console.log('Generating NFT');
const theNFT = await stdlib.launchToken(accCreator, "Donate2MyArt", "NFT", {supply: 1});
const nftId = theNFT.id;
const minPrice = stdlib.parseCurrency(1);
const lenInBlocks = 10;
const params = {nftId, minPrice, lenInBlocks};



let done = false;
const donors = [];
const startDonors = async () => {
    let donate = minPrice;
    const runDonor = async (who) => {
        const inc = stdlib.parseCurrency(Math.random() * 10);
        bid = donate.add(inc);

        const acc = await stdlib.newTestAccount(startingBalance);
        acc.setDebuglabel(who);
        await acc.tokenAccept(nftId);
        donors.push([who, acc]);
        const ctc = acc.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(acc));

        console.log(`${who} decides to donate ${stdlib.formatCurrency(donate)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        
    }
        console.log(`${who} balance after is ${await getBal()}`);
        await runDonate ('Alice');
        await runDonate ('Bob');
        await runDonate ('Claire');
        while (! done) {
            await stdlib.wait(1);
        }
    };  

const ctcCreator = accCreator.contract(backend);
await ctcCreator.participants.Creator({
    getSale: () => {
        console.log('Creator sets parameterss of sale: ', params );
        return params;
    }
});

for (const [who, acc] of bidders) {
    const [amt, amtNFT] = await stdlib.balancesOf(acc, [null, nftId]);
    console.log(`${who} had ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit} and ${amtNFT}`)
}
done = true;








