const {
    I,
    sharepoint
} = inject();

const outputPath = './output/downloads'

Feature('Sharepoint File Processing');


Scenario('I download a supported file from Sharepoint', async () => {
    await I.goToSharepoint()
    I.wait(15)
    I.seeInTitle("Communication site - ui-uploads - All Documents");
    const file = ''
    await sharepoint.selectFile(file);
    sharepoint.downloadFile()
    // I.usePuppeteerTo('get response', async ({
    //     page
    // }) => {
    //     await page.on("response", async response => {
    //         console.log(response.headers());

    //         fileId = response.headers()
    //             .toString()
    //             .split('X-Adaptation-File-Id: ')[1]
    //             .split("\n")[0];
    //         console.log('The fileId is ' + fileId)
    //         //response.abort()
    //     });
    }).tag('@sp');


Scenario('I download a non supported file from Sharepoint', async () => {

});