(function($) {
    $.fn.sliderPlug = function(options) {
        var options = $.extend({
            speed: 355,
            pictures: ["west-1.jpg", "west-2.jpg", "west-3.jpg", "west-4.jpg", "west-5.jpg", "west-6.jpg"],
            filter: "blur(5px)" //any CSS3 filter may be applied:"grayscale(100%)", "invert(100%)", "blur(5px)", "saturate(8)", "sepia(100%)", "none", etc.
        }, options);
        var heightWH = (window.innerHeight) * 0.95
        var widthWW = heightWH * 1.6

        console.log(heightWH + "  width:  " + widthWW)
        var speed = options.speed
        var imageList = options.pictures
        var filter = options.filter
        var make = function() {



            $(document).ready(function() {
                for (i = 0; i < imageList.length; i++) {
                    $(".slides").append("<li id='picture" + i + "'></li>")
                }

                $("style").append(`.dots {
            position: absolute;
            bottom: 50px;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            text-align: center;
            padding: 10px;
            background-color: white;
            z-index: 2;
        }
        
        .active {
            background-color: black;
        }
        #blurContainer {
            height:` +
                    heightWH + `px;
            width: ` +
                    widthWW + `px;
            border: 2px solid black;
            position: relative;
            margin:  auto;
            overflow: hidden;
        }
        #sliderContainer {
            left:15%;
            top:15%;
            height: 75%;
            width: 75%;
            border: none;
            position: absolute;
            margin:  auto;
            overflow: hidden;
        }
        
        .slides {
            position: relative;
            height: 100%;
            background-color: rgb(220, 220, 150);
            margin: 0 auto;
            list-style-type: none;
            padding: 0;
        }
        
        .slides>li {
            height: 100%;
            float: left;
            font-size: 30px;
            background-color:blue;
        }
        
        
        .btn {
            position: absolute;
            width: 700px;
            bottom: 0;
            margin: 0 auto;
            text-align: center;
        }
        
        .buttons {
            width: 80px;
        }`);

                for (i = 0; i < imageList.length; i++) {
                    $("#picture" + i).css({
                        "background": "url('img/" + imageList[i] + "')",
                        "background-size": "contain"
                    })
                }
                $("#blurContainer").append("<div id='blur' style='position:absolute'></div>")
                $("#blur").css({
                    "z-index": "-1",
                    "height": "100%",
                    "width": "100%",
                    "background-image": "url('img/" + imageList[0] + "')",
                    "background-size": "contain",
                    "-webkit-filter": filter,
                    "-moz-filter": filter,
                    "-o-filter": filter,
                    "-ms-filter": filter,
                    "filter": filter
                })
                var w = $("#sliderContainer").width();
                $(".slides>li").width(w);
                $(".slides").css("width", w * $(".slides>li").length + "px");
                $(".slides>li:last-child").prependTo('.slides');
                $('.slides').css('left', -w)
                var counter = 0;

                function next() {
                    $('.slides').animate({
                        'margin-left': -w
                    }, speed, function() {
                        $('.slides>li:first-child').appendTo('.slides');
                        $('.slides').css('margin-left', 0);
                        var check = counter;
                        if (check == ($(".slides>li").length) - 1) { check = -1; }
                        $("#blur").css("background-image", "url('img/" + imageList[check + 1] + "')");
                        $('.dots').removeClass('active');
                        if (counter == ($(".slides>li").length) - 1) {
                            counter = 0;
                        } else {
                            counter += 1
                        };
                        $("#" + counter).addClass('active');
                    });

                }
                $('#nextBtn').click(next);

                function prev() {
                    $('.slides').animate({
                        'margin-left': w
                    }, speed, function() {
                        $(".slides>li:last-child").prependTo('.slides')
                        $('.slides').css('margin-left', 0);
                        console.log("counter before: " + counter);
                        var check = counter;
                        if (check == 0) { check = ($(".slides>li").length) }
                        $("#blur").css("background-image", "url('img/" + imageList[check - 1] + "')");
                        $('.dots').removeClass('active');
                        if (counter == 0) {
                            counter = ($(".slides>li").length - 1)
                        } else {
                            counter -= 1
                        };
                        $("#" + counter).addClass('active');
                    })
                }
                $("#previousBtn").click(prev);
                // setInterval(next, 400);
                for (var i = 0; i < $(".slides>li").length; i++) {
                    $("#sliderContainer").append('<div class="dots" id="' + i + '" style="left:' + (i + 6) * 40 + 'px"></div>');
                }

                $("#0").addClass('active')

                function dotClick() {
                    id = $(this).attr('id');
                    if (id > counter) {
                        for (i = 0; i < (id - counter); i++) {
                            next();
                        }
                    } else if (id < counter) {
                        for (i = 0; i < (counter - id); i++) {
                            prev();
                        }

                    }
                }
                $(".dots").click(dotClick);
            })
        }
        return this.each(make);
    }
}(jQuery))