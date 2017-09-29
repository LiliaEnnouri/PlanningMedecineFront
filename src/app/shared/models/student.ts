import {Bac} from "./bac";
import {Study} from "app/shared/models/study";
import {Fonction} from "./fonction";
import {Doctaurat} from "app/shared/models/doctaurat";
import {Adress} from "./adress";
import {City} from "./city";
import {Residanat} from "app/shared/models/residanat";
import {SectionValidation} from "./section-validation";
import {PassportStudent} from "./Passport_Student";
import {CinStudent} from "./cinStudent";
import {Admin} from "./admin";
import {RegistrationYearUniversityStudent} from "./RegistrationYearUniversityStudent";
import {Country} from "./country";
declare let jQuery: any;
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
  public passport?: PassportStudent = new PassportStudent();
  public cin?: CinStudent = new CinStudent();
  public birthday: string;
  public phone?: string;
  public mobile: string;
  public study_access_year: string;
  public email: string;
  public oriented?: number | boolean;
  public password: string;

  public evaluateur: Admin;

  public qr_code: string;
  public img: StudentPhoto;
  public profile: StudentPhoto;
  public imgs_cin: StudentCin[];
  public label_address?: string;
  public address_city: number;
  public postal_code?: number;
  public bac: Bac;
  public studies: Study[];
  public fonctions: Fonction[];
  public doctaurat: Doctaurat;
  public adress?: Adress;

  public numberStatusZero: number;

  public dossier_status?: number;
  public administration_review?: number;


  public residanat: Residanat;

  public validations: SectionValidation[];

  public city_birth: City;
  public birthday_city: number;
  public id_origin_university: number;

  public isNew: boolean;
  extrait_naissance: StudentExtraitNaissance;
  attestation_orientation: Array<StudentAttestationOrientation>;

  id_evaluateur: number;
  updated_at: string;
  created_at: string;

  civil_status: number;


  /* Info Arabe */
  first_name_arabe: string;
  last_name_arabe: string;
  nom_de_famille_arabe: string;
  second_name_arabe: string;
  health_media: StudentHealthMedia;

  /* Code Pays */
  nationality: string;
  nationalityLabel: string;


  nationality_student: Country;


  registrations: RegistrationYearUniversityStudent[];
}

export class StudentPhoto {
  id_Student_Photo: number;
  id_Student: number;
  path: string;
  size: number;
}
export class StudentCin {
  id_Student_Cin: number;
  id_Student: number;
  path: string;
  size: number;
}

export class StudentExtraitNaissance {
  id_Student_Extrait_Naissance: number;
  id_Student: number;
  path: string;
  size: number;
}

export class StudentAttestationOrientation {
  id_Student_Attestation_Orientation: number;
  id_Student: number;
  path: string;
  size: number;
}
export class StudentHealthMedia {
  id_Student_Health_Media: number;
  id_Student: number;
  path: string;
  size: number;
}
