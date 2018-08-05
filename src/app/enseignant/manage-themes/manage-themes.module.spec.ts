import { ManageThemesModule } from './manage-themes.module';

describe('ManageThemesModule', () => {
  let manageThemesModule: ManageThemesModule;

  beforeEach(() => {
    manageThemesModule = new ManageThemesModule();
  });

  it('should create an instance', () => {
    expect(manageThemesModule).toBeTruthy();
  });
});
