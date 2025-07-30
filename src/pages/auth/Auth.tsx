import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import './Auth.scss';

import ImgAuth from '../../assets/finance-chart.svg';
import Logo from '../../assets/expensely-icon.png';

import { login as loginAPI } from '../../services/user-api';
import { setLocalStorage } from '../../helpers/LocalStorage';
import { RecoveryDialog } from '../../components/Dialogs/RecoveryDialog';

import { useAuth } from '../../contexts/AuthContext';

export const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSubmit = async () => {
    const credentials = { email, password };

    try {
      const response = await loginAPI(credentials);

      if (response?.status === 200) {
        const auth = {
          ...response.data,
          isAuthenticated: true,
        };

        setLocalStorage('auth', auth);
        setLocalStorage('userId', auth.user.id);

        // Atualiza o contexto com user e tokens
        login(auth.user, auth.access_token, auth.token_type);

        navigate('/');
      } else {
        console.error('Erro no login');
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
    }
  };

  return (
    <div className="grid auth-container">
      <div className="img-auth-container col-12 md:col-5 lg:col-6">
        <img src={ImgAuth} alt="Login Illustration" />
      </div>

      <div className="login-container col-12 md:col-7 lg:col-6">
        <div className="login">
          <h2>LOGIN</h2>

          <div className="card input-01">
            <label>E-mail</label>
            <InputText
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="card input-01">
            <label>Senha</label>
            <Password
              toggleMask
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              feedback={false}
            />
            <small onClick={() => setDialogVisible(true)}>
              Esqueci a minha senha
            </small>
          </div>

          <div>
            <Button
              disabled={!password || !email}
              onClick={handleSubmit}
              rounded
              label="Entrar"
            />
          </div>
        </div>

        <div className="sign-up">
          <span>Ainda não tem uma conta?</span>
          <a onClick={() => navigate('/signup')}>Cadastre-se</a>
        </div>
      </div>

      <RecoveryDialog visible={dialogVisible} onHide={setDialogVisible} />
    </div>
  );
};
