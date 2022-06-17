Feature("Login to Gymondo | @Sanity");

Before(({ I }) => {
  I.amOnPage("");
  I.say("Opening Landing Page");
});

Scenario(
  "Launch WebApp & Login with improper credentials | @Negative",
  ({ I, testData, landingPage }) => {
    landingPage.loginWithEmail(
      testData.users.standard.userName,
      testData.users.invalid.password
    );
    landingPage.waitForLoginErrorMessage();
    I.see(
      "The username or password you have entered is invalid. Please try again."
    );
  }
),
  Scenario(
    "Launch WebApp & Login with invalid credentials | @Negative",
    ({ I, testData, landingPage }) => {
      landingPage.loginWithEmail(
        testData.users.invalid.userName,
        testData.users.invalid.password
      );
      landingPage.waitForLoginErrorMessage();
      I.see(
        "The username or password you have entered is invalid. Please try again."
      );
    }
  ),
  Scenario(
    "Launch WebApp & Login with standard credentials | @HappyPath",
    ({ I, testData, landingPage, myPlanPage }) => {
      landingPage.loginWithEmail(
        testData.users.standard.userName,
        testData.users.standard.password
      );
      I.waitForNavigation();
      I.seeInCurrentUrl("/train/timeline");
      myPlanPage.dismissWeeklyTargetModal();
      I.seeElement(myPlanPage.fields.top_menu);
    }
  );
