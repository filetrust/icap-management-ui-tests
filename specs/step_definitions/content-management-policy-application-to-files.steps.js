const {
    I,
    policyPage,
    homePage
} = inject();

Given(/^I have applied the (.*) content management policy to (.*)  for (.*)$/, (flagType, contentFlags, fileType) => {
    homePage.clickPolicy()
    policyPage.setFlagTypeForGivenContentFlagsForGivenDocType(contentFlags, fileType, flagType)
})

// TODO implement when functionality available
When(/^I process (.*)$/, (fileType) => {
})

// TODO implement when functionality available
Then(/^(.*) is returned with (.*)$/, (fileType, fileHash) => {
});

// TODO implement when functionality available
Then('the file is not returned and the expected validation message is returned', () => {
});
