import {Semester} from "./semester";
import {NationalExam} from "./nationalExam";
/**
 * Created by Abbes on 19/09/2017.
 */
export class TeacherConcour {
  public id_Teacher_Concour: number;
  public year: number;
  public id_Specialite: number;
  public id_result: number;
  public id_Teacher: number;
  // 1: Residanat , 2 assistanat, 3 aggrégation  , 4 professorat
  public id_Concour_Type: number;

  public semesters: Semester [] = [];
  public national_exam: NationalExam = new NationalExam();
}
