import { PlateformeMedecineAdminPage } from './app.po';

describe('plateforme-medecine-planning App', () => {
  let page: PlateformeMedecineAdminPage;

  beforeEach(() => {
    page = new PlateformeMedecineAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
