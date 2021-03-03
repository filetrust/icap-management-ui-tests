const {
    I,
    filedropPage
} = inject();


Given("I have navigated to the File Drop page", () => {
    I.goToFileDrop();
});

Given('I have uploaded a file {string}', (supportedFile) => {
    I.uploadFile(supportedFile.trim());
});

When('I click on Download XML Report button', () => {
    I.handleDownloads();
    filedropPage.clickXmlReport();
});

Then('the XML report {string} is downloaded', (xmlFile) => {
    I.amInPath("output/downloads");
    filedropPage.isFileDownloaded(xmlFile)
});

When('I click on PDF button', () => {
    I.handleDownloads();
    filedropPage.clickPdfReport();
});

Then('the pdf report {string} is downloaded', (pdfFile) => {
    I.amInPath("output/downloads");
    filedropPage.isFileDownloaded(pdfFile);
});