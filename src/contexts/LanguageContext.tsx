
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define supported languages
export type SupportedLanguage = 'en' | 'fr' | 'ar' | 'es' | 'it' | 'de' | 'ru' | 'ja' | 'zh';

export interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Simplified translations object for demo purposes
// In a real app, this would be much more extensive and likely loaded from separate files
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'app.name': 'HiveMarket',
    'nav.browse': 'Browse',
    'nav.post': 'Post Ad',
    'nav.signin': 'Sign In',
    'nav.signout': 'Sign Out',
    'nav.profile': 'Profile',
    'nav.listings': 'My Listings',
    'nav.favorites': 'Favorites',
    'nav.messages': 'Messages',
    'language.name': 'English',
    'browse.title': 'Browse Listings',
    'browse.filters': 'Filters',
    'browse.search': 'Search',
    'browse.sort': 'Sort by',
    'browse.categories': 'Categories',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
  },
  fr: {
    'app.name': 'HiveMarket',
    'nav.browse': 'Parcourir',
    'nav.post': 'Publier une annonce',
    'nav.signin': 'Se connecter',
    'nav.signout': 'Se déconnecter',
    'nav.profile': 'Profil',
    'nav.listings': 'Mes annonces',
    'nav.favorites': 'Favoris',
    'nav.messages': 'Messages',
    'language.name': 'Français',
    'browse.title': 'Parcourir les annonces',
    'browse.filters': 'Filtres',
    'browse.search': 'Rechercher',
    'browse.sort': 'Trier par',
    'browse.categories': 'Catégories',
    'footer.about': 'À propos de nous',
    'footer.contact': 'Contact',
    'footer.terms': "Conditions d'utilisation",
    'footer.privacy': 'Politique de confidentialité',
  },
  ar: {
    'app.name': 'هايف ماركت',
    'nav.browse': 'تصفح',
    'nav.post': 'نشر إعلان',
    'nav.signin': 'تسجيل الدخول',
    'nav.signout': 'تسجيل الخروج',
    'nav.profile': 'الملف الشخصي',
    'nav.listings': 'إعلاناتي',
    'nav.favorites': 'المفضلة',
    'nav.messages': 'الرسائل',
    'language.name': 'العربية',
    'browse.title': 'تصفح الإعلانات',
    'browse.filters': 'التصفية',
    'browse.search': 'بحث',
    'browse.sort': 'ترتيب حسب',
    'browse.categories': 'الفئات',
    'footer.about': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
  },
  es: {
    'app.name': 'HiveMarket',
    'nav.browse': 'Explorar',
    'nav.post': 'Publicar anuncio',
    'nav.signin': 'Iniciar sesión',
    'nav.signout': 'Cerrar sesión',
    'nav.profile': 'Perfil',
    'nav.listings': 'Mis anuncios',
    'nav.favorites': 'Favoritos',
    'nav.messages': 'Mensajes',
    'language.name': 'Español',
    'browse.title': 'Explorar anuncios',
    'browse.filters': 'Filtros',
    'browse.search': 'Buscar',
    'browse.sort': 'Ordenar por',
    'browse.categories': 'Categorías',
    'footer.about': 'Sobre nosotros',
    'footer.contact': 'Contacto',
    'footer.terms': 'Términos de servicio',
    'footer.privacy': 'Política de privacidad',
  },
  it: {
    'app.name': 'HiveMarket',
    'nav.browse': 'Sfoglia',
    'nav.post': 'Pubblica annuncio',
    'nav.signin': 'Accedi',
    'nav.signout': 'Esci',
    'nav.profile': 'Profilo',
    'nav.listings': 'I miei annunci',
    'nav.favorites': 'Preferiti',
    'nav.messages': 'Messaggi',
    'language.name': 'Italiano',
    'browse.title': 'Sfoglia annunci',
    'browse.filters': 'Filtri',
    'browse.search': 'Cerca',
    'browse.sort': 'Ordina per',
    'browse.categories': 'Categorie',
    'footer.about': 'Chi siamo',
    'footer.contact': 'Contatti',
    'footer.terms': 'Termini di servizio',
    'footer.privacy': 'Politica sulla privacy',
  },
  de: {
    'app.name': 'HiveMarket',
    'nav.browse': 'Durchsuchen',
    'nav.post': 'Anzeige aufgeben',
    'nav.signin': 'Anmelden',
    'nav.signout': 'Abmelden',
    'nav.profile': 'Profil',
    'nav.listings': 'Meine Anzeigen',
    'nav.favorites': 'Favoriten',
    'nav.messages': 'Nachrichten',
    'language.name': 'Deutsch',
    'browse.title': 'Anzeigen durchsuchen',
    'browse.filters': 'Filter',
    'browse.search': 'Suchen',
    'browse.sort': 'Sortieren nach',
    'browse.categories': 'Kategorien',
    'footer.about': 'Über uns',
    'footer.contact': 'Kontakt',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.privacy': 'Datenschutzrichtlinie',
  },
  ru: {
    'app.name': 'ХайвМаркет',
    'nav.browse': 'Просмотр',
    'nav.post': 'Разместить объявление',
    'nav.signin': 'Войти',
    'nav.signout': 'Выйти',
    'nav.profile': 'Профиль',
    'nav.listings': 'Мои объявления',
    'nav.favorites': 'Избранное',
    'nav.messages': 'Сообщения',
    'language.name': 'Русский',
    'browse.title': 'Просмотр объявлений',
    'browse.filters': 'Фильтры',
    'browse.search': 'Поиск',
    'browse.sort': 'Сортировать по',
    'browse.categories': 'Категории',
    'footer.about': 'О нас',
    'footer.contact': 'Контакты',
    'footer.terms': 'Условия использования',
    'footer.privacy': 'Политика конфиденциальности',
  },
  ja: {
    'app.name': 'ハイブマーケット',
    'nav.browse': '閲覧',
    'nav.post': '広告を投稿',
    'nav.signin': 'サインイン',
    'nav.signout': 'サインアウト',
    'nav.profile': 'プロフィール',
    'nav.listings': '自分の広告',
    'nav.favorites': 'お気に入り',
    'nav.messages': 'メッセージ',
    'language.name': '日本語',
    'browse.title': '広告を閲覧',
    'browse.filters': 'フィルター',
    'browse.search': '検索',
    'browse.sort': '並べ替え',
    'browse.categories': 'カテゴリ',
    'footer.about': '会社概要',
    'footer.contact': 'お問い合わせ',
    'footer.terms': '利用規約',
    'footer.privacy': 'プライバシーポリシー',
  },
  zh: {
    'app.name': '蜂巢市场',
    'nav.browse': '浏览',
    'nav.post': '发布广告',
    'nav.signin': '登录',
    'nav.signout': '登出',
    'nav.profile': '个人资料',
    'nav.listings': '我的广告',
    'nav.favorites': '收藏',
    'nav.messages': '消息',
    'language.name': '中文',
    'browse.title': '浏览广告',
    'browse.filters': '筛选',
    'browse.search': '搜索',
    'browse.sort': '排序方式',
    'browse.categories': '类别',
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'footer.terms': '服务条款',
    'footer.privacy': '隐私政策',
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as SupportedLanguage;
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Set the HTML dir attribute for RTL languages
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
