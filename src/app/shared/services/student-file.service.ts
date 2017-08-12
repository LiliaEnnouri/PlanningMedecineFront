import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";
import {Student} from "../models/student";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
@Injectable()
export class StudentFileService extends GenericService {

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }


  editInformations(student: Student) {
    const url = Config.baseUrl + "/student/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, {
        "first_name": student.first_name,
        "last_name": student.last_name,
        "nom_de_famille": student.nom_de_famille,
        "sex": student.sex,
        "cin": student.cin,
        "birthday": student.birthday,
        "birthday_city": student.birthday_city,
        "mobile": student.mobile,
        "email": student.email,
        "oriented": student.oriented,
        "postal_code": student.postal_code,
        "label_address": student.label_address,
        "address_city": student.address_city,
        "bac": student.bac,
        "study_access_year": student.study_access_year,
        "id_origin_university": student.oriented ? student.id_origin_university : null,
        "studies": student.studies,
        "doctaurat": student.doctaurat,
        "fonction": student.fonctions
      },
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllTypes() {
    const url = Config.baseUrl + "/types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllMentions() {
    const url = Config.baseUrl + "/mentions";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editBacInformation(bac: Bac) {
    const url = Config.baseUrl + "/student/edit-bac";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, bac,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllResults() {
    const url = Config.baseUrl + "/results";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllUniversities() {
    const url = Config.baseUrl + "/universities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllLevels() {
    const url = Config.baseUrl + "/levels";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editStudiesInformation(studies) {
    const url = Config.baseUrl + "/student/me/studies/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, studies,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  editFonctionInformation(fonctions: Fonction[]) {
    const url = Config.baseUrl + "/student/edit-fonctions";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, fonctions, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editDoctaurat(doctaurat: Doctaurat) {
    const url = Config.baseUrl + "/student/me/doctaurat/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, doctaurat,

      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllSpecialities() {
    const url = Config.baseUrl + "/specialities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllHopitaux() {
    const url = Config.baseUrl + "/hopitaux";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllServices() {
    const url = Config.baseUrl + "/services";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editResidanatInformation(residanat: Residanat) {
    const url = Config.baseUrl + "/student/edit-residanat";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.put(url, residanat, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  submitAdmin() {
    const url = Config.baseUrl + "/student/me/submitForReview";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("student-token"));
    return this.http.post(url, {},
      {
        headers: this.headers
      }
    )
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllCredits() {
    const url = Config.baseUrl + "/credits";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
