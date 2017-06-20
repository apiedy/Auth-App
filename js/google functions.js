function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    var g_user = {
        "id" : profile.getId(),
        "name" : profile.getName(),
        "first_name" : profile.getGivenName(),
        "last_name" : profile.getFamilyName(),
        "picture_url" : profile.getImageUrl(),
        "email" : profile.getEmail()
    }
    $.post("http://localhost:3030/google",g_user);

    $("#img_display").attr("src",profile.getImageUrl());
    $("#name_display").html(profile.getName());
    $("#email_display").html(profile.getEmail());

    $(".card-wrapper").css("display","none");
    $(".info-wrap").css("display","inline-block");
    $("#g_signout").css("display","block");
}

function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    var revokeAllScopes = function() {
        auth2.disconnect();
    }

    $(".info-wrap").css("display","none");
    $("#g_signout").css("display","none");
    $(".card-wrapper").css("display","block");

}