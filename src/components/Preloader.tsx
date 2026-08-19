// src/components/Preloader.tsx
import '../styles/preloader.css';

interface PreloaderProps {
  hidden?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ hidden = false }) => {
  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="preloader-inner">
        <img src="/logo-dark.png" alt="Loading" className="preloader-logo" />
      </div>
    </div>
  );
};

export default Preloader;