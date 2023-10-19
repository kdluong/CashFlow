import { daysOfWeek, monthNamesShort } from "../constants/constants";

export function getDate(transactionDate) {

    var formattedDate = new Date(transactionDate);

    return ((formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + (formattedDate.getFullYear() % 100));
};

export function getDateLong(transactionDate) {

    var formattedDate = new Date(transactionDate);

    return ((monthNamesShort[formattedDate.getMonth()]) + ' ' + formattedDate.getDate() + ', ' + (formattedDate.getFullYear()));
}

export function getTime(transactionDate) {

    var formattedDate = new Date(transactionDate);

    return (
        (formattedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
    );
}