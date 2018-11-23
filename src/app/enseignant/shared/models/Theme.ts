import {Enseignant} from "./Enseignant";
import {Unite} from "./Unite";

export class Theme {
  public theme_id: number;
  public code: string;
  public contenu: string;
  public ordre: number;
  public nb_heures: number;
  public semaine_debut: number;
  public semaine_fin: number;
  public enseignant_id: number;
  public type_id: number;
  public unite_id: number;
  public enseignant: Enseignant = new Enseignant();
  public unite: Unite = new Unite();
}
