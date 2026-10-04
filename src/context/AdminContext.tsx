import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import initialPositions from '../positions.json';

const DEFAULT_SECTIONS = ['hero', 'services', 'projects', 'journey', 'about', 'contact', 'faq'];
const ADMIN_PASSWORD = 'uzair2444';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  isAuthenticated: boolean;
  isPasswordModalOpen: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  verifyPassword: (password: string) => boolean;
  logout: () => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  sectionOrder: string[];
  moveSection: (id: string, direction: 'up' | 'down') => void;
  elementOffsets: Record<string, Record<string, { x: number; y: number }>>;
  moveElement: (sectionId: string, elementId: string, direction: 'up' | 'down' | 'left' | 'right') => void;
  resetElement: (sectionId: string, elementId: string) => void;
  resetAllToCode: () => void;
  getElementOffset: (sectionId: string, elementId: string) => { x: number; y: number };
  saveStatus: 'idle' | 'saving' | 'saved' | 'publishing' | 'published' | 'error';
  publishWebsite: () => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      const isAuth = sessionStorage.getItem('admin_auth') === 'true';
      return isAuth && loadFromStorage('admin_mode', false);
    } catch {
      return false;
    }
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const getInitialOffsets = (): Record<string, Record<string, { x: number; y: number }>> => {
    const stored = loadFromStorage<Record<string, Record<string, { x: number; y: number }>> | null>('element_offsets', null);
    if (stored && Object.keys(stored).length > 0) return stored;
    if (initialPositions?.elementOffsets && Object.keys(initialPositions.elementOffsets).length > 0) {
      return initialPositions.elementOffsets as Record<string, Record<string, { x: number; y: number }>>;
    }
    return {};
  };

  const getInitialSections = (): string[] => {
    const stored = loadFromStorage<string[] | null>('section_order', null);
    if (stored && stored.length > 0) return stored;
    if (initialPositions?.sectionOrder && initialPositions.sectionOrder.length > 0) {
      return initialPositions.sectionOrder;
    }
    return DEFAULT_SECTIONS;
  };

  const [sectionOrder, setSectionOrder] = useState<string[]>(getInitialSections);
  const [elementOffsets, setElementOffsets] = useState<Record<string, Record<string, { x: number; y: number }>>>(getInitialOffsets);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'publishing' | 'published' | 'error'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('admin_mode', JSON.stringify(isAdminMode));
    }
  }, [isAdminMode, isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('section_order', JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  useEffect(() => {
    localStorage.setItem('element_offsets', JSON.stringify(elementOffsets));
  }, [elementOffsets]);

  // Auto-save to src/positions.json and root positions.json via API (only when authenticated)
  useEffect(() => {
    if (!isAuthenticated) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveStatus('saving');

    saveTimerRef.current = setTimeout(() => {
      fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementOffsets, sectionOrder }),
      })
        .then(res => res.json())
        .then(() => setSaveStatus('saved'))
        .catch(() => setSaveStatus('error'));

      setTimeout(() => {
        setSaveStatus(prev => prev === 'saved' ? 'idle' : prev);
      }, 2500);
    }, 400);
  }, [elementOffsets, sectionOrder, isAuthenticated]);

  const verifyPassword = useCallback((input: string): boolean => {
    if (input.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      setIsPasswordModalOpen(false);
      try {
        sessionStorage.setItem('admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setIsSettingsModalOpen(false);
    setIsPasswordModalOpen(false);
    try {
      sessionStorage.removeItem('admin_auth');
      localStorage.setItem('admin_mode', 'false');
    } catch {}
  }, []);

  const openPasswordModal = useCallback(() => {
    setIsPasswordModalOpen(true);
  }, []);

  const closePasswordModal = useCallback(() => {
    setIsPasswordModalOpen(false);
  }, []);

  const toggleAdminMode = useCallback(() => {
    if (!isAuthenticated) {
      setIsPasswordModalOpen(true);
      return;
    }
    setIsAdminMode(prev => !prev);
  }, [isAuthenticated]);

  const openSettingsModal = useCallback(() => {
    if (!isAuthenticated) {
      setIsPasswordModalOpen(true);
      return;
    }
    setIsSettingsModalOpen(true);
  }, [isAuthenticated]);

  const closeSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  const moveSection = useCallback((id: string, direction: 'up' | 'down') => {
    setSectionOrder(prev => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const updated = [...prev];
      [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
      return updated;
    });
  }, []);

  const getElementOffset = useCallback((sectionId: string, elementId: string): { x: number; y: number } => {
    return elementOffsets[sectionId]?.[elementId] ?? { x: 0, y: 0 };
  }, [elementOffsets]);

  const moveElement = useCallback((sectionId: string, elementId: string, direction: 'up' | 'down' | 'left' | 'right') => {
    const STEP = 5;
    setElementOffsets(prev => {
      const section = prev[sectionId] || {};
      const current = section[elementId] || { x: 0, y: 0 };
      const updated = { ...current };
      if (direction === 'up') updated.y -= STEP;
      if (direction === 'down') updated.y += STEP;
      if (direction === 'left') updated.x -= STEP;
      if (direction === 'right') updated.x += STEP;
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [elementId]: updated,
        },
      };
    });
  }, []);

  const resetElement = useCallback((sectionId: string, elementId: string) => {
    setElementOffsets(prev => {
      const section = prev[sectionId] || {};
      const updated = { ...section };
      delete updated[elementId];
      return { ...prev, [sectionId]: updated };
    });
  }, []);

  const resetAllToCode = useCallback(() => {
    localStorage.removeItem('element_offsets');
    localStorage.removeItem('section_order');
    const defaultOffsets = (initialPositions?.elementOffsets as Record<string, Record<string, { x: number; y: number }>>) || {};
    const defaultSections = initialPositions?.sectionOrder || DEFAULT_SECTIONS;
    setElementOffsets(defaultOffsets);
    setSectionOrder(defaultSections);

    fetch('/api/positions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ elementOffsets: defaultOffsets, sectionOrder: defaultSections }),
    });
  }, []);

  const publishWebsite = useCallback(async (): Promise<boolean> => {
    setSaveStatus('publishing');
    try {
      // 1. Ensure source file src/positions.json is updated
      await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementOffsets, sectionOrder }),
      });

      // 2. Trigger immediate production compile to dist/
      const res = await fetch('/api/publish', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to publish');
      }

      setSaveStatus('published');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 4000);
      return true;
    } catch (err) {
      console.error('[AdminContext] Publish error:', err);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 4000);
      return false;
    }
  }, [elementOffsets, sectionOrder]);

  return (
    <AdminContext.Provider value={{
      isAdminMode,
      toggleAdminMode,
      isAuthenticated,
      isPasswordModalOpen,
      openPasswordModal,
      closePasswordModal,
      verifyPassword,
      logout,
      isSettingsModalOpen,
      openSettingsModal,
      closeSettingsModal,
      sectionOrder,
      moveSection,
      elementOffsets,
      moveElement,
      resetElement,
      resetAllToCode,
      getElementOffset,
      saveStatus,
      publishWebsite,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

export { DEFAULT_SECTIONS };
