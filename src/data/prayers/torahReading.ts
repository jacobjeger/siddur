import type { Tefila } from "../types";

export const torahReadingWeekday: Tefila = {
  id: "torah-reading-weekday",
  name: "Torah Reading (Weekday)",
  nameHe: "קריאת התורה",
  category: "shacharis",
  timeContext: "shacharis",
  sections: [
    {
      id: "tr-hotzaah",
      title: "Taking Out the Torah",
      titleHe: "הוצאת ספר תורה",
      instruction: "When the Torah is removed from the Aron Kodesh on Monday and Thursday.",
      text: "וַיְהִי בִּנְסוֹעַ הָאָרוֹן, וַיֹּאמֶר מֹשֶׁה, קוּמָה ה', וְיָפֻצוּ אוֹיְבֶיךָ, וְיָנֻסוּ מְשַׂנְאֶיךָ מִפָּנֶיךָ.\n\nכִּי מִצִּיּוֹן תֵּצֵא תוֹרָה, וּדְבַר ה' מִירוּשָׁלַיִם.\n\nבָּרוּךְ שֶׁנָּתַן תּוֹרָה לְעַמּוֹ יִשְׂרָאֵל בִּקְדֻשָּׁתוֹ.",
      translation:
        "And it was, when the Ark would travel, Moses would say: Arise, Lord, and let Your enemies be scattered, and let those who hate You flee from before You.\n\nFor from Zion shall go forth Torah, and the word of the Lord from Jerusalem.\n\nBlessed is He Who gave the Torah to His people Israel in His holiness.",
    },
    {
      id: "tr-shema",
      title: "Shema and Gadlu",
      titleHe: "שמע וגדלו",
      text: "שְׁמַע יִשְׂרָאֵל, ה' אֱלֹהֵינוּ, ה' אֶחָד.\n\nאֶחָד אֱלֹהֵינוּ, גָּדוֹל אֲדוֹנֵינוּ, קָדוֹשׁ וְנוֹרָא שְׁמוֹ.\n\nגַּדְּלוּ לַה' אִתִּי, וּנְרוֹמְמָה שְׁמוֹ יַחְדָּו.",
      translation:
        "Hear, O Israel, the Lord is our God, the Lord is One.\n\nOne is our God, great is our Master, holy and awesome is His Name.\n\nExalt the Lord with me, and let us extol His Name together.",
    },
    {
      id: "tr-lecha",
      title: "Lecha Hashem",
      titleHe: "לך ה'",
      text: "לְךָ ה' הַגְּדֻלָּה, וְהַגְּבוּרָה, וְהַתִּפְאֶרֶת, וְהַנֵּצַח, וְהַהוֹד, כִּי כֹל בַּשָּׁמַיִם וּבָאָרֶץ. לְךָ ה' הַמַּמְלָכָה, וְהַמִּתְנַשֵּׂא לְכֹל לְרֹאשׁ.\n\nרוֹמְמוּ ה' אֱלֹהֵינוּ, וְהִשְׁתַּחֲווּ לַהֲדוֹם רַגְלָיו, קָדוֹשׁ הוּא. רוֹמְמוּ ה' אֱלֹהֵינוּ, וְהִשְׁתַּחֲווּ לְהַר קָדְשׁוֹ, כִּי קָדוֹשׁ ה' אֱלֹהֵינוּ.",
      translation:
        "Yours, Lord, is the greatness, the power, the glory, the victory, and the majesty; for all that is in heaven and on earth is Yours. Yours, Lord, is the kingdom, and You are exalted above all.\n\nExalt the Lord our God, and bow at His footstool, for He is holy. Exalt the Lord our God, and bow at His holy mountain, for the Lord our God is holy.",
    },
    {
      id: "tr-bracha-before",
      title: "Bracha Before the Torah Reading",
      titleHe: "ברכה לפני קריאת התורה",
      instruction: "The one called to the Torah (oleh) recites:",
      text: "בָּרְכוּ אֶת ה' הַמְבוֹרָךְ.\n\n(הַקָּהָל עוֹנֶה:) בָּרוּךְ ה' הַמְבוֹרָךְ לְעוֹלָם וָעֶד.\n\n(הָעוֹלֶה חוֹזֵר:) בָּרוּךְ ה' הַמְבוֹרָךְ לְעוֹלָם וָעֶד.\n\nבָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּחַר בָּנוּ מִכָּל הָעַמִּים, וְנָתַן לָנוּ אֶת תּוֹרָתוֹ. בָּרוּךְ אַתָּה ה', נוֹתֵן הַתּוֹרָה.",
      translation:
        "Bless the Lord, the blessed One.\n\n(Congregation responds:) Blessed is the Lord, the blessed One, for all eternity.\n\n(Oleh repeats:) Blessed is the Lord, the blessed One, for all eternity.\n\nBlessed are You, Lord our God, King of the universe, Who has chosen us from all the peoples and given us His Torah. Blessed are You, Lord, Who gives the Torah.",
    },
    {
      id: "tr-bracha-after",
      title: "Bracha After the Torah Reading",
      titleHe: "ברכה לאחרי קריאת התורה",
      instruction: "After the reading, the oleh recites:",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר נָתַן לָנוּ תּוֹרַת אֱמֶת, וְחַיֵּי עוֹלָם נָטַע בְּתוֹכֵנוּ. בָּרוּךְ אַתָּה ה', נוֹתֵן הַתּוֹרָה.",
      translation:
        "Blessed are You, Lord our God, King of the universe, Who gave us the Torah of truth and planted eternal life within us. Blessed are You, Lord, Who gives the Torah.",
    },
    {
      id: "tr-mi-sheberach",
      title: "Mi SheBerach for the Oleh",
      titleHe: "מי שברך לעולה",
      instruction: "The Gabbai recites for each oleh:",
      text: "מִי שֶׁבֵּרַךְ אֲבוֹתֵינוּ, אַבְרָהָם יִצְחָק וְיַעֲקֹב, הוּא יְבָרֵךְ אֶת _______ בֶּן/בַּת _______ בַּעֲבוּר שֶׁעָלָה לִכְבוֹד הַמָּקוֹם וְלִכְבוֹד הַתּוֹרָה. הַקָּדוֹשׁ בָּרוּךְ הוּא יִשְׁמְרֵהוּ וְיַצִּילֵהוּ מִכָּל צָרָה וְצוּקָה, וּמִכָּל נֶגַע וּמַחֲלָה, וְיִשְׁלַח בְּרָכָה וְהַצְלָחָה בְּכָל מַעֲשֵׂה יָדָיו, עִם כָּל יִשְׂרָאֵל אֶחָיו, וְנֹאמַר אָמֵן.",
      translation:
        "He Who blessed our fathers, Abraham, Isaac, and Jacob, may He bless _______ son/daughter of _______ because he/she has come up to honor God and to honor the Torah. May the Holy One, blessed be He, protect him/her and rescue him/her from every trouble and distress, from every plague and illness, and may He send blessing and success in all his/her endeavors, together with all Israel, his/her brethren, and let us say: Amen.",
    },
    {
      id: "tr-hachnasa",
      title: "Returning the Torah",
      titleHe: "הכנסת ספר תורה",
      instruction: "When the Torah is returned to the Aron Kodesh:",
      text: "יְהַלְלוּ אֶת שֵׁם ה', כִּי נִשְׂגָּב שְׁמוֹ לְבַדּוֹ.\n\nהוֹדוֹ עַל אֶרֶץ וְשָׁמָיִם, וַיָּרֶם קֶרֶן לְעַמּוֹ, תְּהִלָּה לְכָל חֲסִידָיו, לִבְנֵי יִשְׂרָאֵל עַם קְרוֹבוֹ, הַלְלוּיָהּ.\n\nמִזְמוֹר לְדָוִד: הָבוּ לַה' בְּנֵי אֵלִים, הָבוּ לַה' כָּבוֹד וָעוֹז. הָבוּ לַה' כְּבוֹד שְׁמוֹ, הִשְׁתַּחֲווּ לַה' בְּהַדְרַת קוֹדֶשׁ.\n\nוּבְנוּחֹה יֹאמַר, שׁוּבָה ה' רִבְבוֹת אַלְפֵי יִשְׂרָאֵל. קוּמָה ה' לִמְנוּחָתֶךָ, אַתָּה וַאֲרוֹן עֻזֶּךָ. כֹּהֲנֶיךָ יִלְבְּשׁוּ צֶדֶק, וַחֲסִידֶיךָ יְרַנֵּנוּ. בַּעֲבוּר דָּוִד עַבְדֶּךָ, אַל תָּשֵׁב פְּנֵי מְשִׁיחֶךָ. כִּי לֶקַח טוֹב נָתַתִּי לָכֶם, תּוֹרָתִי אַל תַּעֲזוֹבוּ. עֵץ חַיִּים הִיא לַמַּחֲזִיקִים בָּהּ, וְתוֹמְכֶיהָ מְאֻשָּׁר. דְּרָכֶיהָ דַרְכֵי נוֹעַם, וְכָל נְתִיבוֹתֶיהָ שָׁלוֹם. הֲשִׁיבֵנוּ ה' אֵלֶיךָ וְנָשׁוּבָה, חַדֵּשׁ יָמֵינוּ כְּקֶדֶם.",
      translation:
        "Let them praise the Name of the Lord, for His Name alone is exalted.\n\nHis majesty is above earth and heaven. He has raised the horn of His people, [which is] praise for all His pious ones, for the children of Israel, the people close to Him. Halleluyah!\n\nA psalm of David: Render to the Lord, sons of the mighty, render to the Lord honor and strength. Render to the Lord the honor due His Name; bow to the Lord in the beauty of holiness.\n\nAnd when it rested, he would say: Return, Lord, to the myriads of thousands of Israel. Arise, Lord, to Your resting place, You and the Ark of Your strength. Let Your priests be clothed in righteousness, and Your pious ones will sing for joy. For the sake of David Your servant, do not turn away the face of Your anointed. For I have given you a good teaching; do not forsake My Torah. It is a tree of life to those who hold fast to it, and its supporters are fortunate. Its ways are ways of pleasantness, and all its paths are peace. Return us to You, Lord, and we shall return; renew our days as of old.",
    },
  ],
};

export const mondayThursdayTachanun: Tefila = {
  id: "monday-thursday-tachanun",
  name: "V'Hu Rachum (Monday & Thursday)",
  nameHe: "והוא רחום",
  category: "shacharis",
  timeContext: "shacharis",
  sections: [
    {
      id: "mtt-vehu-rachum",
      title: "V'Hu Rachum",
      titleHe: "והוא רחום",
      instruction:
        "The extended V'Hu Rachum is added on Monday and Thursday mornings before the regular Tachanun.",
      text: "וְהוּא רַחוּם יְכַפֵּר עָוֹן וְלֹא יַשְׁחִית, וְהִרְבָּה לְהָשִׁיב אַפּוֹ, וְלֹא יָעִיר כָּל חֲמָתוֹ. אַתָּה ה' לֹא תִכְלָא רַחֲמֶיךָ מִמֶּנִּי, חַסְדְּךָ וַאֲמִתְּךָ תָּמִיד יִצְּרוּנִי. זְכוֹר רַחֲמֶיךָ ה' וַחֲסָדֶיךָ, כִּי מֵעוֹלָם הֵמָּה. תְּנָה עוֹז לֵאלֹהִים, עַל יִשְׂרָאֵל גַּאֲוָתוֹ וְעֻזּוֹ בַּשְׁחָקִים. נוֹרָא אֱלֹהִים מִמִּקְדָּשֶׁיךָ, אֵל יִשְׂרָאֵל הוּא נוֹתֵן עוֹז וְתַעֲצוּמוֹת לָעָם, בָּרוּךְ אֱלֹהִים. אֵל נְקָמוֹת ה', אֵל נְקָמוֹת הוֹפִיעַ. הִנָּשֵׂא שׁוֹפֵט הָאָרֶץ, הָשֵׁב גְּמוּל עַל גֵּאִים. לַה' הַיְשׁוּעָה, עַל עַמְּךָ בִרְכָתֶךָ סֶּלָה. ה' צְבָאוֹת עִמָּנוּ, מִשְׂגָּב לָנוּ אֱלֹהֵי יַעֲקֹב סֶלָה. ה' צְבָאוֹת, אַשְׁרֵי אָדָם בּוֹטֵחַ בָּךְ. ה' הוֹשִׁיעָה, הַמֶּלֶךְ יַעֲנֵנוּ בְּיוֹם קָרְאֵנוּ.",
      translation:
        "And He, being compassionate, forgives iniquity and does not destroy; He frequently turns back His anger and does not arouse all His wrath. You, Lord, do not withhold Your mercies from me; may Your kindness and Your truth always protect me. Remember Your mercies, Lord, and Your kindnesses, for they are from the beginning of the world. Give strength unto God; over Israel is His pride, and His might is in the heavens. Awesome is God from Your sanctuaries; the God of Israel—He gives strength and power to the people, blessed is God. O God of vengeance, Lord; O God of vengeance, appear! Arise, Judge of the earth; render recompense to the haughty. Salvation belongs to the Lord; upon Your people is Your blessing, Selah. The Lord of hosts is with us; the God of Jacob is a stronghold for us, Selah. Lord of hosts, fortunate is the man who trusts in You. Lord, deliver us; may the King answer us on the day we call.",
    },
    {
      id: "mtt-guardian",
      title: "Shomer Yisrael",
      titleHe: "שומר ישראל",
      text: "שׁוֹמֵר יִשְׂרָאֵל, שְׁמוֹר שְׁאֵרִית יִשְׂרָאֵל, וְאַל יֹאבַד יִשְׂרָאֵל, הָאוֹמְרִים שְׁמַע יִשְׂרָאֵל.\n\nשׁוֹמֵר גּוֹי אֶחָד, שְׁמוֹר שְׁאֵרִית עַם אֶחָד, וְאַל יֹאבַד גּוֹי אֶחָד, הַמְיַחֲדִים שִׁמְךָ ה' אֱלֹהֵינוּ ה' אֶחָד.\n\nשׁוֹמֵר גּוֹי קָדוֹשׁ, שְׁמוֹר שְׁאֵרִית עַם קָדוֹשׁ, וְאַל יֹאבַד גּוֹי קָדוֹשׁ, הַמְשַׁלְּשִׁים בְּשָׁלוֹשׁ קְדֻשּׁוֹת לְקָדוֹשׁ.",
      translation:
        "Guardian of Israel, guard the remnant of Israel, and let not Israel perish, who say 'Hear, O Israel.'\n\nGuardian of a unique nation, guard the remnant of a unique people, and let not a unique nation perish, who proclaim the unity of Your Name: 'The Lord our God, the Lord is One.'\n\nGuardian of a holy nation, guard the remnant of a holy people, and let not a holy nation perish, who repeat the threefold sanctification to the Holy One.",
    },
    {
      id: "mtt-closing",
      title: "Closing",
      titleHe: "סיום",
      text: "מִתְרַצֶּה בְּרַחֲמִים וּמִתְפַּיֵּס בְּתַחֲנוּנִים, הִתְרַצֵּה וְהִתְפַּיֵּס לְדוֹר עָנִי, כִּי אֵין עוֹזֵר.\n\nאָבִינוּ מַלְכֵּנוּ, חָנֵּנוּ וַעֲנֵנוּ, כִּי אֵין בָּנוּ מַעֲשִׂים, עֲשֵׂה עִמָּנוּ צְדָקָה וָחֶסֶד וְהוֹשִׁיעֵנוּ.",
      translation:
        "He Who is appeased through mercy and conciliated through supplication, be appeased and conciliated to a poor generation, for there is none who helps.\n\nOur Father, our King, be gracious to us and answer us, for we have no meritorious deeds; deal with us in charity and kindness and save us.",
    },
  ],
};
