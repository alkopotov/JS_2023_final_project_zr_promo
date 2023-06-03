const menuBar = document.querySelector('.navigation-menu')
const menuItems = document.querySelectorAll('.navigation-menu__item');
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('mouseover', e => {
    menuItems[i].style.borderBottom = 'solid'
    menuItems[i].style.fontSize = '22px'
  })
  menuItems[i].addEventListener('mouseout', e => {
    menuItems[i].style.borderBottom = 'none';
    menuItems[i].style.fontSize = '20px'
  })
}
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu')
dropdownButton.addEventListener('click', e => {
  if (window.getComputedStyle(dropdownMenu).top == '60px') {
    dropdownMenu.style.top = '0px';
  } else {
    dropdownMenu.style.top = '60px';
  }
})


function animateMenu(time, link) {
  let decorationItem = document.createElement('img');
  decorationItem.src = link
  decorationItem.style.height = "40px";
  decorationItem.style.position = "absolute";
  decorationItem.style.left = "-100px";
  menuBar.append(decorationItem);
  let endPos = dropdownButton.offsetLeft;
  let framesNumber = Math.floor(time/40) - 1;
  let shiftPos = (endPos + 100)/framesNumber;
  let step = 1
  let animationTimer = setInterval (() => {
    if (step > framesNumber) {
      clearInterval(animationTimer);
      decorationItem.style.position = 'relative';
      decorationItem.style.left = 0
      return
    }
    decorationItem.style.left = step++ * shiftPos + 'px';
  }, time/framesNumber)
}
