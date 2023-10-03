export const formatMoney = value => {
  if (value == 0) {
    return value;
  }
  if (value) {
    var x = value;
    var y = '';
    if (x >= 1000 && x < 1000000) {
      y = 'K';
      x = (x / 1000).toFixed(1);
    } else if (x >= 1000000 && x < 1000000000) {
      y = 'M';
      x = (x / 1000000).toFixed(1);
    } else if (x >= 1000000000) {
      y = 'B';
      x = (x / 1000000000).toFixed(1);
    }
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.') + y;
  }
};

export const formatNumber = value => {
  if (value == 0 || !value) {
    return 0;
  }
  const so = Number(value)
  if (so) {
    var x = so.toFixed(1);
    var y = '';
    if (x >= 1000 && x < 1000000) {
      y = 'K';
      x = (x / 1000).toFixed(1);
    } else if (x >= 1000000 && x < 1000000000) {
      y = 'M';
      x = (x / 1000000).toFixed(1);
    } else if (x >= 1000000000) {
      y = 'B';
      x = (x / 1000000000).toFixed(1);
    }
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.') + y;
  }
};

export const formatPercent = value => {
  if (value <= 0) {
    return value;
  }
  if (value) {
    return (value * 100).toFixed(2);
  }
};
