Feature("Login to Gymondo");

Scenario(
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
  Scenario(
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
    ({ I, testData, landingPage }) => {
      I.amOnPage("");
      landingPage.loginWithEmail(
        testData.users.standard.userName,
        testData.users.standard.password
      );
      I.waitForNavigation();
      I.seeInCurrentUrl("/train/timeline");
      I.click("GOT IT");
      I.see("Good afternoon, Test!");
    }
  );
