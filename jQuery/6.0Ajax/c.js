var entries = [
  {
    "term": "painful will make me strong!",
    "part": "aa",
    "definition": "1111111111111re of to others."
  },
  {
    "term": "bb-title",
    "part": "bb.",
    "definition": "2323."
  }

];

var html = '';
$.each(entries, function(index, value){
	html +=	'<div class="entry">';
	html += '<div class="temr">' + this['term'] + '</div>'; //this 是指当前索引值
	html += '<div class="part">' + this['part'] + '</div>';
	html += '<div class="definition">' + value['definition'] + '</div>';
	html += '</div>';
});
$("#dictionary").html(html);