/**
 * Format phone number strings to readable format
 * @param {String} phone eg: 2130010012
 * @return {String} eg: (213)001 0012
 * */
export function formatPhone(phone) {
  if (typeof phone !== "string") return "";

  return `(${phone.slice(0, 3)})${phone.slice(3, 6)} ${phone.slice(6)}`;
}

/**
 * Format Date period into readable format
 * @param {String} startDate eg: 2019-09-04T21:00:00Z
 * @param {String} endDate eg: 2019-09-05T05:00:00Z
 * @return {String} eg: SEP 4, WED 9PM - SEP 5, THU 5AM PDT
 * */
export function formatShiftTimePeriod(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // check validity of input
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    console.error("Invalid time format provided");
    return "";
  }

  const {
    month: startMonth,
    day: startDay,
    dayInWeek: startDayInWeek,
    hour: startHour,
    AMPM: startAMPM,
    timezone,
  } = formatDate(startDateObj);

  const { month: endMonth, day: endDay, dayInWeek: endDayInWeek, hour: endHour, AMPM: endAMPM } = formatDate(
    endDateObj
  );

  // if shift happens on the same day
  if(startMonth === endMonth && startDayInWeek === endDayInWeek && startDay === endDay){
    return `${startMonth} ${startDay}, ${startDayInWeek} ${startHour}${startAMPM} - ${endHour}${endAMPM} ${timezone}`;
  }

  return `${startMonth} ${startDay}, ${startDayInWeek} ${startHour}${startAMPM} - ${endMonth} ${endDay}, ${endDayInWeek} ${endHour}${endAMPM} ${timezone}`;
}

/**
 * Format Date period into readable format
 * @param {Date} dateObj
 * @return {Object}
 * */
export function formatDate(dateObj) {
  if (!(dateObj instanceof Date)) return {};

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const year = dateObj.getFullYear();
  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  const dayInWeek = dayNames[dateObj.getDay()];
  let hour = dateObj.getHours();
  let AMPM = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'

  const minute = dateObj.getMinutes();
  const second = dateObj.getSeconds();
  const timezoneOffSetHours = (dateObj.getTimezoneOffset() / 60) * -1;
  const timezone = `UTC${timezoneOffSetHours > 0 ? "+" : ""}${timezoneOffSetHours}`;

  return {
    year,
    month,
    day,
    dayInWeek,
    hour,
    AMPM,
    minute,
    second,
    timezone,
  };
}
