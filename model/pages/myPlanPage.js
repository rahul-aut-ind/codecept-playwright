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
    plan_timeline: { css: "[data-action='training_open_timeline']" },
    plan_settings: { css: "[data-action='training_settings_open']" },
    modal_plan_settings: { css: "[class*='plan-settings-modal']" },
    modal_timeline: { css: "[class*='timeline-modal']" },
    timeline_days: { css: "[class*='timeline-modal_dayTitle']" },
  },

  dismissWeeklyTargetModal() {
    I.waitForElement(this.fields.modal_weekly_target, 5);
    this.closeModal(this.fields.modal_weekly_target);
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

  async verifyPlanTimeline(apiCompleted) {
    I.seeElement(this.fields.plan_timeline);
    I.click(this.fields.plan_timeline);
    I.waitForElement(this.fields.modal_timeline, 5);
    I.see("Upcoming");
    I.see("Oops! Your Training Plan Is Empty.");
    I.see("Completed");
    I.click(
      locate(".modal__header")
        .find("div")
        .withText("Completed")
        .as("Completed Tab")
    );
    I.waitForResponse(
      (response) =>
        response.url() === apiCompleted && response.status() === 200,
      5
    );
    var daysCompletedTimeline = await I.grabNumberOfVisibleElements(
      this.fields.timeline_days
    );
    I.say("got " + daysCompletedTimeline + " days in Completed!!", "blue");
    assert.ok(daysCompletedTimeline > 0);
    this.closeModal(this.fields.modal_timeline);
  },

  verifyPlanSettings(planName) {
    I.seeElement(this.fields.plan_settings);
    I.click(this.fields.plan_settings);
    I.waitForElement(this.fields.modal_plan_settings, 5);
    I.see(planName);
    this.closeModal(this.fields.modal_plan_settings);
  },
  closeModal(modalName) {
    I.click(this.fields.modal_close);
    I.waitForInvisible(modalName, 5);
  },
};
