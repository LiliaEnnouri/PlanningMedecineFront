import {City} from "./city";
import {StudentCinPhoto} from "./Student_Cin_Photo";
/**
 * Created by Abbes on 24/08/2017.
 */
export class CinStudent {
  public id_Student_CIN: number;
  public code: string;
  public date: string;
  public id_city: number;
  public city: City;
  imgs: Array<StudentCinPhoto>;
}
