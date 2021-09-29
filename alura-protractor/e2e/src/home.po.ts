import { browser } from "protractor";

export class HomePage {

  navigateTo() {
    return browser.get(`${browser.baseUrl}/#/user/flavio`);
  }

  getWindowTitle() {
    return browser.getTitle();
  }
}

