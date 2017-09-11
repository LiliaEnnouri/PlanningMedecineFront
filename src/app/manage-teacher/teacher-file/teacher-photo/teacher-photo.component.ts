import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {Config} from "../../../shared/config";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
import {Teacher} from "../../../shared/models/Teacher";
declare let jQuery;
declare let swal;
@Component({
  selector: 'app-teacher-photos',
  templateUrl: 'teacher-photo.component.html'
})
export class TeacherPhotoComponent implements OnInit {
  busy: Subscription;

  @Input()
  teacher: Teacher;
  @Input()
  isAdmin: boolean;

  constructor(private storageService: StorageService, private userServices: UserService,
              private router: Router) {

  }

  ngOnInit(): void {

    if (!this.isAdmin) {
      jQuery('#formPhotos').find('input, textarea, button, select').attr('disabled', 'disabled');
      jQuery('.kv-file-zoom').removeAttr('disabled');
    }

    if (!this.teacher.img) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/photo/upload",
        this.userServices.getTokent(), ".file-input-teacher-photo", this.isAdmin, this.isAdmin, 1);
    } else {
      this.initTeacherPhoto();
    }
    if ((this.teacher.cin && !this.teacher.cin.imgs) && (this.teacher.passport && !this.teacher.passport.imgs)) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/cin/upload",
        this.userServices.getTokent(), ".file-input-teacher-cin", this.isAdmin, this.isAdmin, 2);
      if (this.teacher.cin) {
        this.teacher.cin.imgs = [];
      } else if (this.teacher.passport) {
        this.teacher.passport.imgs = [];
      }
    } else {
      this.initTeacherCin();
    }

    if (!this.teacher.extrait_naissance) {
      Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/extrait-naissance/upload",
        this.userServices.getTokent(), ".file-input-teacher-extrait-naissance", this.isAdmin, this.isAdmin, 1);
    } else {
      this.initTeacherExtraitNaissance();
    }
    const baseContext = this;
    jQuery('.file-input-teacher-photo').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.teacher.img = baseContext.teacher.img = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("teacher", baseContext.teacher);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.teacher.img = baseContext.teacher.img = null;
      baseContext.storageService.write("teacher", baseContext.teacher);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });


    jQuery('.file-input-teacher-cin').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      const imgs = [];
      if (baseContext.teacher.cin) {
        baseContext.teacher.cin.imgs.push(data.response.media);
      } else if (baseContext.teacher.passport) {
        baseContext.teacher.passport.imgs.push(data.response.media);
      }
      baseContext.storageService.write("teacher", baseContext.teacher);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    }).on('filedeleted', function (event, key, jqXHR, data) {
      const medias = [];
      let imgs = [];
      if (baseContext.teacher.cin) {
        imgs = baseContext.teacher.cin.imgs;
      } else if (baseContext.teacher.passport) {
        imgs = baseContext.teacher.passport.imgs;
      }
      imgs.forEach(function (img_cin) {
        medias.push(img_cin.path);
      });
      const index = medias.indexOf(jqXHR.responseJSON.media, 0);
      if (index > -1) {
        imgs.splice(index, 1);
      }
      if (baseContext.teacher.cin) {
        baseContext.teacher.cin.imgs = imgs;
      } else if (baseContext.teacher.passport) {
        baseContext.teacher.passport.imgs = imgs;
      }
      baseContext.storageService.write("teacher", baseContext.teacher);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  private initTeacherExtraitNaissance() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const teacherImg = this.teacher.extrait_naissance;
    medias.push(this.teacher.extrait_naissance.path);
    inputMedias.push(Config.baseUrl + '/' + teacherImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(teacherImg.path.substr(teacherImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(teacherImg.path.substr(teacherImg.path.indexOf('.') + 1)),
      key: teacherImg.id_Teacher_Extrait_Naissance,
      url: Config.baseUrl + '/' + teacherImg.path + '/delete',
      size: teacherImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/photo/upload",
      this.userServices.getTokent(), ".file-input-teacher-extrait-naissance", this.isAdmin, this.isAdmin, 1,
      inputMedias, initialPreviewConfig);
  }

  private initTeacherPhoto() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const teacherImg = this.teacher.img;
    medias.push(this.teacher.img.path);
    inputMedias.push(Config.baseUrl + '/' + teacherImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(teacherImg.path.substr(teacherImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(teacherImg.path.substr(teacherImg.path.indexOf('.') + 1)),
      key: teacherImg.id_Teacher_Photo,
      url: Config.baseUrl + '/' + teacherImg.path + '/delete',
      size: teacherImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/photo/upload",
      this.userServices.getTokent(), ".file-input-teacher-photo", this.isAdmin, this.isAdmin, 1, inputMedias, initialPreviewConfig);
  }

  private initTeacherCin() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    let imgs = [];
    if (this.teacher.cin) {
      imgs = this.teacher.cin.imgs;
    } else if (this.teacher.passport) {
      imgs = this.teacher.passport.imgs;
    }
    imgs.forEach(function (img) {
      medias.push(img.path);
      inputMedias.push(Config.baseUrl + '/' + img.path);
      initialPreviewConfig.push({
        type: Utils.loadTypeFromExtension(img.path.substr(img.path.indexOf('.') + 1)),
        filetype: Utils.loadFileTypeFromExtension(img.path.substr(img.path.indexOf('.') + 1)),
        key: img.id_Teacher_Cin,
        url: Config.baseUrl + '/' + img.path + '/delete',
        size: img.size
      });
    });
    Utils.initializeUploadFile(Config.baseUrl + "/admin/teacher/" + this.teacher.id_Teacher + "/cin/upload",
      this.userServices.getTokent(), ".file-input-teacher-cin", this.isAdmin, this.isAdmin, 2, inputMedias, initialPreviewConfig);
  }

}
