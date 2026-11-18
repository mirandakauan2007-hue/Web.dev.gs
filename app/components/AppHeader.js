'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Brand({ footer = false }) {
  return <a className={`brand-logo-link ${footer ? 'footer-logo' : ''}`} href="#inicio" aria-label="LotaTrem, início">
    <Image className="brand-logo brand-logo-light" src="/lota-trem-logo-light.png" alt="LotaTrem — Veja a lotação antes de sair" width={976} height={334} priority={!footer} />
    <Image className="brand-logo brand-logo-dark" src="/lota-trem-logo-dark.png" alt="" aria-hidden="true" width={976} height={334} priority={!footer} />
  </a>;
}

export { Brand };

export default function AppHeader() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('lotatrem-theme') || 'light';
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('lotatrem-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }

  return <header className="topbar"><Brand /><nav aria-label="Navegação principal"><a href="#consulta">Consultar</a><a href="#avisos">Avisos</a></nav><button className="theme-toggle" onClick={toggleTheme} aria-label={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾' : '☀'}<span>{theme === 'light' ? 'Modo escuro' : 'Modo claro'}</span></button></header>;
}
