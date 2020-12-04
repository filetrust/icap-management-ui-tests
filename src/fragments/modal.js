const { I } = inject();

module.exports = {

  root: `section[class*='Modal_Modal__']`,
  confirmPublishButton: `button[class*='ConfirmDraftPublishModal_confirmPublishButton__']`,


  accept() {
    within(this.root, function() {
      I.clickElement(`button[class*='ConfirmDraftPublishModal_confirmPublishButton__']`);
    });
  },

  confirmDelete() {
    within(this.root, function() {
      I.clickElement(`button[class*='ConfirmDraftDeleteModal_confirmDeleteButton__']`);
    });
  }
}