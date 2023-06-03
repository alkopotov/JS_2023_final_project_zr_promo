function formatNumber(num, sep = ' ', floatDigits = 0){
  let intPart = String(Math.floor(num));
  let floatPart = String(num)
  if (floatPart.includes('.')) {
    floatPart = `,${floatPart.slice(floatPart.indexOf('.') + 1)}`
    while (floatPart.length < floatDigits + 1) {
      floatPart += '0'
    }
  } else {
    if (floatDigits > 0) {
      floatPart =','
      for (let i = 1; i<= floatDigits; i++) {
        floatPart +='0'
      }
    } else {
      floatPart = '';
    }
  }
  let segmTotal = Math.ceil(intPart.length / 3)
  let firstSegm = intPart.length % 3;
  let result = firstSegm > 0 ? `${intPart.slice(0, firstSegm)}${sep}`:'';

  for (let i = 1; i <= segmTotal; i++) {
    result +=`${intPart.slice(firstSegm + 3 * (i - 1), firstSegm + i * 3)}${sep}`;
  }
  result = `${result.trim()}${floatPart}`;
  return result;
}