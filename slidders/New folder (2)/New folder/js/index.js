var tabNames = [];
//loop thru all li element and grab all data, push them into an array of objects
$('li').each(function(index){
  var _this = $(this);
  var elem = {};
  elem.name = _this.text();
  elem.color = _this.attr('color');
  elem.emoji = _this.attr('emoji');
  tabNames.push(elem);
  console.log(tabNames);
  //if this li is active, take those data and apply to body
  if (_this.hasClass('is_active')){
    $('body').css('background-color',elem.color);
    $('.emoji').text(elem.emoji);
  } else {_this.text('')};
});

//on click change text value, bg data, emoji
$('li').on('click', function(e) {
  var _this = $(this);
  var _idx = _this.index();
  _this.addClass('is_active');
  _this.text(tabNames[_idx].name);
  $('body').css('background-color',tabNames[_idx].color)
  $('.emoji').text(tabNames[_idx].emoji);
  _this.siblings().text('');
  _this.siblings().removeClass('is_active');
});