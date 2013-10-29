$(document).ready(function() {
    var compiled = dust.compile("Hello {name}!", "intro");
    dust.loadSource(compiled);

    $("#asyncRender").click(function() {
        var context = Object();
        context.name = "John";

        dust.stream("intro", context)
            .on("data", function(data) {
                $(".title").text(data);
            })
            .on("end", function() {
                //console.log("I'm finished!");
            })
            .on("error", function(err) {
                //console.log("Something terrible happened:" + err);
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

