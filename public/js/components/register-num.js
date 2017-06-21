'use strict';

const RegisterNum = (update) => {
  const parent = $('<div class="container register"></div>');
  const row = $('<div class="row"></div>');
  const col = $('<div class="col s12"></div>');
  const img = $('<img src="img/icons/phone.png" alt="phone" class="big-icon margin-auto">');
  const title = $('<h6 class="center-align font-500">Para comenzar validemos tu número</h6>');
  const p = $('<p class="center-align">Recibirás un SMS con un código de validación</p>');
  const form = $('<form onsubmit="return false"></form>');
  const inputNum = $('<input type="number">');
  const checkbox = $('<input type="checkbox" class="filled-in" id="agree">');
  const label = $('<label for="agree"> Acepto los <a href="#">Términos y condiciones</a></label>');
  const btnContinuar = $('<button type="submit" class="btn margin-auto yellow">CONTINUAR</button>');
  btnContinuar.prop('disabled', true);

  const validateNum = () => {
    if( (/^\d{9}$/.test(inputNum.val())) && (($('#agree').prop('checked')) == true) ) {
      btnContinuar.prop('disabled', false);
    } else {
      btnContinuar.prop('disabled', true);
    }
  }

  inputNum.on('keyup', (e) => {
    validateNum();
  });

  checkbox.on('click', (e) => {
    validateNum();
  });

  btnContinuar.on('click', (e) => {
    const phone = inputNum.val();
    $.post( 'api/registerNumber', { phone: phone, terms: true },
      function(response){
        if (response.data == null) {
          alert('Este usuario ya existe');
        } else {
          userData.phone = response.data.phone;
          userData.code = response.data.code;
          state.selectedScreen = 'enterCode';
          update();
        }
      }, 'json' )
  })

  parent.append(row);
  row.append(col);
  col.append(img);
  col.append(title);
  col.append(p);
  col.append(form);
  form.append(inputNum);
  form.append(checkbox);
  form.append(label);
  form.append(btnContinuar);

  return parent;
}
