import type { Tefila } from "../types";

export const shemonehEsrei: Tefila = {
  id: "shemoneh-esrei",
  name: "Shemoneh Esrei",
  nameHe: "שמונה עשרה",
  category: "shacharis",
  timeContext: "shacharis",
  sections: [
    {
      id: "se-avos",
      title: "Avos",
      titleHe: "אבות",
      instruction:
        "Take three steps back, then three steps forward. Stand with feet together, facing Jerusalem. Begin with lips together, opening them as you say the first word.",
      text: "אֲדֹנָי שְׂפָתַי תִּפְתָּח, וּפִי יַגִּיד תְּהִלָּתֶךָ.\n\nבָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ, אֱלֹהֵי אַבְרָהָם, אֱלֹהֵי יִצְחָק, וֵאלֹהֵי יַעֲקֹב, הָאֵל הַגָּדוֹל הַגִּבּוֹר וְהַנּוֹרָא, אֵל עֶלְיוֹן, גּוֹמֵל חֲסָדִים טוֹבִים, וְקוֹנֵה הַכֹּל, וְזוֹכֵר חַסְדֵי אָבוֹת, וּמֵבִיא גוֹאֵל לִבְנֵי בְנֵיהֶם, לְמַעַן שְׁמוֹ בְּאַהֲבָה.\n\nמֶלֶךְ עוֹזֵר וּמוֹשִׁיעַ וּמָגֵן. בָּרוּךְ אַתָּה ה', מָגֵן אַבְרָהָם.",
      translation:
        "My Lord, open my lips, that my mouth may declare Your praise.\n\nBlessed are You, Lord our God and God of our fathers, God of Abraham, God of Isaac, and God of Jacob, the great, mighty, and awesome God, God Most High, Who bestows beneficent kindnesses and is Master of all, Who remembers the kindnesses of the Patriarchs, and brings a redeemer to their children's children, for the sake of His Name, with love.\n\nO King, Helper, Savior, and Shield. Blessed are You, Lord, Shield of Abraham.",
    },
    {
      id: "se-gevuros",
      title: "Gevuros",
      titleHe: "גבורות",
      text: "אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי, מְחַיֵּה מֵתִים אַתָּה, רַב לְהוֹשִׁיעַ.\n\nמְכַלְכֵּל חַיִּים בְּחֶסֶד, מְחַיֵּה מֵתִים בְּרַחֲמִים רַבִּים, סוֹמֵךְ נוֹפְלִים, וְרוֹפֵא חוֹלִים, וּמַתִּיר אֲסוּרִים, וּמְקַיֵּם אֱמוּנָתוֹ לִישֵׁנֵי עָפָר. מִי כָמוֹךָ בַּעַל גְּבוּרוֹת, וּמִי דּוֹמֶה לָּךְ, מֶלֶךְ מֵמִית וּמְחַיֶּה וּמַצְמִיחַ יְשׁוּעָה.\n\nוְנֶאֱמָן אַתָּה לְהַחֲיוֹת מֵתִים. בָּרוּךְ אַתָּה ה', מְחַיֵּה הַמֵּתִים.",
      translation:
        "You are mighty forever, my Lord; You resurrect the dead, You are powerful to save.\n\nHe sustains the living with kindness, resurrects the dead with great mercy, supports the fallen, heals the sick, releases the bound, and fulfills His trust to those who sleep in the dust. Who is like You, Master of mighty deeds, and who can compare to You, King Who causes death and restores life and causes salvation to sprout.\n\nYou are faithful to resurrect the dead. Blessed are You, Lord, Who resurrects the dead.",
    },
    {
      id: "se-ata-kadosh",
      title: "Kedushas Hashem",
      titleHe: "קדושת השם",
      instruction:
        "When praying without a minyan, the full Kedusha is omitted. Instead, recite the following:",
      text: "אַתָּה קָדוֹשׁ וְשִׁמְךָ קָדוֹשׁ, וּקְדוֹשִׁים בְּכָל יוֹם יְהַלְלוּךָ סֶּלָה. בָּרוּךְ אַתָּה ה', הָאֵל הַקָּדוֹשׁ.",
      translation:
        "You are holy, and Your Name is holy, and holy beings praise You daily, Selah. Blessed are You, Lord, the holy God.",
    },
    {
      id: "se-ata-chonen",
      title: "Ata Chonen",
      titleHe: "אתה חונן",
      text: "אַתָּה חוֹנֵן לְאָדָם דַּעַת, וּמְלַמֵּד לֶאֱנוֹשׁ בִּינָה. חָנֵּנוּ מֵאִתְּךָ דֵּעָה בִּינָה וְהַשְׂכֵּל. בָּרוּךְ אַתָּה ה', חוֹנֵן הַדָּעַת.",
      translation:
        "You grace man with knowledge, and teach understanding to mortals. Grace us from You with knowledge, understanding, and intellect. Blessed are You, Lord, Who graciously grants knowledge.",
    },
    {
      id: "se-hashiveinu",
      title: "Hashiveinu",
      titleHe: "השיבנו",
      text: "הֲשִׁיבֵנוּ אָבִינוּ לְתוֹרָתֶךָ, וְקָרְבֵנוּ מַלְכֵּנוּ לַעֲבוֹדָתֶךָ, וְהַחֲזִירֵנוּ בִּתְשׁוּבָה שְׁלֵמָה לְפָנֶיךָ. בָּרוּךְ אַתָּה ה', הָרוֹצֶה בִּתְשׁוּבָה.",
      translation:
        "Return us, our Father, to Your Torah, and bring us near, our King, to Your service, and bring us back in complete repentance before You. Blessed are You, Lord, Who desires repentance.",
    },
    {
      id: "se-selach",
      title: "Selach Lanu",
      titleHe: "סלח לנו",
      instruction: "Strike the left side of the chest at 'chatanu' and 'fashanu'.",
      text: "סְלַח לָנוּ אָבִינוּ כִּי חָטָאנוּ, מְחַל לָנוּ מַלְכֵּנוּ כִּי פָשָׁעְנוּ, כִּי מוֹחֵל וְסוֹלֵחַ אָתָּה. בָּרוּךְ אַתָּה ה', חַנּוּן הַמַּרְבֶּה לִסְלֹחַ.",
      translation:
        "Forgive us, our Father, for we have sinned; pardon us, our King, for we have transgressed; for You pardon and forgive. Blessed are You, Lord, the gracious One Who abundantly forgives.",
    },
    {
      id: "se-reeh",
      title: "Re'eh",
      titleHe: "ראה",
      text: "רְאֵה בְעָנְיֵנוּ, וְרִיבָה רִיבֵנוּ, וּגְאָלֵנוּ מְהֵרָה לְמַעַן שְׁמֶךָ, כִּי גּוֹאֵל חָזָק אָתָּה. בָּרוּךְ אַתָּה ה', גּוֹאֵל יִשְׂרָאֵל.",
      translation:
        "Look upon our affliction, and wage our battle, and redeem us speedily for the sake of Your Name, for You are a powerful Redeemer. Blessed are You, Lord, Redeemer of Israel.",
    },
    {
      id: "se-refaeinu",
      title: "Refa'einu",
      titleHe: "רפאנו",
      text: "רְפָאֵנוּ ה' וְנֵרָפֵא, הוֹשִׁיעֵנוּ וְנִוָּשֵׁעָה, כִּי תְהִלָּתֵנוּ אָתָּה, וְהַעֲלֵה רְפוּאָה שְׁלֵמָה לְכָל מַכּוֹתֵינוּ, כִּי אֵל מֶלֶךְ רוֹפֵא נֶאֱמָן וְרַחֲמָן אָתָּה. בָּרוּךְ אַתָּה ה', רוֹפֵא חוֹלֵי עַמּוֹ יִשְׂרָאֵל.",
      translation:
        "Heal us, Lord, and we will be healed; save us and we will be saved, for You are our praise. Bring complete healing for all our ailments, for You are God, King, the faithful and merciful Healer. Blessed are You, Lord, Who heals the sick of His people Israel.",
    },
    {
      id: "se-bareich-aleinu",
      title: "Bareich Aleinu",
      titleHe: "ברך עלינו",
      text: "בָּרֵךְ עָלֵינוּ ה' אֱלֹהֵינוּ אֶת הַשָּׁנָה הַזֹּאת וְאֶת כָּל מִינֵי תְבוּאָתָהּ לְטוֹבָה, וְתֵן בְּרָכָה עַל פְּנֵי הָאֲדָמָה, וְשַׂבְּעֵנוּ מִטּוּבֶךָ, וּבָרֵךְ שְׁנָתֵנוּ כַּשָּׁנִים הַטּוֹבוֹת. בָּרוּךְ אַתָּה ה', מְבָרֵךְ הַשָּׁנִים.",
      translation:
        "Bless for us, Lord our God, this year and all the varieties of its produce for good, and bestow blessing upon the face of the earth, and satisfy us from Your bounty, and bless our year like the good years. Blessed are You, Lord, Who blesses the years.",
    },
    {
      id: "se-teka",
      title: "Teka B'Shofar",
      titleHe: "תקע בשופר",
      text: "תְּקַע בְּשׁוֹפָר גָּדוֹל לְחֵרוּתֵנוּ, וְשָׂא נֵס לְקַבֵּץ גָּלֻיּוֹתֵינוּ, וְקַבְּצֵנוּ יַחַד מֵאַרְבַּע כַּנְפוֹת הָאָרֶץ. בָּרוּךְ אַתָּה ה', מְקַבֵּץ נִדְחֵי עַמּוֹ יִשְׂרָאֵל.",
      translation:
        "Sound the great shofar for our freedom, and raise a banner to gather our exiles, and gather us together from the four corners of the earth. Blessed are You, Lord, Who gathers the dispersed of His people Israel.",
    },
    {
      id: "se-hashiva",
      title: "Hashiva Shofteinu",
      titleHe: "השיבה שופטינו",
      text: "הָשִׁיבָה שׁוֹפְטֵינוּ כְּבָרִאשׁוֹנָה, וְיוֹעֲצֵינוּ כְּבַתְּחִלָּה, וְהָסֵר מִמֶּנוּ יָגוֹן וַאֲנָחָה, וּמְלוֹךְ עָלֵינוּ אַתָּה ה' לְבַדְּךָ בְּחֶסֶד וּבְרַחֲמִים, וְצַדְּקֵנוּ בַּמִּשְׁפָּט. בָּרוּךְ אַתָּה ה', מֶלֶךְ אוֹהֵב צְדָקָה וּמִשְׁפָּט.",
      translation:
        "Restore our judges as in the earliest times, and our advisors as at first; and remove from us sorrow and sighing. Reign over us, You alone, Lord, with kindness and mercy, and vindicate us in judgment. Blessed are You, Lord, King Who loves righteousness and justice.",
    },
    {
      id: "se-vlamalshinim",
      title: "V'Lamalshinim",
      titleHe: "ולמלשינים",
      text: "וְלַמַּלְשִׁינִים אַל תְּהִי תִקְוָה, וְכָל הָרִשְׁעָה כְּרֶגַע תֹּאבֵד, וְכָל אוֹיְבֶיךָ מְהֵרָה יִכָּרֵתוּ, וְהַזֵּדִים מְהֵרָה תְעַקֵּר וּתְשַׁבֵּר וּתְמַגֵּר וְתַכְנִיעַ בִּמְהֵרָה בְיָמֵינוּ. בָּרוּךְ אַתָּה ה', שׁוֹבֵר אוֹיְבִים וּמַכְנִיעַ זֵדִים.",
      translation:
        "And for slanderers let there be no hope, and may all wickedness perish in an instant, and may all Your enemies be swiftly cut off. May You swiftly uproot, smash, cast down, and humble the arrogant speedily in our days. Blessed are You, Lord, Who breaks enemies and humbles the arrogant.",
    },
    {
      id: "se-al-hatzadikim",
      title: "Al HaTzadikim",
      titleHe: "על הצדיקים",
      text: "עַל הַצַּדִּיקִים וְעַל הַחֲסִידִים, וְעַל זִקְנֵי עַמְּךָ בֵּית יִשְׂרָאֵל, וְעַל פְּלֵיטַת סוֹפְרֵיהֶם, וְעַל גֵּרֵי הַצֶּדֶק וְעָלֵינוּ, יֶהֱמוּ רַחֲמֶיךָ ה' אֱלֹהֵינוּ, וְתֵן שָׂכָר טוֹב לְכָל הַבּוֹטְחִים בְּשִׁמְךָ בֶּאֱמֶת, וְשִׂים חֶלְקֵנוּ עִמָּהֶם לְעוֹלָם, וְלֹא נֵבוֹשׁ כִּי בְךָ בָטָחְנוּ. בָּרוּךְ אַתָּה ה', מִשְׁעָן וּמִבְטָח לַצַּדִּיקִים.",
      translation:
        "Upon the righteous, upon the pious, upon the elders of Your people the House of Israel, upon the remnant of their scholars, upon the righteous converts, and upon us, may Your compassion be stirred, Lord our God. Grant a good reward to all who truly trust in Your Name, and place our lot among them forever; and may we never be put to shame, for in You we have put our trust. Blessed are You, Lord, Support and Trust of the righteous.",
    },
    {
      id: "se-vliyrushalayim",
      title: "V'Lirushalayim",
      titleHe: "ולירושלים",
      text: "וְלִירוּשָׁלַיִם עִירְךָ בְּרַחֲמִים תָּשׁוּב, וְתִשְׁכּוֹן בְּתוֹכָהּ כַּאֲשֶׁר דִּבַּרְתָּ, וּבְנֵה אוֹתָהּ בְּקָרוֹב בְּיָמֵינוּ בִּנְיַן עוֹלָם, וְכִסֵּא דָוִד מְהֵרָה לְתוֹכָהּ תָּכִין. בָּרוּךְ אַתָּה ה', בּוֹנֵה יְרוּשָׁלָיִם.",
      translation:
        "And to Jerusalem, Your city, may You return in mercy, and may You dwell within it as You have spoken. Rebuild it soon in our days as an everlasting structure, and may You speedily establish the throne of David within it. Blessed are You, Lord, Who builds Jerusalem.",
    },
    {
      id: "se-es-tzemach",
      title: "Es Tzemach",
      titleHe: "את צמח",
      text: "אֶת צֶמַח דָּוִד עַבְדְּךָ מְהֵרָה תַצְמִיחַ, וְקַרְנוֹ תָּרוּם בִּישׁוּעָתֶךָ, כִּי לִישׁוּעָתְךָ קִוִּינוּ כָּל הַיּוֹם. בָּרוּךְ אַתָּה ה', מַצְמִיחַ קֶרֶן יְשׁוּעָה.",
      translation:
        "The offspring of Your servant David may You speedily cause to flourish, and may his glory be exalted through Your salvation, for we hope for Your salvation all day long. Blessed are You, Lord, Who causes the glory of salvation to flourish.",
    },
    {
      id: "se-shema-koleinu",
      title: "Shema Koleinu",
      titleHe: "שמע קולנו",
      text: "שְׁמַע קוֹלֵנוּ ה' אֱלֹהֵינוּ, חוּס וְרַחֵם עָלֵינוּ, וְקַבֵּל בְּרַחֲמִים וּבְרָצוֹן אֶת תְּפִלָּתֵנוּ, כִּי אֵל שׁוֹמֵעַ תְּפִלּוֹת וְתַחֲנוּנִים אָתָּה, וּמִלְּפָנֶיךָ מַלְכֵּנוּ רֵיקָם אַל תְּשִׁיבֵנוּ, כִּי אַתָּה שׁוֹמֵעַ תְּפִלַּת עַמְּךָ יִשְׂרָאֵל בְּרַחֲמִים. בָּרוּךְ אַתָּה ה', שׁוֹמֵעַ תְּפִלָּה.",
      translation:
        "Hear our voice, Lord our God, have pity and compassion upon us, and accept our prayer with mercy and favor, for You are God Who hears prayers and supplications; and from before You, our King, do not turn us away empty-handed, for You hear the prayer of Your people Israel with compassion. Blessed are You, Lord, Who hears prayer.",
    },
    {
      id: "se-retzei",
      title: "Retzei",
      titleHe: "רצה",
      text: "רְצֵה ה' אֱלֹהֵינוּ בְּעַמְּךָ יִשְׂרָאֵל וּבִתְפִלָּתָם, וְהָשֵׁב אֶת הָעֲבוֹדָה לִדְבִיר בֵּיתֶךָ, וְאִשֵּׁי יִשְׂרָאֵל וּתְפִלָּתָם בְּאַהֲבָה תְקַבֵּל בְּרָצוֹן, וּתְהִי לְרָצוֹן תָּמִיד עֲבוֹדַת יִשְׂרָאֵל עַמֶּךָ.\n\nוְתֶחֱזֶינָה עֵינֵינוּ בְּשׁוּבְךָ לְצִיּוֹן בְּרַחֲמִים. בָּרוּךְ אַתָּה ה', הַמַּחֲזִיר שְׁכִינָתוֹ לְצִיּוֹן.",
      translation:
        "Be favorable, Lord our God, toward Your people Israel and their prayer, and restore the service to the Holy of Holies of Your Temple. The fire-offerings of Israel and their prayer accept with love and favor, and may the service of Your people Israel always be favorable to You.\n\nMay our eyes behold Your return to Zion in mercy. Blessed are You, Lord, Who restores His Divine Presence to Zion.",
    },
    {
      id: "se-modim",
      title: "Modim",
      titleHe: "מודים",
      instruction: "Bow at the beginning of Modim.",
      text: "מוֹדִים אֲנַחְנוּ לָךְ, שָׁאַתָּה הוּא ה' אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ לְעוֹלָם וָעֶד, צוּר חַיֵּינוּ, מָגֵן יִשְׁעֵנוּ, אַתָּה הוּא לְדוֹר וָדוֹר. נוֹדֶה לְּךָ וּנְסַפֵּר תְּהִלָּתֶךָ, עַל חַיֵּינוּ הַמְּסוּרִים בְּיָדֶךָ, וְעַל נִשְׁמוֹתֵינוּ הַפְּקוּדוֹת לָךְ, וְעַל נִסֶּיךָ שֶׁבְּכָל יוֹם עִמָּנוּ, וְעַל נִפְלְאוֹתֶיךָ וְטוֹבוֹתֶיךָ שֶׁבְּכָל עֵת, עֶרֶב וָבֹקֶר וְצָהֳרָיִם. הַטּוֹב, כִּי לֹא כָלוּ רַחֲמֶיךָ, וְהַמְרַחֵם, כִּי לֹא תַמּוּ חֲסָדֶיךָ, מֵעוֹלָם קִוִּינוּ לָךְ.\n\nוְעַל כֻּלָּם יִתְבָּרַךְ וְיִתְרוֹמַם שִׁמְךָ מַלְכֵּנוּ תָּמִיד לְעוֹלָם וָעֶד.\n\nוְכֹל הַחַיִּים יוֹדוּךָ סֶּלָה, וִיהַלְלוּ אֶת שִׁמְךָ בֶּאֱמֶת, הָאֵל יְשׁוּעָתֵנוּ וְעֶזְרָתֵנוּ סֶלָה. בָּרוּךְ אַתָּה ה', הַטּוֹב שִׁמְךָ וּלְךָ נָאֶה לְהוֹדוֹת.",
      translation:
        "We give thanks to You, for You are the Lord our God and God of our fathers forever and ever. Rock of our lives, Shield of our salvation, You are He in every generation. We will thank You and recount Your praise—for our lives which are committed into Your hand, for our souls which are entrusted to You, for Your miracles which are with us every day, and for Your wonders and goodnesses at all times—evening, morning, and afternoon. The Beneficent One, for Your mercies have never ceased; the Compassionate One, for Your kindnesses have never ended—we have always put our hope in You.\n\nAnd for all these, may Your Name be blessed and exalted, our King, continually forever and ever.\n\nAnd all the living shall thank You, Selah, and praise Your Name in truth, God of our salvation and help, Selah. Blessed are You, Lord, Whose Name is the Beneficent One, and to Whom it is fitting to give thanks.",
    },
    {
      id: "se-sim-shalom",
      title: "Sim Shalom",
      titleHe: "שים שלום",
      text: "שִׂים שָׁלוֹם טוֹבָה וּבְרָכָה, חֵן וָחֶסֶד וְרַחֲמִים, עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל עַמֶּךָ. בָּרְכֵנוּ אָבִינוּ כֻּלָּנוּ כְּאֶחָד בְּאוֹר פָּנֶיךָ, כִּי בְאוֹר פָּנֶיךָ נָתַתָּ לָנוּ ה' אֱלֹהֵינוּ תּוֹרַת חַיִּים וְאַהֲבַת חֶסֶד, וּצְדָקָה וּבְרָכָה וְרַחֲמִים וְחַיִּים וְשָׁלוֹם. וְטוֹב בְּעֵינֶיךָ לְבָרֵךְ אֶת עַמְּךָ יִשְׂרָאֵל בְּכָל עֵת וּבְכָל שָׁעָה בִּשְׁלוֹמֶךָ. בָּרוּךְ אַתָּה ה', הַמְבָרֵךְ אֶת עַמּוֹ יִשְׂרָאֵל בַּשָּׁלוֹם.",
      translation:
        "Bestow peace, goodness, and blessing, grace, kindness, and mercy upon us and upon all Israel, Your people. Bless us, our Father, all of us as one, with the light of Your countenance, for by the light of Your countenance You gave us, Lord our God, the Torah of life and a love of kindness, righteousness, blessing, mercy, life, and peace. And may it be good in Your eyes to bless Your people Israel at every time and at every hour with Your peace. Blessed are You, Lord, Who blesses His people Israel with peace.",
    },
    {
      id: "se-elokai-netzor",
      title: "Elokai Netzor",
      titleHe: "אלהי נצור",
      instruction:
        "Personal prayer recited silently after the Amidah, before taking three steps back.",
      text: "אֱלֹהַי, נְצוֹר לְשׁוֹנִי מֵרָע, וּשְׂפָתַי מִדַּבֵּר מִרְמָה, וְלִמְקַלְלַי נַפְשִׁי תִדּוֹם, וְנַפְשִׁי כֶּעָפָר לַכֹּל תִּהְיֶה. פְּתַח לִבִּי בְּתוֹרָתֶךָ, וּבְמִצְוֹתֶיךָ תִּרְדּוֹף נַפְשִׁי. וְכָל הַחוֹשְׁבִים עָלַי רָעָה, מְהֵרָה הָפֵר עֲצָתָם וְקַלְקֵל מַחֲשַׁבְתָּם. עֲשֵׂה לְמַעַן שְׁמֶךָ, עֲשֵׂה לְמַעַן יְמִינֶךָ, עֲשֵׂה לְמַעַן קְדֻשָּׁתֶךָ, עֲשֵׂה לְמַעַן תּוֹרָתֶךָ. לְמַעַן יֵחָלְצוּן יְדִידֶיךָ, הוֹשִׁיעָה יְמִינְךָ וַעֲנֵנִי.\n\nיִהְיוּ לְרָצוֹן אִמְרֵי פִי וְהֶגְיוֹן לִבִּי לְפָנֶיךָ, ה' צוּרִי וְגוֹאֲלִי.\n\nעֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו, הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל. וְאִמְרוּ אָמֵן.",
      translation:
        "My God, guard my tongue from evil and my lips from speaking deceitfully. To those who curse me, let my soul be silent; and let my soul be like dust to all. Open my heart to Your Torah, and let my soul pursue Your commandments. As for all who plan evil against me, swiftly annul their counsel and frustrate their plans. Do it for the sake of Your Name; do it for the sake of Your right hand; do it for the sake of Your holiness; do it for the sake of Your Torah. That Your beloved ones may be delivered, save with Your right hand and answer me.\n\nMay the words of my mouth and the meditation of my heart be acceptable before You, Lord, my Rock and my Redeemer.\n\nHe Who makes peace in His heights, may He make peace upon us and upon all Israel. And say: Amen.",
    },
  ],
};
