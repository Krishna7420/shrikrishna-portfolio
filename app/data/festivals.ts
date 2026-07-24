export type Festival = {
  slug: string;
  name: string;
  emoji: string;
  date: string; // "YYYY-MM-DD"
  tagline: string;
  darshanVideoId?: string;
  bhajanVideoIds?: string[];
  bhajanTracks?: {
    videoId: string;
    segments: { time: number; title: string }[];
  }[];
  art?: "vitthal" | "mandala";
  glowColor: string;
};

export const festivals: Festival[] = [
  {
    slug: "ashadhi-ekadashi",
    name: "Aashadhi Ekadashi",
    emoji: "🙏",
    date: "2026-07-25",
    tagline: "A moment of devotion, from Pandharpur to wherever you are.",
    darshanVideoId: "ylnWpKgIp-A",
    bhajanVideoIds: ["Z8bDdMNmQV0", "_uIbYaZARi8", "qcscBr_USZE", "GYK677Y8d2M"],
    bhajanTracks: [
      {
        videoId: "Z8bDdMNmQV0",
        segments: [
          { time: 5, title: "रंगा येई वो" },
          { time: 245, title: "रूनुझुनू रूनुझुनू रे भ्रमरा" },
          { time: 450, title: "अवचित परिमळू" },
          { time: 689, title: "अरे अरे ज्ञाना झालासी पावन" },
          { time: 880, title: "विश्वाचे आर्त माझ्या मनी" },
          { time: 1047, title: "आजी सोनियाचा दिनू" },
          { time: 1269, title: "ॐ नमोजी आद्या" },
          { time: 1484, title: "घनु वाजे घुणघुणा" },
          { time: 2575, title: "पैल तो गे काऊ" },
          { time: 3278, title: "मोगरा फुलला" },
          { time: 3839, title: "आता विश्वात्मके देवे" },
        ],
      },
      {
        videoId: "_uIbYaZARi8",
        segments: [
          { time: 7, title: "माझे माहेर पंढरी" },
          { time: 424, title: "ज्ञानियांचा राजा गुरु महाराव" },
          { time: 795, title: "पंढरीचा वास चंद्रभागे स्नान" },
          { time: 1274, title: "सांवळे सुंदर रूप मनोहर" },
          { time: 1624, title: "सुखाचे हे नाम आवडीने गावे" },
          { time: 1992, title: "विठ्ठल हा चित्ती" },
          { time: 2467, title: "विठ्ठलाचे पायी" },
          { time: 2678, title: "आरंभी वंदीन अयोध्येचा राजा" },
          { time: 3127, title: "काया ही पंढरी" },
          { time: 3531, title: "विठ्ठल गीती गावा" },
          { time: 3953, title: "तीर्थ विठ्ठल क्षेत्र विठ्ठल" },
          { time: 4311, title: "टाळ बोले चिपळीला" },
          { time: 4527, title: "माझा भाव तुझे चरणी" },
          { time: 4904, title: "जाता पंढरीसी सुख वाटे जीवा" },
          { time: 5337, title: "सुख अनुपम संतांचे चरणी" },
          { time: 5856, title: "आता कोठे धावे मन" },
          { time: 6212, title: "पावलो पंढरी वैकुंठभुवन" },
          { time: 6593, title: "कसा मला टाकुनी गेला राम" },
          { time: 6831, title: "इंद्रायणी काठी" },
          { time: 7212, title: "माझे माहेर पंढरी" },
          { time: 7628, title: "ज्याचा सखा हरी त्यावरी विश्वकृपा करी" },
          { time: 7958, title: "भेटी लागी जीवा लागलीसे आस" },
          { time: 8296, title: "सगुणाची सेज निर्गुणाची बाज" },
          { time: 8687, title: "नामाचा गजर गजर भीमातीर" },
          { time: 9072, title: "अणुरणिया थोकडा" },
          { time: 9441, title: "रामाचे भजन तेचि माझे ध्यान" },
          { time: 9761, title: "रम्य ही स्वर्गाहुनी लंका" },
          { time: 9963, title: "राजस सुकुमार मदनाचा पुतळा" },
          { time: 10369, title: "जे का रंजले गांजले" },
          { time: 10746, title: "डोलत डोलत तमकात" },
          { time: 11252, title: "पंढरी निवासा सख्या पांडुरंगा" },
          { time: 11625, title: "अधिक देखणे तरी निरंजन पाहणे" },
          { time: 12018, title: "पावलो पंढरी" },
          { time: 12402, title: "ज्ञानियांचा राजा गुरु महाराज" },
          { time: 12764, title: "पुण्य परोपकार पाप ते परपीडा" },
          { time: 13187, title: "रामरंगी रंगले मन" },
          { time: 13557, title: "हरी विठ्ठल" },
          { time: 13802, title: "जयाचा सखारी" },
          { time: 14132, title: "पंढरीची वारी" },
          { time: 14598, title: "धन्य आजी दिन" },
          { time: 15148, title: "तुका आकाशाएवढा" },
          { time: 15502, title: "संपले जीवन संपली ही गाथा" },
          { time: 15694, title: "ऐरी मायी आज शुभ मंगल गाऊ" },
          { time: 15883, title: "अंतरीचा भाव" },
          { time: 16075, title: "रस बरसत अमृत वीणा" },
          { time: 16261, title: "कान्होबा तुझी घोंगडी" },
          { time: 16438, title: "सोडुनी आपुला रंग महाल" },
          { time: 16648, title: "पिया बिन नाही आवत चैन" },
          { time: 16817, title: "रसिका गवो कोनते गीत" },
          { time: 17005, title: "पंढरीचा राजा उभा" },
        ],
      },
      { videoId: "qcscBr_USZE", segments: [] },
      { videoId: "GYK677Y8d2M", segments: [] },
    ],
    art: "vitthal",
    glowColor: "#f59e0b",
  },
];

