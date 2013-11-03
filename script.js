$(document).ready(function() {

    dust.onLoad = function(templateName, callback) {
        // this will load a template with [name].html in the folder templates
        // callback is an internal dust.js function
        $.get(["templates/", ".html"].join(templateName), function(data) {
            callback(undefined, data);
        }, "html"); 
    };

    $("#asyncRender").click(function() {
        var context = Object();
        context.name = "John";

        dust.stream("intro", context)
            .on("data", function(data) {
                $(".title").text(data);
            })
            .on("end", function() {
                console.log("I'm finished!");
            })
            .on("error", function(err) {
                console.log("Something terrible happened:" + err);
            });
    });

    $("#syncRender").click(function() {
        var context = Object();
        context.name = "Stefan";

        dust.render("intro", context, function(err, out) {
            $(".title").text(out);
        });

    });

});

