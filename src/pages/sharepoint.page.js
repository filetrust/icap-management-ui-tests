const I = actor();

module.exports = {
    //locators
    
    links: {
        documents: `(//a[contains(text(),'Documents')])[1]`,
        downloadTab: `button[name='Download'] > span`,
        downloadLink: ``,
        fileMenu: ``,
    },
    page: {
        htmlreport: `BODY`

    },
    //Methods

    /*
     * Download docs
     * ***************************************************************
     */

    downloadFile() {
        I.handleDownloads()
        I.clickElement(this.links.downloadTab)
        I.wait(5)
    },

    async goToDocuments(){
        const element = this.links.documents;
        I.clickElement(element)[0]
        I.wait(5);
    },

    async selectFile(file){
        const element =`div[aria-label='`+file+`'] > div > i:nth-of-type(2)`
        I.clickElement(element)[0];
        I.wait(5);
    },

    assertFileDownload(file) {
        I.amInPath('output/downloads')
        I.waitForFile(file,15)
        I.seeFile(file)
    },

    async checkIfHtmlReportReturned() {
        try{
            
        let url = await I.grabCurrentUrl();
        console.log(`Current URL is [${url}]`);
        let tabs = await I.grabNumberOfOpenTabs();
        if (tabs >1) {
            I.switchToNextTab();
            I.see('Document Access Blocked due to Policy');
            console.log('The file is blocked');
        } else {
            console.log('Only one tab is currently opened');
        }}catch (e) {
            console.log('Unable to evaluate assertion')
            console.warn(e);
        }
    }
}