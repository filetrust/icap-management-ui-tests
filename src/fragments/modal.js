const I = actor();

module.exports = {

  root: `section[class*='Modal_Modal__']`,
  confirmPublishButton: `button[class*='ConfirmDraftPublishModal_confirmPublishButton__']`,


  accept() {
    within(this.root, function() {
      I.waitForElement(`button[class*='ConfirmDraftPublishModal_confirmPublishButton__']`, 5)
      I.clickElement(`button[class*='ConfirmDraftPublishModal_confirmPublishButton__']`);
    });
  },

  acceptActivate() {
    within(this.root, function() {
      I.clickElement(`button[class*='ConfirmPublishModal_confirmPublishButton__']`);
    });
  },

  cancelActivate() {
    within(this.root, function() {
      I.clickElement(`button[class*='ConfirmPublishModal_cancelPublishButton__']`);
    });
  },

  confirmDelete() {
    within(this.root, function() {
      I.clickElement(`button[class*='ConfirmDraftDeleteModal_confirmDeleteButton__']`);
    });
  }
}