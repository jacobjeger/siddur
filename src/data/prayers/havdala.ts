import type { Tefila } from "../types";

export const havdala: Tefila = {
  id: "havdala",
  name: "Havdala",
  nameHe: "הבדלה",
  category: "other",
  timeContext: "anytime",
  sections: [
    {
      id: "hav-intro",
      title: "Introductory Verses",
      titleHe: "פסוקי פתיחה",
      instruction: "Recited at the conclusion of Shabbos over a cup of wine.",
      text: "הִנֵּה אֵל יְשׁוּעָתִי, אֶבְטַח וְלֹא אֶפְחָד. כִּי עָזִּי וְזִמְרָת יָהּ ה', וַיְהִי לִי לִישׁוּעָה. וּשְׁאַבְתֶּם מַיִם בְּשָׂשׂוֹן מִמַּעַיְנֵי הַיְשׁוּעָה. לַה' הַיְשׁוּעָה, עַל עַמְּךָ בִרְכָתֶךָ סֶּלָה. ה' צְבָאוֹת עִמָּנוּ, מִשְׂגָּב לָנוּ אֱלֹהֵי יַעֲקֹב סֶלָה. ה' צְבָאוֹת, אַשְׁרֵי אָדָם בּוֹטֵחַ בָּךְ. ה' הוֹשִׁיעָה, הַמֶּלֶךְ יַעֲנֵנוּ בְיוֹם קָרְאֵנוּ.\n\nלַיְּהוּדִים הָיְתָה אוֹרָה וְשִׂמְחָה, וְשָׂשׂוֹן וִיקָר. כֵּן תִּהְיֶה לָנוּ. כּוֹס יְשׁוּעוֹת אֶשָּׂא, וּבְשֵׁם ה' אֶקְרָא.",
      translation: "Behold, God is my salvation; I will trust and not be afraid. For my strength and song is God the Lord, and He has been a salvation to me. You shall draw water with joy from the springs of salvation. Salvation belongs to the Lord; upon Your people is Your blessing, Selah. The Lord of hosts is with us; the God of Jacob is a stronghold for us, Selah. Lord of hosts, happy is the man who trusts in You. Lord, save us; the King will answer us on the day we call.\n\nThe Jews had light and gladness, joy and honor. So may it be for us. I will raise the cup of salvation and call upon the Name of the Lord.",
    },
    {
      id: "hav-wine",
      title: "Borei Pri HaGafen",
      titleHe: "בורא פרי הגפן",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates the fruit of the vine.",
    },
    {
      id: "hav-besamim",
      title: "Borei Minei Besamim",
      titleHe: "בורא מיני בשמים",
      instruction: "Smell the spices.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מִינֵי בְשָׂמִים.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates various kinds of spices.",
    },
    {
      id: "hav-fire",
      title: "Borei Me'orei Ha'Eish",
      titleHe: "בורא מאורי האש",
      instruction: "Look at the fingernails by the light of the Havdala candle.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מְאוֹרֵי הָאֵשׁ.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates the lights of fire.",
    },
    {
      id: "hav-hamavdil",
      title: "HaMavdil",
      titleHe: "המבדיל",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל, בֵּין אוֹר לְחוֹשֶׁךְ, בֵּין יִשְׂרָאֵל לָעַמִּים, בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה. בָּרוּךְ אַתָּה ה', הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל.",
      translation: "Blessed are You, Lord our God, King of the universe, Who distinguishes between sacred and secular, between light and darkness, between Israel and the nations, between the seventh day and the six working days. Blessed are You, Lord, Who distinguishes between sacred and secular.",
    },
  ],
};

export const vayitenLecha: Tefila = {
  id: "vayiten-lecha",
  name: "Vayiten Lecha",
  nameHe: "ויתן לך",
  category: "other",
  timeContext: "anytime",
  sections: [
    {
      id: "vtl-text",
      title: "Vayiten Lecha",
      titleHe: "ויתן לך",
      instruction: "Recited on Motzaei Shabbos after Havdala.",
      text: "וְיִתֶּן לְךָ הָאֱלֹהִים מִטַּל הַשָּׁמַיִם, וּמִשְׁמַנֵּי הָאָרֶץ, וְרֹב דָּגָן וְתִירוֹשׁ. יַעַבְדוּךָ עַמִּים, וְיִשְׁתַּחֲווּ לְךָ לְאֻמִּים. הֱוֵה גְבִיר לְאַחֶיךָ, וְיִשְׁתַּחֲווּ לְךָ בְּנֵי אִמֶּךָ. אוֹרְרֶיךָ אָרוּר, וּמְבָרְכֶיךָ בָּרוּךְ.\n\nוְיִתֶּן לְךָ אֱלֹהִים, מִטַּל הַשָּׁמַיִם וּמִשְׁמַנֵּי הָאָרֶץ, וְרֹב דָּגָן וְתִירוֹשׁ.\n\nמֵאֵל אָבִיךָ וְיַעְזְרֶךָ, וְאֵת שַׁדַּי וִיבָרְכֶךָ, בִּרְכוֹת שָׁמַיִם מֵעָל, בִּרְכוֹת תְּהוֹם רוֹבֶצֶת תָּחַת, בִּרְכוֹת שָׁדַיִם וָרָחַם. בִּרְכוֹת אָבִיךָ גָּבְרוּ עַל בִּרְכוֹת הוֹרַי, עַד תַּאֲוַת גִּבְעוֹת עוֹלָם, תִּהְיֶיןָ לְרֹאשׁ יוֹסֵף, וּלְקָדְקוֹד נְזִיר אֶחָיו.",
      translation: "May God give you of the dew of heaven and of the fatness of the earth, and abundance of grain and wine. May peoples serve you and nations bow to you. Be master over your brothers, and may your mother's sons bow to you. Those who curse you are cursed, and those who bless you are blessed.\n\nMay God give you of the dew of heaven and of the fatness of the earth, and abundance of grain and wine.\n\nFrom the God of your father—may He help you, and the Almighty—may He bless you, with blessings of heaven above, blessings of the deep that lies below, blessings of the breast and womb. The blessings of your father have surpassed the blessings of my parents, to the utmost bound of the everlasting hills. May they be on the head of Joseph, and on the crown of the head of the one who was separated from his brothers.",
    },
  ],
};
