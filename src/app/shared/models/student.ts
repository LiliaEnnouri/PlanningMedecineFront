import {Bac} from "./bac";
import {Study} from "app/shared/models/study";
import {Fonction} from "./fonction";
import {Doctaurat} from "app/shared/models/doctaurat";
import {Adress} from "./adress";
import {City} from "./city";
import {Residanat} from "app/shared/models/residanat";
import {SectionValidation} from "./section-validation";
/**
 * Created by Abbes on 01/08/2017.
 */
export class Student {
  public id_student: number;
  public first_name: string;
  public last_name: string;
  public second_name ?: string;
  public nom_de_famille?: string;
  public sex: string;
  public cin?: string;
  public passport?: string;
  public birthday: string;
  public phone?: string;
  public mobile: string;
  public study_access_year: string;
  public email: string;
  public oriented?: boolean | number;
  public password: string;
  public dossier_status?: number;
  public administration_review?: number;
  public qr_code: string;
  public img: StudentPhoto;
  public label_address?: string;
  public address_city: number;
  public postal_code?: number;
  public bac: Bac;
  public studies: Study[];
  public fonctions: Fonction[];
  public doctaurat: Doctaurat;
  public adress?: Adress;


  public residanat: Residanat;

  public validations: SectionValidation[];

  public city_birth: City;
  public birthday_city: number;
  public id_origin_university: number;
}
export class StudentPhoto {
  id_Student_Photo: number;
  id_Student: number;
  path: string;
  size: number;
}
