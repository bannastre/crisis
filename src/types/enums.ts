export enum GrantEnum {
  FOOD_DELIVERY = 'food|delivery',
  TRANSPORT_PUBLIC = 'transport|public',
  TRANSPORT_PRIVATE = 'transport|public',
  HEALTHCARE_MEDECINE_DISPENSARY = 'healthcare|medecine|dispensary',
  HEALTHCARE_CARE_VISITORS = 'healthcare|care|visitors',
  SCHOOLING_MEALS_AFTERSCHOOL = 'schooling|meals|afterschool',
  SCHOOLING_ACCESS = 'schooling|access',
}

export enum ErrorEnum {
  PRIORITY_GRANT_NOT_FOUND = '404 - Priority Grant Not Found',
  ENTITY_NOT_FOUND = '404 - Entity Not Found',
  UNKNOWN_ERROR = '500 - Unknown Server Error',
}
