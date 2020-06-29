var user = {
    data: {
        stages: []
    },
    cookie: {
        isSetLogin:false,
        getCookie: function (cname) {
            var name = cname+"=";
            var c;
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        checkLoginCookie: function () {
            var cookie_username=this.getCookie("username");
            var cookie_uid = this.getCookie("uid");
            if (cookie_uid.length>0) {
                
                w3.http(
                    "../../Profile/checkCookie",
                    function () {
                        if (this.readyState == 4) {
                            if (this.status == 200) {
                                console.log(this.responseText);
                                var cookie = JSON.parse(this.responseText);
                                if (cookie.isValidCookie) {
                                    if (!user.cookie.isSetLogin) {
                                        user.cookie.isSetLogin = true;
                                        Id("nav-btn-container").innerHTML = "<a href=\"../../Profile/\" class=\"w3-bar-item w3-text w3-button\">Unjani " + user.cookie.getCookie("username").toUpperCase() + "?</a><a href=\"../../GAME_ITEM/\" class=\"w3-bar-item w3-text w3-button\">Avatar shopping items</a><a onclick='user.cookie.clearLoginCookie()' href=\"../../Accounts/logout\" class=\"w3-bar-item w3-text w3-button\">Log out</a>";
                                        try {
                                            w3.addClass("#btn-start-playing","w3-hide");
                                        } catch (e) {
                                            //Nothing
                                        }
                                        try {
                                            var num = w3.getElements(".tablink").length;
                                            w3.addClass(".tablink", "w3-hide");
                                            w3.getElements(".tablink")[num - 1].click();
                                        } catch (e) {
                                            //Nobody
                                        }
                                    }
                                    user.checkSession();
                                } /*else {
                                    user.cookie.setCookie("uid", "");
                                    user.cookie.setCookie("username", "");
                                    modal.showMessage("Your session has timed out. Logout in progress...");
                                    setTimeout(function () { location.assign("../../Accounts/logout"); }, 3000);
                                }*/
                            }
                        }
                    },
                    "username=" + escape(cookie_username) + "&uid=" + escape(cookie_uid),
                    "POST");
            }
            
        },
        clearLoginCookie: function () {
            user.cookie.setCookie("username", "", -1);
            user.cookie.setCookie("uid", "", -1);
        }
    }
};