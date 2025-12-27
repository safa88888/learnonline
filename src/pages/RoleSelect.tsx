import { useNavigate } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import './Auth.css';

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="background-gradient"></div>
      <div className="grid-overlay"></div>

      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Bienvenue</h1>
          <p className="auth-subtitle">Sélectionnez votre rôle pour continuer</p>
        </div>

        <div className="role-cards">
          <button
            onClick={() => navigate('/signup?role=eleve')}
            className="role-card role-eleve"
          >
            <div className="role-icon">
              <BookOpen size={48} />
            </div>
            <h2 className="role-title">Élève</h2>
            <p className="role-description">Je suis un étudiant cherchant de l'aide et des ressources</p>
            <span className="role-cta">Commencer comme élève</span>
          </button>

          <button
            onClick={() => navigate('/signup?role=tuteur')}
            className="role-card role-tuteur"
          >
            <div className="role-icon">
              <Users size={48} />
            </div>
            <h2 className="role-title">Tuteur</h2>
            <p className="role-description">Je veux aider les élèves et partager mes connaissances</p>
            <span className="role-cta">Commencer comme tuteur</span>
          </button>
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            Déjà un compte?{' '}
            <button onClick={() => navigate('/login')} className="footer-link">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
