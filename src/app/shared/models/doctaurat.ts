import {University} from "./university";
import {Mention} from "./mention";
/**
 * Created by Abbes on 04/08/2017.
 */
export class Doctaurat {
  public id_doctaurat: number;
  public date_of_pitch: string;
  public numero: string;
  public id_student: number;
  public id_university: number;
  public id_mention: number;
  public university: University;
  public mention: Mention;
}
