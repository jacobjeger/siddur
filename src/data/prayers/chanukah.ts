import type { Tefila } from "../types";

export const chanukahCandles: Tefila = {
  id: "chanukah-candles",
  name: "Chanukah Candle Lighting",
  nameHe: "הדלקת נרות חנוכה",
  category: "holidays",
  timeContext: "anytime",
  sections: [
    {
      id: "ch-bracha-1",
      title: "Lehadlik Ner",
      titleHe: "להדליק נר",
      instruction: "Light the Chanukah menorah after nightfall. On the first night, add Shehecheyanu.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה.",
      translation: "Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments, and commanded us to kindle the Chanukah light.",
    },
    {
      id: "ch-bracha-2",
      title: "She'asa Nissim",
      titleHe: "שעשה נסים",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ, בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה.",
      translation: "Blessed are You, Lord our God, King of the universe, Who performed miracles for our fathers, in those days at this time.",
    },
    {
      id: "ch-bracha-3",
      title: "Shehecheyanu",
      titleHe: "שהחיינו",
      instruction: "Said on the first night only.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהֶחֱיָנוּ, וְקִיְּמָנוּ, וְהִגִּיעָנוּ לַזְּמַן הַזֶּה.",
      translation: "Blessed are You, Lord our God, King of the universe, Who has kept us alive, sustained us, and brought us to this season.",
    },
  ],
};

export const hanerosHalalu: Tefila = {
  id: "haneros-halalu",
  name: "HaNerot Halalu",
  nameHe: "הנרות הללו",
  category: "holidays",
  timeContext: "anytime",
  sections: [
    {
      id: "hnh-text",
      title: "HaNerot Halalu",
      titleHe: "הנרות הללו",
      instruction: "Recited after kindling the Chanukah lights.",
      text: "הַנֵּרוֹת הַלָּלוּ אָנוּ מַדְלִיקִין עַל הַנִּסִּים וְעַל הַנִּפְלָאוֹת וְעַל הַתְּשׁוּעוֹת וְעַל הַמִּלְחָמוֹת, שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה, עַל יְדֵי כֹּהֲנֶיךָ הַקְּדוֹשִׁים. וְכָל שְׁמוֹנַת יְמֵי חֲנֻכָּה, הַנֵּרוֹת הַלָּלוּ קוֹדֶשׁ הֵם, וְאֵין לָנוּ רְשׁוּת לְהִשְׁתַּמֵּשׁ בָּהֶם, אֶלָּא לִרְאוֹתָם בִּלְבָד, כְּדֵי לְהוֹדוֹת וּלְהַלֵּל לְשִׁמְךָ הַגָּדוֹל, עַל נִסֶּיךָ וְעַל נִפְלְאוֹתֶיךָ וְעַל יְשׁוּעוֹתֶיךָ.",
      translation: "These lights we kindle for the miracles, the wonders, the salvations, and the battles which You performed for our fathers in those days at this time, through Your holy priests. During all eight days of Chanukah, these lights are sacred, and we are not permitted to make use of them, but only to look at them, in order to give thanks and praise to Your great Name for Your miracles, Your wonders, and Your salvations.",
    },
  ],
};

export const maozTzur: Tefila = {
  id: "maoz-tzur",
  name: "Maoz Tzur",
  nameHe: "מעוז צור",
  category: "holidays",
  timeContext: "anytime",
  sections: [
    {
      id: "mt-text",
      title: "Maoz Tzur",
      titleHe: "מעוז צור",
      instruction: "Sung after lighting the Chanukah candles.",
      text: "מָעוֹז צוּר יְשׁוּעָתִי, לְךָ נָאֶה לְשַׁבֵּחַ.\nתִּכּוֹן בֵּית תְּפִלָּתִי, וְשָׁם תּוֹדָה נְזַבֵּחַ.\nלְעֵת תָּכִין מַטְבֵּחַ, מִצָּר הַמְנַבֵּחַ.\nאָז אֶגְמוֹר בְּשִׁיר מִזְמוֹר, חֲנֻכַּת הַמִּזְבֵּחַ.\n\nרָעוֹת שָׂבְעָה נַפְשִׁי, בְּיָגוֹן כֹּחִי כָּלָה.\nחַיַּי מֵרְרוּ בְקוֹשִׁי, בְּשִׁעְבּוּד מַלְכוּת עֶגְלָה.\nוּבְיָדוֹ הַגְּדוֹלָה, הוֹצִיא אֶת הַסְּגֻלָּה.\nחֵיל פַּרְעֹה וְכָל זַרְעוֹ, יָרְדוּ כְּאֶבֶן בִּמְצוּלָה.\n\nדְּבִיר קָדְשׁוֹ הֱבִיאַנִי, וְגַם שָׁם לֹא שָׁקַטְתִּי.\nוּבָא נוֹגֵשׂ וְהִגְלַנִי, כִּי זָרִים עָבַדְתִּי.\nוְיֵין רַעַל מָסַכְתִּי, כִּמְעַט שֶׁעָבַרְתִּי.\nקֵץ בָּבֶל, זְרֻבָּבֶל, לְקֵץ שִׁבְעִים נוֹשַׁעְתִּי.\n\nכְּרוֹת קוֹמַת בְּרוֹשׁ, בִּקֵּשׁ אֲגָגִי בֶּן הַמְּדָתָא.\nוְנִהְיָתָה לוֹ לְפַח וּלְמוֹקֵשׁ, וְגַאֲוָתוֹ נִשְׁבָּתָה.\nרֹאשׁ יְמִינִי נִשֵּׂאתָ, וְאוֹיֵב שְׁמוֹ מָחִיתָ.\nרֹב בָּנָיו וְקִנְיָנָיו, עַל הָעֵץ תָּלִיתָ.\n\nיְוָנִים נִקְבְּצוּ עָלַי, אֲזַי בִּימֵי חַשְׁמַנִּים.\nוּפָרְצוּ חוֹמוֹת מִגְדָּלַי, וְטִמְּאוּ כָּל הַשְּׁמָנִים.\nוּמִנּוֹתַר קַנְקַנִּים, נַעֲשָׂה נֵס לַשּׁוֹשַׁנִּים.\nבְּנֵי בִינָה יְמֵי שְׁמוֹנָה, קָבְעוּ שִׁיר וּרְנָנִים.",
      translation: "O mighty Rock of my salvation, to You it is fitting to praise.\nRestore my House of Prayer, and there we will offer thanksgiving.\nWhen You will have prepared the slaughter of the blaspheming foe,\nThen I shall complete with a song of hymn the dedication of the altar.\n\nMy soul was sated with troubles, my strength was consumed with grief.\nThey embittered my life with hardship, with the subjugation of the kingdom of the calf.\nBut with His great hand He brought out the treasured people.\nPharaoh's army and all his offspring went down like a stone into the deep.\n\nTo His holy abode He brought me, but there too I had no rest.\nThe oppressor came and exiled me, for I had served strange gods.\nI had drunk poisonous wine; I almost perished.\nThe end of Babylon came through Zerubavel; at the end of seventy years I was saved.\n\nTo cut down the towering cypress sought the Aggagite, son of Hammedatha.\nBut it became a snare and a stumbling block to him, and his arrogance was stilled.\nThe head of the Benjaminite You raised, and the enemy—his name You obliterated.\nHis many sons and possessions You hung upon the gallows.\n\nThe Greeks gathered against me in the days of the Hasmoneans.\nThey broke through the walls of my towers and defiled all the oils.\nBut from the remnant of the flasks a miracle was wrought for the roses.\nMen of insight—eight days they established for song and jubilation.",
    },
  ],
};
