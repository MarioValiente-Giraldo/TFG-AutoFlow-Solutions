import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { valorarAutomatizacion } from '../../services/automatizacionesAPI';
import type { Valoracion } from '../../types';
import { styles } from './StarRatingStyles';

interface Props {
  idAutomatizacion: string;
  valoracion?: Valoracion;
  onRefresh: () => void;
}

const StarRating = ({ idAutomatizacion, valoracion, onRefresh }: Props) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState(0);
  const [seleccionada, setSeleccionada] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnviar = async () => {
    if (seleccionada === 0) return;
    setLoading(true);
    setError('');
    try {
      await valorarAutomatizacion(idAutomatizacion, seleccionada, comentario);
      onRefresh();
    } catch {
      setError('Error al enviar la valoración');
    } finally {
      setLoading(false);
    }
  };

  if (valoracion) {
    return (
      <div className={`${styles.wrapper} ${styles.wrapperBorder(theme)}`}>
        <p className={styles.label(theme)}>Tu valoración</p>
        <div className={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} className={`text-2xl ${n <= valoracion.puntuacion ? 'text-yellow-400' : 'text-gray-500'}`}>
              ★
            </span>
          ))}
        </div>
        {valoracion.comentario && (
          <p className={styles.readonlyComment(theme)}>{valoracion.comentario}</p>
        )}
        <p className={styles.readonlyDate(theme)}>
          {new Date(valoracion.fecha).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric',
          })}
        </p>
      </div>
    );
  }

  const display = hover || seleccionada;

  return (
    <div className={`${styles.wrapper} ${styles.wrapperBorder(theme)}`}>
      <p className={styles.label(theme)}>Valora el servicio</p>
      <div className={styles.starsRow} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map(n => (
          <span
            key={n}
            className={`text-2xl cursor-pointer transition-colors duration-100 ${n <= display ? 'text-yellow-400' : 'text-gray-500'}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setSeleccionada(n)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className={styles.textarea(theme)}
        rows={2}
        placeholder="Comentario opcional..."
        value={comentario}
        onChange={e => setComentario(e.target.value)}
      />
      <button
        className={styles.btnEnviar}
        onClick={handleEnviar}
        disabled={loading || seleccionada === 0}
      >
        {loading ? 'Enviando...' : 'Enviar valoración'}
      </button>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default StarRating;
