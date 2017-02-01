var thumb_pos=0;
function next_thumb(){
    //0,25,59px
    if(thumb_pos==0)
    {
        thumb_pos=25;
        return thumb_pos;
    }
    if(thumb_pos==25)
    {
        thumb_pos=59;
        return thumb_pos;
    }
    if(thumb_pos==59)
    {
        thumb_pos=0;
        return thumb_pos;
    }
}
function prev_thumb(){
    //0,25,59px
    if(thumb_pos==0)
    {
        thumb_pos=59;
        return thumb_pos;
    }
    if(thumb_pos==25)
    {
        thumb_pos=0;
        return thumb_pos;
    }
    if(thumb_pos==59)
    {
        thumb_pos=25;
        return thumb_pos;
    }
}
function click_pos(no){
     var thumb=$(".position-thumb");
    if(no==1){
        thumb_pos=0;
        thumb.animate({'left':thumb_pos});
    }
}
$(document).ready(function()
{
    all_slider();
});
//a simple function to click next link
//a timer will call this function, and the rotation will begin

function all_slider() {
    //rotation speed and timer
    console.log("I was executed!!");
    var speed = 4000;
    
    var run = setInterval(rotate, speed);
    var slides = $('.slider-heading');
    var container = $('.slider-heading-ul');
    var elm = container.find(':first-child').prop("tagName");
    console.log(elm);
    console.log(container.width());
    var refwidth=$(".refwidth").width();
    container.width(refwidth);
        var item_width = container.width();
    var thumb=$(".position-thumb");
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    // container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();
    //if user clicked on prev button
    
    $('.navbut').click(function (e) {
        //slide the item
        clearInterval(run);
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
            prev_thumb();
            thumb.animate({'left':thumb_pos});

        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
            next_thumb();
            thumb.animate({'left':thumb_pos});
        }
        
        //cancel the link behavior            
        return false;
        
    });
    
    //if mouse hover, pause the auto rotation, otherwise rotate it    
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });
    
    
    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }
    
}
function rotate() {
    $('#next').click();
}

$(window).resize(function(){
   all_slider();
});