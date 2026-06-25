import { CreateApplicationRequest } from '../@types/application-request';

export function isValidApplication(
  data: CreateApplicationRequest
) {
  if (!data.company) {
    return false;
  }

  if (!data.position) {
    return false;
  }

  return true;
}