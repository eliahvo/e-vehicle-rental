export const minAge: number = 18; // Set the age restriction in years

const getMaxDate = (): Date => {
  const today = new Date();
  const date = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate(), 0, 0, 0, 0);
  return date;
};
export const maxDate = getMaxDate();

export const validateBirthday = (date: Date): boolean => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // it is a date
    if (isNaN(date.getTime())) {
      // date is not valid
      return false;
    }
    if (date > maxDate) {
      return false;
    }
  } else {
    // not a date
    return false;
  }
  return true;
};
