export type Language = 'en' | 'ar' | 'so';

export interface Tasbiix {
  id: string;
  name: {
    en: string;
    ar: string;
    so: string;
  };
  arabic: string;
  currentCount: number;
  dailyCount: number;
  lifetimeCount: number;
  goal: number;
  isFavorite: boolean;
  isCustom: boolean;
}

export interface UserStats {
  lastActiveDate: string; // ISO string
  streak: number;
  dailyHistory: Record<string, number>; // date string -> total count
}

export interface AppSettings {
  language: Language;
  theme: 'light' | 'dark' | 'system';
  vibrationEnabled: boolean;
  soundEnabled: boolean;
}

export const PRELOADED_TASBIIX: Tasbiix[] = [
  {
    id: 'astaghfirullah',
    name: { en: 'Astaghfirullah', ar: 'أستغفر الله', so: 'Astaghfirullah' },
    arabic: 'أَسْتَغْفِرُ اللهَ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: true,
    isCustom: false,
  },
  {
    id: 'astaghfirullah-long',
    name: { en: 'Astaghfirullah al-Azeem', ar: 'أستغفر الله العظيم', so: 'Astaghfirullah al-Azeem' },
    arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'subhanallah',
    name: { en: 'SubhanAllah', ar: 'سبحان الله', so: 'SubhanAllah' },
    arabic: 'سُبْحَانَ اللهِ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: true,
    isCustom: false,
  },
  {
    id: 'alhamdulillah',
    name: { en: 'Alhamdulillah', ar: 'الحمد لله', so: 'Alhamdulillah' },
    arabic: 'الْحَمْدُ لِلَّهِ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: true,
    isCustom: false,
  },
  {
    id: 'allahu-akbar',
    name: { en: 'Allahu Akbar', ar: 'الله أكبر', so: 'Allahu Akbar' },
    arabic: 'اللهُ أَكْبَرُ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: true,
    isCustom: false,
  },
  {
    id: 'la-ilaha-illa-allah',
    name: { en: 'La ilaha illa Allah', ar: 'لا إله إلا الله', so: 'La ilaha illa Allah' },
    arabic: 'لَا إِلَهَ إِلَّا اللهُ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: true,
    isCustom: false,
  },
  {
    id: 'allahumma-ainni',
    name: { en: "Allahumma a'inni", ar: 'اللهم أعني', so: "Allahumma a'inni" },
    arabic: 'اللهم اعني على ذكرك وشكرك وحسن عبادتك',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'subhanallah-wa-bihamdihi',
    name: { en: 'SubhanAllah wa bihamdihi', ar: 'سبحان الله وبحمده', so: 'SubhanAllah wa bihamdihi' },
    arabic: 'سبحان الله و بحمده',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 100,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'rabbana-atina',
    name: { en: 'Rabbana atina', ar: 'ربنا آتنا', so: 'Rabbana atina' },
    arabic: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'subhanallah-al-azeem',
    name: { en: 'SubhanAllah al-Azeem', ar: 'سبحان الله العظيم', so: 'SubhanAllah al-Azeem' },
    arabic: 'سبحان الله العظيم',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 100,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'allahumma-tawbah',
    name: { en: 'Allahumma as\'aluka tawbah', ar: 'اللهم أسألك توبة', so: 'Allahumma as\'aluka tawbah' },
    arabic: 'اللهم اسألك توبه قبل الموت',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'la-hawla',
    name: { en: 'La hawla wala quwwata', ar: 'لا حول ولا قوة', so: 'La hawla wala quwwata' },
    arabic: 'لا حَوْلَ وَلا قُوَّةَ إِلَّا بِاللَّهِ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 100,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'allahumma-al-jannah',
    name: { en: 'Allahumma as\'aluka al-Jannah', ar: 'اللهم أسألك الجنة', so: 'Allahumma as\'aluka al-Jannah' },
    arabic: 'اللهم اسألك الجنة',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 33,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'la-ilaha-illa-anta',
    name: { en: 'La ilaha illa anta', ar: 'لا إله إلا أنت', so: 'La ilaha illa anta' },
    arabic: 'لا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 100,
    isFavorite: false,
    isCustom: false,
  },
  {
    id: 'allahumma-ajirni',
    name: { en: 'Allahumma ajirni', ar: 'اللهم أجرني', so: 'Allahumma ajirni' },
    arabic: 'اللهم اجرني من النار',
    currentCount: 0,
    dailyCount: 0,
    lifetimeCount: 0,
    goal: 7,
    isFavorite: false,
    isCustom: false,
  },
];

export const TRANSLATIONS = {
  en: {
    counter: 'Counter',
    tasbiix: 'Tasbiix',
    stats: 'Statistics',
    settings: 'Settings',
    adhkar: 'Adhkar',
    daily: 'Daily',
    lifetime: 'Lifetime',
    goal: 'Goal',
    reset: 'Reset',
    resetSession: 'Reset Session',
    resetDaily: 'Reset Daily',
    resetAll: 'Full Reset',
    addCustom: 'Add Custom Dhikr',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    name: 'Name',
    arabicText: 'Arabic Text (Optional)',
    streak: 'Streak',
    days: 'days',
    language: 'Language',
    theme: 'Theme',
    vibration: 'Vibration',
    sound: 'Sound',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    morning: 'Morning Adhkar',
    evening: 'Evening Adhkar',
    congrats: 'Goal Reached!',
    confirmReset: 'Are you sure you want to reset everything?',
  },
  ar: {
    counter: 'العداد',
    tasbiix: 'تسبيح',
    stats: 'الإحصائيات',
    settings: 'الإعدادات',
    adhkar: 'الأذكار',
    daily: 'يومي',
    lifetime: 'مدى الحياة',
    goal: 'الهدف',
    reset: 'إعادة ضبط',
    resetSession: 'إعادة ضبط الجلسة',
    resetDaily: 'إعادة ضبط اليومي',
    resetAll: 'إعادة ضبط كاملة',
    addCustom: 'إضافة ذكر مخصص',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    name: 'الاسم',
    arabicText: 'النص العربي (اختياري)',
    streak: 'سلسلة',
    days: 'أيام',
    language: 'اللغة',
    theme: 'المظهر',
    vibration: 'الاهتزاز',
    sound: 'الصوت',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    morning: 'أذكار الصباح',
    evening: 'أذكار المساء',
    congrats: 'تم الوصول للهدف!',
    confirmReset: 'هل أنت متأكد أنك تريد إعادة ضبط كل شيء؟',
  },
  so: {
    counter: 'Tiriyaha',
    tasbiix: 'Tasbiix',
    stats: 'Istaatistikada',
    settings: 'Settings',
    adhkar: 'Adkaar',
    daily: 'Maalinle',
    lifetime: 'Guud ahaan',
    goal: 'Hadafka',
    reset: 'Dib u bilaab',
    resetSession: 'Dib u bilaab fadhiga',
    resetDaily: 'Dib u bilaab maalinta',
    resetAll: 'Dib u bilaab dhammaan',
    addCustom: 'Ku dar Dikri cusub',
    edit: 'Wax ka beddel',
    delete: 'Tirtir',
    save: 'Keydi',
    cancel: 'Iska daa',
    name: 'Magaca',
    arabicText: 'Qoraalka Carabiga',
    streak: 'Xiriirka',
    days: 'maalmood',
    language: 'Luqadda',
    theme: 'Muuqaalka',
    vibration: 'Gariirka',
    sound: 'Codka',
    light: 'Iftiin',
    dark: 'Mugdi',
    system: 'System',
    morning: 'Adkaarta Subaxda',
    evening: 'Adkaarta Habeenka',
    congrats: 'Hadafka waa la gaaray!',
    confirmReset: 'Ma hubtaa inaad rabto inaad wax walba dib u bilowdo?',
  },
};

export const ADHKAR = {
  morning: [
    {
      id: 'm1',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner...',
      count: 1
    },
    {
      id: 'm2',
      arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
      translation: 'O Allah, by your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and by Your leave we die, and unto You is our resurrection.',
      count: 1
    }
  ],
  evening: [
    {
      id: 'e1',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner...',
      count: 1
    },
    {
      id: 'e2',
      arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
      translation: 'O Allah, by your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and by Your leave we die, and unto You is our return.',
      count: 1
    }
  ]
};

