var authenticationHelper = function() {

    function validateSession() {
        if (getCookie()) {
            return true;
        } else {
            return false;
        }
    }

    function getCookie() {
        var value = "; " + document.cookie;
        var parts = value.split("; " + 'x-cookie' + "=");
        var validationCookieParts;
        if (parts.length == 2) {
            validationCookieParts = parts.pop().split(";").shift();
        }
        
        return validationCookieParts;
    }

    function getAuthenticationHeaders() {
        var authenticationHeaders = {};
        authenticationHeaders['x-cookie'] = getCookie();
        return authenticationHeaders;
    }

    function handleInvalidSession() {
        window.location = '#/login';
    }

    return {
        validateSession,
        getCookie,
        handleInvalidSession,
        getAuthenticationHeaders
    }

}();