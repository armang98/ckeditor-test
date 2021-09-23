document.addEventListener('DOMContentLoaded', function () {
  let test = document.getElementsByClassName('name');
  for (let i = 0; i < test.length; i++) {
    test[i].onclick = function (ev) {
      openCity(ev.currentTarget.innerHTML)
    }
  }

  function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
  }
}, false);

