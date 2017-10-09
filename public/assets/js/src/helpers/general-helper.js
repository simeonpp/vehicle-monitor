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

    function formatShortDate(date) {
        var jsDate = new Date(date);
        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[jsDate.getMonth()] + ' ' + jsDate.getDate() + ', ' + jsDate.getFullYear();
    }

    return {
        setHeaderAndFooter,
        handleError,
        formatShortDate
    }

}();