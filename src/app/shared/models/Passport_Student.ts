import {City} from "./city";
import {StudentCinPhoto} from "./Student_Cin_Photo";
/**
 * Created by Abbes on 24/08/2017.
 */
export class PassportStudent {
  public id_Passport_Student: number;
  public code: string;
  public date: string;
  public id_city: number;
  public city: City ;
  imgs: Array<StudentCinPhoto>;
}
