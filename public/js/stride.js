$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    html: true,
    trigger: 'hover',
    placement: 'auto',
  });
});

// $('#views').ready(function (e) {
//   const textLength = $('#views').text();
//   if (textLength >= 100) {
//     $('#views').css('font-size', '2.5rem');
//   } else if (textLength >= 1000) {
//     $('#views').css('font-size', '2rem');
//   }
// });
