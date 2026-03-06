import type { Tefila } from "../types";

export const havdala: Tefila = {
  id: "havdala",
  name: "Havdala",
  nameHe: "הבדלה",
  category: "shabbos",
  timeContext: "maariv",
  sections: [
    {
      id: "havdala-intro",
      title: "Introductory Verses",
      titleHe: "פסוקי פתיחה",
      instruction: "Recited at the conclusion of Shabbos over a cup of wine. The cup should be filled to overflowing.",
      text: "הִנֵּה אֵל יְשׁוּעָתִי, אֶבְטַח וְלֹא אֶפְחָד. כִּי עָזִּי וְזִמְרָת יָהּ ה', וַיְהִי לִי לִישׁוּעָה. וּשְׁאַבְתֶּם מַיִם בְּשָׂשׂוֹן מִמַּעַיְנֵי הַיְשׁוּעָה. לַה' הַיְשׁוּעָה, עַל עַמְּךָ בִרְכָתֶךָ סֶּלָה. ה' צְבָאוֹת עִמָּנוּ, מִשְׂגָּב לָנוּ אֱלֹהֵי יַעֲקֹב סֶלָה. ה' צְבָאוֹת, אַשְׁרֵי אָדָם בּוֹטֵחַ בָּךְ. ה' הוֹשִׁיעָה, הַמֶּלֶךְ יַעֲנֵנוּ בְיוֹם קָרְאֵנוּ.\n\nלַיְּהוּדִים הָיְתָה אוֹרָה וְשִׂמְחָה, וְשָׂשׂוֹן וִיקָר. כֵּן תִּהְיֶה לָנוּ. כּוֹס יְשׁוּעוֹת אֶשָּׂא, וּבְשֵׁם ה' אֶקְרָא.",
      translation: "Behold, God is my salvation; I will trust and not be afraid. For my strength and song is God the Lord, and He has been a salvation to me. You shall draw water with joy from the springs of salvation. Salvation belongs to the Lord; upon Your people is Your blessing, Selah. The Lord of hosts is with us; the God of Jacob is a stronghold for us, Selah. Lord of hosts, happy is the man who trusts in You. Lord, save us; the King will answer us on the day we call.\n\nThe Jews had light and gladness, joy and honor. So may it be for us. I will raise the cup of salvation and call upon the Name of the Lord.",
    },
    {
      id: "havdala-yayin",
      title: "Borei Pri HaGafen",
      titleHe: "בורא פרי הגפן",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates the fruit of the vine.",
    },
    {
      id: "havdala-besamim",
      title: "Borei Minei Besamim",
      titleHe: "בורא מיני בשמים",
      instruction: "Smell the spices after the blessing.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מִינֵי בְשָׂמִים.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates various kinds of spices.",
    },
    {
      id: "havdala-ner",
      title: "Borei Me'orei Ha'Eish",
      titleHe: "בורא מאורי האש",
      instruction: "Look at the fingernails by the light of the Havdala candle.",
      text: "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מְאוֹרֵי הָאֵשׁ.",
      translation: "Blessed are You, Lord our God, King of the universe, Who creates the lights of fire.",
    },
    {
      id: "havdala-hamavdil",
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
  category: "shabbos",
  timeContext: "maariv",
  sections: [
    {
      id: "vayiten-text",
      title: "Vayiten Lecha",
      titleHe: "ויתן לך",
      instruction: "Recited on Motzaei Shabbos after Havdala. A collection of verses of blessing.",
      text: "וְיִתֶּן לְךָ הָאֱלֹהִים מִטַּל הַשָּׁמַיִם, וּמִשְׁמַנֵּי הָאָרֶץ, וְרֹב דָּגָן וְתִירוֹשׁ. יַעַבְדוּךָ עַמִּים, וְיִשְׁתַּחֲווּ לְךָ לְאֻמִּים. הֱוֵה גְבִיר לְאַחֶיךָ, וְיִשְׁתַּחֲווּ לְךָ בְּנֵי אִמֶּךָ. אוֹרְרֶיךָ אָרוּר, וּמְבָרְכֶיךָ בָּרוּךְ.\n\nוְיִתֶּן לְךָ הָאֱלֹהִים מִטַּל הַשָּׁמַיִם וּמִשְׁמַנֵּי הָאָרֶץ, וְרֹב דָּגָן וְתִירוֹשׁ.\n\nמֵאֵל אָבִיךָ וְיַעְזְרֶךָ, וְאֵת שַׁדַּי וִיבָרְכֶךָ, בִּרְכוֹת שָׁמַיִם מֵעָל, בִּרְכוֹת תְּהוֹם רוֹבֶצֶת תָּחַת, בִּרְכוֹת שָׁדַיִם וָרָחַם. בִּרְכוֹת אָבִיךָ גָּבְרוּ עַל בִּרְכוֹת הוֹרַי, עַד תַּאֲוַת גִּבְעוֹת עוֹלָם, תִּהְיֶיןָ לְרֹאשׁ יוֹסֵף, וּלְקָדְקוֹד נְזִיר אֶחָיו.\n\nוַיִּתֵּן לְךָ אֶת בִּרְכַּת אַבְרָהָם, לְךָ וּלְזַרְעֲךָ אִתָּךְ, לְרִשְׁתְּךָ אֶת אֶרֶץ מְגוּרֶיךָ, אֲשֶׁר נָתַן אֱלֹהִים לְאַבְרָהָם.\n\nמִמִּגְדַּנוֹת שָׁמַיִם, מִטָּל, וּמִתְּהוֹם רוֹבֶצֶת תָּחַת. וּמִמִּגְדַּנוֹת תְּבוּאוֹת שָׁמֶשׁ, וּמִמִּגְדַּנוֹת גֶּרֶשׁ יְרָחִים. וּמֵרֹאשׁ הַרְרֵי קֶדֶם, וּמִמִּגְדַּנוֹת גִּבְעוֹת עוֹלָם. וּמִמִּגְדַּנוֹת אֶרֶץ וּמְלוֹאָהּ, וּרְצוֹן שׁוֹכְנִי סְנֶה, תָּבוֹאתָה לְרֹאשׁ יוֹסֵף, וּלְקָדְקוֹד נְזִיר אֶחָיו.\n\nיִשָּׂשכָר שִׂמְחָה בְצֵאתֶךָ, וּזְבוּלֻן בְּאֹהָלֶיךָ. מַלְאַךְ הַגּוֹאֵל אוֹתִי מִכָּל רָע, יְבָרֵךְ אֶת הַנְּעָרִים, וְיִקָּרֵא בָהֶם שְׁמִי, וְשֵׁם אֲבוֹתַי אַבְרָהָם וְיִצְחָק, וְיִדְגּוּ לָרוֹב בְּקֶרֶב הָאָרֶץ.\n\nה' אֱלֹהֵיכֶם הִרְבָּה אֶתְכֶם, וְהִנְּכֶם הַיּוֹם כְּכוֹכְבֵי הַשָּׁמַיִם לָרוֹב. ה' אֱלֹהֵי אֲבוֹתֵכֶם יוֹסֵף עֲלֵיכֶם כָּכֶם אֶלֶף פְּעָמִים, וִיבָרֵךְ אֶתְכֶם כַּאֲשֶׁר דִּבֶּר לָכֶם.\n\nאָנֹכִי אוֹבִילֵם, בְּנַחֲלֵי מַיִם, בְּדֶרֶךְ יָשָׁר, לֹא יִכָּשְׁלוּ בָהּ.\n\nפִּתְחוּ שְׁעָרִים וְיָבוֹא גוֹי צַדִּיק שׁוֹמֵר אֱמֻנִים. יֵצֶר סָמוּךְ תִּצּוֹר שָׁלוֹם שָׁלוֹם, כִּי בְךָ בָּטוּחַ. בִּטְחוּ בַה' עֲדֵי עַד, כִּי בְּיָהּ ה' צוּר עוֹלָמִים.\n\nכִּי בְשִׂמְחָה תֵצֵאוּ, וּבְשָׁלוֹם תּוּבָלוּן. הֶהָרִים וְהַגְּבָעוֹת יִפְצְחוּ לִפְנֵיכֶם רִנָּה, וְכָל עֲצֵי הַשָּׂדֶה יִמְחֲאוּ כָף.\n\nהִנֵּה אֵל יְשׁוּעָתִי, אֶבְטַח וְלֹא אֶפְחָד.\n\nוַאֲמַרְתֶּם בַּיּוֹם הַהוּא, הוֹדוּ לַה', קִרְאוּ בִשְׁמוֹ, הוֹדִיעוּ בָעַמִּים עֲלִילוֹתָיו, הַזְכִּירוּ כִּי נִשְׂגָּב שְׁמוֹ.\n\nשָׁבוּעַ טוֹב!",
      translation: "May God give you of the dew of heaven and of the fatness of the earth, and abundance of grain and wine. May peoples serve you and nations bow to you. Be master over your brothers, and may your mother's sons bow to you. Those who curse you are cursed, and those who bless you are blessed.\n\nMay God give you of the dew of heaven and of the fatness of the earth, and abundance of grain and wine.\n\nFrom the God of your father—may He help you, and the Almighty—may He bless you, with blessings of heaven above, blessings of the deep that lies below, blessings of the breast and womb. The blessings of your father have surpassed the blessings of my parents, to the utmost bound of the everlasting hills. May they be on the head of Joseph, and on the crown of the head of the one who was separated from his brothers.\n\nAnd may He give you the blessing of Abraham, to you and to your offspring with you, that you may possess the land of your sojournings, which God gave to Abraham.\n\nOf the bounty of heaven, of the dew, and of the deep that crouches below. And of the bounty of the sun's yield, and of the bounty of the moon's produce. And of the peaks of the ancient mountains, and of the bounty of the everlasting hills. And of the bounty of the earth and its fullness, and the favor of the One Who dwelt in the bush. May it come upon the head of Joseph, and upon the crown of the one who was separated from his brothers.\n\nRejoice, Issachar, in your going out, and Zebulun, in your tents. May the angel who redeems me from all evil bless the lads, and may my name be called upon them, and the name of my fathers Abraham and Isaac, and may they multiply abundantly like fish in the midst of the land.\n\nThe Lord your God has multiplied you, and behold, you are today as the stars of heaven in abundance. May the Lord God of your fathers increase you a thousandfold, and bless you as He has promised you.\n\nI will lead them by streams of water, on a straight path where they shall not stumble.\n\nOpen the gates, that a righteous nation that keeps faith may enter. The mind that is stayed on You, You will keep in perfect peace, for it trusts in You. Trust in the Lord forever, for in God the Lord is the Rock of Ages.\n\nFor you shall go out with joy, and be led forth with peace. The mountains and the hills shall break forth before you into singing, and all the trees of the field shall clap their hands.\n\nBehold, God is my salvation; I will trust and not be afraid.\n\nAnd you shall say on that day: Give thanks to the Lord, call upon His Name, make known His deeds among the peoples, declare that His Name is exalted.\n\nA good week!",
    },
  ],
};
