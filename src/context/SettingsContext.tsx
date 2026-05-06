import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import i18n from "../i18n.ts";


interface SettingsContextType {
  theme: string;
  setTheme: (theme: string) => void;
  lang: string;
  setLang: (lang: string) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "dark"
  );
  const [lang, setLang] = useState<string>(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);


  useEffect(() => {
  document.body.classList.remove("light");
  if (theme === "light") {
    document.body.classList.add("light");
  } 
  localStorage.setItem("theme", theme);

  }, [theme]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, lang, setLang }}>
      {children}
    </SettingsContext.Provider>
  );
};
export const useSettings = () => useContext(SettingsContext);


