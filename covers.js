const coverImage = document.querySelector('.magazine__cover');
const NUMBER_OF_COVERS = 12
let countCover = 1
coverImage.src = `images/covers/cov${countCover++}.jpeg`;
let timerCover = setInterval(() => {
  if (countCover % NUMBER_OF_COVERS == 0) {
    coverImage.src = `images/covers/cov${NUMBER_OF_COVERS}.jpeg`;
    countCover = 1;
  } else {
    coverImage.src = `images/covers/cov${countCover % NUMBER_OF_COVERS}.jpeg`;
    countCover++
  }
}, 2700)