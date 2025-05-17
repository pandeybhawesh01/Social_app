import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    { value: 'velvet-dusk', label: 'Velvet Dusk' },
    { value: 'slate-horizon', label: 'Slate Horizon' },
    { value: 'obsidian-flame', label: 'Obsidian Flame' },
    { value: 'bronze-dusk', label: 'Bronze Dusk' },
    { value: 'slate-indigo', label: 'Slate Indigo' },
  ];

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="w-full mb-6">
      <label
        htmlFor="theme-select"
        className="text-gray font-medium block text-center mb-2"
      >
        Select Theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className="w-full p-3 border border-bordergray rounded-lg bg-whitebg text-gray focus:outline-none focus:ring-2 focus:ring-focusblue transition duration-300 shadow-md"
      >
        {themes.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;