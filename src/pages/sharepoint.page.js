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
    },

    goToDocuments(){
        const element = this.links.documents;
        I.clickElement(element)[0]
        I.wait(5);
    },

    selectFile(file){
        const element =`div[aria-label='`+file+`'] > div > i:nth-of-type(2)`
        I.clickElement(element)[0];
        I.wait(5);
    },

    assertFileDownload(file) {
        I.amInPath('output/downloads')
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
            I.say('The file is blocked');
        } else {
            I.say('Only one tab is currently opened');
        }}catch (e) {
            I.say('Unable to evaluate assertion')
            console.warn(e);
        }
    }
}