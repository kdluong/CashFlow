export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export const switchOptions = [
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' },
];

export const transactionSortOptions = [
  { key: 'Latest', value: 'Latest' },
  { key: 'Oldest', value: 'Oldest' },
  { key: '$$-$', value: '$$-$' },
  { key: '$-$$', value: '$-$$' },
  { key: 'A-Z', value: 'A-Z' },
  { key: 'Z-A', value: 'Z-A' },
];

export const categorySortOptions = [
  { key: '$$-$', value: '$$-$' },
  { key: '$-$$', value: '$-$$' },
  { key: 'A-Z', value: 'A-Z' },
  { key: 'Z-A', value: 'Z-A' },
];

export const categoryLimitedSortOptions = [
  { key: 'A-Z', value: 'A-Z' },
  { key: 'Z-A', value: 'Z-A' },
];

export const colors = [
  '#013A20',
  '#2A2F34',
  '#4A442D',
  '#264E70',
  '#F72C25',
  '#917567',
  '#679186',
  '#F7B32B',
  '#CB997E',
  '#A5A58D',
  '#7FC8F8',
  '#F9B4AB',
  '#FFC0CB',
  '#A2A7A5',
  '#FCF6B1',
  '#B7B7A4',
  '#DDBEA9',
  '#CAF7E2',
  '#FDEBD3',
  '#FFE8D6',
];

export const icons = [
  'home-outline',
  'restaurant-outline',
  'airplane-outline',
  'car-sport-outline',
  'cart-outline',
  'water-outline',
  'flash-outline',
  'wifi-outline',
  'medkit-outline',
  'receipt-outline',
  'subway-outline',
  'book-outline',
  'school-outline',
  'pricetags-outline',
  'warning-outline',
  'ellipsis-horizontal-outline',
];

export const green = '#32d584';
export const backgroundColor = '#1a1a1a';
export const accentColor = '#282828';

export const nameRegex = /^(?!.*--)[A-Za-z][A-Za-z-]{1,29}$/;
export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const validRegex = /^(?![ ]+$)[\s\S]{1,29}$/;
