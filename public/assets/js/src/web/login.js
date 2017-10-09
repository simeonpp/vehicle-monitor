var loginBtn = document.getElementById('loginBtn');
var loginUsername = document.getElementById('loginUsername');
var loginPassword = document.getElementById('loginPassword');
var loginErrorWrap = document.getElementById('loginErrorWrap');

loginBtn.addEventListener('click', function() {
    var username = loginUsername.value;
    var password = loginPassword.value;

    var postData = {
        data: {
            username,
            password
        }
    };
    jsonRequester.post(data.buildUri('/api/login.php'), postData)
        .then(function(loginResult) {
            var expireDate = new Date(loginResult.expireDate);
            document.cookie = `x-cookie=${loginResult.cookie}; expires=${expireDate}; path=/;`;
            window.location = '#/home';
        })
        .catch(function(error) {
            loginPassword.value = '';
            loginErrorWrap.text = error.message;
            loginErrorWrap.style.display = 'block';
        });
});
