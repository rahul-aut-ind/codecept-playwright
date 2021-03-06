const { I } = inject();
const assert = require("assert");

module.exports = {
  NUMBER_OF_CALENDAR_DAYS_TO_SHOW: 7,
  WAIT_IN_SECS_FOR_ELEMENT: 5,
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
    timeline_btn: { css: "[class*='timeline-modal_modalBtn']" },
    timeline_upcoming_noData: { css: "[class*='timeline-modal_noDataTitle']" },
    timeline_completed_days: { css: "[class*='timeline-modal_dayTitle']" },
    nutrition_plan: { css: "button[class*='nutrition_button']" },
    recipe_suggestions: { css: "[data-label='recipe_suggestion']" },
    plan_status_action: { css: "[class*='plan-settings-modal_button'] div" },
    plan_settings_action_button: {
      css: "[data-action*='training_program_settings']",
    },
    workout_card_images: { css: "[class*='workout-card_backgroundImage']" },
    workout_video_duration: { css: "[class*='workout-card_duration']" },
    modal_video: { css: "[class*='video-player-modal']" },
    video_player: { css: "video[src]" },
    paused_banner: { css: "[class*='content_pausedBanner']" },
    day_view: { css: "[class*='day-view']" },
  },

  dismissWeeklyTargetModal() {
    I.waitForElement(
      this.fields.modal_weekly_target,
      this.WAIT_IN_SECS_FOR_ELEMENT
    );
    this.closeModal(this.fields.modal_weekly_target);
  },

  async verifyColorOfSelectedTab(activeColor) {
    var colorOfCurrentActiveTopMenu = await I.grabCssPropertyFrom(
      this.fields.active_top_menu,
      "color"
    );
    assert.strictEqual(colorOfCurrentActiveTopMenu, activeColor);
  },

  verifyNumberOfCalendarDaysDisplayed() {
    I.seeNumberOfElements(
      this.fields.calendar_days,
      this.NUMBER_OF_CALENDAR_DAYS_TO_SHOW
    );
  },

  async verifyRecipeSuggestionsDisplayed() {
    var recipeSuggestions = await I.grabNumberOfVisibleElements(
      this.fields.recipe_suggestions
    );
    I.say("Got " + recipeSuggestions + " recipe suggestions!!", "yellow");
    assert.ok(recipeSuggestions > 0);
  },

  checkWorkoutVideoPlayback() {
    I.waitForElement(
      this.fields.workout_video_duration,
      this.WAIT_IN_SECS_FOR_ELEMENT
    );
    I.click(this.fields.workout_video_duration);
    I.waitForElement(this.fields.modal_video, this.WAIT_IN_SECS_FOR_ELEMENT);
    I.waitForElement(this.fields.video_player, this.WAIT_IN_SECS_FOR_ELEMENT);
    I.seeElement(this.fields.video_player);
    I.say("Workout video working fine", "green");
  },

  closeVideoModal() {
    this.closeModal(this.fields.modal_video);
  },

  async verifyNameOfEnrolledProgram(planName) {
    var currentPlanName = await I.grabTextFrom(this.fields.program_name);
    assert(currentPlanName.includes(planName));
  },

  async verifyPlanTimelineElements(activeColor) {
    I.seeElement(this.fields.plan_timeline);
    I.click(this.fields.plan_timeline);
    I.waitForElement(this.fields.modal_timeline, this.WAIT_IN_SECS_FOR_ELEMENT);

    I.see("Upcoming");
    var colorOfUpcomingTab = await I.grabCssPropertyFrom(
      locate(this.fields.timeline_btn).withText("Upcoming"),
      "color"
    );

    I.see("Completed");
    I.click(locate(this.fields.timeline_btn).withText("Completed"));
    var colorOfCompletedTab = await I.grabCssPropertyFrom(
      locate(this.fields.timeline_btn).withText("Completed"),
      "color"
    );

    assert.strictEqual(colorOfUpcomingTab, activeColor);
    assert.strictEqual(colorOfCompletedTab, activeColor);

    this.closeModal(this.fields.modal_timeline);
  },

  verifyPlanSettings(planName) {
    I.seeElement(this.fields.plan_settings);
    I.click(this.fields.plan_settings);
    I.waitForElement(
      this.fields.modal_plan_settings,
      this.WAIT_IN_SECS_FOR_ELEMENT
    );
    I.see(planName);
    this.closeModal(this.fields.modal_plan_settings);
  },

  async verifyPlanTimeline(apiUpcoming, apiCompleted, planStatus) {
    I.seeElement(this.fields.plan_timeline);
    I.click(this.fields.plan_timeline);
    I.waitForElement(this.fields.modal_timeline, this.WAIT_IN_SECS_FOR_ELEMENT);

    I.see("Upcoming");
    if (planStatus.toString().toUpperCase() === "PAUSE") {
      I.waitForElement(this.fields.timeline_upcoming_noData);
      I.see("Oops! Your Training Plan Is Empty.");
    } else {
      // I.waitForResponse(
      //   (response) => response.url() === apiUpcoming && response.status() === 200,
      //   this.WAIT_IN_SECS_FOR_ELEMENT
      // );
      var upcomingWorkouts = await I.grabNumberOfVisibleElements(
        this.fields.workout_card_images
      );
      I.say("Got " + upcomingWorkouts + " workouts in Upcoming!!", "yellow");
      assert.ok(upcomingWorkouts > 0);
    }

    I.see("Completed");
    I.click(
      locate(this.fields.timeline_btn).withText("Completed").as("Completed Tab")
    );
    // I.waitForResponse(
    //   (response) =>
    //     response.url() === apiCompleted && response.status() === 200,
    //   this.WAIT_IN_SECS_FOR_ELEMENT
    // );
    I.waitForElement(this.fields.timeline_completed_days, 5);
    var daysCompletedTimeline = await I.grabNumberOfVisibleElements(
      this.fields.timeline_completed_days
    );
    I.say("Got " + daysCompletedTimeline + " days in Completed!!", "yellow");
    assert.ok(daysCompletedTimeline > 0);

    this.closeModal(this.fields.modal_timeline);
  },

  async changePlanSettings(actionType) {
    I.say("Trying to change Current Plan to " + actionType, "yellow");
    I.seeElement(this.fields.plan_settings);
    I.click(this.fields.plan_settings);
    I.waitForElement(
      this.fields.modal_plan_settings,
      this.WAIT_IN_SECS_FOR_ELEMENT
    );

    switch (actionType.toString().toUpperCase()) {
      case "PAUSE":
        if ((await this.getPlanStatus()) === "Paused") {
          this.closeModal(this.fields.modal_plan_settings);
          I.say("Current Plan - Already Paused", "yellow");
        } else {
          I.click(locate(this.fields.plan_status_action).first());
          I.waitForElement(
            this.fields.plan_settings_action_button,
            this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.click("Pause program", this.fields.plan_settings_action_button);
          I.waitForInvisible(
            this.fields.modal_plan_settings,
            this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.waitForVisible(
            this.fields.paused_banner,
            2 * this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.say("Current Plan - Paused", "yellow");
        }
        break;
      case "RESUME":
        if ((await this.getPlanStatus()) === "Paused") {
          I.click(locate(this.fields.plan_status_action).first());
          I.waitForInvisible(
            this.fields.modal_plan_settings,
            this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.waitForInvisible(
            this.fields.paused_banner,
            2 * this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.waitForVisible(
            this.fields.day_view,
            2 * this.WAIT_IN_SECS_FOR_ELEMENT
          );
          I.say("Current Plan - Active", "yellow");
        } else {
          this.closeModal(this.fields.modal_plan_settings);
          I.say("Current Plan - Already Active", "yellow");
        }
        break;
    }
  },

  async getPlanStatus() {
    var planStatusAction = await I.grabTextFrom(
      locate(this.fields.plan_status_action).first()
    );
    if (planStatusAction.includes("PAUSE")) planStatusAction = "Paused";
    else planStatusAction = "Active";
    I.say("Current plan status is " + planStatusAction, "yellow");
    return planStatusAction;
  },

  closeModal(modalName) {
    I.click(this.fields.modal_close);
    I.waitForInvisible(modalName, this.WAIT_IN_SECS_FOR_ELEMENT);
  },
};
