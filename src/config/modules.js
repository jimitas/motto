/**
 * Module configuration registry
 * This replaces the hardcoded switch statement in index.js
 */

export const moduleConfig = {
  cren: {
    id: 'cren',
    title: 'Classroom English',
    module: () => import('../../01cren.js'),
    category: 'language'
  },
  enwo: {
    id: 'enwo',
    title: 'English words',
    module: () => import('../../02enwo.js'),
    category: 'language'
  },
  subl: {
    id: 'subl',
    title: 'すうずぶろっく',
    module: () => import('../../03subl.js'),
    category: 'math'
  },
  kata: {
    id: 'kata',
    title: 'カタカナのれんしゅう',
    module: () => import('../../04kata.js'),
    category: 'language'
  },
  kbou: {
    id: 'kbou',
    title: 'かぞえぼう',
    module: () => import('../../13kbou.js'),
    category: 'math'
  },
  toke: {
    id: 'toke',
    title: 'とけい',
    module: () => import('../../18toke.js'),
    category: 'math'
  },
  ham2: {
    id: 'ham2',
    title: 'けんばんハーモニカ かんたん',
    module: () => import('../../21hamo.js'),
    category: 'music'
  },
  kenb: {
    id: 'kenb',
    title: 'けんばんハーモニカ2',
    module: () => import('../../05kenb.js'),
    category: 'music'
  },
  mokn: {
    id: 'mokn',
    title: 'もっきん',
    module: () => import('../../22mokn.js'),
    category: 'music'
  },
  tekn: {
    id: 'tekn',
    title: 'てっきん',
    module: () => import('../../23tekn.js'),
    category: 'music'
  },
  tahi: {
    id: 'tahi',
    title: 'たし算のひっ算',
    module: () => import('../../14tahi.js'),
    category: 'math'
  },
  hihi: {
    id: 'hihi',
    title: 'ひき算のひっ算',
    module: () => import('../../15hihi.js'),
    category: 'math'
  },
  kuku: {
    id: 'kuku',
    title: '九九のれんしゅう',
    module: () => import('../../06kuku.js'),
    category: 'math'
  },
  masu: {
    id: 'masu',
    title: 'せんやマスのいろぬり',
    module: () => import('../../17masu.js'),
    category: 'art'
  },
  hyou: {
    id: 'hyou',
    title: '九九のひょう',
    module: () => import('../../11hyou.js'),
    category: 'math'
  },
  reco: {
    id: 'reco',
    title: 'リコーダー',
    module: () => import('../../07reco.js'),
    category: 'music'
  },
  rec2: {
    id: 'rec2',
    title: 'リコーダー2',
    module: () => import('../../20rec2.js'),
    category: 'music'
  },
  kah1: {
    id: 'kah1',
    title: 'かけ算の筆算１',
    module: () => import('../../16kah1.js'),
    category: 'math'
  },
  kah2: {
    id: 'kah2',
    title: 'かけ算の筆算２',
    module: () => import('../../19kah2.js'),
    category: 'math'
  },
  roma: {
    id: 'roma',
    title: 'ローマ字のれんしゅう',
    module: () => import('../../08roma.js'),
    category: 'language'
  },
  kyot: {
    id: 'kyot',
    title: '京都市の１１区',
    module: () => import('../../09kyot.js'),
    category: 'geography'
  },
  todo: {
    id: 'todo',
    title: '都道府県をおぼえよう',
    module: () => import('../../10todo.js'),
    category: 'geography'
  },
  fusi: {
    id: 'fusi',
    title: 'ふしづくり4年',
    module: () => import('../../12fusi.js'),
    category: 'music'
  },
  gktn: {
    id: 'gktn',
    title: '音楽記号を覚えよう',
    module: () => import('../../24gktn.js'),
    category: 'music'
  },
  otoo: {
    id: 'otoo',
    title: '音を出そう',
    module: () => import('../../25otoo.js'),
    category: 'music'
  },
  waon: {
    id: 'waon',
    title: '和音を出そう',
    module: () => import('../../26waon.js'),
    category: 'music'
  },
  aray: {
    id: 'aray',
    title: 'かけ算アレイ図',
    module: () => import('../../27aray.js'),
    category: 'math'
  },
  metr: {
    id: 'metr',
    title: 'メトロノーム',
    module: () => import('../../28metr.js'),
    category: 'music'
  },
  kane: {
    id: 'kane',
    title: 'おかね',
    module: () => import('../../29kane.js'),
    category: 'math'
  }
};

export const getModulesByCategory = () => {
  const categories = {};
  Object.values(moduleConfig).forEach(module => {
    if (!categories[module.category]) {
      categories[module.category] = [];
    }
    categories[module.category].push(module);
  });
  return categories;
};

export const getModuleIds = () => Object.keys(moduleConfig);
export const getModule = (id) => moduleConfig[id];