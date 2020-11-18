const {
    I,
    icapProxyPage,
    policyPage,
    homePage,
    filedropPage
} = inject();


Given(/^I set a policy with the (.*) set to (.*) for a file type (.*)$/, (contentFlags, flagType, fileType) => {
    if (fileType != 'jpg') {
        policyPage.setFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType)
        I.wait(2)
        policyPage.clickSaveChanges()
    }
})

When(/^I process file (.*) file (.*) through the icap server$/, (fileType, file) => {
    I.onIcapProxyPage()
    icapProxyPage.downloadFile(fileType)
    I.wait(15)
    icapProxyPage.assertFileDownload(file)
})

Then(/^The (.*) processing outcome is (.*)$/, (file, fileOutcome) => {
    const filePath = `output/downloads/${file.trim()}`
    if (fileOutcome == 'Sanitised') {
    I.checkFileInFileDrop(filePath)
    filedropPage.isRequiredContentRefDisplayed('File is clean')
    }else {
    I.checkFileContains('Document Access Blocked due to Policy')
   }
    

})
