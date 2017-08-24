import {Adress} from "./adress";
import {City} from "./city";
import {FonctionType} from "./FonctionType";

export class Fonction {
  public id_fonction: number;
  public nature: string;
  public employer: string;
  public date_of_inauguration: string;
  public id_student: number;

  public cities: City[];
  public address: Adress = new Adress();
  id_Fonction_Type: number;
  type: FonctionType;
}
