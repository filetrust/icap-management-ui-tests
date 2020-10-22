const {
    I
} = inject();

module.exports = {

    //Locators   

    sections: {
        filedropModal: `div[class*='StyledDropzone_border__92UuO']`,
        analysisReport: `div[class*='RenderResults_RenderResults__3aMKv']`,
        fileAttributeView: `div[class*='FileAttributes_FileAttributes__13JsG']`,
        activeContentView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(1)`,
        repairedObjestsView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(2)`,
        unrepairedObjectsView: `div[class*='RenderAnalysis_RenderAnalysis__1DRB7'] > div:nth-of-type(3)`,
        fileiscleanElement: `div[class*='SectionTitle_SectionTitle__1y7-1']`,
        notification: `div[class*='react-toast-notifications__toast__content']`,
    },
    buttons: {
        fileSelectButton: `button[class*='Button_button__1V1sR']`,
        pdf: `div[class*='RenderResults_buttons__1XTWu'] > button:nth-of-type(1)`,
        xml: `div[class*='RenderResults_buttons__1XTWu'] > button:nth-of-type(2)`,
        refresh: `button[class*='IconButton_IconButton__1Dhtl']`,
        downloadAnalysisReport: `button[class*='DownloadAnalysisReport_button__1Uy0T']`,
        viewresult: `button[class*='FileDrop_button__3Yv25']`
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
        I.click(element);
    },

    clickDownloadAnalysisReport() {
        const element = this.buttons.downloadAnalysisReport;
        I.click(element);
    }


}