import {SectionValidation} from "./section-validation";
import {Adress} from "./adress";
import {City} from "./city";
import {PassportTeacher} from "./Passport_Teacher";
import {CinTeacher} from "./cinTeacher";
/**
 * Created by Abbes on 29/08/2017.
 */
export class Teacher {
  public id_Teacher: number;
  public first_name: string;
  public last_name: string;
  public second_name ?: string;
  public nom_de_famille?: string;
  public sex: string;
  public passport?: PassportTeacher = new PassportTeacher();
  public cin?: CinTeacher = new CinTeacher();
  public birthday: string;
  public phone?: string;
  public mobile: string;
  public email: string;
  public password: string;

  public qr_code: string;
  public img: TeacherPhoto;
  public label_address?: string;
  public address_city: number;
  public postal_code?: number;

  public adress?: Adress;

  public dossier_status?: number;
  public administration_review?: number;

  public numberStatusZero: number;

  public validations: SectionValidation[];

  public city_birth: City;
  public birthday_city: number;
  public id_origin_university: number;

  extrait_naissance: TeacherExtraitNaissance;

  id_evaluateur: number;


  updated_at: string;
  created_at: string;
  civil_status: number;


  /* Info Arabe */
  first_name_arabe: string;
  last_name_arabe: string;
  nom_de_famille_arabe: string;
  second_name_arabe: string;
}


export class TeacherPhoto {
  id_Teacher_Photo: number;
  id_Teacher: number;
  path: string;
  size: number;
}

export class TeacherExtraitNaissance {
  id_Teacher_Extrait_Naissance: number;
  id_Teacher: number;
  path: string;
  size: number;
}
