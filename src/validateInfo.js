import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);
  creditCard.postalCode = valid.postalCode(values.cardPostalCode);

  errors.show = true;
  errors.variant = "Опасность";
  errors.message = "Произошла неизвестная ошибка. Повторите попытку позже"
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cpostal = false;

  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message = "CVC  карты не заполнен";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "CVC  карты недействителен";
  }


  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message = "Срок действия  карты не завершен";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Срок действия  карты недействителен";
  }

  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Номер  карты не заполнен";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Номер  карты недействителен";
  }
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Имя держателя карты не указано полностью";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Имя держателя карты недействительно";
  }

  if (
    errors.ctype &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.cpostal &&
    errors.ccvv
  ) {
    errors.variant = "Принято";
    errors.message = "Карта действительна";
  }

  return errors;
}