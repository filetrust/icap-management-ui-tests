const {
  I,
  filedropPage
} = inject();

Given("I am logged into the ui", () => {
  I.login();
  I.wait(5);
});

Given("I have navigated to the FileDrop page", () => {
  I.goToFileDrop();
});

When(/^I click Select a file and choose a supported file (.*)$/, (supportedFile) => {
  I.uploadFile(supportedFile);
  I.wait(5)
});

Then(/^the File is processed with the process status displayed as(.*)$/, (processStatus) => {
  I.seeElement(filedropPage.buttons.viewresult);
  I.see(processStatus.trim(), filedropPage.sections.fileProcessStatus);
});

Then(/^I can view more detailed results with file attributes (.*) and (.*)$/, (fileName, fileType) => {
  I.see(fileName, filedropPage.table.cell.fileName)
  I.see(fileType, filedropPage.table.cell.fileType)
  });

When('I click Select a file and choose non processable file {string}', (file) => {
  I.attachFile(filedropPage.buttons.fileInput, file.trim())
});

Then('the expected validation error is displayed as {string}', (error) => {
  filedropPage.checkMessageDisplayed(error);
});