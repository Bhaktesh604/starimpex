import {
  COMPANY_NAME_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  ID_REGEX,
} from "./regex";

export const isEmailValid = (email: string = "") => {
  if (!email) {
    return false;
  }

  if (email.length > 254) {
    return false;
  }

  const valid = EMAIL_REGEX.test(email);
  if (!valid) {
    return false;
  }

  return true;
};

export const isPasswordValid = (password: string) => {
  const isValid = PASSWORD_REGEX.test(password);
  if (!isValid) {
    return false;
  }
  return true;
};

export const isNameValid = (name: string = "") => {
  if (!name) {
    return false;
  }

  const isValid = NAME_REGEX.test(name);
  if (!isValid) {
    return false;
  }
  return true;
};

export const isCompanyNameValid = (companyName: string = "") => {
  if (!companyName) {
    return false;
  }

  if (companyName.length > 100) {
    return false;
  }

  const isValid = COMPANY_NAME_REGEX.test(companyName);
  if (!isValid) {
    return false;
  }
  return true;
};

export const isAddressValid = (address: string = "") => {
  if (!address) {
    return false;
  }

  if (address.length > 100) {
    return false;
  }

  return true;
};

export const isStateValid = (state: string = "") => {
  if (!state) {
    return false;
  }

  if (state.length > 100) {
    return false;
  }

  return true;
};
export const isCityValid = (city: string = "") => {
  if (!city) {
    return false;
  }

  if (city.length > 100) {
    return false;
  }

  return true;
};

export const isCountryValid = (country: string = "") => {
  if (!country) {
    return false;
  }

  if (country.length > 100) {
    return false;
  }

  return true;
};

export const isValidObjectId = (id: string = "") => {
  if (!id) {
    return false;
  }

  if (!ID_REGEX.test(id)) {
    return false;
  }

  return true;
};
