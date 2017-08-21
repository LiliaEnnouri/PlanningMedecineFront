/**
 * Created by Abbes on 21/08/2017.
 */
export class SectionValidation {
  public id_section_validation: number;
  public id_section: number; // 1 : general Info , 2 : bac , 3 : studies , 4  : photo , 5 : fonctions , 6 : doctorat ,7 : Residanat
  public id_student: number;
  public status: number; // 0 none , 1 validé , 2  reverifié , -1 refusé
  public note : string;
}
