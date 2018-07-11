import { EtudiantModule } from './etudiant.module';

describe('EtudiantModule', () => {
  let etudiantModule: EtudiantModule;

  beforeEach(() => {
    etudiantModule = new EtudiantModule();
  });

  it('should create an instance', () => {
    expect(etudiantModule).toBeTruthy();
  });
});
