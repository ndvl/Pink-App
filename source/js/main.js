const tableSection = document.querySelector(".page-content__price-section"),
      table = document.querySelector(".price-section__price-table"),
      paginationPoints = document.querySelectorAll(".pagination-item__point--price-section");

const header = document.querySelector(".header"),
      navigation = document.querySelector(".header__nav-wrapper"),
      navButton = document.querySelector(".nav-button"),
      navItem = document.querySelector(".header__nav-item"),
      toolsItemIcons = document.querySelectorAll(".tools-item__icon"),
      likesButton = document.querySelectorAll(".likes");

//Открытие навигации в хедере

navButton.addEventListener("click", function() {
  navigation.classList.toggle("header__nav-wrapper--hidden");
  header.classList.toggle("header--opened-nav");
})

//Изменение иконки меню в мобильной и планшетной версии

window.addEventListener("click", function() {
  if(header.classList.contains("header--opened-nav")){
    navButton.innerHTML = `
    <svg style="margin-left: auto; margin-right: auto;" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.8487 1.37761e-06L0 20.8487L2.15131 23L23 2.15131L20.8487 1.37761e-06Z" fill="white"/>
      <path d="M2.15131 0L0 2.15131L20.8487 23L23 20.8487L2.15131 0Z" fill="white"/>
    </svg>
    `
  } else {
    navButton.innerHTML = `
    <svg style="margin-left: auto; margin-right: auto;" width="50" height="24" viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.13659 0.00020839C0.986512 -0.00251551 0.837358 0.0214885 0.698091 0.0707781C0.558823 0.120068 0.432317 0.193625 0.326173 0.28703C0.22003 0.380436 0.136442 0.49176 0.0804303 0.614315C0.024419 0.73687 -0.00285856 0.868124 0.000236809 1.00019V3.00016C0.000236809 3.26537 0.119959 3.51972 0.333067 3.70725C0.546174 3.89478 0.83521 4.00014 1.13659 4.00014H48.8634C49.0135 4.00286 49.1626 3.97886 49.3019 3.92957C49.4412 3.88028 49.5677 3.80672 49.6738 3.71332C49.78 3.61991 49.8636 3.50859 49.9196 3.38603C49.9756 3.26348 50.0029 3.13222 49.9998 3.00016V1.00019C49.9998 0.734979 49.88 0.48063 49.6669 0.293097C49.4538 0.105563 49.1648 0.00020839 48.8634 0.00020839H1.13659ZM1.13659 10C0.986512 9.99731 0.837358 10.0213 0.698091 10.0706C0.558823 10.1199 0.432317 10.1935 0.326173 10.2869C0.22003 10.3803 0.136442 10.4916 0.0804303 10.6141C0.024419 10.7367 -0.00285856 10.868 0.000236809 11V13C0.000236809 13.2652 0.119959 13.5195 0.333067 13.7071C0.546174 13.8946 0.83521 14 1.13659 14H48.8634C49.0135 14.0027 49.1626 13.9787 49.3019 13.9294C49.4412 13.8801 49.5677 13.8065 49.6738 13.7131C49.78 13.6197 49.8636 13.5084 49.9196 13.3859C49.9756 13.2633 50.0029 13.132 49.9998 13V11C49.9998 10.7348 49.88 10.4805 49.6669 10.2929C49.4538 10.1054 49.1648 10 48.8634 10H1.13659ZM1.13659 19.9999C0.986512 19.9971 0.837358 20.0211 0.698091 20.0704C0.558823 20.1197 0.432317 20.1933 0.326173 20.2867C0.22003 20.3801 0.136442 20.4914 0.0804303 20.614C0.024419 20.7365 -0.00285856 20.8678 0.000236809 20.9998V22.9998C0.000236809 23.265 0.119959 23.5194 0.333067 23.7069C0.546174 23.8944 0.83521 23.9998 1.13659 23.9998H48.8634C49.0135 24.0025 49.1626 23.9785 49.3019 23.9292C49.4412 23.8799 49.5677 23.8064 49.6738 23.713C49.78 23.6196 49.8636 23.5082 49.9196 23.3857C49.9756 23.2631 50.0029 23.1319 49.9998 22.9998V20.9998C49.9998 20.7346 49.88 20.4803 49.6669 20.2927C49.4538 20.1052 49.1648 19.9999 48.8634 19.9999H1.13659Z" fill="white"/>
    </svg>
    `
  }
})

//Переключение класса иконок в catalog_editor в мобильной версии

toolsItemIcons.forEach(icon => {
  icon.addEventListener("click", function() {

    toolsItemIcons.forEach(icon => {
      icon.classList.remove("tools-item__icon--mobile-active")
    })

    icon.classList.add("tools-item__icon--mobile-active")
  })
})

//Счетчик лайков

likesButton.forEach(like => {
  like.addEventListener("click", function() {

    let likeCounter = parseInt(like.innerHTML.replace(/\D+/g,""));

    if(like.classList.contains("likes--active")) {
      like.classList.remove("likes--active");
      likeCounter--;
      like.innerHTML = "Нравится: " + likeCounter;
    } else {
      like.classList.add("likes--active");
      likeCounter++;
      like.innerHTML = "Нравится: " + likeCounter;
    }
  })
})

//Функция перемещения таблицы при нажатии на пагинацию

console.log(window.location.pathname)

if(window.location.pathname == "/index.html") {

const PriceTableMarginClickListener = (unit, leftValue) => {
  unit.addEventListener("click", function() {
    paginationPoints.forEach(function(point) {
      point.classList.remove("pagination-item__point--current");
    })

    unit.classList.add("pagination-item__point--current");

    const Int = setInterval(function() {

      if(parseInt(table.style.marginLeft, 10) > parseInt(leftValue, 10)) {
        table.style.marginLeft = parseInt(table.style.marginLeft, 10) - 30 + "px";

        if(parseInt(table.style.marginLeft, 10) == parseInt(leftValue, 10)) {
          clearInterval(Int);
        }
      } else {
        table.style.marginLeft = parseInt(table.style.marginLeft, 10) + 30 + "px";

        if(parseInt(table.style.marginLeft, 10) == parseInt(leftValue, 10)) {
          clearInterval(Int);
        }
        }
    }, 1)
  })
}

PriceTableMarginClickListener(paginationPoints[0], "570px");
PriceTableMarginClickListener(paginationPoints[1], "0");
PriceTableMarginClickListener(paginationPoints[2], "-570px");
}
