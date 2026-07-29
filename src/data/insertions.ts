import type { ConditionalInsertion } from "./types";

// === Amidah Insertions ===

export const mashivHaRuach: ConditionalInsertion = {
  id: "mashiv-haruach",
  name: "Mashiv HaRuach",
  nameHe: "משיב הרוח",
  targetSectionId: "shacharis-amidah-02-gevuros",
  position: "after",
  condition: (ctx) => ctx.season === "winter",
  text: "מַשִּׁיב הָרוּחַ וּמוֹרִיד הַגֶּשֶׁם.",
  translation: "He causes the wind to blow and the rain to fall.",
};

export const moridHaTal: ConditionalInsertion = {
  id: "morid-hatal",
  name: "Morid HaTal",
  nameHe: "מוריד הטל",
  targetSectionId: "shacharis-amidah-02-gevuros",
  position: "after",
  condition: (ctx) => ctx.season === "summer",
  text: "מוֹרִיד הַטָּל.",
  translation: "He causes the dew to fall.",
};

export const veSeinTalUmatar: ConditionalInsertion = {
  id: "vesein-tal-umatar",
  name: "V'Sein Tal U'Matar",
  nameHe: "ותן טל ומטר",
  targetSectionId: "shacharis-amidah-09-shanim",
  position: "replace",
  // NOT ctx.season — Tal U'Matar starts later than Mashiv HaRuach (7 Cheshvan
  // in Israel, Dec 4/5 in the Diaspora), so keying off the season flag made
  // this text appear roughly three weeks early in chu"l.
  condition: (ctx) => ctx.saysTalUMatar,
  text: "וְתֵן טַל וּמָטָר לִבְרָכָה עַל כָּל פְּנֵי הָאֲדָמָה.",
  translation: "And bestow dew and rain for a blessing upon the face of the earth.",
};

export const veSeinBracha: ConditionalInsertion = {
  id: "vesein-bracha",
  name: "V'Sein Bracha",
  nameHe: "ותן ברכה",
  targetSectionId: "shacharis-amidah-09-shanim",
  position: "replace",
  // The complement of veSeinTalUmatar, for the same reason.
  condition: (ctx) => !ctx.saysTalUMatar,
  text: "וְתֵן בְּרָכָה עַל כָּל פְּנֵי הָאֲדָמָה.",
  translation: "And bestow blessing upon the face of the earth.",
};

export const yaalehVeyavo: ConditionalInsertion = {
  id: "yaaleh-veyavo",
  name: "Ya'aleh V'Yavo",
  nameHe: "יעלה ויבא",
  targetSectionId: "shacharis-amidah-17-avoda",
  position: "after",
  condition: (ctx) => ctx.isRoshChodesh || ctx.isCholHamoed,
  text: "אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ, יַעֲלֶה וְיָבֹא, וְיַגִּיעַ, וְיֵרָאֶה, וְיֵרָצֶה, וְיִשָּׁמַע, וְיִפָּקֵד, וְיִזָּכֵר זִכְרוֹנֵנוּ וּפִקְדוֹנֵנוּ, וְזִכְרוֹן אֲבוֹתֵינוּ, וְזִכְרוֹן מָשִׁיחַ בֶּן דָּוִד עַבְדֶּךָ, וְזִכְרוֹן יְרוּשָׁלַיִם עִיר קָדְשֶׁךָ, וְזִכְרוֹן כָּל עַמְּךָ בֵּית יִשְׂרָאֵל לְפָנֶיךָ, לִפְלֵיטָה, לְטוֹבָה, לְחֵן וּלְחֶסֶד וּלְרַחֲמִים, לְחַיִּים וּלְשָׁלוֹם, בְּיוֹם רֹאשׁ הַחֹדֶשׁ הַזֶּה. זָכְרֵנוּ יְהֹוָה אֱלֹהֵינוּ בּוֹ לְטוֹבָה, וּפָקְדֵנוּ בוֹ לִבְרָכָה, וְהוֹשִׁיעֵנוּ בוֹ לְחַיִּים. וּבִדְבַר יְשׁוּעָה וְרַחֲמִים חוּס וְחָנֵּנוּ, וְרַחֵם עָלֵינוּ וְהוֹשִׁיעֵנוּ, כִּי אֵלֶיךָ עֵינֵינוּ, כִּי אֵל מֶלֶךְ חַנּוּן וְרַחוּם אָתָּה.",
  translation: "Our God and God of our fathers, may there ascend, come, and reach, be seen, accepted, and heard, recalled and remembered before You—our remembrance and our reckoning, the remembrance of our fathers, the remembrance of the Messiah son of David Your servant, the remembrance of Jerusalem Your holy city, and the remembrance of all Your people the House of Israel—for deliverance, goodness, grace, kindness and mercy, life and peace, on this day of the New Month. Remember us, Lord our God, on it for goodness; consider us on it for blessing; and save us on it for life. With a word of salvation and mercy, spare us and be gracious to us; have mercy upon us and save us, for our eyes are turned to You, for You are a gracious and merciful God and King.",
};

export const alHanissimChanukah: ConditionalInsertion = {
  id: "al-hanissim-chanukah",
  name: "Al HaNissim - Chanukah",
  nameHe: "על הנסים - חנוכה",
  targetSectionId: "shacharis-amidah-18-hodaa",
  position: "after",
  condition: (ctx) => ctx.holiday === "chanukah",
  text: "עַל הַנִּסִּים וְעַל הַפֻּרְקָן וְעַל הַגְּבוּרוֹת וְעַל הַתְּשׁוּעוֹת וְעַל הַמִּלְחָמוֹת שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה.\n\nבִּימֵי מַתִּתְיָהוּ בֶּן יוֹחָנָן כֹּהֵן גָּדוֹל חַשְׁמוֹנָאִי וּבָנָיו, כְּשֶׁעָמְדָה מַלְכוּת יָוָן הָרְשָׁעָה עַל עַמְּךָ יִשְׂרָאֵל לְהַשְׁכִּיחָם תּוֹרָתֶךָ וּלְהַעֲבִירָם מֵחֻקֵּי רְצוֹנֶךָ. וְאַתָּה בְּרַחֲמֶיךָ הָרַבִּים עָמַדְתָּ לָהֶם בְּעֵת צָרָתָם, רַבְתָּ אֶת רִיבָם, דַּנְתָּ אֶת דִּינָם, נָקַמְתָּ אֶת נִקְמָתָם, מָסַרְתָּ גִבּוֹרִים בְּיַד חַלָּשִׁים, וְרַבִּים בְּיַד מְעַטִּים, וּטְמֵאִים בְּיַד טְהוֹרִים, וּרְשָׁעִים בְּיַד צַדִּיקִים, וְזֵדִים בְּיַד עוֹסְקֵי תוֹרָתֶךָ. וּלְךָ עָשִׂיתָ שֵׁם גָּדוֹל וְקָדוֹשׁ בְּעוֹלָמֶךָ, וּלְעַמְּךָ יִשְׂרָאֵל עָשִׂיתָ תְּשׁוּעָה גְדוֹלָה וּפֻרְקָן כְּהַיּוֹם הַזֶּה. וְאַחַר כֵּן בָּאוּ בָנֶיךָ לִדְבִיר בֵּיתֶךָ, וּפִנּוּ אֶת הֵיכָלֶךָ, וְטִהֲרוּ אֶת מִקְדָּשֶׁךָ, וְהִדְלִיקוּ נֵרוֹת בְּחַצְרוֹת קָדְשֶׁךָ, וְקָבְעוּ שְׁמוֹנַת יְמֵי חֲנֻכָּה אֵלוּ, לְהוֹדוֹת וּלְהַלֵּל לְשִׁמְךָ הַגָּדוֹל.",
  translation: "For the miracles, for the redemption, for the mighty deeds, for the saving acts, and for the battles which You performed for our fathers in those days, at this time.\n\nIn the days of Mattisyahu, son of Yochanan the High Priest, the Hasmonean and his sons, when the wicked Greek kingdom rose against Your people Israel to make them forget Your Torah and to force them to transgress the statutes of Your will. You, in Your abundant mercy, stood by them in their time of distress; You championed their cause, judged their claim, avenged their wrong. You delivered the mighty into the hands of the weak, the many into the hands of the few, the impure into the hands of the pure, the wicked into the hands of the righteous, and the arrogant into the hands of those who occupy themselves with Your Torah. You made for Yourself a great and holy Name in Your world, and for Your people Israel You performed a great salvation and redemption as on this very day. Then Your children came to the Holy of Holies of Your House, cleaned Your Temple, purified Your sanctuary, kindled lights in Your holy courts, and established these eight days of Chanukah to give thanks and praise to Your great Name.",
};

export const alHanissimPurim: ConditionalInsertion = {
  id: "al-hanissim-purim",
  name: "Al HaNissim - Purim",
  nameHe: "על הנסים - פורים",
  targetSectionId: "shacharis-amidah-18-hodaa",
  position: "after",
  condition: (ctx) => ctx.holiday === "purim",
  text: "עַל הַנִּסִּים וְעַל הַפֻּרְקָן וְעַל הַגְּבוּרוֹת וְעַל הַתְּשׁוּעוֹת וְעַל הַמִּלְחָמוֹת שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה.\n\nבִּימֵי מָרְדְּכַי וְאֶסְתֵּר בְּשׁוּשַׁן הַבִּירָה, כְּשֶׁעָמַד עֲלֵיהֶם הָמָן הָרָשָׁע, בִּקֵּשׁ לְהַשְׁמִיד לַהֲרוֹג וּלְאַבֵּד אֶת כָּל הַיְּהוּדִים, מִנַּעַר וְעַד זָקֵן, טַף וְנָשִׁים, בְּיוֹם אֶחָד, בִּשְׁלוֹשָׁה עָשָׂר לְחוֹדֶשׁ שְׁנֵים עָשָׂר, הוּא חוֹדֶשׁ אֲדָר, וּשְׁלָלָם לָבוֹז. וְאַתָּה בְּרַחֲמֶיךָ הָרַבִּים הֵפַרְתָּ אֶת עֲצָתוֹ, וְקִלְקַלְתָּ אֶת מַחֲשַׁבְתּוֹ, וַהֲשֵׁבוֹתָ לוֹ גְּמוּלוֹ בְּרֹאשׁוֹ, וְתָלוּ אוֹתוֹ וְאֶת בָּנָיו עַל הָעֵץ.",
  translation: "For the miracles, for the redemption, for the mighty deeds, for the saving acts, and for the battles which You performed for our fathers in those days, at this time.\n\nIn the days of Mordechai and Esther, in Shushan the capital, when the wicked Haman rose against them, he sought to destroy, kill, and annihilate all the Jews—young and old, children and women—on one day, the thirteenth of the twelfth month, which is the month of Adar, and to plunder their possessions. But You, in Your abundant mercy, foiled his counsel, frustrated his plan, and returned his recompense upon his own head; and they hanged him and his sons upon the gallows.",
};

export const ataChonantanu: ConditionalInsertion = {
  id: "ata-chonantanu",
  name: "Ata Chonantanu",
  nameHe: "אתה חוננתנו",
  // Ata Chonantanu is a MAARIV insert, said only at Motzaei Shabbos. Pointing
  // it at the Shacharis Daas bracha aimed it at a tefilla nobody davens at
  // that hour, and it could never reach the Maariv section that exists for it.
  targetSectionId: "maariv-ata-chonantanu",
  position: "after",
  condition: (ctx) => ctx.isMotzaeiShabbos,
  text: "אַתָּה חוֹנַנְתָּנוּ לְמַדַּע תּוֹרָתֶךָ, וַתְּלַמְּדֵנוּ לַעֲשׂוֹת חֻקֵּי רְצוֹנֶךָ. וַתַּבְדֵּל יְהֹוָה אֱלֹהֵינוּ, בֵּין קֹדֶשׁ לְחוֹל, בֵּין אוֹר לְחשֶׁךְ, בֵּין יִשְׂרָאֵל לָעַמִּים, בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה. אָבִינוּ מַלְכֵּנוּ, הָחֵל עָלֵינוּ הַיָּמִים הַבָּאִים לִקְרָאתֵנוּ לְשָׁלוֹם, חֲשׂוּכִים מִכָּל חֵטְא, וּמְנֻקִּים מִכָּל עָוֹן, וּמְדֻבָּקִים בְּיִרְאָתֶךָ.",
  translation: "You have graced us with the knowledge of Your Torah, and taught us to perform the statutes of Your will. You have distinguished, Lord our God, between sacred and secular, between light and darkness, between Israel and the nations, between the seventh day and the six working days. Our Father, our King, begin for us the days that come to meet us in peace, free from all sin, cleansed from all iniquity, and attached to the fear of You.",
};

export const aneinu: ConditionalInsertion = {
  id: "aneinu",
  name: "Aneinu",
  nameHe: "עננו",
  targetSectionId: "shacharis-amidah-16-tefila",
  position: "after",
  condition: (ctx) => ctx.isFastDay,
  text: "עֲנֵנוּ יְהֹוָה עֲנֵנוּ בְּיוֹם צוֹם תַּעֲנִיתֵנוּ, כִּי בְצָרָה גְדוֹלָה אֲנָחְנוּ. אַל תֵּפֶן אֶל רִשְׁעֵנוּ, וְאַל תַּסְתֵּר פָּנֶיךָ מִמֶּנוּ, וְאַל תִּתְעַלַּם מִתְּחִנָּתֵנוּ. הֱיֵה נָא קָרוֹב לְשַׁוְעָתֵנוּ, יְהִי נָא חַסְדְּךָ לְנַחֲמֵנוּ. טֶרֶם נִקְרָא אֵלֶיךָ עֲנֵנוּ, כַּדָּבָר שֶׁנֶּאֱמַר: וְהָיָה טֶרֶם יִקְרָאוּ וַאֲנִי אֶעֱנֶה, עוֹד הֵם מְדַבְּרִים וַאֲנִי אֶשְׁמָע. כִּי אַתָּה יְהֹוָה הָעוֹנֶה בְּעֵת צָרָה, פּוֹדֶה וּמַצִּיל בְּכָל עֵת צָרָה וְצוּקָה.",
  translation: "Answer us, Lord, answer us on this fast day, for we are in great distress. Do not turn to our wickedness, do not hide Your face from us, and do not ignore our supplication. Please be near to our cry; let Your kindness comfort us. Before we call to You, answer us, as it is said: And it shall be that before they call, I will answer; while they yet speak, I will hear. For You, Lord, are the One Who answers in time of distress, Who redeems and rescues in every time of trouble and anguish.",
};

// === Aseres Yemei Teshuva Insertions ===

export const zachreinu: ConditionalInsertion = {
  id: "zachreinu",
  name: "Zachreinu",
  nameHe: "זכרנו",
  targetSectionId: "shacharis-amidah-01-avos",
  position: "after",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "זָכְרֵנוּ לְחַיִּים, מֶלֶךְ חָפֵץ בַּחַיִּים, וְכָתְבֵנוּ בְּסֵפֶר הַחַיִּים, לְמַעַנְךָ אֱלֹהִים חַיִּים.",
  translation: "Remember us for life, O King Who desires life, and inscribe us in the Book of Life, for Your sake, O living God.",
};

export const miChamocha: ConditionalInsertion = {
  id: "mi-chamocha",
  name: "Mi Chamocha",
  nameHe: "מי כמוך",
  targetSectionId: "shacharis-amidah-02-gevuros",
  position: "after",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "מִי כָמוֹךָ אַב הָרַחֲמִים, זוֹכֵר יְצוּרָיו לְחַיִּים בְּרַחֲמִים.",
  translation: "Who is like You, merciful Father, Who remembers His creatures for life with mercy.",
};

export const hamelechHakadosh: ConditionalInsertion = {
  id: "hamelech-hakadosh",
  name: "HaMelech HaKadosh",
  nameHe: "המלך הקדוש",
  targetSectionId: "shacharis-amidah-03-kedusha",
  position: "replace",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "בָּרוּךְ אַתָּה יְהֹוָה, הַמֶּלֶךְ הַקָּדוֹשׁ.",
  translation: "Blessed are You, Lord, the Holy King.",
};

export const hamelechHamishpat: ConditionalInsertion = {
  id: "hamelech-hamishpat",
  name: "HaMelech HaMishpat",
  nameHe: "המלך המשפט",
  targetSectionId: "shacharis-amidah-11-mishpat",
  position: "replace",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "בָּרוּךְ אַתָּה יְהֹוָה, הַמֶּלֶךְ הַמִּשְׁפָּט.",
  translation: "Blessed are You, Lord, the King of Judgment.",
};

export const uChesov: ConditionalInsertion = {
  id: "uchesov",
  name: "U'Chesov",
  nameHe: "וכתוב",
  targetSectionId: "shacharis-amidah-18-hodaa",
  position: "after",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "וּכְתוֹב לְחַיִּים טוֹבִים כָּל בְּנֵי בְרִיתֶךָ.",
  translation: "And inscribe for a good life all the children of Your covenant.",
};

export const uvSefer: ConditionalInsertion = {
  id: "uvsefer",
  name: "U'V'Sefer",
  nameHe: "ובספר",
  targetSectionId: "shacharis-amidah-19-shalom",
  position: "after",
  condition: (ctx) => ctx.isAseresYemeiTeshuva,
  text: "בְּסֵפֶר חַיִּים, בְּרָכָה, וְשָׁלוֹם, וּפַרְנָסָה טוֹבָה, נִזָּכֵר וְנִכָּתֵב לְפָנֶיךָ, אֲנַחְנוּ וְכָל עַמְּךָ בֵּית יִשְׂרָאֵל, לְחַיִּים טוֹבִים וּלְשָׁלוֹם.",
  translation: "In the book of life, blessing, peace, and good livelihood, may we be remembered and inscribed before You—we and all Your people the House of Israel—for a good life and for peace.",
};

export const ALL_INSERTIONS: ConditionalInsertion[] = [
  mashivHaRuach,
  moridHaTal,
  veSeinTalUmatar,
  veSeinBracha,
  yaalehVeyavo,
  alHanissimChanukah,
  alHanissimPurim,
  ataChonantanu,
  aneinu,
  zachreinu,
  miChamocha,
  hamelechHakadosh,
  hamelechHamishpat,
  uChesov,
  uvSefer,
];
