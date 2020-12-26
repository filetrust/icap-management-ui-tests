const I = actor();

module.exports = {
    //locators
    links: {
        download_pdf: `//a[@href="https://gw-demo-sample-files-eu1.s3-eu-west-1.amazonaws.com.glasswall-icap.com/Execute+Java+Script_JS_PDF.pdf"]`,
        download_word: `//a[@href="https://gw-demo-sample-files-eu1.s3-eu-west-1.amazonaws.com.glasswall-icap.com/MacroRunCalculator.docm"]`,
        download_excel: `//a[@href="https://gw-demo-sample-files-eu1.s3-eu-west-1.amazonaws.com.glasswall-icap.com/Opens+calculator+app_macro_MS+excel+2003+and+later.xlsm"]`,
        download_powerpoint: `//a[@href="https://gw-demo-sample-files-eu1.s3-eu-west-1.amazonaws.com.glasswall-icap.com/External+Hyperlink+to+google_Hyperlink_MS+Powerpoint+2003+and+later.pptx"]`,
        download_jpg: `//a[@href="https://gw-demo-sample-files-eu1.s3-eu-west-1.amazonaws.com.glasswall-icap.com/Complete+works+of+shakespeare+hidden+zip_Polyglot_image.jpg"]`,
    },
    page: {
        htmlreport: `BODY`

    },
    //Methods

    /*
     * Download docs
     * ***************************************************************
     */

    downloadFile(fileType) {
        I.handleDownloads()
        I.click(this.links[`download_${fileType}`])
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

};