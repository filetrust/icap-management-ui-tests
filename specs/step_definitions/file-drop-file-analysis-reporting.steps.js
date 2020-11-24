const {
    I,
    filedropPage
} = inject();

Given("I am logged into the ui", () => {
    I.loginNoPwd();
});

Given("I have navigated to the File Drop page", () => {
    I.goToFileDrop();
});

Given('I have uploaded a file {string}', (supportedFile) => {
    I.uploadFile(supportedFile.trim());
});

When('I view result and click on XML button', () => {
   I.handleDownloads();
   filedropPage.clickXml();

});

Then(/^the XML report (.*) is downloaded$/, (xmlFile) => {
    I.amInPath("output/downloads");
    filedropPage.isFileDownloaded(xmlFile)

        //console.log
    //I.seeFileNameMatching(xmlFile);
});


When('I view result and click on PDF button', () => {
    I.handleDownloads();
    filedropPage.clickPdf();
});

Then(/^the pdf report (.*) is downloaded$/, (pdfFile) => {
    I.amInPath("output/downloads");
    filedropPage.isFileDownloaded(pdfFile);
});