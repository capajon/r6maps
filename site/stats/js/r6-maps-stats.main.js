$(document).ready(function() {
    var d1 = $.Deferred();
    var d2 = $.Deferred();
    var d3 = $.Deferred();

    $.when(d1).done(function (v1) {
        console.log( "just d1 is done", v1 );
    });

    $.when(d1, d2).done(function (v1, v2) {
        console.log( "d1 and d2 are done", v1, v2  );
    });

    d1.resolve("HI");
    setTimeout(function() {
        d2.resolve("NUMBER2");
    },3000);
});
