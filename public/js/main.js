(function($, R, undefined){

    var createPath = function() {
        return _(arguments).chain()
            .map(function(move) {
                return [ move[0], move.slice(1).join(',') ];
            }).flatten().value().join('');
    };

    var drawPoint = function(paper, point, radious, attr) {
        return paper.circle(point.x, point.y, radious || 10).attr(attr || {
           fill: 'red'
        });
    };

    var initCanvas = function() {
        var paperW = 500;
        var paperH = 375;
        var paper = R('canvas', paperW, paperH);

        var bg = paper.image("img/rms.jpg", 0, 0, paperW, paperH);

        var curve = {
            beg: { x:paperW / 2, y: paperH / 3 },
            c1: { x: paperW / 3 + 30, y: paperH / 3.5},
            c2: { x: paperW * 2/3 - 30, y: paperH / 3.5},
            end: { x: paperW / 2, y: paperH / 3 }
        };

        drawPoint(paper, curve.beg);
        drawPoint(paper, curve.c1);
        drawPoint(paper, curve.c2);
        drawPoint(paper, curve.end);

        var head = {
           href: "img/rms-head.gif",
           w: 132,
           h: 185,
           center: {
                x: paperW /2,
                y: paperH / 3.5
           }
        };

        drawPoint(paper, head.center);

        head.path = paper.path(createPath(
            ['M', curve.beg.x, curve.beg.y],
            ['C', curve.c1.x, curve.c1.y,
                  curve.c2.x, curve.c2.y,
                  curve.end.x, curve.end.y ]
        )).attr({ stroke: 'blue', "stroke-width": 5 });

        head.img = paper.image(head.href,
            curve.beg.x - head.w / 2,
            curve.beg.y - head.h / 2,
            head.w, head.h
        );

        var animTime = 500;

        var forward = function() {
            head.img.animateAlong(head.path, animTime).
            animate({ rotation: '45' }, animTime, backward);
        };

        var backward = function() {
            head.img.animateAlongBack(head.path, animTime).
            animate({ rotation: '-45' }, animTime, forward);
        };

        forward();

    };


    var initialize = function() {
        initCanvas();
    };

    $(document).ready(initialize);


})(jQuery, Raphael);
