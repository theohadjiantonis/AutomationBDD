const { PetService, I } = inject();
const { assert } = require('chai').assert;

//common variables
let payload, withdrawPlan;

Given('I have a pet for sale', async () => {
    payload = await PetService.PetJson();
});

When('I put that pet up for sale', async () => {
    //executes withdraw plan
    const executePlan = await A.executeWithdraw(withdrawPlan.data)
});

Then('The deposit is successful', async () => {
    //retrieve digitalWallet information from micAccounting.DigitalWallet based on digitalWalletId
    I.wait(5);

    queryInfo = {
        "table": "DigitalWallet",
        "query": { '_id': portfolioInfo.DigitalWalletId }
    }

    const DigitalWallet = await queryMongo(DatabaseInfo.micAccounting, queryInfo)
    I.addMochawesomeContext({ title: "Digital Wallet", value: DigitalWallet.Cash });
});