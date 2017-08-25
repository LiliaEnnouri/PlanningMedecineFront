import {Level} from "./level";
import {Student} from "./student";
import {RegistrationYearUniversity} from "./RegistrationYearUniversity";
/**
 * Created by Abbes on 25/08/2017.
 */
export class RegistrationYearUniversityStudent {
  public id_Registration_University_Student: number;
  public id_level: number;
  public id_student: number;
  public id_Registration_University: number;

  public level: Level;
  public student: Student;
  public registration_university: RegistrationYearUniversity;
}
