import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {Config} from "../../../shared/config";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
declare let jQuery;
declare let swal;
@Component({
  selector: 'app-student-photos',
  templateUrl: 'photo.component.html'
})
export class PhotoComponent implements OnInit {
  busy: Subscription;

  @Input()
  student: Student;
  @Input()
  isAdmin: boolean;

  constructor(private storageService: StorageService, private userServices: UserService,
              private router: Router) {

  }

  ngOnInit(): void {


    /*
     if (!this.isAdmin) {
     jQuery('#formPhotos').find('input, textarea, button, select').attr('disabled', 'disabled');
     }
     */
    if (!this.student.img) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/photo/upload",
        this.userServices.getTokent(), ".file-input-student-photo", this.isAdmin, this.isAdmin, 1);
    } else {
      this.initStudentPhoto();
    }
    if ((this.student.cin && !this.student.cin.imgs) && (this.student.passport && !this.student.passport.imgs)) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/cin/upload",
        this.userServices.getTokent(), ".file-input-student-cin", this.isAdmin, this.isAdmin, 2);
      if (this.student.cin) {
        this.student.cin.imgs = [];
      } else if (this.student.passport) {
        this.student.passport.imgs = [];
      }
    } else {
      this.initStudentCin();
    }
    if (!this.student.extrait_naissance) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/extrait-naissance/upload",
        this.userServices.getTokent(), ".file-input-student-extrait-naissance", this.isAdmin, this.isAdmin, 1);
    } else {
      this.initStudentExtraitNaissance();
    }

    if (!this.student.attestation_orientation) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/attestation-orientation/upload",
        this.userServices.getTokent(), ".file-input-student-attestation-orientation", this.isAdmin, this.isAdmin, 1);
    } else {
      this.initStudentAttestationOrientation();
    }

    const baseContext = this;
    jQuery('.file-input-student-photo').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.img = baseContext.student.img = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.img = baseContext.student.img = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });

    jQuery('.file-input-student-extrait-naissance').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.extrait_naissance = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre extrait de naissance',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.extrait_naissance = baseContext.student.extrait_naissance = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre extrait de naissance',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
    jQuery('.file-input-student-attestation-orientation').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.attestation_orientation = baseContext.student.attestation_orientation = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre attestation d\'orientation',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.attestation_orientation = baseContext.student.attestation_orientation = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre attestation d\'orientation',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });

    jQuery('.file-input-student-cin').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      const imgs = [];
      if (baseContext.student.cin) {
        baseContext.student.cin.imgs.push(data.response.media);
      } else if (baseContext.student.passport) {
        baseContext.student.passport.imgs.push(data.response.media);
      }
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      const medias = [];
      let imgs = [];
      if (baseContext.student.cin) {
        imgs = baseContext.student.cin.imgs;
      } else if (baseContext.student.passport) {
        imgs = baseContext.student.passport.imgs;
      }
      imgs.forEach(function (img_cin) {
        medias.push(img_cin.path);
      });
      const index = medias.indexOf(jqXHR.responseJSON.media, 0);
      if (index > -1) {
        imgs.splice(index, 1);
      }
      if (baseContext.student.cin) {
        baseContext.student.cin.imgs = imgs;
      } else if (baseContext.student.passport) {
        baseContext.student.passport.imgs = imgs;
      }
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  private initStudentPhoto() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.img;
    medias.push(this.student.img.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Photo,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-photo", this.isAdmin, this.isAdmin, 1, inputMedias, initialPreviewConfig);
  }

  private initStudentExtraitNaissance() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.extrait_naissance;
    medias.push(this.student.extrait_naissance.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Extrait_Naissance,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-extrait-naissance", this.isAdmin, this.isAdmin, 1, inputMedias, initialPreviewConfig);
  }

  private initStudentAttestationOrientation() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.attestation_orientation;
    medias.push(this.student.attestation_orientation.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Attestation_Orientation,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-attestation-orientation", this.isAdmin, this.isAdmin, 1, inputMedias, initialPreviewConfig);
  }

  private initStudentCin() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    let imgs = [];
    if (this.student.cin) {
      imgs = this.student.cin.imgs;
    } else if (this.student.passport) {
      imgs = this.student.passport.imgs;
    }
    imgs.forEach(function (img) {
      medias.push(img.path);
      inputMedias.push(Config.baseUrl + '/' + img.path);
      initialPreviewConfig.push({
        type: Utils.loadTypeFromExtension(img.path.substr(img.path.indexOf('.') + 1)),
        filetype: Utils.loadFileTypeFromExtension(img.path.substr(img.path.indexOf('.') + 1)),
        key: img.id_Student_Cin,
        url: Config.baseUrl + '/' + img.path + '/delete',
        size: img.size
      });
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/student/" + this.student.id_student + "/cin/upload",
      this.userServices.getTokent(), ".file-input-student-cin", this.isAdmin, this.isAdmin, 2, inputMedias, initialPreviewConfig);
  }

}
