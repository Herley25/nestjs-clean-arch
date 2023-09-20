import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  //* método de atualização do nome
  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  //* método de atualização da senha
  updatePassword(value: string): void {
    this.password = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get createAt() {
    return this.props.createdAt;
  }

  //* está recendo a instância do validador e executando o método de validação
  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    validator.validate(props);
  }
}
