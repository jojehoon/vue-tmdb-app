export const toCapitalize = function(value, postfix){
  if (!value) return '';
  if (!postfix) return '';
  const words = value.replace(/_/, ' ').split(' ');
  const result = words.map(item => item = item.charAt(0).toUpperCase() + item.slice(1));
  return result.join(' ') + postfix;
};

export const toUpperCase = function(value){
    if (!value) return '';
    return value.replace(/_/, " ").toUpperCase();
};

export const toString = function(value){
  if(!value) return [];
  const names = value.reduce((acc, cur) => acc.concat(cur.name), []).join(', ');
  return names;
};

export const toDate = function(value){
  if(!value) return '';
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  const [years, month, day] = value.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  return `${day} ${months[monthIndex]} ${years}`;
};

export const toNumberFormat = function(value){
    if (!value) return 0;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
