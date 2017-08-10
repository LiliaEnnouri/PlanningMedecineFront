/* ------------------------------------------------------------------------------
 *
 *  # Date and time pickers
 *
 *  Specific JS code additions for picker_date.html page
 *
 *  Version: 1.1
 *  Latest update: Aug 10, 2016
 *
 * ---------------------------------------------------------------------------- */

$(function () {

  console.log("picker date");

  // Date range picker
  // ------------------------------


  // Anytime picker
  // ------------------------------

  // Basic usage
  $("#anytime-date").AnyTime_picker({
    format: "%W, %M %D in the Year %z %E",
    firstDOW: 1
  });


  // Time picker
  $("#anytime-time").AnyTime_picker({
    format: "%H:%i"
  });


  // Display hours only
  $("#anytime-time-hours").AnyTime_picker({
    format: "%l %p"
  });


  // Date and time
  $("#anytime-both").AnyTime_picker({
    format: "%M %D %H:%i",
  });


  // Custom display format
  $("#anytime-weekday").AnyTime_picker({
    format: "%W, %D of %M, %Z"
  });


  // Numeric date
  $("#anytime-month-numeric").AnyTime_picker({
    format: "%d/%m/%Z"
  });


  // Month and day
  $("#anytime-month-day").AnyTime_picker({
    format: "%D of %M"
  });


  // On demand picker
  $('#ButtonCreationDemoButton').click(function (e) {
    $('#ButtonCreationDemoInput').AnyTime_noPicker().AnyTime_picker().focus();
    e.preventDefault();
  });


});
