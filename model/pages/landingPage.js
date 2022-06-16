const { I } = inject();

module.exports = {
  // locators
  fields: {
    landing_login_btn: { css: "[data-action='click_login_cta']" },
    landing_login_popup: { css: "[class*='login-modal-module']" },
    login_email: "#mail",
    login_password: "#password",
    logIn_Btn: ".btn-gym__content",
    logIn_err_msg: ".input-note--invalid",
  },

  // methods
  loginWithEmail(userName, password) {
    I.click(this.fields.landing_login_btn);
    I.waitForVisible(this.fields.landing_login_popup, 5);
    I.fillField(this.fields.login_email, userName);
    I.fillField(this.fields.login_password, secret(password));
    I.click(this.fields.logIn_Btn);
  },
  waitForLoginErrorMessage(timeout) {
    timeout = timeout == undefined ? 1 : timeout;
    I.waitForVisible(this.fields.logIn_err_msg, timeout);
  },
};
