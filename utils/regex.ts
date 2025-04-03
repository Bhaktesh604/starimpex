export const EMAIL_REGEX =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const PASSWORD_REGEX =
  /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?[\];',.\/\\`~]{8,13}$/;

export const NAME_REGEX =
  /^(?!s)(?!.*s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/;
export const COMPANY_NAME_REGEX =
  /^(?!s)(?!.*s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/;
export const ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const DECIMAL_REGEX = /^\d*\.?\d{0,2}$/;

export const IMAGE_CHECK_REGEX = /\.(jpg|jpeg|png|gif)$/i;
