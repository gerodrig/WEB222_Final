/** Add any JavaScript you need to this file. */

window.onload = function() {

    var Checked = false;

    var problemToggler = document.querySelector('#oNum');
       if (Checked) {
         if (problemToggler.classList.contains('d-none')) {
           problemToggler.classList.remove('d-none');
         }
       } else {
         if (!problemToggler.classList.contains('d-none')) {
           problemToggler.classList.add('d-none');
         }
       }
      };

    function toggler1() {
        var oNum = document.querySelector('#question');
            var x = document.getElementById("oNum");
                if (oNum.value === "question") {
                    x.classList.add('d-none');
                } else {
                    x.classList.remove('d-none');
                }
    }

    function toggler2() {
        var oNum = document.querySelector('#comment');
            var x = document.getElementById("oNum");
            if (oNum.value === "comment") {
                x.classList.add('d-none');
            } else {
                x.classList.remove('d-none');
            }
    }

      function toggler() {
        var oNum = document.querySelector('#problem');
            var x = document.getElementById("oNum");
            if (oNum.value === "problem") {
                x.classList.remove('d-none');
            } else {
                x.classList.add('d-none');
            }
        }

        function validateForm() {
            var radios = document.getElementsByName("subject");
            var formValid = false;
        
            var i = 0;
            while (!formValid && i < radios.length) {
                if (radios[i].checked) formValid = true;
                i++;        
            }
        
            if (!formValid) alert("Must check an inquiry option!");
            return formValid;
          }

          (function() {
            'use strict';
            window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
            });
            }, false);
            })();
        

            function checkRequired() {
                if ($('input[type=radio]:checked').length) { 
                    $('input[type=radio]').prop('required', false);
                } else {
                    $('input[type=radio]').prop('required', true);
                }
            
            }

            

