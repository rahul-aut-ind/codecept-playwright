const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://www.gymondo.com/en/",
      show: true,
      browser: "chromium",
      waitForNavigation: "networkidle0",
      timeout: 60000,
      //uniqueScreenshotNames: true,
      waitForAction: 200,
      restart: false,
      trace: true,
    },
    Mochawesome: {
      uniqueScreenshotNames: "true",
    },
  },
  include: {
    I: "./utility.js",
    landingPage: "./model/pages/landingPage.js",
    myPlanPage: "./model/pages/myPlanPage.js",
    testData: "./config/testData.json",
  },
  mocha: {
    reporterOptions: {
      reportDir: "output",
      inlineAssets: true,
      reportPageTitle: "Onboarding Test Reports",
      reportTitle: "Onboarding Test Reports",
    },
  },
  bootstrap: null,
  name: "codecept-playwright",
};
