import {Level} from "./level";
import {Student} from "./student";
export class Notification {
  id_Notification: number;
  content: string;
  id_Level: number;
  level: Level;
  id_Student: number;
  student: Student;
  status: number;
  created_at: string;
  updated_at: string;
}
