import {SectionValidation} from "./models/section-validation";
/**
 * Created by Abbes on 30/06/2017.
 */
declare var jQuery: any;
/**
 * Created by Vyndee on 27/03/2017.
 */
export class Utils {


  public static zero(n: number) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  }

  static configDataTables() {
    /* jQuery.extend(jQuery.fn.dataTable.defaults, {
     autoWidth: false,
     columnDefs: [{
     orderable: false,
     width: '100px',
     targets: [5]
     }],
     dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
     language: {
     search: '<span>Filter:</span> _INPUT_',
     lengthMenu: '<span>Show:</span> _MENU_',
     paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
     },
     drawCallback: function () {
     jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
     },
     preDrawCallback: function () {
     jQuery(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
     }
     });*/
  }


  private static groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  static initializeDataTables(timout: number, columnNumber: number) {
    // Basic datatable
    const tableListStation = jQuery('.datatable-basic');
    setTimeout(function () {
      tableListStation.DataTable({
        columnDefs: [{
          targets: [columnNumber - 1]
        }]
      });
    }, timout);
  }

  static convertDate(date: string) {
    if (date) {
      return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }
    return null;
  }

  static convertTime(time: string) {
    if (time) {
      return time.substring(0, 5);
    }
    return null;
  }

  static convertRealDate(date: string, time?: string) {
    if (date) {
      console.log(date);

      console.log(date.substring(0, 2), date.substring(3, 5), date.substring(6, 10));
      if (!time) {
        return new Date(+date.substring(6, 10), (+date.substring(3, 5) - 1), +date.substring(0, 2));
      } else {
        return new Date(+date.substring(6, 10), (+date.substring(3, 5) - 1),
          +date.substring(0, 2), +time.substring(0, 2), +time.substring(3, 5));
      }
    }
    return null;
  }

  static getModalTemplate() {
    return '<div class="modal-dialog modal-lg" role="document">\n' +
      '  <div class="modal-content">\n' +
      '    <div class="modal-header">\n' +
      '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
      '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
      '    </div>\n' +
      '    <div class="modal-body">\n' +
      '      <div class="floating-buttons btn-group"></div>\n' +
      '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>\n';
  }

  static getPreviewZoomButtonClasses() {
    return {
      toggleheader: 'btn btn-default btn-icon btn-xs btn-header-toggle',
      fullscreen: 'btn btn-default btn-icon btn-xs',
      borderless: 'btn btn-default btn-icon btn-xs',
      close: 'btn btn-default btn-icon btn-xs'
    };
  }

  static getPreviewZoomButtonIcons() {
    return {
      prev: '<i class="icon-arrow-left32"></i>',
      next: '<i class="icon-arrow-right32"></i>',
      toggleheader: '<i class="icon-menu-open"></i>',
      fullscreen: '<i class="icon-screen-full"></i>',
      borderless: '<i class="icon-alignment-unalign"></i>',
      close: '<i class="icon-cross3"></i>'
    };
  }

  static initializeUploadFile(url: string, token: string, className: string, maxFileCount?: number, initialData?: any[],
                              initialPreviewConfig?: InitialPreviewConfig[]) {
    jQuery(className).fileinput({
      uploadUrl: url, // server upload action
      uploadAsync: true,
      maxFileCount: maxFileCount,
      initialPreview: initialData,
      initialPreviewConfig: initialPreviewConfig,
      fileActionSettings: {
        removeIcon: '<i class="icon-bin"></i>',
        removeClass: 'btn btn-link btn-xs btn-icon',
        uploadIcon: '<i class="icon-upload"></i>',
        uploadClass: 'btn btn-link btn-xs btn-icon',
        indicatorNew: '<i class="icon-file-plus text-slate"></i>',
        indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
        indicatorError: '<i class="icon-cross2 text-danger"></i>',
        indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>',
      },
      initialPreviewAsData: true,
      layoutTemplates: {
        icon: '<i class="icon-file-check"></i>',
        modal: Utils.getModalTemplate()
      },
      initialCaption: "Pas encore de fichier selectionné",
      previewZoomButtonClasses: Utils.getPreviewZoomButtonClasses(),
      previewZoomButtonIcons: Utils.getPreviewZoomButtonIcons(),
      ajaxSettings: {headers: {'Authorization': 'Bearer ' + token}},
    });


  }

  static convertDateServer(date: string) {
    return date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2);
  }

  static loadTypeFromExtension(ext: string) {
    if (ext.toLowerCase().match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i)) {
      return "video";
    }
    if (ext.toLowerCase().match(/(pdf)$/i)) {
      return "pdf";
    }
  }

  static loadFileTypeFromExtension(ext: string) {
    if (ext.toLowerCase().match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i)) {
      return "video/" + ext;
    }
    if (ext.toLowerCase().match(/(pdf)$/i)) {
      return "pdf";
    }
  }

  static getYears(minYear: number) {
    const years: number[] = [];

    for (let i = minYear; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    return years;
  }

  static getUniversityYears(minYear: number) {
    const uniYears: string[] = [];

    for (let i = minYear; i <= new Date().getFullYear(); i++) {
      let j = i + 1;
      uniYears.push(i + "-" + j);
    }

    return uniYears;
  }

  static verifyNewStudent(study_access_year: string) {
    if (!study_access_year) {
      return false;
    }
    const year = parseInt(study_access_year.substring(0, 4));
    return year === new Date().getFullYear();
  }

  static getStatusSection(validations: SectionValidation[], id_section: number) {

    if (!validations) {
      return null;
    }
    const result = jQuery.grep(validations, function (e) {
      return e.id_section === id_section;
    });


    if (!result || result.length === 0) {
      return null;
    } else {
      return result[0];
    }
  }

  static getNumberStatus(validations: SectionValidation[], status: number) {
    if (!validations) {
      return 0;
    }
    const result = jQuery.grep(validations, function (e) {
      return e.status === status;
    });


    if (!result) {
      return 0;
    } else {
      return result.length;
    }
  }

  static getCurrentUniversityYear() {

    return (new Date().getFullYear()) + "-" + (new Date().getFullYear() + 1)
  }
}


export class InitialPreviewConfig {
  caption?: string;
  size?: number;
  width?: string;
  type?: string;
  filetype?: string;
  url: string;
  key: number;
}

