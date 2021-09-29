import { title } from 'process';
import { first } from 'rxjs/operators';

import { browser, element, by, protractor, logging } from 'protractor';
import { HomePage } from './home.po';



describe('Home Page', () => {

  let homePage: HomePage;

  afterEach(async () => {
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });

  beforeEach(async () => {
    homePage = new HomePage();
    await homePage.navigateTo();
  });

  it('Should navigate to usser profile', async () => {
    const title = await homePage.getWindowTitle();
    expect(title).toEqual(`TimeLine`);
  });

  it('Should display a list of photos', async () => {
    const photoListSize = element
      .all(by.css('.photo'))
      .count();
    expect(photoListSize).toBeGreaterThan(0);
  });

  it('Should navigate to photo detail when photo navigation is triggered', async () => {
    const firstElement = element
      .all(by.css('.photo'))
      .first();
    sendKeys(protractor.Key.ENTER);
    const title = await browser.getTitle();
    expect(title).toBe('Photo detail');
  });

  it('Should list one item when filtering by word "farol"', async () => {
    const searchInput = element(by.css('ap-search input[type=search]'));
    await searchInput.sendKeys('farol');
    const list = element.all(by.css('.photo'));
    const photoListSize = await list.count();
    expect(photoListSize).toBe(1);
  });

});
function sendKeys(ENTER: string) {
  throw new Error('Function not implemented.');
}

