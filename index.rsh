'reach 0.1';
export const main = Reach.App(() => {
    const creator = Participant('Creator', {
        getSale: Fun([], Object({
            nftId: Token, 
            minPrice: UInt, 
            lenInBlocks: UInt, 
        })),
    });
    const donors = API('Donors', {
        donate: Fun([UInt], Tuple(Address, UInt)),
    });
    init()


    creator.only(() => {
        const  {nftId, minPrice, lenInBlocks} = declassify(interact.getSale());
    });
    creator.publish(nftId, minPrice, lenInBlocks);
    const amt = 1; 
    commit()
    creator.pay([[amt, nftId]]);
    
     commit()
     exit()
    })