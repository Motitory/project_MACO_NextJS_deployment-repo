import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from 'react';

import { resources } from './languageResources';

interface LanguageContextProps {
  language: 'ko' | 'ja';
  setLanguage: React.Dispatch<React.SetStateAction<'ko' | 'ja'>>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}): ReactElement => {
  const [language, setLanguage] = useState<'ko' | 'ja'>('ja');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageResources = () => {
  const { language } = useLanguage();

  return resources[language];
};
