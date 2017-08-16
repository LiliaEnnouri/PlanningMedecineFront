import {City} from "./city";
/**
 * Created by Abbes on 04/08/2017.
 */
export class Bac {
  public id_bac: number;
  public year: number;
  public average: number;
  public school: string;
  public id_type: number;
  public id_mention: number;
  public id_student: number;
  public id_city: number;

  public city?: City;
}
