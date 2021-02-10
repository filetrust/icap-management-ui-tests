const I = actor();

module.exports = {

    //Locators

    sections: {
        filedropModal: `div[class*='StyledDropzone_border__']`,
        analysisReportView: `div[data-test-id="divFileDropResults"]`,
        fileSize: `tr:nth-child(2) > td:nth-child(2)`,
        fileName: `tr:nth-child(2) > td:nth-child(1)`,
        fileType: `tr:nth-child(2) > td:nth-child(3)`,
        fileAttributeView: `div[class*='FileAttributes_FileAttributes__']`,
        activeContentView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(1)`,
        repairedObjestsView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(2)`,
        unrepairedObjectsView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(3)`,
        fileiscleanElement: `div[class*='SectionTitle_SectionTitle__']`,
        notification: `div[class*='react-toast-notifications__toast__content']`,
        fileProcessStatus: `div[class*='FileDrop_message__']`,
        error: `.react-toast-notifications__toast__content`
    },
    buttons: {
        fileSelectButton: `button[data-test-id="buttonFileDropSelectFile"]`,
        pdfReport: `//button[contains(.,'PDF')]`,
        xmlReport: `//button[contains(text(),'Download XML Report')]`,
        refresh: `button[class*='IconButton_IconButton__']`,
        downloadAnalysisReport: `button[class*='DownloadAnalysisReport_button__']`,
        viewresult: `button[data-test-id='buttonFileDropViewResult']`,
        viewresultByXpath: `//button[contains(.,'VIEW RESULT')]`,
        fileInput: `input[type = file]`,
        downloadFile: `//button[contains(text(),'Download Protected File')]`
    },
    table:{
        fileAttribute: `table[class*='FileAttributes_table__']`,
        activeContent: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(1) > table`,
        repairedObjest: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(2) > table`,
        unrepairedObject: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(3) > table`,
        cell:{
            fileName: `table[class*='FileAttributes_table__'] > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`,
            fileSize: `table[class*='FileAttributes_table__'] > tbody > tr:nth-of-type(2) > td:nth-of-type(2)`,
            fileType: `table[class*='FileAttributes_table__'] > tbody > tr:nth-of-type(3) > td:nth-of-type(2)`,
        }
    },



    //Methods

    /*
     * FileDrop
     * ***************************************************************
     */

    clickSelectFile() {
        const element = this.buttons.fileSelectButton;
        I.clickElement(element);
    },

    clickViewResult() {
        const element = this.buttons.viewresultByXpath;
        I.waitForElement(element, 15)
        I.clickElement(element);
    },

    clickRefresh() {
        const element = this.buttons.refresh;
        I.clickElement(element);
    },

    clickDownloadXmlReport() {
        const element = this.buttons.xmlReport;
        I.waitForClickable(element);
        I.clickElement(element);
    },

    clickDownloadProtectedFile() {
        const element = this.buttons.downloadFile;
        I.waitForClickable(element);
        I.clickElement(element);
    },

    clickDownloadPdfReport() {
        const element = this.buttons.pdfReport;
        I.handleDownloads();
        I.clickElement(element);
    },

    clickDownloadAnalysisReport() {
        const element = this.buttons.downloadAnalysisReport;
        I.clickElement(element);
    },

    async getActiveContents() {
        const element = this.sections.activeContentView
       await I.grabTextFrom(element)
    },
   async getRemediedContents() {
        const element = this.sections.repairedObjestsView
        await I.grabTextFrom(element)
    },
    async getNonRepairedContents() {
        const element = this.sections.unrepairedObjectsView
       await I.grabTextFrom(element)
    },

   async getFileName() {
        const element = this.table.cell.fileName;
        await I.grabTextFrom(element)
    },

    async isFileNameAttributeDisplayed(fileName){
        const name = await I.grabTextFrom(this.table.cell.fileName)
        if(name === fileName)
        I.say('The file name attribute is: '+name)
        else{
          I.say('The result view does not show the file name attribute')
        }
    },

    async getFileSize() {
         const element = this.table.cell.fileSize;
        await I.grabTextFrom(element)
     },

     async isFileSizeAttributeDisplayed(fileSize){
        const size = await I.grabTextFrom(this.table.cell.fileSize)
        if(size === fileSize)
        I.say('The file size attribute is: '+size)
        else{
          I.say('The result view does not show the file size attributes')
        }
    },

     async isFileTypeAttributeDisplayed(fileType){
        const type = await I.grabTextFrom(this.table.cell.fileType)
        if(type === fileType)
        I.say('The file type attribute is: '+type)
        else{
          I.say('The result view does not show the file type attributes')
        }
    },

      async getFileType() {
          const element = this.table.cell.fileType;
         await I.grabTextFrom(element)
      },

       async getResultViewContent() {
           const element = this.sections.analysisReportView;
            await I.getTextFrom(element)
      },

      isRequiredContentRefDisplayed(contentRef){
            const element = this.sections.analysisReportView;
                within(element, () =>{
                    I.see(contentRef)
                })
      },


      isFileDownloaded(file) {
         return I.checkFileExist("output/downloads/" + file)
      },

    assertAnalysisReportDownload(analysisReport) {
        I.amInPath('output/downloads');
        I.seeFileNameMatching(analysisReport);
    },
    async checkMessageDisplayed(error) {
       // I.seeElementInDOM('//div[text()="'+error+'"]');
        const element = this.sections.error;
        const errorMessage = await I.grabTextFrom(element)
        if (errorMessage===error){
            I.say('The expected error message: '+errorMessage+ ' is displayed')
        }else{
            I.say('The error message: '+errorMessage+ ' is not as expected')
        };
        }

   
}
