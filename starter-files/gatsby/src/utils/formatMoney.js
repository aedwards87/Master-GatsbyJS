const formatter = Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
});

const formatMoney = (pence) => formatter.format(pence / 100);

export default formatMoney;
