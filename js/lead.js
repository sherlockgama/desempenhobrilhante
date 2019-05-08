var ip = 0;

$.ajax({
    type: 'GET',
    url: 'https://api.ipify.org?format=json',
}).done(function(data) { 
    firebase.database().ref('chatbot').on('value', function (snapshot) {
        var newIp = true;
        snapshot.forEach(function (item) {
            if (item.val().ip === data.ip) {
                newIp = false;
            }
        })
        if (newIp) {
            var ip = {
                ip: data.ip,
                data_hora: new Date().toJSON()
            }
            firebase.database().ref().child('chatbot').push(ip);
        }
    });

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

setTimeout(function () {
    console.log(screen);
    if (screen.width > 768) {
        document.getElementById('widget-sympla').style.display = 'block';
    }
}, 8000);
