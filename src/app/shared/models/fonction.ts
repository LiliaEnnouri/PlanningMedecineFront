import {Adress} from "./adress";
import {City} from "./city";
/**
 * Created by Abbes on 04/08/2017.
 */
export class Fonction {
  public id_fonction: number;
  public nature: string;
  public employer: string;
  public date_of_inauguration: string;
  public id_student: number;

  public cities: City[];
  public address: Adress = new Adress();
}
