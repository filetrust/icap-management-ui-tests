//<reference path="./steps.d.ts" />

var assert = require("assert");

const { I,filedropPage } = inject();

Given("I am logged into the ui", () => {
  I.loginNoPwd();
  I.wait(5);
  //pause();
});

Given("I have navigated to the FileDrop page", () => {
    I.goToFileDrop();
});

When("I click Select a file and choose a supported file", () => {
    //filedropPage.clickSelectFile();
    I.attachFile(filedropPage.buttons.fileInput, 'src/data/issues.docx');
});

Then("the File is processed by the file drop service", () => {});

When("I hover over my profile and select Log Out", () => {});

Then("I can view more detailed results", () => {
  //I.seeElement("");
});

