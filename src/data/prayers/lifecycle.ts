import type { Tefila } from "../types";

export const shevaBrachos: Tefila = {
  id: "sheva-brachos",
  name: "Sheva Brachos",
  nameHe: "שבע ברכות",
  category: "lifecycle",
  timeContext: "anytime",
  sections: [
    {
      id: "sb-hagafen",
      title: "Borei Pri HaGafen",
      titleHe: "בורא פרי הגפן",
      instruction: "First bracha — over a cup of wine.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who creates the fruit of the vine.",
    },
    {
      id: "sb-shehakol",
      title: "She'hakol Bara Lichvodo",
      titleHe: "שהכל ברא לכבודו",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהַכֹּל בָּרָא לִכְבוֹדוֹ.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who has created everything for His glory.",
    },
    {
      id: "sb-yotzer",
      title: "Yotzer Ha'Adam",
      titleHe: "יוצר האדם",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, יוֹצֵר הָאָדָם.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who fashioned the Man.",
    },
    {
      id: "sb-betzelem",
      title: "Asher Yatzar Es Ha'Adam",
      titleHe: "אשר יצר את האדם",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶת הָאָדָם בְּצַלְמוֹ, בְּצֶלֶם דְּמוּת תַּבְנִיתוֹ, וְהִתְקִין לוֹ מִמֶּנּוּ בִּנְיַן עֲדֵי עַד. בָּרוּךְ אַתָּה ה', יוֹצֵר הָאָדָם.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who fashioned the Man in His image, in the image of the likeness of His form, and prepared for him, from himself, an everlasting edifice. Blessed are You, Lord, Who fashions the Man.",
    },
    {
      id: "sb-sos-tasis",
      title: "Sos Tasis",
      titleHe: "שוש תשיש",
      text: "שׂוֹשׂ תָּשִׂישׂ וְתָגֵל הָעֲקָרָה, בְּקִבּוּץ בָּנֶיהָ לְתוֹכָהּ בְּשִׂמְחָה. בָּרוּךְ אַתָּה ה', מְשַׂמֵּחַ צִיּוֹן בְּבָנֶיהָ.",
      translation:
        "May the barren one greatly rejoice and be glad at the ingathering of her children to her midst in joy. Blessed are You, Lord, Who gladdens Zion through her children.",
    },
    {
      id: "sb-sameach",
      title: "Sameach Tesamach",
      titleHe: "שמח תשמח",
      text: "שַׂמֵּחַ תְּשַׂמַּח רֵעִים הָאֲהוּבִים, כְּשַׂמֵּחֲךָ יְצִירְךָ בְּגַן עֵדֶן מִקֶּדֶם. בָּרוּךְ אַתָּה ה', מְשַׂמֵּחַ חָתָן וְכַלָּה.",
      translation:
        "Gladden the beloved companions, as You gladdened Your creature in the Garden of Eden of old. Blessed are You, Lord, Who gladdens groom and bride.",
    },
    {
      id: "sb-asher-bara",
      title: "Asher Bara",
      titleHe: "אשר ברא",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּרָא שָׂשׂוֹן וְשִׂמְחָה, חָתָן וְכַלָּה, גִּילָה רִנָּה, דִּיצָה וְחֶדְוָה, אַהֲבָה וְאַחֲוָה, שָׁלוֹם וְרֵעוּת. מְהֵרָה ה' אֱלֹהֵינוּ, יִשָּׁמַע בְּעָרֵי יְהוּדָה וּבְחוּצוֹת יְרוּשָׁלַיִם, קוֹל שָׂשׂוֹן וְקוֹל שִׂמְחָה, קוֹל חָתָן וְקוֹל כַלָּה, קוֹל מִצְהֲלוֹת חֲתָנִים מֵחֻפָּתָם, וּנְעָרִים מִמִּשְׁתֵּה נְגִינָתָם. בָּרוּךְ אַתָּה ה', מְשַׂמֵּחַ חָתָן עִם הַכַּלָּה.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who created joy and gladness, groom and bride, mirth, song, delight and rejoicing, love and harmony, peace and companionship. Lord our God, may there soon be heard in the cities of Judah and in the streets of Jerusalem, the voice of joy and the voice of gladness, the voice of the groom and the voice of the bride, the jubilant voice of grooms from their canopies and of young men from their feasts of song. Blessed are You, Lord, Who gladdens the groom with the bride.",
    },
  ],
};

export const brisMilah: Tefila = {
  id: "bris-milah",
  name: "Bris Milah",
  nameHe: "ברית מילה",
  category: "lifecycle",
  timeContext: "anytime",
  sections: [
    {
      id: "bm-bracha-mohel",
      title: "Mohel's Bracha",
      titleHe: "ברכת המוהל",
      instruction: "The mohel recites before the circumcision:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל הַמִּילָה.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments, and commanded us concerning the circumcision.",
    },
    {
      id: "bm-bracha-father",
      title: "Father's Bracha",
      titleHe: "ברכת האב",
      instruction: "The father recites after the circumcision:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ לְהַכְנִיסוֹ בִּבְרִיתוֹ שֶׁל אַבְרָהָם אָבִינוּ.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments, and commanded us to bring him into the covenant of Abraham our father.",
    },
    {
      id: "bm-response",
      title: "Congregation's Response",
      titleHe: "תגובת הקהל",
      instruction: "Those present respond:",
      text: "כְּשֵׁם שֶׁנִּכְנַס לַבְּרִית, כֵּן יִכָּנֵס לְתוֹרָה, וּלְחֻפָּה, וּלְמַעֲשִׂים טוֹבִים.",
      translation:
        "Just as he has entered the covenant, so may he enter into Torah, the marriage canopy, and good deeds.",
    },
    {
      id: "bm-naming",
      title: "Naming Bracha",
      titleHe: "ברכת השם",
      instruction: "Over a cup of wine, the following bracha is recited:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.\n\nבָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדַּשׁ יְדִיד מִבֶּטֶן, וְחוֹק בִּשְׁאֵרוֹ שָׂם, וְצֶאֱצָאָיו חָתַם בְּאוֹת בְּרִית קוֹדֶשׁ. עַל כֵּן, בִּשְׂכַר זֹאת, אֵל חַי חֶלְקֵנוּ צוּרֵנוּ, צַוֵּה לְהַצִּיל יְדִידוּת שְׁאֵרֵנוּ מִשַּׁחַת, לְמַעַן בְּרִיתוֹ אֲשֶׁר שָׂם בִּבְשָׂרֵנוּ. בָּרוּךְ אַתָּה ה', כּוֹרֵת הַבְּרִית.\n\nאֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ, קַיֵּם אֶת הַיֶּלֶד הַזֶּה לְאָבִיו וּלְאִמּוֹ, וְיִקָּרֵא שְׁמוֹ בְּיִשְׂרָאֵל _______ בֶּן _______.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who creates the fruit of the vine.\n\nBlessed are You, Lord our God, King of the universe, Who sanctified the beloved from the womb, set a statute in his flesh, and sealed his offspring with the sign of the holy covenant. Therefore, in reward of this, O living God, our Portion, our Rock, command the rescue of the beloved of our flesh from destruction, for the sake of the covenant He placed in our flesh. Blessed are You, Lord, Who makes the covenant.\n\nOur God and God of our fathers, sustain this child for his father and for his mother, and let his name in Israel be called _______ son of _______.",
    },
  ],
};

export const pidyonHaben: Tefila = {
  id: "pidyon-haben",
  name: "Pidyon HaBen",
  nameHe: "פדיון הבן",
  category: "lifecycle",
  timeContext: "anytime",
  sections: [
    {
      id: "ph-father",
      title: "Father's Declaration",
      titleHe: "הצהרת האב",
      instruction:
        "On the 31st day after birth, the father presents his firstborn son to a Kohen and says:",
      text: "בְּנִי זֶה בְּכוֹרִי הוּא, פֶּטֶר רֶחֶם לְאִמּוֹ, וְהַקָּדוֹשׁ בָּרוּךְ הוּא צִוָּה לִפְדּוֹתוֹ, שֶׁנֶּאֱמַר: וּפְדוּיָו מִבֶּן חֹדֶשׁ תִּפְדֶּה, בְּעֶרְכְּךָ כֶּסֶף חֲמֵשֶׁת שְׁקָלִים בְּשֶׁקֶל הַקֹּדֶשׁ, עֶשְׂרִים גֵּרָה הוּא.",
      translation:
        "This, my firstborn son, is the first issue of his mother's womb, and the Holy One, blessed be He, has commanded to redeem him, as it says: 'And those that are to be redeemed from a month old you shall redeem, according to your valuation, for the money of five shekels, after the shekel of the sanctuary, which is twenty gerah.'",
    },
    {
      id: "ph-kohen-question",
      title: "Kohen's Question",
      titleHe: "שאלת הכהן",
      instruction: "The Kohen asks the father:",
      text: "מַאי בָּעֵית טְפֵי, לְמֵיתַב לִי בְּרָךְ בּוּכְרָא, אוֹ בָּעֵית לְמִפְרְקֵיהּ בַּחֲמֵשׁ סְלָעִים דְּמִחַיְּבַתְּ בִּפְדוּיֵיהּ מִן אוֹרַיְתָא?",
      translation:
        "Which do you prefer: to give me your firstborn son, or to redeem him for five selaim which you are obligated to give according to the Torah?",
    },
    {
      id: "ph-father-response",
      title: "Father's Response",
      titleHe: "תשובת האב",
      instruction: "The father responds, presenting the coins:",
      text: "חָפֵץ אֲנִי לִפְדּוֹת אֶת בְּנִי, וְהֵילָךְ פְּדִיּוֹנוֹ כַּאֲשֶׁר חֻיַּבְתִּי מִן הַתּוֹרָה.",
      translation:
        "I wish to redeem my son. Here is the redemption price as I am obligated by the Torah.",
    },
    {
      id: "ph-brachos",
      title: "Brachos",
      titleHe: "ברכות",
      instruction: "The father recites:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל פִּדְיוֹן הַבֵּן.\n\nבָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהֶחֱיָנוּ, וְקִיְּמָנוּ, וְהִגִּיעָנוּ לַזְּמַן הַזֶּה.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments, and commanded us concerning the redemption of the son.\n\nBlessed are You, Lord our God, King of the universe, Who has kept us alive, sustained us, and brought us to this season.",
    },
    {
      id: "ph-kohen-declaration",
      title: "Kohen's Declaration",
      titleHe: "הכרזת הכהן",
      instruction: "The Kohen holds the coins over the child and says:",
      text: "קִבַּלְתִּי עָלַי חֲמֵשׁ סְלָעִים אֵלּוּ בִּפְדִיּוֹן בְּנְךָ זֶה, כְּדִין תּוֹרָתֵנוּ הַקְּדוֹשָׁה, עַל יְדֵי מֹשֶׁה רַבֵּנוּ עָלָיו הַשָּׁלוֹם.\n\nזֶה תַּחַת זֶה, זֶה חִלּוּף זֶה, זֶה מָחוּל עַל זֶה. וְיִכָּנֵס זֶה הַיֶּלֶד לַחַיִּים, לַתּוֹרָה, וּלְיִרְאַת שָׁמַיִם. יְהִי רָצוֹן שֶׁכְּשֵׁם שֶׁנִּכְנַס לִפְדִיּוֹן, כֵּן יִכָּנֵס לְתוֹרָה, וּלְחֻפָּה, וּלְמַעֲשִׂים טוֹבִים. אָמֵן.",
      translation:
        "I accept upon myself these five selaim for the redemption of this your son, as is required by our holy Torah through Moses our teacher, peace be upon him.\n\nThis is in place of that, this is in exchange for that, this is pardoned for that. May this child enter into life, into Torah, and into the fear of Heaven. May it be His will that just as he has entered into redemption, so may he enter into Torah, the marriage canopy, and good deeds. Amen.",
    },
    {
      id: "ph-birkas-kohanim",
      title: "Birkas Kohanim",
      titleHe: "ברכת כהנים",
      instruction: "The Kohen places his hands on the child's head and blesses him:",
      text: "יְשִׂמְךָ אֱלֹהִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה.\n\nיְבָרֶכְךָ ה' וְיִשְׁמְרֶךָ.\nיָאֵר ה' פָּנָיו אֵלֶיךָ וִיחֻנֶּךָּ.\nיִשָּׂא ה' פָּנָיו אֵלֶיךָ, וְיָשֵׂם לְךָ שָׁלוֹם.\n\nה' שֹׁמְרֶךָ ה' צִלְּךָ עַל יַד יְמִינֶךָ. לְאוֹרֶךְ יָמִים אַשְׂבִּיעֵהוּ וְאַרְאֵהוּ בִּישׁוּעָתִי.",
      translation:
        "May God make you like Ephraim and Menashe.\n\nMay the Lord bless you and protect you.\nMay the Lord shine His countenance upon you and be gracious to you.\nMay the Lord turn His countenance toward you and grant you peace.\n\nThe Lord is your guardian, the Lord is your shade at your right hand. With long life I will satisfy him and show him My salvation.",
    },
  ],
};

export const marriageBlessings: Tefila = {
  id: "marriage-blessings",
  name: "Marriage Blessings",
  nameHe: "ברכות הנישואין",
  category: "lifecycle",
  timeContext: "anytime",
  sections: [
    {
      id: "mb-eirusin-hagafen",
      title: "Kiddushin — Borei Pri HaGafen",
      titleHe: "קידושין — בורא פרי הגפן",
      instruction: "Under the chuppah. The mesader kiddushin recites over a cup of wine:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who creates the fruit of the vine.",
    },
    {
      id: "mb-eirusin",
      title: "Birkas Eirusin",
      titleHe: "ברכת אירוסין",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל הָעֲרָיוֹת, וְאָסַר לָנוּ אֶת הָאֲרוּסוֹת, וְהִתִּיר לָנוּ אֶת הַנְּשׂוּאוֹת לָנוּ עַל יְדֵי חֻפָּה וְקִדּוּשִׁין. בָּרוּךְ אַתָּה ה', מְקַדֵּשׁ עַמּוֹ יִשְׂרָאֵל עַל יְדֵי חֻפָּה וְקִדּוּשִׁין.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who has sanctified us with His commandments, and has forbidden us the betrothed women, and has permitted to us those who are married to us through chuppah and kiddushin. Blessed are You, Lord, Who sanctifies His people Israel through chuppah and kiddushin.",
    },
    {
      id: "mb-note",
      title: "After Kiddushin",
      titleHe: "לאחר הקידושין",
      instruction: "After kiddushin, the kesubah is read, followed by the Sheva Brachos (see 'Sheva Brachos' for the full seven blessings).",
      text: "",
      translation: "",
    },
  ],
};
