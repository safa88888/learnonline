import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'eleve' | 'tuteur') || 'eleve';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, role, fullName);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  const roleDisplay = role === 'eleve' ? 'Élève' : 'Tuteur';

  return (
    <div className="auth-container">
      <div className="background-gradient"></div>
      <div className="grid-overlay"></div>

      <div className="auth-content">
        <div className="auth-form">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <UserPlus size={40} style={{ color: '#4ECDC4' }} />
            </div>
            <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Créer un compte
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Inscrivez-vous en tant que <span style={{ color: '#4ECDC4', fontWeight: '600' }}>{roleDisplay}</span>
            </p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">Nom complet</label>
              <input
                type="text"
                className="form-input"
                placeholder="Votre nom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={loading}
            >
              {loading ? 'Inscription en cours...' : 'Créer un compte'}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '2rem' }}>
            <p className="footer-text">
              Déjà inscrit?{' '}
              <button onClick={() => navigate('/login')} className="footer-link">
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
