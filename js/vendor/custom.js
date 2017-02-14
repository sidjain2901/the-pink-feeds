/*prevent parent scoll of subelement has a scroll*/
$.fn.isolatedScroll = function() {
    this.bind('mousewheel DOMMouseScroll', function (e) {
        var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail,
            bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
            topOverflow = this.scrollTop <= 0;

        if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
            e.preventDefault();
        }
    });
    return this;
};
$('.filter-box .submenu').isolatedScroll();
$( window ).resize(positionFooter);
function positionFooter()
{
  if($('footer').css('position') == 'fixed')
  {
    if($('body').height()+$('footer').outerHeight() > window.innerHeight)
    {
      $('footer').css({'position':'static'});
    }
  }
  else
  {
    if($('body').height()<window.innerHeight){
      $('footer').css({'position':'fixed','bottom':0,'width':'100%'});
    }          
  }      
}
positionFooter(); 

$(document).on('click','.filter-box .viewMore',function(){
  var parent = $(this).closest('.filter-box');
  var top = parent.outerHeight() - $(this).parent().outerHeight();
  var left = $(this).parent().outerWidth()
  var submenu = parent.find('.submenu');
  if(submenu.is(':visible'))
  {
    submenu.fadeOut('normal');
  }
  else
  {    
    submenu.css({'top':top+'px','left':left+'px'});
    submenu.fadeIn('normal');
  }
});
/*-----------Hide element if clicked somewhere else----------------*/
$(document).click(function(event) { 
  if(!$(event.target).closest('.toggleMenu').length && !$(event.target).is('.toggleMenu') && !$(event.target).is('.filter-box .viewMore')) {
    if($('.toggleMenu').is(":visible")) {
        $('.toggleMenu').fadeOut('normal')
    }
  }        
});
/*--------------Search in submenu------------*/
$( document ).ready(function() {
  $('input[name="suggestion"]').keyup(function(){
   var valThis = $(this).val().toLowerCase().trim();
   var list = $(this).closest('.submenu').find('ul>li');
   list.each(function(){
     var text = $(this).find('label').text().toLowerCase().trim();
     console.log(text,valThis,text.indexOf(valThis));
     (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
   });
 });
});