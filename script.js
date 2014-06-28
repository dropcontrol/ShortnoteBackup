console.log(new Date());

$(function(){
    console.log("doc_end");

    $("li.list-group-item").click(function(e){
        console.log('clicked' + new Date());

        var index = $(location).attr('href').indexOf("app/notes");
        console.log(index);

        if (index != -1) {
            console.log('find app/notes');

            $('div.content-menu__right-buttons .btn-default').click(function(){
                console.log('click right btn-default');
                console.log($(location).attr('href'));

                var content = $("#content").children('div').html();
                var title = $("#title").val();

                api = new MT.DataAPI({
                    baseUrl: "http://localhost/~yamato/MT-6.0.3/mt-data-api.cgi",
                    clientId: "ShortnoteBackup",
                });

                doSignIn('yamato', 'hogehoge');
                postEntry(content, title, 'Draft', '4');
            });

            $('div.content-menu__right-buttons .btn-premium').click(function(){
                console.log('click btn-premium');
                console.log($(location).attr('href'));

                var content = $("#content").children('div').html();
                var title = $("#title").val();

                api = new MT.DataAPI({
                    baseUrl: "http://localhost/~yamato/MT-6.0.3/mt-data-api.cgi",
                    clientId: "ShortnoteBackup",
                });

                doSignIn('yamato', 'hogehoge');
                postEntry(content, title, 'Publish', '4');
            });
        }
        $("li.list-group-item").unbind();
    });
});

var doSignIn = function(user, password) {
    var def = new $.Deferred();

    api.authenticate({ username: user, password: password},
        function(response) {
            if (response.error) {
                var code = response.error.code;
                var msg;
                if (code === 404) {
                } else if (code === 401) {
                } else {
                }
                return def.reject(msg);
            } else {
                api.storeTokenData(response);
                return def.resolve();
            }
        }
    );

    return def.promise();
};

var postEntry = function(title, content, publishStatus, siteId) {
    var entry = {};
    entry['title'] = title;
    entry['body'] = content;
    entry['status'] = publishStatus;
    api.getToken(function(response) {
        if (response.error) {
            //
        }
        api.createEntry(siteId, entry, function(response) {
            if (response.error) {
                var code = response.error.code;
                var msg;
                if (code === 404) {
                } else if (code === 401) {
                } else if (code === 403) {
                } else {
                }
            }
        });
    });
}
