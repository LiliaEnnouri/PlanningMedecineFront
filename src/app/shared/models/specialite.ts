/**
 * Created by Abbes on 09/08/2017.
 */
import {Teacher} from "./Teacher";

export class Specialite {
  public id_Specialite: number;
  public nom: string;
  public code: string;
  public id_Specialite_Groupe: number;
  public responsible: Teacher = new Teacher();
  public enseignants: Teacher[] = [];
}
