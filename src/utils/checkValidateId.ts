import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';

export const isValidateId = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};
