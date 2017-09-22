import {SectionValidation} from "./section-validation";
import {Adress} from "./adress";
import {City} from "./city";
import {PassportTeacher} from "./Passport_Teacher";
import {CinTeacher} from "./cinTeacher";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "./fonction";
import {Study} from "./study";
import {Doctaurat} from "./doctaurat";
import {Specialite} from "./specialite";
import {Service} from "./service";
import {Grade} from "./grade";
import {TeacherConcour} from "./Teacher_Concour";

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

  public concours: TeacherConcour [];
  public fonctions: Fonction[];
  public doctaurat: Doctaurat;
  public studies: Study[];
  public bac: Bac;
  public dossier_status?: number;
  public administration_review?: number;


  public validations: SectionValidation[];

  public city_birth: City;
  public birthday_city: number;
  public id_origin_university: number;

  extrait_naissance: TeacherExtraitNaissance;


  civil_status: number;


  /* Info Arabe */
  first_name_arabe: string;
  last_name_arabe: string;
  nom_de_famille_arabe: string;
  second_name_arabe: string;

  id_Service: number;
  id_Grade: number;
  id_Specialite: number;
  service: Service;
  specialite: Specialite;
  grade: Grade;

  numberStatusZero: number;


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
