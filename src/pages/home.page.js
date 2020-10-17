const { I } = inject();

module.exports = {
  //Locators

  fields: {},
  buttons: {
    accountPopupToggle: "",
    logout: "",
  },
  sections: {
    menu: `section[class*='Toolbar_Toolbar__1Imro.Toolbar_expanded__3KBgy']`,
  },
  links: {
    dashboard: `a[href*='dashboard'] > div > p`,
    fileDrop: `a[class*='NavigationItem_active__mP0BB'] > div`,
    requestsHistory: `a[href*='request-history'] > div`,
    policy: `a[href*='policy'] > div`,
    configuration: `a[href*='configuration'] > div`,
    users: `a[href*='users'] > div`,
  },

  //Methods
  /*
   * MenuLinks
   * ***************************************************************
   */
  clickRequestsHistory() {
    const element = this.links.requestsHistory;
    I.click(element);
  },

  clickFileDrop() {
    const element = this.links.fileDrop;
    I.click(element);
  },

  clickPolicy() {
    const element = this.links.policy;
    I.click(element);
  },

  clickConfiguration() {
    const element = this.links.configuration;
    I.click(element);
  },
  clickUsers() {
    const element = this.links.users;
    I.click(element);
  },

  clickLogout() {
    const element = this.buttons.logout;
    I.click(element);
  },

  clickAccountToggle() {
    const element = this.buttons.accountPopupToggle;
    I.click(element);
  },
};
