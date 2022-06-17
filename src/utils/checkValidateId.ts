import { validate }  from 'uuid';

export function isValidateId(id) {
  return validate(id.toString());
}
