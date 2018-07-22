import { ManagePlageUniteModule } from './manage-plage-unite.module';

describe('ManagePlageUniteModule', () => {
  let managePlageUniteModule: ManagePlageUniteModule;

  beforeEach(() => {
    managePlageUniteModule = new ManagePlageUniteModule();
  });

  it('should create an instance', () => {
    expect(managePlageUniteModule).toBeTruthy();
  });
});
