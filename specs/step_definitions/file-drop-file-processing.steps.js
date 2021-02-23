const {
  I,
  filedropPage
} = inject();

Given("I am on the FileDrop page", () => {
  I.goToFileDrop();
});

When('I click Select a file and choose a supported file {string}', (supportedFile) => {
  I.uploadFile(supportedFile);
});

Then('the File is processed with the process status displayed as {string}', (processStatus) => {
  I.see(processStatus.trim(), filedropPage.sections.fileProcessStatus);
});

Then('I can view more detailed results with file attributes {string}, {string} and {string}', async (fileName, fileType, fileSize) => {
  await I.seeElementExist(filedropPage.sections.analysisReportView);
  await filedropPage.isFileNameAttributeDisplayed(fileName);
  await filedropPage.isFileTypeAttributeDisplayed(fileType);
  await filedropPage.isFileSizeAttributeDisplayed(fileSize);
});

When('I click Select a file and choose non processable file {string}', (file) => {
  I.attachFile(filedropPage.buttons.fileInput, file.trim())
});

Then('the expected validation error is displayed as {string}', async (error) => {
  await filedropPage.checkMessageDisplayed(error);
});

When('I click on Download Protected File button', () => {
  I.handleDownloads();
  filedropPage.clickDownloadProtectedFile();
});
Then('the file {string} is downloaded', (file) => {
  I.amInPath("output/downloads");
  filedropPage.isFileDownloaded(file)
});

