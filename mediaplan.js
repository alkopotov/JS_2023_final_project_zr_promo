const PRICELIST = [
  {id: 1,
    format: '300x300',
    cpm: 500,
    ctr: 0.18
   },
   {id: 2,
    format: 'FullScreen',
    cpm: 900,
    ctr: 1.5
   },
   {id: 3,
    format: 'Content-roll',
    cpm: 700,
    ctr: 0.19
   },
   {id: 4,
    format: '100%x250',
    cpm: 720,
    ctr: 0.2
   },
   {id: 5,
    format: '300x600',
    cpm: 600,
    ctr: 0.15
   },
   {id: 6,
    format: 'Брендирование',
    cpm: 1000,
    ctr: 0.45
   },
   {id: 7,
    format: 'FullScreen',
    cpm: 1350,
    ctr: 2
   },
   {id: 8,
    format: 'Content-roll',
    cpm: 700,
    ctr: 0.2
   },
  ]
const MONTHS  = {
  '01': 'янв',
  '02': 'фев',
  '03': 'мар',
  '04': 'апр',
  '05': 'май',
  '06': 'июн',
  '07': 'июл',
  '08': 'авг',
  '09': 'сен',
  '10': 'окт',
  '11': 'ноя',
  '12': 'дек'
}

const priceTable = document.querySelector('.price-list__prices__banners');
const formatScreen = document.querySelector('.price-list__specimen_screen')
priceTable.rows[2].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/01scr.webp"
})
priceTable.rows[3].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/02scr.webp"
})
priceTable.rows[4].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/03scr.webp"
})
priceTable.rows[6].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/04scr.webp"
})
priceTable.rows[7].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/05scr.webp"
})
priceTable.rows[8].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/06scr.webp"
})
priceTable.rows[9].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/07scr.webp"
})
priceTable.rows[10].addEventListener('mouseover', e => {
  formatScreen.src = "images/screens/08scr.webp"
})

function getDiscount(orderBaseRate) {
  return orderBaseRate > 0 && orderBaseRate <= 100000 ? 0.1 :
      orderBaseRate > 100000 && orderBaseRate <= 250000 ? 0.15 :
      orderBaseRate > 250000 && orderBaseRate <= 500000 ? 0.2 :
      orderBaseRate > 500000 && orderBaseRate <= 800000 ? 0.25 :
      orderBaseRate > 800000 ? 0.35 : 0;
}

class MediaplanRow {
  constructor(typeSite, bannerId, period, unitsNumber) {
    this.typeSite = typeSite;
    this.idBanner = bannerId;
    this.nameBanner = PRICELIST.find(el => el.id == bannerId).format;
    this.period = period,
    this.periodMonth = MONTHS[this.period]
    this.unitsNumber = unitsNumber;
    this.viewsNumber = unitsNumber * 1000;
    this.seasonMultiplier = +this.period == 3 || +this.period == 4 || +this.period == 5 ? 1.1 : 
      +this.period == 9 || +this.period == 12 ? 1.2 :
      +this.period == 10 || +this.period == 11 ? 1.3 :
      1;
    this.cpm = PRICELIST.find(el => el.id == bannerId).cpm;
    this.ctr = PRICELIST.find(el => el.id == bannerId).ctr;
    this.baseRate = (this.cpm * this.unitsNumber * this.seasonMultiplier).toFixed(2);
    this.clicks = Math.floor(this.ctr / 100 * this.viewsNumber);
    this.discount = 0;
    this.updateDiscount(this.discount)
  }
    updateDiscount(value) {
    this.discount = value;
    this.discountPrice = (this.baseRate * (1-this.discount)).toFixed(2);
    this.cpc = (+this.discountPrice / this.clicks).toFixed(2);
  }
}

function updateMediaPlanDiscount(arrayMediaplanRow) {
  result = []
  let totalBaseRate = 0;
  let totalDiscountPrice = 0;
  let totalViews = 0;
  let totalClicks = 0;
  arrayMediaplanRow.forEach(element => {
    totalBaseRate += +element.baseRate;
    totalViews += element.viewsNumber;
    totalClicks += element.clicks;
  });
  arrayMediaplanRow.forEach(element => {
    element.updateDiscount(getDiscount(totalBaseRate));
    totalDiscountPrice += +element.discountPrice
  })
  result.push(totalBaseRate);
  result.push(totalDiscountPrice);
  result.push(totalViews);
  result.push(totalClicks);
  return result;
}

let mediaPlan = [];

const mediaPlanTable = document.createElement('table');

function createMediaPlan(arrayMediaplanRow) {
  let numStyle = 'style="text-align: right;"'
  if(arrayMediaplanRow.length == 0){
    mediaPlanTable.innerHTML ='';
  } else {
    let totals = updateMediaPlanDiscount(arrayMediaplanRow);
    mediaPlanTable.innerHTML = 
    `<tr>
      <th>№ пп</th>
      <th>Тип</th>
      <th style="min-width: 90px;">Формат</th>
      <th style="width: 105px;">Месяц размещения</th>
      <th>Кол-во единиц</th>
      <th style="min-width: 60px">CPM</th>
      <th style="width: 60px;">Сезонный коэф-т</th>
      <th>Стоимость по тарифу</th>
      <th>Скидка</th>
      <th>Стоимость со скидкой</th>
      <th>Всего показов</th>
      <th>Прогноз CTR</th>
      <th>Прогноз кликов</th>
      <th>Прогноз CPC</th>
      <th></th>
    </tr>`
    arrayMediaplanRow.forEach(elem => {
      mediaPlanTable.innerHTML += `
      <tr>
        <td ${numStyle}>${arrayMediaplanRow.indexOf(elem)+1}.</td>
        <td>${elem.typeSite}</td>
        <td style="text-align: center;">${elem.nameBanner}</td>
        <td style="text-align: center;">${elem.periodMonth}</td>
        <td ${numStyle}>${formatNumber(elem.unitsNumber, ' ', 0)}</td>
        <td ${numStyle}>${formatNumber(elem.cpm, ' ', 0)}</td>
        <td ${numStyle}>${formatNumber(+elem.seasonMultiplier.toFixed(1),'', 1)}</td>
        <td ${numStyle}>${formatNumber(elem.baseRate, ' ', 2)}</td>
        <td ${numStyle}>${formatNumber(+(elem.discount*100).toFixed(1), '', 1)}%</td>
        <td ${numStyle}>${formatNumber(elem.discountPrice,' ', 2)}</td>
        <td ${numStyle}>${formatNumber(elem.viewsNumber, ' ', 0)}</td>
        <td ${numStyle}>${formatNumber(elem.ctr, '', 2)}%</td>
        <td ${numStyle}>${formatNumber(Math.floor(elem.clicks), ' ', 0)}</td>
        <td ${numStyle}>${formatNumber(elem.cpc, ' ', 2)}</td>
        <td><img src="images/close.png" style="width: 30px;" alt="Удалить"></td>
      </tr>
      `
    });
    mediaPlanTable.innerHTML += `
      <tr>
        <td colspan="7" style="text-align: center;">ИТОГО</td>
        <td ${numStyle}>${formatNumber(totals[0], ' ', 2)}</td>
        <td ${numStyle}>${formatNumber(+((1-(totals[1])/totals[0])*100).toFixed(1), '', 1)}%</td>
        <td ${numStyle}>${formatNumber(totals[1], ' ', 2)}</td>
        <td ${numStyle}>${formatNumber(totals[2], ' ', 0)}</td>
        <td ${numStyle}>${formatNumber(+(totals[3]/totals[2]*100).toFixed(2), ' ', 2)}%</td>
        <td ${numStyle}>${formatNumber(Math.floor(totals[3]), ' ', 0)}</td>
        <td ${numStyle}>${formatNumber((totals[1]/totals[3]).toFixed(2), ' ', 2)}</td>
        <td><img src="images/close.png" style="width: 30px;" alt="Удалить"></td>
      </tr>
    `;
    mediaPlanTable.rows[mediaPlanTable.rows.length - 1].className = 'table__finals';
    for (let i = 1; i < mediaPlanTable.rows.length; i++) {
    mediaPlanTable.rows[i].cells[mediaPlanTable.rows[i].cells.length - 1].addEventListener('click', e =>{
      let deleteIndex = e.target.parentElement.parentElement.rowIndex - 1;
      if (deleteIndex >= mediaPlan.length) {
        mediaPlan.splice(0);
      } else {
        mediaPlan.splice(deleteIndex, 1)
      }
      createMediaPlan(mediaPlan);
    })
  }
  }
  document.querySelector('.wrapper').append(mediaPlanTable);
}

document.forms[0][0].addEventListener('change', e => {
  document.forms[0][1].innerHTML = e.target.value == 'mobile' ?
    `<option value="1">300x300</option>
    <option value="2">FullScreen</option>
    <option value="3">Content-roll</option>`:
    `<option value="4">100%x250</option>
    <option value="5">300x600</option>
    <option value="6">Брендирование</option>
    <option value="7">FullScreen</option>
    <option value="8">Content-roll</option>`;
})

document.forms[0].addEventListener('submit', function(e) {
  e.preventDefault();
  let resVal = []
  for (let j = 0; j < this.elements.length - 1; j++) {
    resVal.push(this.elements[j].value)
  }
  mediaPlan.push(new MediaplanRow(resVal[0], +resVal[1], resVal[2], +resVal[3]))
  createMediaPlan(mediaPlan)
})
