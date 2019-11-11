(function() {
  "use strict";
  var //GLOBAL VARIABLES
    input,
    container,
    //CSS CLASSES
    classSuccess = "success",
    classError = "error",
    //FORM VALIDATOR
    formValidator = {
      init: function() {
        this.cacheDom();
        this.bindEvents();
      },
      cacheDom: function() {
        //MAIN PARENT ELEMENT
        this.contactForm = document.getElementById("contactForm");
        //MAIN FORM ELEMENTS
        this.formHeader = document.querySelector("#formHeader h1");
        this.formBody = document.getElementById("formBody");
        this.inputContainer = document.getElementsByClassName("inputContainer");
        //USER INPUT ELEMENTS
        //INPUT FIELDS
        this.fields = {
          userName: document.getElementById("userName"),
          userEmail: document.getElementById("userEmail"),
          userMessage: document.getElementById("userMessage")
        };
        this.submitBtn = document.getElementById("submitBtn");
      },
      bindEvents: function() {
        var i;
        //RUN RULES ON SUBMIT BUTTON CLICK
        this.submitBtn.onclick = this.runRules.bind(this);
        //BIND EVENTS TO EACH INPUT FIELD
        for (i in this.fields) {
          if (this.fields.hasOwnProperty(i)) {
            //VARIABLES
            input = this.fields[i];
            container = input.parentElement;
            //RUN RULES WHEN INPUT HAS FOCUS
            input.onfocus = this.runRules.bind(this);
            //RESET ERRORS WHEN CONTAINER IS CLICKED
            container.onclick = this.resetErrors.bind(this, input);
          }
        }
      },
      runRules: function(evnt) {
        var target = evnt.target,
          type = evnt.type;
        //IF EVENT ON SUBMIT BUTTON
        if (target === this.submitBtn) {
          //PREVENT FORM SUBMITTION
          this.preventDefault(evnt);
          //IF INPUT HAS FOCUS
        } else if (type === "focus") {
          //RESET CLASSLIST
          this.resetClassList(target.parentElement);
          //RESET ERRORS
          this.resetErrors(target);
          return false;
        }
        //RESET CLASSLIST
        this.resetClassList();
        //CHECK FIELDS
        this.checkFields();
      },
      preventDefault: function(evnt) {
        //PREVENT DEFUALT
        evnt.preventDefault();
      },
      checkFields: function() {
        var i,
          validCount = 0,
          //EMAIL FILTER
          filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //CYLCE THROUGH INPUTS
        for (i in this.fields) {
          if (this.fields.hasOwnProperty(i)) {
            input = this.fields[i];
            //CHECK IF FIELD IS EMPTY
            if (input.value === "") {
              //ADD ERROR CLASS
              this.addClass(input, classError);
              //CHECK IF EMAIL IS VALID
            } else if (i === "userEmail" && !filter.test(input.value)) {
              //ADD ERROR CLASS
              this.addClass(input, classError);
            } else {
              //FIELD IS VALID
              this.addClass(input, classSuccess);
              validCount += 1;
            }
          }
        }
        //IF ALL FEILDS ARE VALID
        if (validCount === 3) {
          //SUBMIT FORM
          this.submitForm();
        }
      },
      addClass: function(input, clss) {
        container = input.parentElement;
        //IF INPUT HAS ERROR
        if (clss === classError) {
          //SHOW ERROR MESSAGE
          this.errorMessage(input);
        }
        //ADD CLASS
        input.parentElement.classList.add(clss);
      },
      errorMessage: function(input) {
        var message;
        //IF USERNAME HAS ERROR
        if (input === this.fields.userName) {
          message = "Please enter your name";
          //ELSE IF USEREMAIL HAS ERROR
        } else if (input === this.fields.userEmail) {
          message = "Please enter a valid email";
          //ELSE IF USERMESSAGE HAS ERROR
        } else if (input === this.fields.userMessage) {
          message = "Please enter your feedback";
        }
        this.renderError(input, message);
      },
      renderError: function(input, message) {
        var html;
        //GET INPUT CONTAINER
        container = input.parentElement;
        //RENDER HTML
        html = document.createElement("div");
        html.setAttribute("class", "message");
        html.innerHTML = message;
        //IF MESSAGE ELEMENT DOESN'T EXIST
        if (!container.getElementsByClassName("message")[0]) {
          //INSERT MESSAGE TO INPUT CONTAINER
          container.insertBefore(html, container.firstElementChild);
        }
      },
      resetClassList: function(input) {
        var i;
        //IF TARGETING SPECIFIC INPUT
        if (input) {
          //GET INPUT CONTAINER
          container = input.parentElement;
          //REMOVE CLASSES
          container.classList.remove(classError, classSuccess);
          //FOCUS ON INPUT FIELD
          input.focus();
        } else {
          for (i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
              //REMOVE CLASSES FROM ALL FIELDS
              this.fields[i].parentElement.classList.remove(
                classError,
                classSuccess
              );
            }
          }
        }
      },
      resetErrors: function(input) {
        //GET INPUT CONTAINER
        container = input.parentElement;
        //IF CONTAINER CONTAINS ERROR
        if (container.classList.contains(classError)) {
          //RESET CLASSES
          this.resetClassList(input);
        }
      },
      submitForm: function() {
        var waitForAnimation;
        //ADD SUCCESS CLASS
        this.contactForm.classList.add(classSuccess);
        //WAIT FOR ANIMATION TO FINISH
        this.changeHeader("Sent Succesfully");
        //WAIT FOR ANIMATION TO FINISH
        setTimeout(
          this.changeHeader.bind(this, "Thank you for your feedback"),
          1200
        );
      },
      changeHeader: function(text) {
        //CHANGE HEADER TEXT
        this.formHeader.innerHTML = text;
      }
    };
  //INITIATE FORM VALIDATOR
  formValidator.init();
})();
