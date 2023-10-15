import { FieldsErrors } from "@/shared/domain/validators/validator-fields.interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super(message: "Entity Validation Error")
    this.name = 'Entity Validation Error'
  }
}