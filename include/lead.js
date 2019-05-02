var ip = 0;

$.ajax({
    type: 'GET',
    url: 'https://api.ipify.org?format=json',
}).done(function(data) { 
    ip = data.ip;
    var ip = {
        ip: ip,
        data_hora: new Date().toJSON()
    }
    firebase.database().ref().child('chatbot').push(ip);
});

$('.toast').toast({
    animation: true,
    autohide: true,
    delay: 1000
});

var emailInput = $('#emailInput');
var nameInput = $('#nameInput');
var emailInput2 = $('#emailInput2');
var nameInput2 = $('#nameInput2');

$('#submit').click(function () {
    checkSubmit(nameInput, emailInput);
})

$('#submit2').click(function () {
    checkSubmit(nameInput2, emailInput2);
})

function checkSubmit(inputName, inputEmail) {
    if (!inputName.val()) {
        alert("Informe o nome");
        inputName.focus();
        return false;
    } else if (!inputEmail.val()) {
        alert("Informe o email");
        inputEmail.focus();
        return false;
    }
    create(inputEmail.val(), inputName.val(), ip);
    inputName.prop('disabled', true);
    inputEmail.prop('disabled', true);
}

function create(email, name, ip) {
    var lead = {
        email: email,
        nome: name,
        ip: ip,
        tipo: 'B2B',
        data_hora: new Date().toJSON()
    }

    firebase.database().ref().child('leads').push(lead);
    alert('Inscrição realizada');
}
