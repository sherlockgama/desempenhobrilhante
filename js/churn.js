var ip = 0;

$.ajax({
    type: 'GET',
    url: 'https://api.ipify.org?format=json',
}).done(function(data) {
    ip = data.ip; 
});

var inputEmail = $('#inputEmail');
var inputName = $('#inputName');
var inputCompany = $('#inputCompany');
var inputOffice = $('#inputOffice');

$('#buttonRegister').click(function () {
    checkSubmit(inputEmail, inputName, inputCompany, inputOffice);
})

function checkSubmit(inputEmail, inputName, inputCompany, inputOffice) {
    if (!inputEmail.val()) {
        alert("Informe o email");
        inputEmail.focus();
        return false;
    } else if (!validateEmail(inputEmail.val())) {
        inputEmail.val('');
        inputEmail.focus();
        return false;
    } else if (!inputName.val()) {
        alert("Informe o seu Nome Completo");
        inputName.focus();
        return false;
    } else if (!inputCompany.val()) {
        alert("Informe a sua empresa");
        inputCompany.focus();
        return false;
    } else if (!inputOffice.val()) {
        alert("Informe o seu cargo");
        inputOffice.focus();
        return false;
    }

    create(inputEmail.val(), inputName.val(), inputCompany.val(), inputOffice.val(), ip);
}

function validateEmail(email) {
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@")+ 1, email.length);
     
    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    }
    else {
        alert("Insira um e-mail válido.");
        return false;
    }
}

function create(email, name, company, office, ip) {
    var lead = {
        email: email,
        nome: name,
        ip: ip,
        tipo: 'B2B',
        data_hora: new Date().toJSON(),
        company: company,
        office: office
    }

    firebase.database().ref().child('leads_churn').push(lead);
    window.location.href = "http://www.desempenhobrilhante.com.br/ebook-churn-desempenhobrilhante.pdf";
}
