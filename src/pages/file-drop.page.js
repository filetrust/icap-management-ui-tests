const {
    I
} = inject();

module.exports = {

    //Locators

    sections: {
        filedropModal: `div[class*='StyledDropzone_border__92UuO']`,
        analysisReportView: `div[data-test-id='divFileDropResults']`,
        fileAttributeView: `div[class*='FileAttributes_FileAttributes__13JsG']`,
        activeContentView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(1)`,
        repairedObjestsView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(2)`,
        unrepairedObjectsView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(3)`,
        fileiscleanElement: `div[class*='SectionTitle_SectionTitle__1y7-1']`,
        notification: `div[class*='react-toast-notifications__toast__content']`,
        fileProcessStatus: `div[class*='FileDrop_message__3pcoB']`
    },
    buttons: {
        fileSelectButton: `button[class*='Button_button__1V1sR']`,
        pdf: `div[class*='RenderResults_buttons__1XTWu'] > button:nth-of-type(1)`,
        xml: `div[class*='RenderResults_buttons__1XTWu'] > button:nth-of-type(2)`,
        refresh: `button[class*='FileDrop_buttonRefresh']`,
        downloadAnalysisReport: `button[class*='DownloadAnalysisReport_button']`,
        viewresult: `button[class*='FileDrop_button__']`,
        fileInput: `input[type = file]`,
        downloadFile: ''
    },
    table:{
        fileAttribute: `table[class*='FileAttributes_table__211rg']`,
        activeContent: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(1) > table`,
        repairedObjest: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(2) > table`,
        unrepairedObject: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(3) > table`,
        cell:{
            fileName: `table[class*='FileAttributes_table__211rg'] > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`,
            fileSize: `table[class*='FileAttributes_table__211rg'] > tbody > tr:nth-of-type(2) > td:nth-of-type(2)`,
            fileType: `table[class*='FileAttributes_table__211rg'] > tbody > tr:nth-of-type(3) > td:nth-of-type(2)`,
        }
    },



    //Methods

    /*
     * FileDrop
     * ***************************************************************
     */

    clickSelectFile() {
        const element = this.buttons.fileSelectButton;
        I.click(element);
    },

    clickViewResult() {
        const element = this.buttons.viewresult;
        I.click(element);
    },

    clickRefresh() {
        const element = this.buttons.refresh;
        I.click(element);
    },

    clickXml() {
        const element = this.buttons.xml;
        I.click(element);
    },

    clickPdf() {
        const element = this.buttons.pdf;
        I.handleDownloads();
        I.click(element);
    },

    clickDownloadAnalysisReport() {
        const element = this.buttons.downloadAnalysisReport;
        I.click(element);
    },

    clickDownloadFile() {
        const element = this.buttons.downloadFile;
        I.click(element);
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

    assertAnalysisReportDownload(analysisReport) {
        I.amInPath('output/downloads');
        I.seeFileNameMatching(analysisReport);
    }
}
