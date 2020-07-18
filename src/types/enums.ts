export enum GrantEnum {
  ANY = 'any',
  FINANCIAL_MORTGAGE_HOLIDAY = 'financial|mortgage|holiday',
  FOOD_DELIVERY = 'food|delivery',
  TRANSPORT_PUBLIC = 'transport|public',
  TRANSPORT_PRIVATE = 'transport|private',
  HEALTHCARE_MEDICINE_DISPENSARY = 'healthcare|medicine|dispensary',
  HEALTHCARE_CARE_VISITORS = 'healthcare|care|visitors',
  SCHOOLING_MEALS_AFTERSCHOOL = 'schooling|meals|afterschool',
  SCHOOLING_ACCESS = 'schooling|access',
}

export enum ErrorEnum {
  PRIORITY_GRANT_NOT_FOUND = '404 - Priority Grant Not Found',
  ENTITY_NOT_FOUND = '404 - Entity Not Found',
  INVALID_PHONE_NUMBER = '400 - Bad Request',
  UNKNOWN_ERROR = '500 - Unknown Server Error',
}

export enum IdentityTypeEnum {
  SHIELDED_PATIENT = 'shielded patient',
  KEY_WORKER = 'key worker',
  FURLOUGH = 'furlough',
  NONE = 'none',
  STANDARD = 'standard',
}
