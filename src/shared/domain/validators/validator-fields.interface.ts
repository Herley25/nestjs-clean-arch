//* Contrato genérico
export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorsFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}
