(function($) {
  $("form").on("submit", function() {
    var errors = false;
    var emailReg = /^([a-zA-Z0-9\\.]+)@([a-zA-Z0-9\\-\\_\\.]+)\.([a-zA-Z0-9]+)$/i;

    //validate email
    $(".errors").remove();

    //refresh error messages on submit
    if ($("#name").val() === "") {
      $("#name").after("<span class='errors'> Missing Name </span> ");
      errors = true;
    }

    //validate name field has entry
    if ($("#email").val() === "") {
      $("#email").after("<span class='errors'> Missing Email </span>");
      errors = true;
    } else if (!emailReg.test($("#email").val())) {
      $("#email").after("<span class='errors'> Not a valid email </span> ");
      errors = true;
    }

    return !errors;
  });
})(jQuery);
