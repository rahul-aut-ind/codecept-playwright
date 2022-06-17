Feature("Login to Gymondo");

Scenario.skip(
  "Launch WebApp & Login with improper credentials",
  ({ I, testData, landingPage }) => {
    I.amOnPage("");
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
  Scenario.skip(
    "Launch WebApp & Login with invalid credentials",
    ({ I, testData, landingPage }) => {
      I.amOnPage("");
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
    "Launch WebApp & Login with standard credentials",
    ({ I, testData, landingPage, myPlanPage }) => {
      I.amOnPage("");
      landingPage.loginWithEmail(
        testData.users.standard.userName,
        testData.users.standard.password
      );
      I.waitForNavigation();
      I.seeInCurrentUrl("/train/timeline");
      myPlanPage.dismissWeeklyTargetModal();
      I.seeElement(myPlanPage.fields.top_menu);
      I.see("Test1");
    }
  );
