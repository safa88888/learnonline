import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="background-gradient"></div>
      <div className="grid-overlay"></div>

      <div className="auth-content">
        <div className="auth-form">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <LogIn size={40} style={{ color: '#4ECDC4' }} />
            </div>
            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Se Connecter
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Connectez-vous à votre compte
            </p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-input"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se Connecter'}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '2rem' }}>
            <p className="footer-text">
              Pas encore de compte?{' '}
              <button onClick={() => navigate('/')} className="footer-link">
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
