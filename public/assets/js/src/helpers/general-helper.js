var generalHelper = function() {
    
    function setHeaderAndFooter({setFullHeader = false, title = '', subTitle = ''}) {
        return Promise.all([
            headerController.set({setFullHeader, title, subTitle}),
            footerController.set()
        ]);
    }

    function handleError(error) {
        if (error.type === 'authentication.invalidCredentials') {
            authenticationHelper.handleInvalidSession();
        }
    }

    return {
        setHeaderAndFooter,
        handleError
    }

}();