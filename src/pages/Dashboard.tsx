import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="background-gradient"></div>
      <div className="grid-overlay"></div>

      <nav className="dashboard-nav">
        <div className="nav-brand">WorkLab</div>
        <button onClick={handleSignOut} className="nav-logout">
          <LogOut size={20} />
          Déconnexion
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <div className="card-header">
            <User size={40} />
            <h1>Bienvenue, {profile?.full_name || user?.email}</h1>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Rôle:</span>
              <span className="info-value">
                {profile?.role === 'eleve' ? 'Élève' : 'Tuteur'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {profile?.role === 'eleve' ? (
            <>
              <div className="feature-card">
                <h3>Trouver un tuteur</h3>
                <p>Découvrez les tuteurs disponibles dans votre domaine d'étude</p>
              </div>
              <div className="feature-card">
                <h3>Mes sessions</h3>
                <p>Gérez vos sessions de tutorat et votre calendrier</p>
              </div>
              <div className="feature-card">
                <h3>Ressources</h3>
                <p>Accédez aux documents et ressources partagées</p>
              </div>
            </>
          ) : (
            <>
              <div className="feature-card">
                <h3>Mes élèves</h3>
                <p>Gérez vos élèves et suivez leur progression</p>
              </div>
              <div className="feature-card">
                <h3>Calendrier</h3>
                <p>Planifiez vos sessions de tutorat</p>
              </div>
              <div className="feature-card">
                <h3>Ressources</h3>
                <p>Partagez des documents avec vos élèves</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
