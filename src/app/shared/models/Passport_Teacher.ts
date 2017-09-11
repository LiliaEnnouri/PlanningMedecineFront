import {City} from "./city";
import {TeacherCinPhoto} from "./TeacherCinPhoto";
/**
 * Created by Abbes on 24/08/2017.
 */
export class PassportTeacher {
  public id_Passport_Teacher: number;
  public code: string;
  public date: string;
  public id_city: number;
  public city: City;
  public imgs: Array<TeacherCinPhoto>;
}
