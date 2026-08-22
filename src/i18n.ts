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
  | "taxTab"
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
  | "manual"
  | "login"
  | "username"
  | "password"
  | "logIn"
  | "logOut"
  | "loginDemoNote"
  | "loginError"
  | "profile"
  | "businessName"
  | "ownerName"
  | "phone"
  | "phoneOptional"
  | "theme"
  | "themeLight"
  | "themeDark"
  | "themeSystem"
  | "vsWeeklyAvg"
  | "aboveAvg"
  | "belowAvg"
  | "lowerThanYesterday"
  | "higherThanYesterday"
  | "quantityAndNote"
  | "optionalNote"
  | "saved"
  | "addItem"
  | "sell"
  | "done"
  | "netProfit"
  | "profitTrend"
  | "yesterday"
  | "last7Days"
  | "lastMonth"
  | "thisYear"
  | "selectPeriod"
  | "editCatalog"
  | "logNewTransaction";

type Dict = Record<DictKey, string>;

export const dictionaries: Record<Language, Dict> = {
  en: {
    home: "Home",
    income: "Income",
    expense: "Expense",
    net: "Net",
    today: "Today",
    logTransaction: "Log Transaction",
    photographReceipt: "Photograph a Receipt",
    speakTransaction: "Speak a Transaction",
    catalog: "Catalog",
    reports: "Reports",
    settings: "Settings",
    entriesUsed: "entries used",
    limitReached: "Limit Reached",
    upgrade: "Upgrade",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    confirm: "Confirm",
    appName: "LedgerAI",
    tagline: "Accounting That Disappears.",
    chooseLanguage: "Choose Your Language",
    getStarted: "Get Started",
    didIMakeMoney: "Did I Make Money Today?",
    recentEntries: "Recent Entries",
    noEntriesToday: "No entries yet today. Log your first sale below.",
    tapSavedItem: "Tap a Saved Catalog Item",
    quantity: "Quantity",
    runningTotal: "Total",
    amount: "Amount",
    category: "Category",
    note: "Note",
    vendor: "Vendor",
    back: "Back",
    tryAgain: "Try Again",
    enterManually: "Enter Manually Instead",
    simulatedLabel: "Simulated — no AI connected in this prototype",
    listening: "Listening…",
    processing: "Processing Speech…",
    readingReceipt: "AI Reading Receipt…",
    capture: "Capture",
    couldntReadClearly: "Couldn't Read That Clearly",
    didntCatchThat: "Didn't Catch That",
    addCatalogItem: "Add a Catalog Item",
    noCatalogItems: "No Catalog Items Yet",
    name: "Name",
    price: "Price",
    deleteConfirm: "Are you sure you want to delete this? This cannot be undone.",
    resetDemoData: "Reset Demo Data",
    resetConfirm: "This will erase all your data and restore the original demo data. Continue?",
    tier: "Plan",
    turnover: "Annual Turnover (RM)",
    language: "Language",
    taxCompliance: "Tax & Compliance",
    taxTab: "Tax",
    lhdnIncomeTax: "LHDN Income Tax",
    sstReporting: "SST Reporting",
    myInvois: "MyInvois e-Invoicing",
    thisWeek: "This Week",
    thisMonth: "This Month",
    noEntriesInPeriod: "No entries in this period.",
    invalidAmount: "Enter an amount greater than 0",
    invalidQuantity: "Quantity must be a whole number of at least 1",
    requiredField: "This field is required",
    recommended: "Recommended",
    aiModel: "AI Model",
    viewDetails: "View Details",
    shareWhatsapp: "Share via WhatsApp",
    generateInvoice: "Generate e-Invoice",
    close: "Close",
    manual: "Manual",
    login: "Log In",
    username: "Username",
    password: "Password",
    logIn: "Log In",
    logOut: "Log Out",
    loginDemoNote: "Demo prototype — use test123 / test123 to continue.",
    loginError: "Incorrect username or password.",
    profile: "Profile",
    businessName: "Business Name",
    ownerName: "Owner Name",
    phone: "Phone Number",
    phoneOptional: "Phone Number (Optional)",
    theme: "Appearance",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    vsWeeklyAvg: "vs your weekly average",
    aboveAvg: "above your weekly average",
    belowAvg: "below your weekly average",
    lowerThanYesterday: "lower than yesterday",
    higherThanYesterday: "higher than yesterday",
    quantityAndNote: "Quantity & Note",
    optionalNote: "Note (Optional)",
    saved: "Saved",
    addItem: "Add Item",
    sell: "Sell",
    done: "Done",
    netProfit: "Net Profit",
    profitTrend: "Profit Trend",
    yesterday: "Yesterday",
    last7Days: "Last 7 Days",
    lastMonth: "Last Month",
    thisYear: "This Year",
    selectPeriod: "Select Period",
    editCatalog: "Edit Catalog",
    logNewTransaction: "Log a New Transaction",
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
    taxTab: "Cukai",
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
    login: "Log masuk",
    username: "Nama pengguna",
    password: "Kata laluan",
    logIn: "Log masuk",
    logOut: "Log keluar",
    loginDemoNote: "Prototaip demo — guna test123 / test123 untuk teruskan.",
    loginError: "Nama pengguna atau kata laluan salah.",
    profile: "Profil",
    businessName: "Nama perniagaan",
    ownerName: "Nama pemilik",
    phone: "Nombor telefon",
    phoneOptional: "Nombor telefon (pilihan)",
    theme: "Rupa",
    themeLight: "Terang",
    themeDark: "Gelap",
    themeSystem: "Sistem",
    vsWeeklyAvg: "berbanding purata mingguan anda",
    aboveAvg: "melebihi purata mingguan anda",
    belowAvg: "di bawah purata mingguan anda",
    lowerThanYesterday: "lebih rendah daripada semalam",
    higherThanYesterday: "lebih tinggi daripada semalam",
    quantityAndNote: "Kuantiti & nota",
    optionalNote: "Nota (pilihan)",
    saved: "Disimpan",
    addItem: "Tambah item",
    sell: "Jual",
    done: "Selesai",
    netProfit: "Untung Bersih",
    profitTrend: "Trend Untung",
    yesterday: "Semalam",
    last7Days: "7 Hari Lepas",
    lastMonth: "Bulan Lepas",
    thisYear: "Tahun Ini",
    selectPeriod: "Pilih Tempoh",
    editCatalog: "Sunting Katalog",
    logNewTransaction: "Catat Transaksi Baharu",
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
    taxTab: "税务",
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
    login: "登录",
    username: "用户名",
    password: "密码",
    logIn: "登录",
    logOut: "登出",
    loginDemoNote: "演示原型 — 使用 test123 / test123 继续。",
    loginError: "用户名或密码错误。",
    profile: "个人资料",
    businessName: "商号名称",
    ownerName: "店主姓名",
    phone: "电话号码",
    phoneOptional: "电话号码（可选）",
    theme: "外观",
    themeLight: "浅色",
    themeDark: "深色",
    themeSystem: "系统",
    vsWeeklyAvg: "与本周平均相比",
    aboveAvg: "高于本周平均水平",
    belowAvg: "低于本周平均水平",
    lowerThanYesterday: "低于昨天",
    higherThanYesterday: "高于昨天",
    quantityAndNote: "数量与备注",
    optionalNote: "备注（可选）",
    saved: "已保存",
    addItem: "添加商品",
    sell: "销售",
    done: "完成",
    netProfit: "净利润",
    profitTrend: "利润趋势",
    yesterday: "昨天",
    last7Days: "过去7天",
    lastMonth: "上个月",
    thisYear: "今年",
    selectPeriod: "选择期间",
    editCatalog: "编辑商品目录",
    logNewTransaction: "记录新交易",
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
    taxTab: "வரி",
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
    login: "உள்நுழை",
    username: "பயனர்பெயர்",
    password: "கடவுச்சொல்",
    logIn: "உள்நுழை",
    logOut: "வெளியேறு",
    loginDemoNote: "டெமோ முன்மாதிரி — தொடர test123 / test123 பயன்படுத்தவும்.",
    loginError: "தவறான பயனர்பெயர் அல்லது கடவுச்சொல்.",
    profile: "சுயவிவரம்",
    businessName: "வணிகப் பெயர்",
    ownerName: "உரிமையாளர் பெயர்",
    phone: "தொலைபேசி எண்",
    phoneOptional: "தொலைபேசி எண் (விருப்பம்)",
    theme: "தோற்றம்",
    themeLight: "வெளிச்சம்",
    themeDark: "இருள்",
    themeSystem: "கணினி",
    vsWeeklyAvg: "உங்கள் வாராந்திர சராசரியுடன் ஒப்பிடும்போது",
    aboveAvg: "உங்கள் வாராந்திர சராசரியை விட அதிகம்",
    belowAvg: "உங்கள் வாராந்திர சராசரியை விட குறைவு",
    lowerThanYesterday: "நேற்றை விட குறைவு",
    higherThanYesterday: "நேற்றை விட அதிகம்",
    quantityAndNote: "அளவு & குறிப்பு",
    optionalNote: "குறிப்பு (விருப்பம்)",
    saved: "சேமிக்கப்பட்டது",
    addItem: "பொருள் சேர்",
    sell: "விற்பனை",
    done: "முடிந்தது",
    netProfit: "நிகர லாபம்",
    profitTrend: "லாப போக்கு",
    yesterday: "நேற்று",
    last7Days: "கடந்த 7 நாட்கள்",
    lastMonth: "கடந்த மாதம்",
    thisYear: "இந்த ஆண்டு",
    selectPeriod: "காலத்தைத் தேர்ந்தெடுக்கவும்",
    editCatalog: "பட்டியலைத் திருத்து",
    logNewTransaction: "புதிய பரிவர்த்தனையை பதிவு செய்",
  },
};

export function t(lang: Language, key: DictKey): string {
  return dictionaries[lang][key] ?? dictionaries.en[key];
}
