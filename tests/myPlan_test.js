Feature("My Plan Page Validations | @Sanity");

Before(({ I, testData, landingPage, myPlanPage }) => {
  I.amOnPage("");
  I.say("Logging In to Application with Standard User");
  landingPage.loginWithEmail(
    testData.users.standard.userName,
    testData.users.standard.password
  );
  I.waitForNavigation();
  I.seeInCurrentUrl("/train/timeline");
  I.say("Logged In successfully");
  myPlanPage.dismissWeeklyTargetModal();
});

Scenario(
  "MyPlan | Page validations | @HappyPath",
  async ({ I, testData, myPlanPage }) => {
    I.say("Top menu Validations");
    I.seeElement(myPlanPage.fields.top_menu);
    I.see(testData.users.standard.name);
    await myPlanPage.verifyColorOfSelectedTab(
      testData.users.standard.activeColor
    );

    I.say("Enrolled Plan & Days validations");
    await myPlanPage.verifyNameOfEnrolledProgram(
      testData.users.standard.planName
    );
    I.seeElement(myPlanPage.fields.calendar_days);
    myPlanPage.verifyNumberOfCalendarDaysDisplayed();
    I.seeElement(myPlanPage.fields.progress_circle);
    I.seeElement(myPlanPage.fields.progress_circle_content);
    //const result = await tryTo(() => I.see(testData.users.standard.name));

    I.scrollPageToBottom();
    I.see("Your recipe suggestions for today");
    await myPlanPage.verifyRecipeSuggestionsDisplayed();
    I.see("OPEN NUTRITION PLAN", myPlanPage.fields.nutrition_plan);
    I.scrollPageToTop();

    myPlanPage.verifyPlanSettings(testData.users.standard.planName);
    await myPlanPage.verifyPlanTimelineElements(
      testData.users.standard.activeColor
    );
  }
),
  Scenario(
    "MyPlan | Plan status validations | @Update",
    async ({ I, testData, myPlanPage }) => {
      I.say("Pausing the current plan & validating timeline");
      await myPlanPage.changePlanSettings("Pause");
      await myPlanPage.verifyPlanTimeline(
        testData.users.standard.apiUpcoming,
        testData.users.standard.apiCompleted,
        "Pause"
      );

      I.say("Resuming the current plan & validating timeline");
      await myPlanPage.changePlanSettings("Resume");
      await myPlanPage.verifyPlanTimeline(
        testData.users.standard.apiUpcoming,
        testData.users.standard.apiCompleted,
        "Resume"
      );
    }
  ),
  Scenario(
    "MyPlan | Video Player Works | @Update",
    async ({ I, testData, myPlanPage }) => {
      I.say("Resuming the current plan if Plan is not active");
      await myPlanPage.changePlanSettings("Resume");

      myPlanPage.checkWorkoutVideoPlayback();
      myPlanPage.closeVideoModal();
    }
  );
