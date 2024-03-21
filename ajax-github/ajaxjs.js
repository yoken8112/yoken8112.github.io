 
var total_count = 0;
var myData = [];

var nowPage = 1;
var nowSort = "ls";

var nowSearch = "";

$(document).ready(function(){
  $('#css_table').html(
    "目前無搜尋"
  );
});

function ajax_ready(){
  $.ajax({
    method: "GET",
    url: "https://api.github.com/search/repositories?q=" + nowSearch + "&per_page=100&page=1",
    async:false
  })
    .done(function( msg ) {
      console.log(msg);
      total_count = msg.total_count;
      if (total_count >= 100) total_count = 100;
      // 限制搜尋數量
      for (var j = 0; j < total_count; j++){
        myData.push({
          name: msg.items[j].name,
          html_url: msg.items[j].html_url,
          stargazers_count: msg.items[j].stargazers_count
        })
      }

    });
    console.log("OK");
    sort_ls();
}

/// 600頁的結果

/*
function ajax_ready600(){
  $.ajax({
    method: "GET",
    url: "https://api.github.com/search/repositories?q=javascript&per_page=100&page=1",
    // data: { name: "John", location: "Boston" }
    async:false
  })
    .done(function( msg ) {
      console.log(msg);
      //   alert( "Data Saved: " + msg );
      total_count = msg.total_count;
      // 限制搜尋數量
      
      ajax_pages();
    });
    console.log("OK");
    sort_ls();
}


function ajax_pages(){

  if(total_count >= 600) total_count = 600;
  var jmax = total_count % 100;

  for(var i = 1; i <= Math.ceil(total_count/100); i ++){
    if(total_count - i * 100 >= 0){
      $.ajax({
        method: "GET",
        url: "https://api.github.com/search/repositories?q=javascript&per_page=100&page="+i,
        async:false
      })
        .done(function( msg ) {
          console.log(msg);
          for (var j = 0; j < 100; j++){
            myData.push({
              name: msg.items[j].name,
              html_url: msg.items[j].html_url,
              stargazers_count: msg.items[j].stargazers_count
            })
          }
  
        });
    }
    else{
      $.ajax({
        method: "GET",
        url: "https://api.github.com/search/repositories?q=whynot&per_page=100&page="+i,
        async:false
      })
        .done(function( msg ) {
          console.log(msg);
          for (var j = 0; j < jmax; j++){
            myData.push({
              name: msg.items[j].name,
              html_url: msg.items[j].html_url,
              stargazers_count: msg.items[j].stargazers_count
            })
          }
  
        });
    }
  }
}
*/

function sort_sl(){
  myData = myData.sort(function (a, b) {
    return a.stargazers_count > b.stargazers_count ? 1 : -1;
   });
   nowSort = "sl";
   appendHTML();
}

function sort_ls(){
  myData = myData.sort(function (a, b) {
    return a.stargazers_count < b.stargazers_count ? 1 : -1;
   });
   nowSort = "ls";
   appendHTML();
}

function appendHTML(){
  if(nowSort=="ls"){
    $('#css_table').html(
      $('<div/>')
      .addClass('css_tr')
      .css('background-color','black')
      .css('color','white')
      .append(
        $('<div/>')
        .addClass('css_td1')
        .css('text-align','center')
        .append("專案名稱")
      )
      .append(
        $('<div/>')
        .addClass('css_td2')
        .css('text-align','center')
        .append("星星數 ▼")
        .attr('onclick','sort_sl()')
      )
      .append(
        $('<div/>')
        .addClass('css_td3')
        .css('text-align','center')
        .append("網址")
      )
    );
  }
  else if(nowSort=="sl"){
    $('#css_table').html(
      $('<div/>')
      .addClass('css_tr')
      .css('background-color','black')
      .css('color','white')
      .append(
        $('<div/>')
        .addClass('css_td1')
        .css('text-align','center')
        .append("專案名稱")
      )
      .append(
        $('<div/>')
        .addClass('css_td2')
        .css('text-align','center')
        .append("星星數 ▲")
        .attr('onclick','sort_ls()')
      )
      .append(
        $('<div/>')
        .addClass('css_td3')
        .css('text-align','center')
        .append("網址")
      )
    );
  }


  for (var i = 0 ; i < 20; i ++){
    $('#css_table').append(
      $('<div/>')
      .addClass('css_tr')
      .append(
        $('<div/>')
        .addClass('css_td1')
        .append(myData[nowPage*20-20+i].name)
      )
      .append(
        $('<div/>')
        .addClass('css_td2')
        .css('text-align','center')
        .append(myData[nowPage*20-20+i].stargazers_count)
      )
      .append(
        $('<div/>')
        .addClass('css_td3')
        .append(myData[nowPage*20-20+i].html_url)
      )
    );
  }

  $('#divButton').html(
    $('<input/>')
    .addClass('button')
    .attr('type','button')
    .attr('value','上一頁')
    .attr('onclick','pageMinus()')
  )
  .append(
    $('<p/>')
    .addClass('p')
    .append("   Page: " + nowPage + " / " + Math.ceil(total_count/20)+"   ")
  )
  .append(
    $('<input/>')
    .addClass('button')
    .attr('type','button')
    .attr('value','下一頁')
    .attr('onclick','pagePlus()')
  )
}

function pagePlus(){
  if(nowPage < Math.ceil(total_count/20)) nowPage++;
  appendHTML();
}

function pageMinus(){
  if(nowPage > 1) nowPage--;
  appendHTML();
}

function searchNow(){
  nowSearch = document.getElementById("mySearchValue").value;
  myData = [];
  ajax_ready();
}

/*
var xhr = new XMLHttpRequest();

xhr.open('GET', "https://api.github.com/search/repositories?q=react", true);
const a = xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(event){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(JSON.parse(xhr.response));
    document.querySelector('#ip-address').textContent = JSON.parse(xhr.response).items[0].homepage;
  }
}*/