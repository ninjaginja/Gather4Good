// Front-End Javascript
$(document).ready(function(){

// PAGINATION Code!!!!!

  // HTML Show/Hide Logic
  if (window.location.href.indexOf("cause_id") > -1) {
    $('.pagination').hide();
  } else {
    $('.pagination').append('<li class="disabled"><a href=""><i class="material-icons">chevron_left</i></a></li><li class="waves-effect page1"><a href="/">1</a></li><li class="waves-effect page2"><a href="/page=2">2</a></li><li class="waves-effect page3"><a href="/page=3">3</a></li><li class="disabled"><a href=""><i class="material-icons">chevron_right</i></a></li>')
  }

  // HTML Active Class Logic
  if (window.location.href.indexOf("page=2") > -1) {
    $('.page2').addClass('active')
  } else if (window.location.href.indexOf("page=3") > -1) {
    $('.page3').addClass('active');
  } else {
    $('.page1').addClass('active');
  }
  
// End PAGINATION Code!!!!!!


  // Character Counter
  $('input#input_text, textarea#event_desription').characterCounter();

  // Time Picker
  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
  });

  // Date Picker
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1, // Creates a dropdown of 1 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  
  // Image Gallery
  $('.slider').slider({
    indicators: false,
    interval: 4000,
    transition: 2000,
  });

  // Drop Down Select
  $('select').material_select();

  // SideNav
  $(".button-collapse").sideNav();

	// Parallax
	$('.parallax').parallax();

	// Accordian
	$('.collapsible').collapsible();

  // Modal
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  });
});