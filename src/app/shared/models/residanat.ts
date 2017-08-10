import {Semester} from "./semester";
import {NationalExam} from "./nationalExam";
/**
 * Created by Abbes on 09/08/2017.
 */
export class Residanat {
  public id_Residanat: number;
  public year: number;
  public id_Specialite: number;
  public id_result: number;
  public id_student: number;
  public semesters: Semester [] = [];
  public national_exam: NationalExam = new NationalExam();
}
