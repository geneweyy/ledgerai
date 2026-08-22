import type { Language } from "./types";

export type DictKey =
  | "home"
  | "income"
  | "expense"
  | "net"
  | "today"
  | "logTransaction"
  | "photographReceipt"
  | "speakTransaction"
  | "catalog"
  | "reports"
  | "settings"
  | "entriesUsed"
  | "limitReached"
  | "upgrade"
  | "save"
  | "cancel"
  | "delete"
  | "edit"
  | "confirm"
  | "appName"
  | "tagline"
  | "chooseLanguage"
  | "getStarted"
  | "didIMakeMoney"
  | "recentEntries"
  | "noEntriesToday"
  | "tapSavedItem"
  | "quantity"
  | "runningTotal"
  | "amount"
  | "category"
  | "note"
  | "vendor"
  | "back"
  | "tryAgain"
  | "enterManually"
  | "simulatedLabel"
  | "listening"
  | "processing"
  | "readingReceipt"
  | "capture"
  | "couldntReadClearly"
  | "didntCatchThat"
  | "addCatalogItem"
  | "noCatalogItems"
  | "name"
  | "price"
  | "deleteConfirm"
  | "resetDemoData"
  | "resetConfirm"
  | "tier"
  | "turnover"
  | "language"
  | "taxCompliance"
  | "lhdnIncomeTax"
  | "sstReporting"
  | "myInvois"
  | "thisWeek"
  | "thisMonth"
  | "noEntriesInPeriod"
  | "invalidAmount"
  | "invalidQuantity"
  | "requiredField"
  | "recommended"
  | "aiModel"
  | "viewDetails"
  | "shareWhatsapp"
  | "generateInvoice"
  | "close"
  | "manual";

type Dict = Record<DictKey, string>;

export const dictionaries: Record<Language, Dict> = {
  en: {
    home: "Home",
    income: "Income",
    expense: "Expense",
    net: "Net",
    today: "Today",
    logTransaction: "Log Transaction",
    photographReceipt: "Photograph a receipt",
    speakTransaction: "Speak a transaction",
    catalog: "Catalog",
    reports: "Reports",
    settings: "Settings",
    entriesUsed: "entries used",
    limitReached: "Limit reached",
    upgrade: "Upgrade",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    confirm: "Confirm",
    appName: "LedgerAI",
    tagline: "Accounting That Disappears.",
    chooseLanguage: "Choose your language",
    getStarted: "Get started",
    didIMakeMoney: "Did I make money today?",
    recentEntries: "Recent entries",
    noEntriesToday: "No entries yet today. Log your first sale below.",
    tapSavedItem: "Tap a saved catalog item",
    quantity: "Quantity",
    runningTotal: "Total",
    amount: "Amount",
    category: "Category",
    note: "Note",
    vendor: "Vendor",
    back: "Back",
    tryAgain: "Try again",
    enterManually: "Enter manually instead",
    simulatedLabel: "Simulated — no AI connected in this prototype",
    listening: "Listening…",
    processing: "Processing speech…",
    readingReceipt: "AI reading receipt…",
    capture: "Capture",
    couldntReadClearly: "Couldn't read that clearly",
    didntCatchThat: "Didn't catch that",
    addCatalogItem: "Add a catalog item",
    noCatalogItems: "No catalog items yet",
    name: "Name",
    price: "Price",
    deleteConfirm: "Are you sure you want to delete this? This cannot be undone.",
    resetDemoData: "Reset demo data",
    resetConfirm: "This will erase all your data and restore the original demo data. Continue?",
    tier: "Plan",
    turnover: "Annual turnover (RM)",
    language: "Language",
    taxCompliance: "Tax & Compliance",
    lhdnIncomeTax: "LHDN Income Tax",
    sstReporting: "SST Reporting",
    myInvois: "MyInvois e-Invoicing",
    thisWeek: "This week",
    thisMonth: "This month",
    noEntriesInPeriod: "No entries in this period.",
    invalidAmount: "Enter an amount greater than 0",
    invalidQuantity: "Quantity must be a whole number of at least 1",
    requiredField: "This field is required",
    recommended: "Recommended",
    aiModel: "AI model",
    viewDetails: "View details",
    shareWhatsapp: "Share via WhatsApp",
    generateInvoice: "Generate e-Invoice",
    close: "Close",
    manual: "Manual",
  },
  bm: {
    home: "Utama",
    income: "Pendapatan",
    expense: "Perbelanjaan",
    net: "Bersih",
    today: "Hari Ini",
    logTransaction: "Catat Transaksi",
    photographReceipt: "Ambil gambar resit",
    speakTransaction: "Sebut transaksi",
    catalog: "Katalog",
    reports: "Laporan",
    settings: "Tetapan",
    entriesUsed: "catatan digunakan",
    limitReached: "Had dicapai",
    upgrade: "Naik Taraf",
    save: "Simpan",
    cancel: "Batal",
    delete: "Padam",
    edit: "Sunting",
    confirm: "Sahkan",
    appName: "LedgerAI",
    tagline: "Perakaunan Yang Hilang.",
    chooseLanguage: "Pilih bahasa anda",
    getStarted: "Mula",
    didIMakeMoney: "Adakah saya untung hari ini?",
    recentEntries: "Catatan terkini",
    noEntriesToday: "Belum ada catatan hari ini. Catat jualan pertama anda di bawah.",
    tapSavedItem: "Ketik item katalog tersimpan",
    quantity: "Kuantiti",
    runningTotal: "Jumlah",
    amount: "Jumlah",
    category: "Kategori",
    note: "Nota",
    vendor: "Penjual",
    back: "Kembali",
    tryAgain: "Cuba lagi",
    enterManually: "Masukkan secara manual",
    simulatedLabel: "Simulasi — tiada AI sebenar dalam prototaip ini",
    listening: "Mendengar…",
    processing: "Memproses pertuturan…",
    readingReceipt: "AI membaca resit…",
    capture: "Tangkap",
    couldntReadClearly: "Tidak dapat membaca dengan jelas",
    didntCatchThat: "Tidak dapat difahami",
    addCatalogItem: "Tambah item katalog",
    noCatalogItems: "Belum ada item katalog",
    name: "Nama",
    price: "Harga",
    deleteConfirm: "Adakah anda pasti mahu memadam ini? Tindakan ini tidak boleh dibatalkan.",
    resetDemoData: "Set semula data demo",
    resetConfirm: "Ini akan memadam semua data anda dan memulihkan data demo asal. Teruskan?",
    tier: "Pelan",
    turnover: "Perolehan tahunan (RM)",
    language: "Bahasa",
    taxCompliance: "Cukai & Pematuhan",
    lhdnIncomeTax: "Cukai Pendapatan LHDN",
    sstReporting: "Pelaporan SST",
    myInvois: "e-Invois MyInvois",
    thisWeek: "Minggu ini",
    thisMonth: "Bulan ini",
    noEntriesInPeriod: "Tiada catatan dalam tempoh ini.",
    invalidAmount: "Masukkan jumlah lebih daripada 0",
    invalidQuantity: "Kuantiti mestilah nombor bulat sekurang-kurangnya 1",
    requiredField: "Medan ini diperlukan",
    recommended: "Disyorkan",
    aiModel: "Model AI",
    viewDetails: "Lihat butiran",
    shareWhatsapp: "Kongsi melalui WhatsApp",
    generateInvoice: "Jana e-Invois",
    close: "Tutup",
    manual: "Manual",
  },
  zh: {
    home: "首页",
    income: "收入",
    expense: "支出",
    net: "净额",
    today: "今天",
    logTransaction: "记录交易",
    photographReceipt: "拍摄收据",
    speakTransaction: "语音输入交易",
    catalog: "商品目录",
    reports: "报告",
    settings: "设置",
    entriesUsed: "已用记录",
    limitReached: "已达上限",
    upgrade: "升级",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    confirm: "确认",
    appName: "LedgerAI",
    tagline: "隐形的记账方式。",
    chooseLanguage: "选择您的语言",
    getStarted: "开始使用",
    didIMakeMoney: "今天赚钱了吗？",
    recentEntries: "最近记录",
    noEntriesToday: "今天还没有记录。请在下方记录您的第一笔销售。",
    tapSavedItem: "点击已保存的商品",
    quantity: "数量",
    runningTotal: "总计",
    amount: "金额",
    category: "类别",
    note: "备注",
    vendor: "商家",
    back: "返回",
    tryAgain: "重试",
    enterManually: "手动输入",
    simulatedLabel: "模拟功能 — 此原型未连接真实AI",
    listening: "聆听中…",
    processing: "正在处理语音…",
    readingReceipt: "AI 正在读取收据…",
    capture: "拍摄",
    couldntReadClearly: "无法清楚读取",
    didntCatchThat: "未能识别",
    addCatalogItem: "添加商品",
    noCatalogItems: "暂无商品",
    name: "名称",
    price: "价格",
    deleteConfirm: "确定要删除吗？此操作无法撤销。",
    resetDemoData: "重置演示数据",
    resetConfirm: "这将清除您所有的数据并恢复原始演示数据。是否继续？",
    tier: "套餐",
    turnover: "年营业额 (RM)",
    language: "语言",
    taxCompliance: "税务与合规",
    lhdnIncomeTax: "LHDN 所得税",
    sstReporting: "SST 报税",
    myInvois: "MyInvois 电子发票",
    thisWeek: "本周",
    thisMonth: "本月",
    noEntriesInPeriod: "此期间没有记录。",
    invalidAmount: "请输入大于0的金额",
    invalidQuantity: "数量必须是至少为1的整数",
    requiredField: "此字段为必填项",
    recommended: "推荐",
    aiModel: "AI 模型",
    viewDetails: "查看详情",
    shareWhatsapp: "通过 WhatsApp 分享",
    generateInvoice: "生成电子发票",
    close: "关闭",
    manual: "手动",
  },
  ta: {
    home: "முகப்பு",
    income: "வருமானம்",
    expense: "செலவு",
    net: "நிகரம்",
    today: "இன்று",
    logTransaction: "பரிவர்த்தனையை பதிவு செய்",
    photographReceipt: "ரசீதை புகைப்படம் எடு",
    speakTransaction: "பரிவர்த்தனையை பேசு",
    catalog: "பட்டியல்",
    reports: "அறிக்கைகள்",
    settings: "அமைப்புகள்",
    entriesUsed: "பதிவுகள் பயன்படுத்தப்பட்டன",
    limitReached: "வரம்பு எட்டப்பட்டது",
    upgrade: "மேம்படுத்து",
    save: "சேமி",
    cancel: "ரத்து செய்",
    delete: "நீக்கு",
    edit: "திருத்து",
    confirm: "உறுதிப்படுத்து",
    appName: "LedgerAI",
    tagline: "மறைந்துவிடும் கணக்கியல்.",
    chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    getStarted: "தொடங்கு",
    didIMakeMoney: "இன்று நான் லாபம் ஈட்டினேனா?",
    recentEntries: "சமீபத்திய பதிவுகள்",
    noEntriesToday: "இன்று இன்னும் பதிவுகள் இல்லை. கீழே உங்கள் முதல் விற்பனையை பதிவு செய்யுங்கள்.",
    tapSavedItem: "சேமிக்கப்பட்ட பொருளை தட்டவும்",
    quantity: "அளவு",
    runningTotal: "மொத்தம்",
    amount: "தொகை",
    category: "வகை",
    note: "குறிப்பு",
    vendor: "விற்பனையாளர்",
    back: "பின்செல்",
    tryAgain: "மீண்டும் முயற்சி செய்",
    enterManually: "கைமுறையாக உள்ளிடவும்",
    simulatedLabel: "உருவகப்படுத்தப்பட்டது — இந்த முன்மாதிரியில் உண்மையான AI இணைக்கப்படவில்லை",
    listening: "கேட்கிறது…",
    processing: "பேச்சு செயலாக்கப்படுகிறது…",
    readingReceipt: "AI ரசீதை படிக்கிறது…",
    capture: "படம் பிடி",
    couldntReadClearly: "தெளிவாக படிக்க முடியவில்லை",
    didntCatchThat: "புரியவில்லை",
    addCatalogItem: "பட்டியல் பொருளை சேர்",
    noCatalogItems: "இன்னும் பட்டியல் பொருட்கள் இல்லை",
    name: "பெயர்",
    price: "விலை",
    deleteConfirm: "இதை நீக்க விரும்புகிறீர்களா? இதை மீட்க முடியாது.",
    resetDemoData: "டெமோ தரவை மீட்டமை",
    resetConfirm: "இது உங்கள் அனைத்து தரவையும் அழித்து அசல் டெமோ தரவை மீட்டெடுக்கும். தொடரவா?",
    tier: "திட்டம்",
    turnover: "ஆண்டு வருவாய் (RM)",
    language: "மொழி",
    taxCompliance: "வரி மற்றும் இணக்கம்",
    lhdnIncomeTax: "LHDN வருமான வரி",
    sstReporting: "SST அறிக்கையிடல்",
    myInvois: "MyInvois மின்-விலைப்பட்டியல்",
    thisWeek: "இந்த வாரம்",
    thisMonth: "இந்த மாதம்",
    noEntriesInPeriod: "இந்த காலகட்டத்தில் பதிவுகள் இல்லை.",
    invalidAmount: "0 ஐ விட அதிகமான தொகையை உள்ளிடவும்",
    invalidQuantity: "அளவு குறைந்தது 1 ஆக முழு எண்ணாக இருக்க வேண்டும்",
    requiredField: "இந்த புலம் தேவை",
    recommended: "பரிந்துரைக்கப்படுகிறது",
    aiModel: "AI மாதிரி",
    viewDetails: "விவரங்களைக் காண்க",
    shareWhatsapp: "WhatsApp வழியாக பகிர்",
    generateInvoice: "மின்-விலைப்பட்டியல் உருவாக்கு",
    close: "மூடு",
    manual: "கைமுறை",
  },
};

export function t(lang: Language, key: DictKey): string {
  return dictionaries[lang][key] ?? dictionaries.en[key];
}
