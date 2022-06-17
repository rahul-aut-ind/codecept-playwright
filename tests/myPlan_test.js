Feature("My Plan Page Validations | @Sanity");

const assert = require("assert");

Before(({ I, testData, landingPage }) => {
  I.amOnPage("");
  I.say("Logging In to Application with Standard User");
  landingPage.loginWithEmail(
    testData.users.standard.userName,
    testData.users.standard.password
  );
  I.waitForNavigation();
  I.say("Logged In successfully");
});

Scenario(
  "MyPlan Page Top Section validations | @HappyPath",
  async ({ I, testData, myPlanPage }) => {
    I.seeInCurrentUrl("/train/timeline");
    I.say("Dismissing Modal Popup");
    myPlanPage.dismissWeeklyTargetModal();

    I.say("Top menu Validations");
    I.seeElement(myPlanPage.fields.top_menu);
    I.see(testData.users.standard.name);
    var colorOfActiveTopMenu = await myPlanPage.colorOfSelectedTab();
    assert.strictEqual(
      colorOfActiveTopMenu,
      testData.users.standard.activeColor
    );

    I.say("Enrolled Plan & Days validations");
    var planName = await myPlanPage.verifyNameOfEnrolledProgram();
    assert.strictEqual(planName, testData.users.standard.planName);
    I.seeElement(myPlanPage.fields.calendar_days);
    myPlanPage.verifyNumberOfCalendarDaysDisplayed();
    I.seeElement(myPlanPage.fields.progress_circle);
    I.seeElement(myPlanPage.fields.progress_circle_content);
    //const result = await tryTo(() => I.see('Welcome'));
  }
);
