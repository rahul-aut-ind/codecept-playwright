const { I } = inject();
const assert = require("assert");

module.exports = {
  NUMBER_OF_CALENDAR_DAYS_TO_SHOW: 7,
  // locators
  fields: {
    top_menu: ".top-nav__list",
    active_top_menu: { css: ".top-nav__list a[class*='header_activeNavItem']" },
    modal_weekly_target: { css: "[class*='modal_dialogWrapper']" },
    modal_close: { css: "[class*='modal_closeIcon']" },
    program_name: { css: "[class*='header_programName']" },
    progress_circle: ".progress-circle",
    progress_circle_content: ".progress-circle__content",
    calendar_days: { css: "[class*='calendar_dayName']" },
  },

  dismissWeeklyTargetModal() {
    I.waitForElement(this.fields.modal_weekly_target, 5);
    I.click(this.fields.modal_close);
    I.waitForInvisible(this.fields.modal_weekly_target, 5);
  },

  async colorOfSelectedTab() {
    return await I.grabCssPropertyFrom(this.fields.active_top_menu, "color");
  },

  verifyNumberOfCalendarDaysDisplayed() {
    I.seeNumberOfElements(
      this.fields.calendar_days,
      this.NUMBER_OF_CALENDAR_DAYS_TO_SHOW
    );
  },
  async verifyNameOfEnrolledProgram() {
    return await I.grabTextFrom(this.fields.program_name);
  },
};
