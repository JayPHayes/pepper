import { Pepper2Page } from './app.po';

describe('pepper2 App', function() {
  let page: Pepper2Page;

  beforeEach(() => {
    page = new Pepper2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
