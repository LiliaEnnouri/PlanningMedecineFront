import {Plage_Unite} from "../../../enseignant/shared/models/Plage_Unite";
import {Theme} from "../../../enseignant/shared/models/Theme";

export class Seance {
  public seance_id: number;
  public semaine: number;
  public theme_id: number;
  public plage_unite_id: number;

  public theme: Theme = new Theme();
  public plage_unite: Plage_Unite = new Plage_Unite();


}
