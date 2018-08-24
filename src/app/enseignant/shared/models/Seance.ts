import {Theme} from "./Theme";
import {Plage_Unite} from "./Plage_Unite";

export class Seance {
  public seance_id: number;
  public semaine: number;
  public theme_id: number;
  public plage_unite_id: number;

  public theme: Theme;
  public plage_unite: Plage_Unite;

}
