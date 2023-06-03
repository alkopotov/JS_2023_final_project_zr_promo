function createBarDiagram(parent, dataDiagram, gapPercent = 25, time = 0) {
  const BORDER = 3;
  let diagWidth = +window.getComputedStyle(parent).width.slice(0, window.getComputedStyle(parent).width.length-2);
  let diagHeight = +window.getComputedStyle(parent).height.slice(0, window.getComputedStyle(parent).height.length-2);
  let barsTotal = Object.entries(dataDiagram).length;
  let barWidth = diagWidth / (1 + barsTotal + (barsTotal - 1) * gapPercent / 100);
  let step = 1;
  let barPositionLeft = 0.5 * barWidth;
  let maxBar = Object.values(dataDiagram).reduce((x, y) => Math.max(x, y));
  let maxBarHeight = 0.9 * diagHeight;
  let animationTimer = setInterval (() => {
    if (step > barsTotal) {
      clearInterval(animationTimer);
      return;
    }
    let bar = document.createElement('div')
    bar.className = 'diag__bar';
    bar.style.width = `${barWidth - BORDER * 2}px`;
    bar.style.left = `${barPositionLeft}px`;
    barPositionLeft += (1 + gapPercent / 100) * barWidth;
    bar.style.height = maxBarHeight * Object.values(dataDiagram)[step-1] / maxBar + 'px';
    bar.innerHTML = `<p class="diag__value">${formatNumber(Object.values(dataDiagram)[step-1], ' ')}</p><p class="diag__label">${Object.keys(dataDiagram)[step-1]}</p>`;
    step++
    bar.style.bottom = '0';
    parent.append(bar);
  }, time/barsTotal)
}

function animateNumber (elem, value, sep, framerate, time) {
  let framesTotal = time / 1000 * framerate
  let shiftNumber = Math.floor(value / framesTotal);
  let stepAnimation = 1
  let figureAnimationTimer = setInterval(() => {
    if (stepAnimation > framesTotal) {
      clearInterval(figureAnimationTimer);
      elem.innerHTML = formatNumber(value, sep);
      return;
    }
    
    elem.innerText = formatNumber(stepAnimation * shiftNumber, sep);
    stepAnimation++
  }, time/framesTotal)
}
