class Calculator {
  constructor(parent) {
    this.field = $('#div-calc__input-result');
    this._numberOfDigits = 12;
    this._arg1 = 0;
    this._arg2 = 0;
    this._result = 0;
    this._operation = '';
    this._signs = [
      ['7', '8', '9', '&#247;'],
      ['4', '5', '6', '&#215;'],
      ['1', '2', '3', '&#8722;'],
      ['0', '&#177;', ',', '+'],
      ['CLEAR', '='],
    ];
    this._operations = {
      '/': () => this._arg1 / this._arg2,
      '*': () => this._arg1 * this._arg2,
      '-': () => this._arg1 - this._arg2,
      '+': () => this._arg1 + this._arg2,
    };

    this.initialize(parent);
  }

  SetArg(value) {
    if (this._arg1 === 0) {
      this._arg1 = parseFloat(value);
    } else {
      this._arg2 = parseFloat(value);
    }
    console.log(this_arg1);
    console.log(this_arg2);
  }

  GetResult() {
    return this._result;
  }

  execute(sign) {
    switch (sign) {
      case '/':
        this._result = this.arg1 / this.arg2;
        break;
      case '*':
        this._result = this.arg1 * this.arg2;
        break;
      case '-':
        this._result = this.arg1 - this.arg2;
        break;
      case '+':
        this._result = this.arg1 + this.arg2;
        break;
      case '±':
        this._result = -this.rez;
        break;
      default:
        this._result = 0;
        break;
    }
  }

  initialize(parent) {
    const table =
      '\
        <table class="div-calc__table-keys">\
        <thead><tr><th colspan="4">\
        <input id="div-calc__input-result" type="text" value="0">\
        </th></tr> </thead>\
        <tbody></tbody> \
        </table>';
    $(parent).append(table);

    for (let i = 0; i < this._signs.length; i++) {
      AddTableRow(i, this._signs[i]);
    }
    $('.div-calc__table-keys').find('tr:last td').attr('colspan', '3');
    $('#div-calc__input-result').attr('maxlength', this._numberOfDigits);

    function AddTableRow(n_row, calc_row) {
      let row = '<tr id="calc-row' + n_row + '">';
      for (let i = 0; i < calc_row.length; i++) {
        let classExt =
          !isNaN(+calc_row[i]) || calc_row[i] == ','
            ? 'number-button'
            : 'func-button';
        row +=
          '<td class="calc-button ' + classExt + '">' + calc_row[i] + '</td>';
      }
      row += '</tr>';
      $('.div-calc__table-keys').append(row);
    }
  }

  OnKeyPress(e) {
    console.log(e.key);
    // console.log(+this._operations[e.key]);
    if (isNaN(e.key)) {
      console.log(this.field.val());
      this.SetArg(this.field.val());
      console.log(this._arg1);
      console.log(this._arg2);
      return;
    }

    let btnValue;
    switch (e.which) {
      case 13:
        btnValue = '=';
        break;
      case 46:
        btnValue = this._signs[4][0];
        break;
      case 106:
        btnValue = '×';
        break;
      case 109:
        btnValue = '−';
        break;
      case 111:
        btnValue = '÷';
        break;
      case 188:
      case 110:
      case 190:
      case 191:
        btnValue = ',';
        break;
      default:
        btnValue = e.key;
        break;
    }

    btn = $('.calc-button').filter(function () {
      return $(this).text() === btnValue;
    });
    this.ShowActiveButton(btn);
    console.log(e.key);
  }

  DisplayResult(arg) {
    this._resInput.val(arg);
    console.log(arg);
  }

  ShowActiveButton(elt) {
    elt.addClass('active');
    setTimeout(
      function () {
        elt.removeClass('active');
      }.bind(this),
      200
    );
  }
}
