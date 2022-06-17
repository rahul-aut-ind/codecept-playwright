const { I } = inject();

module.exports = {
  // locators
  fields: {
    top_menu: ".top-nav__list",
    modal_weekly_target: { css: "[class*='modal_dialogWrapper']" },
  },

  dismissWeeklyTargetModal() {
    I.waitForElement(this.fields.modal_weekly_target);
    I.pressKey("Escape");
  },
};
