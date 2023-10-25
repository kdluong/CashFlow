import { monthNamesShort } from '../constants/constants';

export function getDate(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${
    formattedDate.getFullYear() % 100
  }`;
}

export function getDateLong(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return `${
    monthNamesShort[formattedDate.getMonth()]
  } ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
}

export function getTime(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return formattedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}
