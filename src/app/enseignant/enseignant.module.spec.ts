import { EnseignantModule } from './enseignant.module';

describe('EnseignantModule', () => {
  let enseignantModule: EnseignantModule;

  beforeEach(() => {
    enseignantModule = new EnseignantModule();
  });

  it('should create an instance', () => {
    expect(enseignantModule).toBeTruthy();
  });
});
