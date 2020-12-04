const {
    I
} = inject();

module.exports = {

    //Locators

    sections: {
        filedropModal: `div[class*='StyledDropzone_border__']`,
        analysisReportView: `div[class*='RenderResults_RenderResults__']`,
        fileSize: `tr:nth-child(2) > td:nth-child(2)`,
        fileName: `tr:nth-child(2) > td:nth-child(1)`,
        fileType: `tr:nth-child(2) > td:nth-child(3)`,
        fileAttributeView: `div[class*='FileAttributes_FileAttributes__']`,
        activeContentView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(1)`,
        repairedObjestsView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(2)`,
        unrepairedObjectsView: `div[class*='RenderAnalysis_RenderAnalysis__'] > div:nth-of-type(3)`,
        fileiscleanElement: `div[class*='SectionTitle_SectionTitle__']`,
        notification: `div[class*='react-toast-notifications__toast__content']`,
        fileProcessStatus: `div[class*='FileDrop_message__']`
    },
    buttons: {
        fileSelectButton: `button[class*='Button_button__']`,
        pdf: `//button[contains(.,'PDF')]`,
        xml: `//button[contains(.,'XML')]`,
        refresh: `button[class*='IconButton_IconButton__']`,
        downloadAnalysisReport: `button[class*='DownloadAnalysisReport_button__']`,
        viewresult: `button[data-test-id='buttonFileDropViewResult']`,
        viewresultByXpath: `//button[contains(.,'VIEW RESULT')]`,
        fileInput: `input[type = file]`,
        downloadFile: ''
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
        I.clickElement(element);
    },

    clickRefresh() {
        const element = this.buttons.refresh;
        I.clickElement(element);
    },

    clickXml() {
        const element = this.buttons.xml;
        I.waitForClickable(element);
        I.clickElement(element);
    },

    clickPdf() {
        const element = this.buttons.pdf;
        I.handleDownloads();
        I.clickElement(element);
    },

    clickDownloadAnalysisReport() {
        const element = this.buttons.downloadAnalysisReport;
        I.clickElement(element);
    },

    getActiveContents() {
        const element = this.sections.activeContentView
        I.grabTextFrom(element)
    },
    getRemediedContents() {
        const element = this.sections.repairedObjestsView
        I.grabTextFrom(element)
    },
    getNonRepairedContents() {
        const element = this.sections.unrepairedObjectsView
        I.grabTextFrom(element)
    },

   getFileName() {
        const element = this.table.cell.fileName;
        I.grabTextFrom(element)
    },

     getFileSize() {
         const element = this.table.cell.fileSize;
         I.grabTextFrom(element)
     },
      getFileType() {
          const element = this.table.cell.fileType;
         I.grabTextFrom(element)
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
    checkMessageDisplayed(error) {
        I.seeElementInDOM('//div[text()="'+error+'"]');
    },

}
