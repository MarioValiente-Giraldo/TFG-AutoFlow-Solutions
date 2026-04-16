import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { chatAPI } from '../services/chatAPI';

interface ChatContextType {
  unreadCount: number;
  refreshUnread: () => void;
}

const ChatContext = createContext<ChatContextType>({ unreadCount: 0, refreshUnread: () => {} });

const POLL_INTERVAL = 5000;

export function ChatProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = useCallback(async () => {
    try {
      const { count } = await chatAPI.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // Silencioso
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }
    fetchUnread();
    const id = setInterval(fetchUnread, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [isAuthenticated, fetchUnread]);

  return (
    <ChatContext value={{ unreadCount, refreshUnread: fetchUnread }}>
      {children}
    </ChatContext>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
