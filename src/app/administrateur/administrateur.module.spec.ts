import { AdministrateurModule } from './administrateur.module';

describe('AdministrateurModule', () => {
  let administrateurModule: AdministrateurModule;

  beforeEach(() => {
    administrateurModule = new AdministrateurModule();
  });

  it('should create an instance', () => {
    expect(administrateurModule).toBeTruthy();
  });
});
