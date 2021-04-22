let ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {

	//MENU
		let iconMenu=document.querySelector(".icon-menu");
		let body=document.querySelector("body");
		let menuBody=document.querySelector(".menu__body");
    iconMenu.addEventListener("click", (e) => {
		iconMenu.classList.toggle("active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
});

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e){
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      const iconMenu = document.querySelector('.icon-menu');
      const menuBody = document.querySelector('.menu__body');

      if (iconMenu.classList.contains('active')) {
        document.body.classList.remove('lock');
        iconMenu.classList.remove('active');
        menuBody.classList.remove('active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}


$(document).ready(function() {
//VALIDATE FORMS
$('form button[type=submit]').click(function(){
  var er=0;
  var form=$(this).parents('form');
  var ms=form.data('ms');
$.each(form.find('.req'), function(index, val) {
  er+=formValidate($(this));
});
if(er==0){
  removeFormError(form);
  
  if(ms!=null && ms!=''){
    showMessageByClass(ms);
    return false;
  }
}else{
  return false;
}
});
function formValidate(input){
  var er=0;
  var form=input.parents('form');
if(input.attr('name')=='email' || input.hasClass('email')){
  if(input.val()!=input.attr('data-value')){
    var em=input.val().replace(" ","");
    input.val(em);
  }
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
      er++;
    addError(input);
  }else{
    removeError(input);
  }
}else{
  if(input.val()=='' || input.val()==input.attr('data-value')){
    er++;
    addError(input);
  }else{
    removeError(input);
  }
}
if(input.attr('type')=='checkbox'){
  if(input.prop('checked') == true){
    input.removeClass('err').parent().removeClass('err');
  }else{
    er++;
    input.addClass('err').parent().addClass('err');
  }
}
if(input.hasClass('name')){
  if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
      er++;
    addError(input);
  }
}
if(input.hasClass('pass-2')){
  if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
    addError(input);
  }else{
    removeError(input);
  }
}
  return er;
}
function formLoad(){
$('.popup').hide();
$('.popup-message-body').hide();
$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
$('.popup').hide();
popupOpen('message.'+ms,'');
}
function showMessage(html){
$('.popup-loading').remove();
$('.popup-message-body').show().html(html);
}
function clearForm(form){
$.each(form.find('.input'), function(index, val) {
    $(this).removeClass('focus').val($(this).data('value'));
    $(this).parent().removeClass('focus');
  if($(this).hasClass('phone')){
    maskclear($(this));
  }
});
}
function addError(input){
  input.addClass('err');
  input.parent().addClass('err');
  input.parent().find('.form__error').remove();
if(input.hasClass('email')){
    var error='';
  if(input.val()=='' || input.val()==input.attr('data-value')){
    error=input.data('error');
  }else{
    error=input.data('error');
  }
  if(error!=null){
    input.parent().append('<div class="form__error">'+error+'</div>');
  }
}else{
  if(input.data('error')!=null && input.parent().find('.form__error').length==0){
    input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
  }
}
if(input.parents('.select-block').length>0){
  input.parents('.select-block').parent().addClass('err');
  input.parents('.select-block').find('.select').addClass('err');
}
}
function addErrorByName(form,input__name,error_text){
  var input=form.find('[name="'+input__name+'"]');
input.attr('data-error',error_text);
addError(input);
}
function addFormError(form, error_text){
form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
form.find('.form__generalerror').hide().html('');
}
function removeError(input){
input.removeClass('err');
input.parent().removeClass('err');
input.parent().find('.form__error').remove();

if(input.parents('.select-block').length>0){
  input.parents('.select-block').parent().removeClass('err');
  input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
  //input.parents('.select-block').find('.select-options').hide();
}
}
function removeFormErrors(form){
form.find('.err').removeClass('err');
form.find('.form__error').remove();
}
});