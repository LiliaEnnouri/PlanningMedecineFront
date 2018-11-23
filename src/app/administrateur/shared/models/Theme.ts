import {Enseignant} from "../../../enseignant/shared/models/Enseignant";
import {Unite} from "../../../enseignant/shared/models/Unite";

export class Theme {
  public theme_id: number;
  public code: string;
  public contenu: string;
  public nb_heures_id: number;
  public semaine_debut: number;
  public semaine_fin: number;

  public enseignant: Enseignant = new Enseignant();
  public unite: Unite = new Unite();
}
