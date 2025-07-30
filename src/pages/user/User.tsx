import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';
import './User.scss';
import { IUser } from '../../interfaces/IUser';
import { getUser, updateUser, updatePassword } from '../../services/user-api';
import { useToastContext } from '../../contexts/ToastContext';
import { genders } from '../../utils/valueTypes';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';

export const User = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUser | null>(null);

  const {
    control: profileControl,
    formState: { errors: profileErrors },
    handleSubmit: handleProfileSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
      birthdate: new Date(),
      gender: null,
      income: 0,
    },
  });

  const {
    control: passwordControl,
    formState: { errors: passwordErrors },
    handleSubmit: handlePasswordSubmit,
    getValues: getPasswordValues,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      if (response?.status === 200) {
        setUserData(response.data);
        reset({
          ...response.data,
          birthdate: new Date(response.data.birthdate),
        });
      } else {
        showToast('error', 'Erro ao carregar perfil');
      }
      setLoading(false);
    };

    fetchUser();
  }, [reset, showToast]);

  const onSubmitProfile = async (data: any) => {
    const response = await updateUser(data);
    if (response?.status === 200) {
      showToast('success', 'Perfil atualizado com sucesso!');
    } else {
      showToast('error', 'Erro ao atualizar perfil');
    }
  };

  const onPasswordChange = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return showToast('error', 'Senhas não coincidem');
    }

    const response = await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (response?.status === 200) {
      showToast('success', 'Senha atualizada com sucesso!');
    } else {
      showToast('error', 'Erro ao atualizar senha');
    }
  };

  const required = 'Campo obrigatório!';

  const getProfileErrorMessage = (name: keyof typeof profileErrors) =>
    profileErrors[name] && (
      <small className="p-error">{profileErrors[name]?.message}</small>
    );

  const getPasswordErrorMessage = (name: keyof typeof passwordErrors) =>
    passwordErrors[name] && (
      <small className="p-error">{passwordErrors[name]?.message}</small>
    );

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="grid edit-profile-container">
      <UserAvatar email={userData?.email} size={100} />

      <form
        onSubmit={handleProfileSubmit(onSubmitProfile)}
        className="edit-profile-form col-12 md:col-8"
      >
        <h2>Editar Perfil</h2>

        <div className="grid">
          <div className="card col-12 md:col-6">
            <label htmlFor="username">Usuário</label>
            <Controller
              name="username"
              control={profileControl}
              render={({ field }) => <InputText {...field} readOnly disabled />}
            />
          </div>

          <div className="card col-12 md:col-6">
            <label htmlFor="email">E-mail</label>
            <Controller
              name="email"
              control={profileControl}
              render={({ field }) => <InputText {...field} readOnly disabled />}
            />
          </div>
        </div>

        <div className="grid">
          <div className="card col-12 md:col-6">
            <label
              htmlFor="name"
              className={classNames({ 'p-error': profileErrors.name })}
            >
              Nome
            </label>
            <Controller
              name="name"
              control={profileControl}
              rules={{ required }}
              render={({ field, fieldState }) => (
                <InputText
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getProfileErrorMessage('name')}
          </div>
          <div className="card col-12 md:col-6">
            <label htmlFor="gender">Gênero</label>
            <Controller
              name="gender"
              control={profileControl}
              rules={{ required }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={genders}
                  optionLabel="name"
                  placeholder="Selecione"
                  className={classNames({ 'p-invalid': profileErrors.gender })}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {getProfileErrorMessage('gender')}
          </div>
          <div className="card col-12 md:col-6">
            <label htmlFor="birthdate">Data de Nascimento</label>
            <Controller
              name="birthdate"
              control={profileControl}
              rules={{ required }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  maxDate={new Date()}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                />
              )}
            />
            {getProfileErrorMessage('birthdate')}
          </div>{' '}
          <div className="card col-12 md:col-6">
            <label htmlFor="income">Renda mensal</label>
            <Controller
              name="income"
              control={profileControl}
              rules={{ required }}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getProfileErrorMessage('income')}
          </div>
        </div>

        <Button type="submit" label="Salvar alterações" />
      </form>

      <form
        onSubmit={handlePasswordSubmit(onPasswordChange)}
        className="password-section col-12 md:col"
      >
        <h2>Alterar Senha</h2>

        <div className="grid">
          <div className="card col-12 ">
            <label htmlFor="currentPassword">Senha atual</label>
            <Controller
              name="currentPassword"
              control={passwordControl}
              rules={{ required }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  feedback={false}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getPasswordErrorMessage('currentPassword')}
          </div>

          <div className="card col-12 ">
            <label htmlFor="newPassword">Nova senha</label>
            <Controller
              name="newPassword"
              control={passwordControl}
              rules={{
                required,
                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
              }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  feedback={false}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getPasswordErrorMessage('newPassword')}
          </div>

          <div className="card col-12 ">
            <label htmlFor="confirmPassword">Confirmar nova senha</label>
            <Controller
              name="confirmPassword"
              control={passwordControl}
              rules={{
                required,
                validate: (value) =>
                  value === getPasswordValues('newPassword') ||
                  'Senhas não coincidem',
              }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  feedback={false}
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getPasswordErrorMessage('confirmPassword')}
          </div>
        </div>

        <Button type="submit" label="Alterar Senha" severity="secondary" />
      </form>
    </div>
  );
};
