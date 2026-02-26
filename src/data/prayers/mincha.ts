import type { Tefila } from "../types";

export const ashrei: Tefila = {
  id: "ashrei-mincha",
  name: "Ashrei",
  nameHe: "אשרי",
  category: "mincha",
  timeContext: "mincha",
  sections: [
    {
      id: "ashrei-mincha-text",
      title: "Ashrei",
      titleHe: "אשרי",
      text: "אַשְׁרֵי יוֹשְׁבֵי בֵיתֶךָ, עוֹד יְהַלְלוּךָ סֶּלָה.\nאַשְׁרֵי הָעָם שֶׁכָּכָה לּוֹ, אַשְׁרֵי הָעָם שֶׁה' אֱלֹהָיו.\n\nתְּהִלָּה לְדָוִד:\nאֲרוֹמִמְךָ אֱלוֹהַי הַמֶּלֶךְ, וַאֲבָרְכָה שִׁמְךָ לְעוֹלָם וָעֶד.\nבְּכָל יוֹם אֲבָרְכֶךָּ, וַאֲהַלְלָה שִׁמְךָ לְעוֹלָם וָעֶד.\nגָּדוֹל ה' וּמְהֻלָּל מְאֹד, וְלִגְדֻלָּתוֹ אֵין חֵקֶר.\nדּוֹר לְדוֹר יְשַׁבַּח מַעֲשֶׂיךָ, וּגְבוּרוֹתֶיךָ יַגִּידוּ.\nהֲדַר כְּבוֹד הוֹדֶךָ, וְדִבְרֵי נִפְלְאוֹתֶיךָ אָשִׂיחָה.\nוֶעֱזוּז נוֹרְאוֹתֶיךָ יֹאמֵרוּ, וּגְדֻלָּתְךָ אֲסַפְּרֶנָּה.\nזֵכֶר רַב טוּבְךָ יַבִּיעוּ, וְצִדְקָתְךָ יְרַנֵּנוּ.\nחַנּוּן וְרַחוּם ה', אֶרֶךְ אַפַּיִם וּגְדָל חָסֶד.\nטוֹב ה' לַכֹּל, וְרַחֲמָיו עַל כָּל מַעֲשָׂיו.\nיוֹדוּךָ ה' כָּל מַעֲשֶׂיךָ, וַחֲסִידֶיךָ יְבָרְכוּכָה.\nכְּבוֹד מַלְכוּתְךָ יֹאמֵרוּ, וּגְבוּרָתְךָ יְדַבֵּרוּ.\nלְהוֹדִיעַ לִבְנֵי הָאָדָם גְּבוּרוֹתָיו, וּכְבוֹד הֲדַר מַלְכוּתוֹ.\nמַלְכוּתְךָ מַלְכוּת כָּל עוֹלָמִים, וּמֶמְשַׁלְתְּךָ בְּכָל דּוֹר וָדוֹר.\nסוֹמֵךְ ה' לְכָל הַנּוֹפְלִים, וְזוֹקֵף לְכָל הַכְּפוּפִים.\nעֵינֵי כֹל אֵלֶיךָ יְשַׂבֵּרוּ, וְאַתָּה נוֹתֵן לָהֶם אֶת אָכְלָם בְּעִתּוֹ.\nפּוֹתֵחַ אֶת יָדֶךָ, וּמַשְׂבִּיעַ לְכָל חַי רָצוֹן.\nצַדִּיק ה' בְּכָל דְּרָכָיו, וְחָסִיד בְּכָל מַעֲשָׂיו.\nקָרוֹב ה' לְכָל קוֹרְאָיו, לְכֹל אֲשֶׁר יִקְרָאֻהוּ בֶאֱמֶת.\nרְצוֹן יְרֵאָיו יַעֲשֶׂה, וְאֶת שַׁוְעָתָם יִשְׁמַע וְיוֹשִׁיעֵם.\nשׁוֹמֵר ה' אֶת כָּל אוֹהֲבָיו, וְאֵת כָּל הָרְשָׁעִים יַשְׁמִיד.\nתְּהִלַּת ה' יְדַבֶּר פִּי, וִיבָרֵךְ כָּל בָּשָׂר שֵׁם קָדְשׁוֹ לְעוֹלָם וָעֶד.\n\nוַאֲנַחְנוּ נְבָרֵךְ יָהּ, מֵעַתָּה וְעַד עוֹלָם, הַלְלוּיָהּ.",
      translation: "Praiseworthy are those who dwell in Your house; they will continue to praise You, Selah. Praiseworthy is the people for whom this is so; praiseworthy is the people whose God is the Lord.\n\nA psalm of praise by David: I will exalt You, my God the King, and I will bless Your Name forever and ever...",
    },
  ],
};

export const shemonehEsreiMincha: Tefila = {
  id: "shemoneh-esrei-mincha",
  name: "Shemoneh Esrei - Mincha",
  nameHe: "שמונה עשרה - מנחה",
  category: "mincha",
  timeContext: "mincha",
  sections: [
    {
      id: "se-mincha-opening",
      title: "Opening",
      titleHe: "פתיחה",
      instruction: "Take three steps forward. Stand with feet together.",
      text: "אֲדֹנָי, שְׂפָתַי תִּפְתָּח, וּפִי יַגִּיד תְּהִלָּתֶךָ.",
      translation: "My Lord, open my lips, that my mouth may declare Your praise.",
    },
    {
      id: "se-mincha-avos",
      title: "Avos",
      titleHe: "אבות",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ, אֱלֹהֵי אַבְרָהָם, אֱלֹהֵי יִצְחָק, וֵאלֹהֵי יַעֲקֹב, הָאֵל הַגָּדוֹל הַגִּבּוֹר וְהַנּוֹרָא, אֵל עֶלְיוֹן, גּוֹמֵל חֲסָדִים טוֹבִים, וְקוֹנֵה הַכֹּל, וְזוֹכֵר חַסְדֵּי אָבוֹת, וּמֵבִיא גוֹאֵל לִבְנֵי בְנֵיהֶם, לְמַעַן שְׁמוֹ בְּאַהֲבָה.\n\nמֶלֶךְ עוֹזֵר וּמוֹשִׁיעַ וּמָגֵן. בָּרוּךְ אַתָּה ה', מָגֵן אַבְרָהָם.",
      translation: "Blessed are You, Lord our God and God of our fathers, God of Abraham, God of Isaac, and God of Jacob, the great, mighty, and awesome God, God Most High, Who bestows beneficent kindnesses, Who creates all, Who remembers the kindnesses of the patriarchs, and Who brings a redeemer to their children's children, for His Name's sake, with love.\n\nKing, Helper, Savior, and Shield. Blessed are You, Lord, Shield of Abraham.",
    },
    {
      id: "se-mincha-closing",
      title: "Closing",
      titleHe: "סיום",
      instruction: "Take three steps back, bow left, right, then forward.",
      text: "אֱלֹהַי, נְצוֹר לְשׁוֹנִי מֵרָע, וּשְׂפָתַי מִדַּבֵּר מִרְמָה. וְלִמְקַלְלַי נַפְשִׁי תִדּוֹם, וְנַפְשִׁי כֶּעָפָר לַכֹּל תִּהְיֶה. פְּתַח לִבִּי בְּתוֹרָתֶךָ, וּבְמִצְוֹתֶיךָ תִּרְדוֹף נַפְשִׁי.\n\nיִהְיוּ לְרָצוֹן אִמְרֵי פִי וְהֶגְיוֹן לִבִּי לְפָנֶיךָ, ה' צוּרִי וְגוֹאֲלִי.\n\nעוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו, הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ, וְעַל כָּל יִשְׂרָאֵל, וְאִמְרוּ אָמֵן.",
      translation: "My God, guard my tongue from evil, and my lips from speaking deceitfully. To those who curse me, let my soul be silent; and let my soul be like dust to all. Open my heart to Your Torah, and let my soul pursue Your commandments.\n\nMay the words of my mouth and the meditation of my heart be acceptable before You, Lord, my Rock and my Redeemer.\n\nHe Who makes peace in His heights, may He make peace upon us and upon all Israel, and say Amen.",
    },
  ],
};
