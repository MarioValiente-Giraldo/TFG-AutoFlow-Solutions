import { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './ChatInputStyles';

const MAX = 2000;

interface ChatInputProps {
  onEnviar: (contenido: string) => Promise<void>;
  loading: boolean;
}

const ChatInput = ({ onEnviar, loading }: ChatInputProps) => {
  const { theme } = useTheme();
  const [texto, setTexto] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const puedeEnviar = texto.trim().length > 0 && !loading;

  const handleEnviar = async () => {
    if (!puedeEnviar) return;
    await onEnviar(texto.trim());
    setTexto('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  return (
    <div className={styles.wrapper(theme)}>
      <div className={styles.row}>
        <textarea
          ref={textareaRef}
          className={styles.textarea(theme)}
          placeholder="Escribe un mensaje... (Shift+Enter para salto de línea)"
          value={texto}
          maxLength={MAX}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className={styles.btn(!puedeEnviar)}
          onClick={handleEnviar}
          disabled={!puedeEnviar}
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
      {texto.length > MAX * 0.8 && (
        <p className={styles.counter(texto.length > MAX * 0.95, theme)}>
          {texto.length}/{MAX}
        </p>
      )}
    </div>
  );
};

export default ChatInput;
