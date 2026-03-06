import type { Tefila } from "../types";

// Psalms 51-75 fetched from Sefaria API
// Hebrew: Miqra according to the Masorah (with nikkud)
// English: THE JPS TANAKH: Gender-Sensitive Edition

export const psalm51: Tefila = {
  id: "psalm-51",
  name: "Psalm 51",
  nameHe: "תהילים נא",
  category: "tehillim",
  sections: [
    {
      id: "psalm-51-text",
      title: "Psalm 51",
      titleHe: "תהילים נא",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\\nבְּֽבוֹא־אֵ֭לָיו נָתָ֣ן הַנָּבִ֑יא כַּאֲשֶׁר־בָּ֝֗א אֶל־בַּת־שָֽׁבַע׃\\nחׇנֵּ֣נִי אֱלֹהִ֣ים כְּחַסְדֶּ֑ךָ כְּרֹ֥ב רַ֝חֲמֶ֗יךָ מְחֵ֣ה פְשָׁעָֽי׃\\n(הרבה) [הֶ֭רֶב] כַּבְּסֵ֣נִי מֵעֲוֺנִ֑י וּֽמֵחַטָּאתִ֥י טַהֲרֵֽנִי׃\\nכִּֽי־פְ֭שָׁעַי אֲנִ֣י אֵדָ֑ע וְחַטָּאתִ֖י נֶגְדִּ֣י תָמִֽיד׃\\nלְךָ֤ לְבַדְּךָ֨׀ חָטָאתִי֮ וְהָרַ֥ע בְּעֵינֶ֗יךָ עָ֫שִׂ֥יתִי לְ֭מַעַן תִּצְדַּ֥ק בְּדׇבְרֶ֗ךָ תִּזְכֶּ֥ה בְשׇׁפְטֶֽךָ׃\\nהֵן־בְּעָו֥וֹן חוֹלָ֑לְתִּי וּ֝בְחֵ֗טְא יֶחֱמַ֥תְנִי אִמִּֽי׃\\nהֵן־אֱ֭מֶת חָפַ֣צְתָּ בַטֻּח֑וֹת וּ֝בְסָתֻ֗ם חׇכְמָ֥ה תוֹדִיעֵֽנִי׃\\nתְּחַטְּאֵ֣נִי בְאֵז֣וֹב וְאֶטְהָ֑ר תְּ֝כַבְּסֵ֗נִי וּמִשֶּׁ֥לֶג אַלְבִּֽין׃\\nתַּ֭שְׁמִיעֵנִי שָׂשׂ֣וֹן וְשִׂמְחָ֑ה תָּ֝גֵ֗לְנָה עֲצָמ֥וֹת דִּכִּֽיתָ׃\\nהַסְתֵּ֣ר פָּ֭נֶיךָ מֵחֲטָאָ֑י וְֽכׇל־עֲוֺ֖נֹתַ֣י מְחֵֽה׃\\nלֵ֣ב טָ֭הוֹר בְּרָא־לִ֣י אֱלֹהִ֑ים וְר֥וּחַ נָ֝כ֗וֹן חַדֵּ֥שׁ בְּקִרְבִּֽי׃\\nאַל־תַּשְׁלִיכֵ֥נִי מִלְּפָנֶ֑יךָ וְר֥וּחַ קׇ֝דְשְׁךָ֗ אַל־תִּקַּ֥ח מִמֶּֽנִּי׃\\nהָשִׁ֣יבָה לִּ֭י שְׂשׂ֣וֹן יִשְׁעֶ֑ךָ וְר֖וּחַ נְדִיבָ֣ה תִסְמְכֵֽנִי׃\\nאֲלַמְּדָ֣ה פֹשְׁעִ֣ים דְּרָכֶ֑יךָ וְ֝חַטָּאִ֗ים אֵלֶ֥יךָ יָשֽׁוּבוּ׃\\nהַצִּ֘ילֵ֤נִי מִדָּמִ֨ים׀ אֱֽלֹהִ֗ים אֱלֹהֵ֥י תְשׁוּעָתִ֑י תְּרַנֵּ֥ן לְ֝שׁוֹנִ֗י צִדְקָתֶֽךָ׃\\nאֲ֭דֹנָי שְׂפָתַ֣י תִּפְתָּ֑ח וּ֝פִ֗י יַגִּ֥יד תְּהִלָּתֶֽךָ׃\\nכִּ֤י׀ לֹא־תַחְפֹּ֣ץ זֶ֣בַח וְאֶתֵּ֑נָה ע֝וֹלָ֗ה לֹ֣א תִרְצֶֽה׃\\nזִ֥בְחֵ֣י אֱלֹהִים֮ ר֤וּחַ נִשְׁבָּ֫רָ֥ה לֵב־נִשְׁבָּ֥ר וְנִדְכֶּ֑ה אֱ֝לֹהִ֗ים לֹ֣א תִבְזֶֽה׃\\nהֵיטִ֣יבָה בִ֭רְצוֹנְךָ אֶת־צִיּ֑וֹן תִּ֝בְנֶ֗ה חוֹמ֥וֹת יְרוּשָׁלָֽ͏ִם׃\\nאָ֤ז תַּחְפֹּ֣ץ זִבְחֵי־צֶ֭דֶק עוֹלָ֣ה וְכָלִ֑יל אָ֤ז יַעֲל֖וּ עַל־מִזְבַּחֲךָ֣ פָרִֽים׃{פ}`,
      translation: `For the leader. A psalm of David, \\nwhen Nathan the prophet came to him after he had come to Bathsheba.awhen Nathan … Bathsheba Cf. 2 Sam. 12. \\nHave mercy upon me, O God,as befits Your faithfulness;in keeping with Your abundant compassion,blot out my transgressions.\\nWash me thoroughly of my iniquity,and purify me of my sin;\\nfor I recognize my transgressions,and am ever conscious of my sin.\\nAgainst You alone have I sinned,and done what is evil in Your sight;so You are just in Your sentence,and right in Your judgment.\\nIndeed I was born with iniquity;with sin my mother conceived me.\\nbMeaning of verse uncertain. Indeed You desire truth about that which is hidden;teach me wisdom about secret things.\\nPurge me with hyssop till I am pure;wash me till I am whiter than snow.\\nLet me hear tidings of joy and gladness;let the bones You have crushed exult.\\nHide Your face from my sins;blot out all my iniquities.\\nFashion a pure heart for me, O God;create in me a steadfast spirit.\\nDo not cast me out of Your presence,or take Your holy spirit away from me.\\nLet me again rejoice in Your help;let a vigorous spirit sustain me.\\nI will teach transgressors Your ways,that sinners may return to You.\\nSave me from bloodguilt,O God, God, my deliverer,that I may sing forth Your beneficence.\\nO my Sovereign, open my lips,and let my mouth declare Your praise.\\nYou do not want me to bring sacrifices;You do not desire burnt offerings;\\nTrue sacrifice to God is a contrite spirit;God, You will not despisea contrite and crushed heart.\\nMay it please You to make Zion prosper;rebuild the walls of Jerusalem.\\nThen You will want sacrifices offered in righteousness,burnt and whole offerings;then bulls will be offered on Your altar.`,
    },
  ],
};

export const psalm52: Tefila = {
  id: "psalm-52",
  name: "Psalm 52",
  nameHe: "תהילים נב",
  category: "tehillim",
  sections: [
    {
      id: "psalm-52-text",
      title: "Psalm 52",
      titleHe: "תהילים נב",
      text: `לַמְנַצֵּ֗חַ מַשְׂכִּ֥יל לְדָוִֽד׃\\nבְּב֤וֹא׀ דּוֹאֵ֣ג הָאֲדֹמִי֮ וַיַּגֵּ֢ד לְשָׁ֫א֥וּל וַיֹּ֥אמֶר ל֑וֹ בָּ֥א דָ֝וִ֗ד אֶל־בֵּ֥ית אֲחִימֶֽלֶךְ׃\\nמַה־תִּתְהַלֵּ֣ל בְּ֭רָעָה הַגִּבּ֑וֹר חֶ֥סֶד אֵ֝֗ל כׇּל־הַיּֽוֹם׃\\nהַ֭וּוֹת תַּחְשֹׁ֣ב לְשׁוֹנֶ֑ךָ כְּתַ֥עַר מְ֝לֻטָּ֗שׁ עֹשֵׂ֥ה רְמִיָּֽה׃\\nאָהַ֣בְתָּ רָּ֣ע מִטּ֑וֹב שֶׁ֓קֶר׀ מִדַּבֵּ֖ר צֶ֣דֶק סֶֽלָה׃\\nאָהַ֥בְתָּ כׇֽל־דִּבְרֵי־בָ֗לַע לְשׁ֣וֹן מִרְמָֽה׃\\nגַּם־אֵל֮ יִתׇּצְךָ֢ לָ֫נֶ֥צַח יַחְתְּךָ֣ וְיִסָּחֲךָ֣ מֵאֹ֑הֶל וְשֵׁרֶשְׁךָ֨ מֵאֶ֖רֶץ חַיִּ֣ים סֶֽלָה׃\\nוְיִרְא֖וּ צַדִּיקִ֥ים וְיִירָ֗אוּ וְעָלָ֥יו יִשְׂחָֽקוּ׃\\nהִנֵּ֤ה הַגֶּ֗בֶר לֹ֤א יָשִׂ֥ים אֱלֹהִ֗ים מָ֫עוּזּ֥וֹ וַ֭יִּבְטַח בְּרֹ֣ב עׇשְׁר֑וֹ יָ֝עֹ֗ז בְּהַוָּתֽוֹ׃\\nוַאֲנִ֤י׀ כְּזַ֣יִת רַ֭עֲנָן בְּבֵ֣ית אֱלֹהִ֑ים בָּטַ֥חְתִּי בְחֶסֶד־אֱ֝לֹהִ֗ים עוֹלָ֥ם וָעֶֽד׃\\nאוֹדְךָ֣ לְ֭עוֹלָם כִּ֣י עָשִׂ֑יתָ וַאֲקַוֶּ֥ה שִׁמְךָ֥ כִי־ט֝֗וֹב נֶ֣גֶד חֲסִידֶֽיךָ׃{פ}`,
      translation: `For the leader. A maskil of David, \\nwhen Doeg the Edomite came and informed Saul, telling him, “David came to Ahimelech’s house.”aCf. 1 Sam. 22.9ff. \\nWhy do you boast of your evil, brave fellow?God’s faithfulness never ceases.bnever ceases Lit. “is all the day.” \\nYour tongue devises mischief,like a sharpened razor that works treacherously.\\nYou prefer evil to good,the lie, to speaking truthfully.    Selah. \\nYou love all pernicious words,treacherous speech.\\nSo God will tear you down for good,will break you and pluck you from your tent,and root you out of the land of the living.    Selah. \\nThe righteous, seeing it, will be awestruck;they will jibe at you,cyou Heb. “him.” saying,\\n“Here was a fellow who did not make God his refuge,but trusted in his great wealth,relied upon his mischief.”\\nBut I am like a thriving olive tree in God’s house;I trust in the faithfulness of God forever and ever.\\nI praise You forever, for You have acted;I declare that Your name is gooddI declare that Your name is good Meaning of Heb. uncertain; in contrast to others “I will wait for Your name for it is good.” in the presence of Your faithful ones.`,
    },
  ],
};

export const psalm53: Tefila = {
  id: "psalm-53",
  name: "Psalm 53",
  nameHe: "תהילים נג",
  category: "tehillim",
  sections: [
    {
      id: "psalm-53-text",
      title: "Psalm 53",
      titleHe: "תהילים נג",
      text: `לַמְנַצֵּ֥חַ עַֽל־מָחֲלַ֗ת מַשְׂכִּ֥יל לְדָוִֽד׃\\nאָ֘מַ֤ר נָבָ֣ל בְּ֭לִבּוֹ אֵ֣ין אֱלֹהִ֑ים הִֽ֝שְׁחִ֗יתוּ וְהִֽתְעִ֥יבוּ עָ֝֗וֶל אֵ֣ין עֹֽשֵׂה־טֽוֹב׃\\nאֱֽלֹהִ֗ים מִשָּׁמַיִם֮ הִשְׁקִ֢יף עַֽל־בְּנֵי־אָ֫דָ֥ם לִ֭רְאוֹת הֲיֵ֣שׁ מַשְׂכִּ֑יל דֹּ֝רֵ֗שׁ אֶת־אֱלֹהִֽים׃\\nכֻּלּ֥וֹ סָג֮ יַחְדָּ֢ו נֶ֫אֱלָ֥חוּ אֵ֤ין עֹֽשֵׂה־ט֑וֹב אֵ֝֗ין גַּם־אֶחָֽד׃\\nהֲלֹ֥א יָדְעוּ֮ פֹּ֤עֲלֵ֫י אָ֥וֶן אֹכְלֵ֣י עַ֭מִּי אָ֣כְלוּ לֶ֑חֶם אֱ֝לֹהִ֗ים לֹ֣א קָרָֽאוּ׃\\nשָׁ֤ם׀ פָּ֥חֲדוּ פַחַד֮ לֹא־הָ֢יָ֫ה פָ֥חַד כִּֽי־אֱלֹהִ֗ים פִּ֭זַּר עַצְמ֣וֹת חֹנָ֑ךְ הֱ֝בִשֹׁ֗תָה כִּֽי־אֱלֹהִ֥ים מְאָסָֽם׃\\nמִ֥י־יִתֵּ֣ן מִצִּיּוֹן֮ יְשֻׁע֢וֹת יִשְׂרָ֫אֵ֥ל בְּשׁ֣וּב אֱ֭לֹהִים שְׁב֣וּת עַמּ֑וֹ יָגֵ֥ל יַ֝עֲקֹ֗ב יִשְׂמַ֥ח יִשְׂרָאֵֽל׃{פ}`,
      translation: `aCf. Psalm 14. For the leader; on mahalath.bmahalath Meaning of Heb. unknown. A maskil of David.\\nThe scoundrel thinks,“God does not care.”cGod does not care Lit. “There is no God”; cf. 10.4. Mortals’dMortals’ Heb. “Their.” wrongdoing is corrupt and loathsome;no one does good.\\nGod looks down from heaven on humankindto find someone with understanding,someone mindful of God.\\nEveryone is dross,altogether foul;there is no one who does good,not even one.\\nAre they so witless, those evildoers,who devour my people as they devour food,and do not invoke God?\\nThere they will be seized with fright—never was there such a fright—for God has scattered the bones of your besiegers;you have put them to shame,enever was there … put them to shame Meaning of Heb. uncertain. for God has rejected them.\\nO that the deliverance of Israel might come from Zion!When God restores the fortunes of this covenanted people,Jacob will exult, Israel will rejoice.`,
    },
  ],
};

export const psalm54: Tefila = {
  id: "psalm-54",
  name: "Psalm 54",
  nameHe: "תהילים נד",
  category: "tehillim",
  sections: [
    {
      id: "psalm-54-text",
      title: "Psalm 54",
      titleHe: "תהילים נד",
      text: `לַמְנַצֵּ֥חַ בִּנְגִינֹ֗ת מַשְׂכִּ֥יל לְדָוִֽד׃\\nבְּבֹ֣א הַ֭זִּיפִים וַיֹּאמְר֣וּ לְשָׁא֑וּל הֲלֹ֥א דָ֝וִ֗ד מִסְתַּתֵּ֥ר עִמָּֽנוּ׃\\nאֱ֭לֹהִים בְּשִׁמְךָ֣ הוֹשִׁיעֵ֑נִי וּבִגְבוּרָתְךָ֥ תְדִינֵֽנִי׃\\nאֱ֭לֹהִים שְׁמַ֣ע תְּפִלָּתִ֑י הַ֝אֲזִ֗ינָה לְאִמְרֵי־פִֽי׃\\nכִּ֤י זָרִ֨ים׀ קָ֤מוּ עָלַ֗י וְֽ֭עָרִיצִים בִּקְשׁ֣וּ נַפְשִׁ֑י לֹ֤א שָׂ֨מוּ אֱלֹהִ֖ים לְנֶגְדָּ֣ם סֶֽלָה׃\\nהִנֵּ֣ה אֱ֭לֹהִים עֹזֵ֣ר לִ֑י אֲ֝דֹנָ֗י בְּֽסֹמְכֵ֥י נַפְשִֽׁי׃\\n(ישוב) [יָשִׁ֣יב] הָ֭רַע לְשֹׁרְרָ֑י בַּ֝אֲמִתְּךָ֗ הַצְמִיתֵֽם׃\\nבִּנְדָבָ֥ה אֶזְבְּחָה־לָּ֑ךְ א֤וֹדֶה־שִּׁמְךָ֖ יְהֹוָ֣ה כִּי־טֽוֹב׃\\nכִּ֣י מִכׇּל־צָ֭רָה הִצִּילָ֑נִי וּ֝בְאֹיְבַ֗י רָאֲתָ֥ה עֵינִֽי׃{פ}`,
      translation: `For the leader; with instrumental music. A maskil of David, \\nwhen the Ziphites came and told Saul, “Know, David is in hiding among us.”aCf. 1 Sam. 23.19. \\nO God, deliver me by Your name;by Your power vindicate me.\\nO God, hear my prayer;give ear to the words of my mouth.\\nFor strangers have risen against me,and those who are ruthless seek my life;they are unmindful of God.    Selah. \\nSee, God is my helper;my Sovereign is my support.\\n[God] will repay the evil of my watchful foes;by Your faithfulness, destroy them!\\nThen I will offer You a freewill sacrifice;I will praise Your name, ETERNAL One, for it is good,\\nfor it has saved me from my foes,and let me gaze triumphant upon my enemies.`,
    },
  ],
};

export const psalm55: Tefila = {
  id: "psalm-55",
  name: "Psalm 55",
  nameHe: "תהילים נה",
  category: "tehillim",
  sections: [
    {
      id: "psalm-55-text",
      title: "Psalm 55",
      titleHe: "תהילים נה",
      text: `לַמְנַצֵּ֥חַ בִּנְגִינֹ֗ת מַשְׂכִּ֥יל לְדָוִֽד׃\\nהַאֲזִ֣ינָה אֱ֭לֹהִים תְּפִלָּתִ֑י וְאַל־תִּ֝תְעַלַּ֗ם מִתְּחִנָּתִֽי׃\\nהַקְשִׁ֣יבָה לִּ֣י וַעֲנֵ֑נִי אָרִ֖יד בְּשִׂיחִ֣י וְאָהִֽימָה׃\\nמִקּ֤וֹל אוֹיֵ֗ב מִ֭פְּנֵי עָקַ֣ת רָשָׁ֑ע כִּֽי־יָמִ֥יטוּ עָלַ֥י אָ֝֗וֶן וּבְאַ֥ף יִשְׂטְמֽוּנִי׃\\nלִ֭בִּי יָחִ֣יל בְּקִרְבִּ֑י וְאֵימ֥וֹת מָ֝֗וֶת נָפְל֥וּ עָלָֽי׃\\nיִרְאָ֣ה וָ֭רַעַד יָ֣בֹא בִ֑י וַ֝תְּכַסֵּ֗נִי פַּלָּצֽוּת׃\\nוָאֹמַ֗ר מִֽי־יִתֶּן־לִ֣י אֵ֭בֶר כַּיּוֹנָ֗ה אָע֥וּפָה וְאֶשְׁכֹּֽנָה׃\\nהִ֭נֵּה אַרְחִ֣יק נְדֹ֑ד אָלִ֖ין בַּמִּדְבָּ֣ר סֶֽלָה׃\\nאָחִ֣ישָׁה מִפְלָ֣ט לִ֑י מֵר֖וּחַ סֹעָ֣ה מִסָּֽעַר׃\\nבַּלַּ֣ע אֲ֭דֹנָי פַּלַּ֣ג לְשׁוֹנָ֑ם כִּֽי־רָאִ֨יתִי חָמָ֖ס וְרִ֣יב בָּעִֽיר׃\\nיוֹמָ֤ם וָלַ֗יְלָה יְסוֹבְבֻ֥הָ עַל־חוֹמֹתֶ֑יהָ וְאָ֖וֶן וְעָמָ֣ל בְּקִרְבָּֽהּ׃\\nהַוּ֥וֹת בְּקִרְבָּ֑הּ וְֽלֹא־יָמִ֥ישׁ מֵ֝רְחֹבָ֗הּ תֹּ֣ךְ וּמִרְמָֽה׃\\nכִּ֤י לֹֽא־אוֹיֵ֥ב יְחָֽרְפֵ֗נִי וְאֶ֫שָּׂ֥א לֹא־מְ֭שַׂנְאִי עָלַ֣י הִגְדִּ֑יל וְאֶסָּתֵ֥ר מִמֶּֽנּוּ׃\\nוְאַתָּ֣ה אֱנ֣וֹשׁ כְּעֶרְכִּ֑י אַ֝לּוּפִ֗י וּמְיֻדָּעִֽי׃\\nאֲשֶׁ֣ר יַ֭חְדָּו נַמְתִּ֣יק ס֑וֹד בְּבֵ֥ית אֱ֝לֹהִ֗ים נְהַלֵּ֥ךְ בְּרָֽגֶשׁ׃\\n(ישימות) [יַשִּׁ֤י מָ֨וֶת׀] עָלֵ֗ימוֹ יֵרְד֣וּ שְׁא֣וֹל חַיִּ֑ים כִּֽי־רָע֖וֹת בִּמְגוּרָ֣ם בְּקִרְבָּֽם׃\\nאֲ֭נִי אֶל־אֱלֹהִ֣ים אֶקְרָ֑א וַ֝יהֹוָ֗ה יוֹשִׁיעֵֽנִי׃\\nעֶ֤רֶב וָבֹ֣קֶר וְ֭צׇהֳרַיִם אָשִׂ֣יחָה וְאֶהֱמֶ֑ה וַיִּשְׁמַ֥ע קוֹלִֽי׃\\nפָּ֘דָ֤ה בְשָׁל֣וֹם נַ֭פְשִׁי מִקְּרׇב־לִ֑י כִּֽי־בְ֝רַבִּ֗ים הָי֥וּ עִמָּדִֽי׃\\nיִשְׁמַ֤ע׀ אֵ֨ל׀ וְֽיַעֲנֵם֮ וְיֹ֤שֵׁ֥ב קֶ֗דֶם סֶ֥֫לָה אֲשֶׁ֤ר אֵ֣ין חֲלִיפ֣וֹת לָ֑מוֹ וְלֹ֖א יָרְא֣וּ אֱלֹהִֽים׃\\nשָׁלַ֣ח יָ֭דָיו בִּשְׁלֹמָ֗יו חִלֵּ֥ל בְּרִיתֽוֹ׃\\nחָלְק֤וּ׀ מַחְמָאֹ֣ת פִּיו֮ וּֽקְרָב־לִ֫בּ֥וֹ רַכּ֖וּ דְבָרָ֥יו מִשֶּׁ֗מֶן וְהֵ֣מָּה פְתִחֽוֹת׃\\nהַשְׁלֵ֤ךְ עַל־יְהֹוָ֨ה׀ יְהָבְךָ֮ וְה֢וּא יְכַ֫לְכְּלֶ֥ךָ לֹא־יִתֵּ֖ן לְעוֹלָ֥ם מ֗וֹט לַצַּדִּֽיק׃\\nוְאַתָּ֤ה אֱלֹהִ֨ים׀ תּוֹרִדֵ֬ם׀לִבְאֵ֬ר שַׁ֗חַת אַנְשֵׁ֤י דָמִ֣ים וּ֭מִרְמָה לֹא־יֶחֱצ֣וּ יְמֵיהֶ֑ם וַ֝אֲנִ֗י אֶבְטַח־בָּֽךְ׃{פ}`,
      translation: `For the leader; with instrumental music. A maskil of David.\\nGive ear, O God, to my prayer;do not ignore my plea;\\npay heed to me and answer me.I am tossed about, complaining and moaning\\nat the clamor of the enemy,because of the oppression of the wicked;for they bring evil upon meand furiously harass me.\\nMy heart is convulsed within me;terrors of death assail me.\\nFear and trembling invade me;I am clothed with horror.\\nI said,“O that I had the wings of a dove!I would fly away and find rest;\\nsurely, I would flee far off;I would lodge in the wilderness;    selah \\nI would soon find me a refugefrom the sweeping wind,from the tempest.”\\nO my Sovereign, confound their speech, confuse it!For I see lawlessness and strife in the city;\\nday and night they make their rounds on its walls;evil and mischief are inside it.\\nMalice is within it;fraud and deceit never leave its square.\\nIt is not an enemy who reviles me—I could bear that;it is not my foe who boasts against me—for then I could hide;\\nbut it is you, my equal,my companion, my friend;\\nsweet was our fellowship;we walked together in God’s house.\\nLet [God] incite death against them;may they go down alive into Sheol!For where they dwell,there evil is.\\nAs for me, I call to God; GOD will deliver me.\\nEvening, morning, and noon,I complain and moan,and my voice is heard.\\n[God] redeems me unharmedfrom the battle against me;it is as though many are on my side.ait is as though many are on my side Meaning of Heb. uncertain. \\nGod who has reigned from the first,who will have no successor,hears and humbles those who show no reverence.    Selah. \\nMy companionbMy companion Heb. “He,” i.e., the friend of v. 14. caused harm to alliesand broke a pact—\\nwith talk smoother than butter,yet with a mind set on war;with words that were softer than oil,yet in fact were drawn swords.\\nCast your burden on GOD and you will be sustained;the righteous will never be allowed to collapse.\\nFor You, O God, will bring them down to the nethermost Pit—those treacherous murderers;they shall not live out half their days—but I trust in You.`,
    },
  ],
};

export const psalm56: Tefila = {
  id: "psalm-56",
  name: "Psalm 56",
  nameHe: "תהילים נו",
  category: "tehillim",
  sections: [
    {
      id: "psalm-56-text",
      title: "Psalm 56",
      titleHe: "תהילים נו",
      text: `לַמְנַצֵּ֤חַ׀ עַל־י֬וֹנַת אֵ֣לֶם רְ֭חֹקִים לְדָוִ֣ד מִכְתָּ֑ם בֶּאֱחֹ֨ז אוֹת֖וֹ פְלִשְׁתִּ֣ים בְּגַֽת׃\\nחׇנֵּ֣נִי אֱ֭לֹהִים כִּֽי־שְׁאָפַ֣נִי אֱנ֑וֹשׁ כׇּל־הַ֝יּ֗וֹם לֹחֵ֥ם יִלְחָצֵֽנִי׃\\nשָׁאֲפ֣וּ שׁ֭וֹרְרַי כׇּל־הַיּ֑וֹם כִּֽי־רַבִּ֨ים לֹחֲמִ֖ים לִ֣י מָרֽוֹם׃\\nי֥וֹם אִירָ֑א אֲ֝נִ֗י אֵלֶ֥יךָ אֶבְטָֽח׃\\nבֵּאלֹהִים֮ אֲהַלֵּ֢ל דְּבָ֫ר֥וֹ בֵּאלֹהִ֣ים בָּ֭טַחְתִּי לֹ֣א אִירָ֑א מַה־יַּעֲשֶׂ֖ה בָשָׂ֣ר לִֽי׃\\nכׇּל־הַ֭יּוֹם דְּבָרַ֣י יְעַצֵּ֑בוּ עָלַ֖י כׇּל־מַחְשְׁבֹתָ֣ם לָרָֽע׃\\nיָג֤וּרוּ׀ (יצפינו) [יִצְפּ֗וֹנוּ] הֵ֭מָּה עֲקֵבַ֣י יִשְׁמֹ֑רוּ כַּ֝אֲשֶׁ֗ר קִוּ֥וּ נַפְשִֽׁי׃\\nעַל־אָ֥וֶן פַּלֶּט־לָ֑מוֹ בְּ֝אַ֗ף עַמִּ֤ים׀ הוֹרֵ֬ד אֱלֹהִֽים׃\\nנֹדִי֮ סָפַ֢רְתָּ֫ה אָ֥תָּה שִׂ֣ימָה דִמְעָתִ֣י בְנֹאדֶ֑ךָ הֲ֝לֹ֗א בְּסִפְרָתֶֽךָ׃\\nאָ֨ז יָ֘שׁ֤וּבוּ אוֹיְבַ֣י אָ֭חוֹר בְּי֣וֹם אֶקְרָ֑א זֶֽה־יָ֝דַ֗עְתִּי כִּֽי־אֱלֹהִ֥ים לִֽי׃\\nבֵּ֭אלֹהִים אֲהַלֵּ֣ל דָּבָ֑ר בַּ֝יהֹוָ֗ה אֲהַלֵּ֥ל דָּבָֽר׃\\nבֵּאלֹהִ֣ים בָּ֭טַחְתִּי לֹּ֣א אִירָ֑א מַה־יַּעֲשֶׂ֖ה אָדָ֣ם לִֽי׃\\nעָלַ֣י אֱלֹהִ֣ים נְדָרֶ֑יךָ אֲשַׁלֵּ֖ם תּוֹדֹ֣ת לָֽךְ׃\\nכִּ֤י הִצַּ֪לְתָּ נַפְשִׁ֡י מִמָּוֶת֮ הֲלֹ֥א רַגְלַ֗י מִ֫דֶּ֥חִי לְ֭הִֽתְהַלֵּךְ לִפְנֵ֣י אֱלֹהִ֑ים בְּ֝א֗וֹר הַחַיִּֽים׃{פ}`,
      translation: `For the leader; on yonath elem reḥokim.ayonath elem reḥokim Meaning of Heb. uncertain. Of David. A michtam; when the Philistines seized him in Gath.\\nHave mercy on me, O God,for people persecute me;all day long my adversary oppresses me.\\nMy watchful foes persecute me all day long;many are my adversaries, O Exalted One.\\nWhen I am afraid, I trust in You,\\nin God, whose word I praise,in God I trust;I am not afraid;what can mortalsbmortals Lit. “flesh.” do to me?\\nAll day long they cause me grief in my affairs,cthey cause me grief in my affairs Meaning of Heb. uncertain. they plan only evil against me.\\nThey plot, they lie in ambush;they watch my every move, hoping for my death.\\nCast them out for their evil;subdue peoples in Your anger, O God.\\ndMeaning of verse uncertain. You keep count of my wanderings;put my tears into Your flask,into Your record.\\nThen my enemies will retreat when I call on You;this I know, that God is for me.\\nIn God, whose word I praise,in GOD, whose word I praise,\\nin God I trust;I am not afraid;what can mere humans do to me?\\nI must pay my vows to You, O God;I will render thank offerings to You.\\nFor You have saved me from death,my foot from stumbling,that I may walk before God in the light of life.`,
    },
  ],
};

export const psalm57: Tefila = {
  id: "psalm-57",
  name: "Psalm 57",
  nameHe: "תהילים נז",
  category: "tehillim",
  sections: [
    {
      id: "psalm-57-text",
      title: "Psalm 57",
      titleHe: "תהילים נז",
      text: `לַמְנַצֵּ֣חַ אַל־תַּ֭שְׁחֵת לְדָוִ֣ד מִכְתָּ֑ם בְּבׇרְח֥וֹ מִפְּנֵי־שָׁ֝א֗וּל בַּמְּעָרָֽה׃\\nחׇנֵּ֤נִי אֱלֹהִ֨ים׀ חׇנֵּ֗נִי כִּ֥י בְךָ֮ חָסָ֢יָה נַ֫פְשִׁ֥י וּבְצֵֽל־כְּנָפֶ֥יךָ אֶחְסֶ֑ה עַ֝֗ד יַעֲבֹ֥ר הַוּֽוֹת׃\\nאֶ֭קְרָא לֵאלֹהִ֣ים עֶלְי֑וֹן לָ֝אֵ֗ל גֹּמֵ֥ר עָלָֽי׃\\nיִשְׁלַ֤ח מִשָּׁמַ֨יִם׀ וְֽיוֹשִׁיעֵ֗נִי חֵרֵ֣ף שֹׁאֲפִ֣י סֶ֑לָה יִשְׁלַ֥ח אֱ֝לֹהִ֗ים חַסְדּ֥וֹ וַאֲמִתּֽוֹ׃\\nנַפְשִׁ֤י׀ בְּת֥וֹךְ לְבָאִם֮ אֶשְׁכְּבָ֢ה לֹ֫הֲטִ֥ים בְּֽנֵי־אָדָ֗ם שִׁ֭נֵּיהֶם חֲנִ֣ית וְחִצִּ֑ים וּ֝לְשׁוֹנָ֗ם חֶ֣רֶב חַדָּֽה׃\\nר֣וּמָה עַל־הַשָּׁמַ֣יִם אֱלֹהִ֑ים עַ֖ל כׇּל־הָאָ֣רֶץ כְּבוֹדֶֽךָ׃\\nרֶ֤שֶׁת׀ הֵכִ֣ינוּ לִפְעָמַי֮ כָּפַ֢ף נַ֫פְשִׁ֥י כָּר֣וּ לְפָנַ֣י שִׁיחָ֑ה נָפְל֖וּ בְתוֹכָ֣הּ סֶֽלָה׃\\nנָ֘כ֤וֹן לִבִּ֣י אֱ֭לֹהִים נָכ֣וֹן לִבִּ֑י אָ֝שִׁ֗ירָה וַאֲזַמֵּֽרָה׃\\nע֤וּרָה כְבוֹדִ֗י ע֭וּרָֽה הַנֵּ֥בֶל וְכִנּ֗וֹר אָעִ֥ירָה שָּֽׁחַר׃\\nאוֹדְךָ֖ בָעַמִּ֥ים׀אֲדֹנָ֑י אֲ֝זַמֶּרְךָ֗ בַּלְאֻמִּֽים׃\\nכִּֽי־גָדֹ֣ל עַד־שָׁמַ֣יִם חַסְדֶּ֑ךָ וְֽעַד־שְׁחָקִ֥ים אֲמִתֶּֽךָ׃\\nר֣וּמָה עַל־שָׁמַ֣יִם אֱלֹהִ֑ים עַ֖ל כׇּל־הָאָ֣רֶץ כְּבוֹדֶֽךָ׃{פ}`,
      translation: `For the leader; al tashḥeth.aal tashḥeth Meaning of Heb. uncertain. Of David. A michtam; when he fled from Saul into a cave.\\nHave mercy on me, O God, have mercy on me,for I seek refuge in You,I seek refuge in the shadow of Your wings,until danger passes.\\nI call to God Most High,to God who is good to me,\\nwho will reach down from heaven and deliver me—sending down steadfast love;my persecutor reviles.    Selah. \\nAs for me, I lie down among lions who devour humans—whose teeth are spears and arrows,whose tongue is a sharp sword.\\nExalt Yourself over the heavens, O God,let Your glory be over all the earth!\\nThey prepared a net for my feet to ensnare me;bto ensnare me Cf. Mishnaic Heb. kefifah, a wicker basket used in fishing. they dug a pit for me,but they fell into it.    Selah. \\ncCf. 108.2–6. My heart is firm, O God;my heart is firm;I will sing, I will chant a hymn.\\nAwake, O my soul!Awake, O harp and lyre!I will wake the dawn.\\nI will praise You among the peoples, O my Sovereign;I will sing a hymn to You among the nations—\\nfor Your faithfulness is as high as heaven;Your steadfastness reaches to the sky.\\nExalt Yourself over the heavens, O God,let Your glory be over all the earth!`,
    },
  ],
};

export const psalm58: Tefila = {
  id: "psalm-58",
  name: "Psalm 58",
  nameHe: "תהילים נח",
  category: "tehillim",
  sections: [
    {
      id: "psalm-58-text",
      title: "Psalm 58",
      titleHe: "תהילים נח",
      text: `לַמְנַצֵּ֥חַ אַל־תַּשְׁחֵ֗ת לְדָוִ֥ד מִכְתָּֽם׃\\nהַאֻמְנָ֗ם אֵ֣לֶם צֶ֭דֶק תְּדַבֵּר֑וּן מֵישָׁרִ֥ים תִּ֝שְׁפְּט֗וּ בְּנֵ֣י אָדָֽם׃\\nאַף־בְּלֵב֮ עוֹלֹ֢ת תִּפְעָ֫ל֥וּן בָּאָ֡רֶץ חֲמַ֥ס יְ֝דֵיכֶ֗ם תְּפַלֵּסֽוּן׃\\nזֹ֣רוּ רְשָׁעִ֣ים מֵרָ֑חֶם תָּע֥וּ מִ֝בֶּ֗טֶן דֹּבְרֵ֥י כָזָֽב׃\\nחֲמַת־לָ֗מוֹ כִּדְמ֥וּת חֲמַת־נָחָ֑שׁ כְּמוֹ־פֶ֥תֶן חֵ֝רֵ֗שׁ יַאְטֵ֥ם אׇזְנֽוֹ׃\\nאֲשֶׁ֣ר לֹֽא־יִ֭שְׁמַע לְק֣וֹל מְלַחֲשִׁ֑ים חוֹבֵ֖ר חֲבָרִ֣ים מְחֻכָּֽם׃\\nאֱֽלֹהִ֗ים הֲרׇס־שִׁנֵּ֥ימֽוֹ בְּפִ֑ימוֹ מַלְתְּע֥וֹת כְּ֝פִירִ֗ים נְתֹ֣ץ׀יְהֹוָֽה׃\\nיִמָּאֲס֣וּ כְמוֹ־מַ֭יִם יִתְהַלְּכוּ־לָ֑מוֹ יִדְרֹ֥ךְ חִ֝צָּ֗ו כְּמ֣וֹ יִתְמֹלָֽלוּ׃\\nכְּמ֣וֹ שַׁ֭בְּלוּל תֶּ֣מֶס יַהֲלֹ֑ךְ נֵ֥פֶל אֵ֝֗שֶׁת בַּל־חָ֥זוּ שָֽׁמֶשׁ׃\\nבְּטֶ֤רֶם׀ יָבִ֣ינוּ סִּירֹתֵכֶ֣ם אָטָ֑ד כְּמוֹ־חַ֥י כְּמוֹ־חָ֝ר֗וֹן יִשְׂעָרֶֽנּוּ׃\\nיִשְׂמַ֣ח צַ֭דִּיק כִּי־חָזָ֣ה נָקָ֑ם פְּעָמָ֥יו יִ֝רְחַ֗ץ בְּדַ֣ם הָרָשָֽׁע׃\\nוְיֹאמַ֣ר אָ֭דָם אַךְ־פְּרִ֣י לַצַּדִּ֑יק אַ֥ךְ יֵשׁ־אֱ֝לֹהִ֗ים שֹׁפְטִ֥ים בָּאָֽרֶץ׃{פ}`,
      translation: `For the leader; al tashḥeth. Of David. A michtam.\\nO mighty ones,aO mighty ones Meaning of Heb. uncertain. do you really decree what is just?Do you judge humankind with equity?\\nIn your minds you devise wrongdoing in the land;with your hands you deal out lawlessness.bwith your hands you deal out lawlessness Meaning of Heb. uncertain. \\nThe wicked are defiant from birth;the liars go astray from the womb.\\nTheir venom is like that of a snake,a deaf viper that stops its ears\\nso as not to hear the voice of charmersor the expert mutterer of spells.\\nO God, smash their teeth in their mouth;shatter the fangs of lions, O ETERNAL One;\\nlet them melt, let them vanish like water—aim Your arrows that they be cut down—\\nlike a snail that melts away as it moves;clike a snail that melts away as it moves Meaning of Heb. uncertain. like a woman’s stillbirth—may they never see the sun!\\nBefore the thorns grow into a bramble,whirl them away alive in fury.dthe thorns grow … in fury Meaning of Heb. uncertain. \\nThe righteous will rejoice when they see revenge;they will bathe their feet in the blood of the wicked.\\nPeople will say,“There is, then, a reward for the righteous;there is, indeed, divine justice on earth.”`,
    },
  ],
};

export const psalm59: Tefila = {
  id: "psalm-59",
  name: "Psalm 59",
  nameHe: "תהילים נט",
  category: "tehillim",
  sections: [
    {
      id: "psalm-59-text",
      title: "Psalm 59",
      titleHe: "תהילים נט",
      text: `לַמְנַצֵּ֣חַ אַל־תַּשְׁחֵת֮ לְדָוִ֢ד מִ֫כְתָּ֥ם בִּשְׁלֹ֥חַ שָׁא֑וּל וַֽיִּשְׁמְר֥וּ אֶת־הַ֝בַּ֗יִת לַהֲמִיתֽוֹ׃\\nהַצִּילֵ֖נִי מֵאֹיְבַ֥י׀אֱלֹהָ֑י מִֽמִּתְקוֹמְמַ֥י תְּשַׂגְּבֵֽנִי׃\\nהַ֭צִּילֵנִי מִפֹּ֣עֲלֵי אָ֑וֶן וּֽמֵאַנְשֵׁ֥י דָ֝מִ֗ים הוֹשִׁיעֵֽנִי׃\\nכִּ֤י הִנֵּ֪ה אָרְב֡וּ לְנַפְשִׁ֗י יָג֣וּרוּ עָלַ֣י עַזִּ֑ים לֹֽא־פִשְׁעִ֖י וְלֹא־חַטָּאתִ֣י יְהֹוָֽה׃\\nבְּֽלִי־עָ֭וֺן יְרֻצ֣וּן וְיִכּוֹנָ֑נוּ ע֖וּרָה לִקְרָאתִ֣י וּרְאֵֽה׃\\nוְאַתָּ֤ה יְהֹוָֽה־אֱלֹהִ֥ים׀צְבָא֡וֹת אֱלֹ֘הֵ֤י יִשְׂרָאֵ֗ל הָקִ֗יצָה לִפְקֹ֥ד כׇּֽל־הַגּוֹיִ֑ם אַל־תָּחֹ֨ן כׇּל־בֹּ֖גְדֵי אָ֣וֶן סֶֽלָה׃\\nיָשׁ֣וּבוּ לָ֭עֶרֶב יֶהֱמ֥וּ כַכָּ֗לֶב וִיס֥וֹבְבוּ עִֽיר׃\\nהִנֵּ֤ה׀ יַבִּ֘יע֤וּן בְּפִיהֶ֗ם חֲ֭רָבוֹת בְּשִׂפְתֽוֹתֵיהֶ֑ם כִּי־מִ֥י שֹׁמֵֽעַ׃\\nוְאַתָּ֣ה יְ֭הֹוָה תִּשְׂחַק־לָ֑מוֹ תִּ֝לְעַ֗ג לְכׇל־גּוֹיִֽם׃\\nעֻ֭זּוֹ אֵלֶ֣יךָ אֶשְׁמֹ֑רָה כִּֽי־אֱ֝לֹהִ֗ים מִשְׂגַּבִּֽי׃\\nאֱלֹהֵ֣י (חסדו) [חַסְדִּ֣י] יְקַדְּמֵ֑נִי אֱ֝לֹהִ֗ים יַרְאֵ֥נִי בְשֹׁרְרָֽי׃\\nאַל־תַּהַרְגֵ֤ם׀ פֶּֽן־יִשְׁכְּח֬וּ עַמִּ֗י הֲנִיעֵ֣מוֹ בְ֭חֵילְךָ וְהוֹרִידֵ֑מוֹ מָ֖גִנֵּ֣נוּ אֲדֹנָֽי׃\\nחַטַּאת־פִּ֗ימוֹ דְּֽבַר־שְׂפָ֫תֵ֥ימוֹ וְיִלָּכְד֥וּ בִגְאוֹנָ֑ם וּמֵאָלָ֖ה וּמִכַּ֣חַשׁ יְסַפֵּֽרוּ׃\\nכַּלֵּ֥ה בְחֵמָה֮ כַּלֵּ֢ה וְֽאֵ֫ינֵ֥מוֹ וְֽיֵדְע֗וּ כִּֽי־אֱ֭לֹהִים מֹשֵׁ֣ל בְּֽיַעֲקֹ֑ב לְאַפְסֵ֖י הָאָ֣רֶץ סֶֽלָה׃\\nוְיָשֻׁ֣בוּ לָ֭עֶרֶב יֶהֱמ֥וּ כַכָּ֗לֶב וִיס֥וֹבְבוּ עִֽיר׃\\nהֵ֭מָּה (ינועון) [יְנִיע֣וּן] לֶאֱכֹ֑ל אִם־לֹ֥א יִ֝שְׂבְּע֗וּ וַיָּלִֽינוּ׃\\nוַאֲנִ֤י׀ אָשִׁ֣יר עֻזֶּךָ֮ וַאֲרַנֵּ֥ן לַבֹּ֗קֶר חַ֫סְדֶּ֥ךָ כִּֽי־הָיִ֣יתָ מִשְׂגָּ֣ב לִ֑י וּ֝מָנ֗וֹס בְּי֣וֹם צַר־לִֽי׃\\nעֻ֭זִּי אֵלֶ֣יךָ אֲזַמֵּ֑רָה כִּֽי־אֱלֹהִ֥ים מִ֝שְׂגַּבִּ֗י אֱלֹהֵ֥י חַסְדִּֽי׃{פ}`,
      translation: `For the leader; al tashḥeth. Of David. A michtam; when Saul sent men to watch his house in order to put him to death.awhen Saul sent … death Cf. 1 Sam. 19.11. \\nSave me from my enemies, O my God;secure me against my assailants.\\nSave me from evildoers;deliver me from murderers.\\nFor see, they lie in wait for me;fierce people plot against mefor no offense of mine,for no transgression, O ETERNAL One;\\nfor no guilt of minedo they rush to array themselves against me.Look, rouse Yourself in my behalf!\\nYou, O ETERNAL One, God of hosts,God of Israel,bestir Yourself to bring all nations to account;have no mercy on any treacherous villain.    Selah. \\nThey come each evening growling like dogs,roaming the city.\\nThey rave with their mouths,sharp wordsbsharp words Lit. “swords.” are on their lips;[they think,] “Who hears?”\\nBut You, O ETERNAL One, laugh at them;You mock all the nations.\\nO mycmy With several mss.; cf. v. 18; Heb. 3rd person. strength, I wait for You;for God is my haven.\\nMy faithful God will come to aid me;God will let me gloat over my watchful foes.\\nDo not kill them lest my people be unmindful;with Your power make wanderers of them;bring them low, O our shield, my Sovereign,\\nbecause of their sinful mouths,the words on their lips.Let them be trapped by their pride,and by the imprecations and lies they utter.\\nIn Your fury put an end to them;put an end to them that they be no more;that it may be known to the ends of the earththat God does rule over Jacob.    Selah. \\nThey come each evening growling like dogs,roaming the city.\\nThey wander in search of food;and whine if they are not satisfied.\\nBut I will sing of Your strength,extol each morning Your faithfulness;for You have been my haven,a refuge in time of trouble.\\nO my strength, to You I sing hymns;for God is my haven, my faithful God.`,
    },
  ],
};

export const psalm60: Tefila = {
  id: "psalm-60",
  name: "Psalm 60",
  nameHe: "תהילים ס",
  category: "tehillim",
  sections: [
    {
      id: "psalm-60-text",
      title: "Psalm 60",
      titleHe: "תהילים ס",
      text: `לַ֭מְנַצֵּחַ עַל־שׁוּשַׁ֣ן עֵד֑וּת מִכְתָּ֖ם לְדָוִ֣ד לְלַמֵּֽד׃\\nבְּהַצּוֹת֨וֹ׀ אֶ֥ת־אֲרַ֣ם נַהֲרַיִם֮ וְאֶת־אֲרַ֢ם צ֫וֹבָ֥ה וַיָּ֤שׇׁב יוֹאָ֗ב וַיַּ֣ךְ אֶת־אֱד֣וֹם בְּגֵיא־מֶ֑לַח שְׁנֵ֖ים עָשָׂ֣ר אָֽלֶף׃\\nאֱ֭לֹהִים זְנַחְתָּ֣נוּ פְרַצְתָּ֑נוּ אָ֝נַ֗פְתָּ תְּשׁ֣וֹבֵֽב לָֽנוּ׃\\nהִרְעַ֣שְׁתָּה אֶ֣רֶץ פְּצַמְתָּ֑הּ רְפָ֖ה שְׁבָרֶ֣יהָ כִי־מָֽטָה׃\\nהִרְאִ֣יתָ עַמְּךָ֣ קָשָׁ֑ה הִ֝שְׁקִיתָ֗נוּ יַ֣יִן תַּרְעֵלָֽה׃\\nנָ֘תַ֤תָּה לִּירֵאֶ֣יךָ נֵּ֭ס לְהִתְנוֹסֵ֑ס מִ֝פְּנֵ֗י קֹ֣שֶׁט סֶֽלָה׃\\nלְ֭מַעַן יֵחָלְצ֣וּן יְדִידֶ֑יךָ הוֹשִׁ֖יעָה יְמִינְךָ֣ (ועננו) [וַעֲנֵֽנִי]׃\\nאֱלֹהִ֤ים׀ דִּבֶּ֥ר בְּקׇדְשׁ֗וֹ אֶ֫עְלֹ֥זָה אֲחַלְּקָ֥ה שְׁכֶ֑ם וְעֵ֖מֶק סֻכּ֣וֹת אֲמַדֵּֽד׃\\nלִ֤י גִלְעָ֨ד׀ וְלִ֬י מְנַשֶּׁ֗ה וְ֭אֶפְרַיִם מָע֣וֹז רֹאשִׁ֑י יְ֝הוּדָ֗ה מְחֹֽקְקִֽי׃\\nמוֹאָ֤ב׀ סִ֬יר רַחְצִ֗י עַל־אֱ֭דוֹם אַשְׁלִ֣יךְ נַעֲלִ֑י עָ֝לַ֗י פְּלֶ֣שֶׁת הִתְרוֹעָֽעִי׃\\nמִ֣י יֹ֭בִלֵנִי עִ֣יר מָצ֑וֹר מִ֖י נָחַ֣נִי עַד־אֱדֽוֹם׃\\nהֲלֹֽא־אַתָּ֣ה אֱלֹהִ֣ים זְנַחְתָּ֑נוּ וְֽלֹא־תֵצֵ֥א אֱ֝לֹהִ֗ים בְּצִבְאוֹתֵֽינוּ׃\\nהָֽבָה־לָּ֣נוּ עֶזְרָ֣ת מִצָּ֑ר וְ֝שָׁ֗וְא תְּשׁוּעַ֥ת אָדָֽם׃\\nבֵּאלֹהִ֥ים נַֽעֲשֶׂה־חָ֑יִל וְ֝ה֗וּא יָב֥וּס צָרֵֽינוּ׃{פ}`,
      translation: `For the leader; on shushan eduth.ashushan eduth Meaning of Heb. uncertain. A michtam of David (to be taught), \\nwhen he fought with Aram-naharaim and Aram-zobah, and Joab returned and defeated Edom—[an army] of twelve thousand men—in the Valley of Salt.bCf. 2 Sam. 8; 1 Chron. 18. \\nO God, You have rejected us,You have made a breach in us;You have been angry;restore us!\\nYou have made the land quake;You have torn it open.Mend its fissures,for it is collapsing.\\nYou have made Your people suffer hardship;You have given us wine that makes us reel.cYou have given us wine that makes us reel Or “You have sated Your people with a bitter draft.” \\nGive those who fear You because of Your trutha banner for rallying.dGive those … rallying Meaning of Heb. uncertain.    Selah. \\neCf. Ps. 108.7–14. That those whom You love might be rescued,deliver with Your right hand and answer me.\\nGod promised in the sanctuaryfin the sanctuary Or “by God’s holiness.” that I would exultingly divide up Shechem,and measure the Valley of Sukkoth;\\nGilead and Manasseh would be mine,Ephraim my chief stronghold,Judah my scepter;\\nMoab would be my washbasin;on Edom I would cast my shoe;acclaim me, O Philistia!\\nWould that I were brought to the bastion!Would that I were led to Edom!\\nBut You have rejected us, O God;God, You do not march with our armies.\\nGrant us Your aid against the foe,for human help is worthless.\\nWe shall triumph with God,who will trample our foes.`,
    },
  ],
};

export const psalm61: Tefila = {
  id: "psalm-61",
  name: "Psalm 61",
  nameHe: "תהילים סא",
  category: "tehillim",
  sections: [
    {
      id: "psalm-61-text",
      title: "Psalm 61",
      titleHe: "תהילים סא",
      text: `לַמְנַצֵּ֬חַ׀עַֽל־נְגִינַ֬ת לְדָוִֽד׃\\nשִׁמְעָ֣ה אֱ֭לֹהִים רִנָּתִ֑י הַ֝קְשִׁ֗יבָה תְּפִלָּתִֽי׃\\nמִקְצֵ֤ה הָאָ֨רֶץ׀ אֵלֶ֣יךָ אֶ֭קְרָא בַּעֲטֹ֣ף לִבִּ֑י בְּצוּר־יָר֖וּם מִמֶּ֣נִּי תַנְחֵֽנִי׃\\nכִּֽי־הָיִ֣יתָ מַחְסֶ֣ה לִ֑י מִגְדַּל־עֹ֝֗ז מִפְּנֵ֥י אוֹיֵֽב׃\\nאָג֣וּרָה בְ֭אׇהׇלְךָ עוֹלָמִ֑ים אֶ֥חֱסֶ֨ה בְסֵ֖תֶר כְּנָפֶ֣יךָ סֶּֽלָה׃\\nכִּֽי־אַתָּ֣ה אֱ֭לֹהִים שָׁמַ֣עְתָּ לִנְדָרָ֑י נָתַ֥תָּ יְ֝רֻשַּׁ֗ת יִרְאֵ֥י שְׁמֶֽךָ׃\\nיָמִ֣ים עַל־יְמֵי־מֶ֣לֶךְ תּוֹסִ֑יף שְׁ֝נוֹתָ֗יו כְּמוֹ־דֹ֥ר וָדֹֽר׃\\nיֵשֵׁ֣ב ע֭וֹלָם לִפְנֵ֣י אֱלֹהִ֑ים חֶ֥סֶד וֶ֝אֱמֶ֗ת מַ֣ן יִנְצְרֻֽהוּ׃\\nכֵּ֤ן אֲזַמְּרָ֣ה שִׁמְךָ֣ לָעַ֑ד לְֽשַׁלְּמִ֥י נְ֝דָרַ֗י י֣וֹם׀יֽוֹם׃{פ}`,
      translation: `For the leader; with instrumental music. Of David.\\nHear my cry, O God,heed my prayer.\\nFrom the end of the earth I call to You;when my heart is faint,You lead me to a rock that is high above me.\\nFor You have been my refuge,a tower of strength against the enemy.\\nO that I might dwell in Your tent forever,take refuge under Your protecting wings.    Selah. \\nO God, You have heard my vows;grant the requestarequest Taking the noun yrsht as an alternate form of ʼrsht; cf. Ps. 21.3. of those who fear Your name.\\nAdd days to the days of the king;may his years extend through generations;\\nmay he dwell in God’s presence forever;appointbappoint Meaning of Heb. uncertain. steadfast love to guard him.\\nSo I will sing hymns to Your name forever,as I fulfill my vows day after day.`,
    },
  ],
};

export const psalm62: Tefila = {
  id: "psalm-62",
  name: "Psalm 62",
  nameHe: "תהילים סב",
  category: "tehillim",
  sections: [
    {
      id: "psalm-62-text",
      title: "Psalm 62",
      titleHe: "תהילים סב",
      text: `לַמְנַצֵּ֥חַ עַֽל־יְדוּת֗וּן מִזְמ֥וֹר לְדָוִֽד׃\\nאַ֣ךְ אֶל־אֱ֭לֹהִים דּֽוּמִיָּ֣ה נַפְשִׁ֑י מִ֝מֶּ֗נּוּ יְשׁוּעָתִֽי׃\\nאַךְ־ה֣וּא צ֭וּרִי וִישׁוּעָתִ֑י מִ֝שְׂגַּבִּ֗י לֹא־אֶמּ֥וֹט רַבָּֽה׃\\nעַד־אָ֤נָה׀ תְּה֥וֹתְת֣וּ עַל־אִישׁ֮ תְּרָצְּח֢וּ כֻ֫לְּכֶ֥ם כְּקִ֥יר נָט֑וּי גָּ֝דֵ֗ר הַדְּחוּיָֽה׃\\nאַ֤ךְ מִשְּׂאֵת֨וֹ׀ יָ֥עֲצ֣וּ לְהַדִּיחַ֮ יִרְצ֢וּ כָ֫זָ֥ב בְּפִ֥יו יְבָרֵ֑כוּ וּ֝בְקִרְבָּ֗ם יְקַֽלְלוּ־סֶֽלָה׃\\nאַ֣ךְ לֵ֭אלֹהִים דּ֣וֹמִּי נַפְשִׁ֑י כִּֽי־מִ֝מֶּ֗נּוּ תִּקְוָתִֽי׃\\nאַךְ־ה֣וּא צ֭וּרִי וִישׁוּעָתִ֑י מִ֝שְׂגַּבִּ֗י לֹ֣א אֶמּֽוֹט׃\\nעַל־אֱ֭לֹהִים יִשְׁעִ֣י וּכְבוֹדִ֑י צוּר־עֻזִּ֥י מַ֝חְסִ֗י בֵּאלֹהִֽים׃\\nבִּטְח֘וּ־ב֤וֹ בְכׇל־עֵ֨ת׀ עָ֗ם שִׁפְכֽוּ־לְפָנָ֥יו לְבַבְכֶ֑ם אֱלֹהִ֖ים מַחֲסֶה־לָּ֣נוּ סֶֽלָה׃\\nאַ֤ךְ׀ הֶ֥בֶל בְּנֵֽי־אָדָם֮ כָּזָ֢ב בְּנֵ֫י־אִ֥ישׁ בְּמֹאזְנַ֥יִם לַעֲל֑וֹת הֵ֝֗מָּה מֵהֶ֥בֶל יָֽחַד׃\\nאַל־תִּבְטְח֣וּ בְעֹשֶׁק֮ וּבְגָזֵ֢ל אַל־תֶּ֫הְבָּ֥לוּ חַ֤יִל׀ כִּֽי־יָנ֑וּב אַל־תָּשִׁ֥יתוּ לֵֽב׃\\nאַחַ֤ת׀ דִּבֶּ֬ר אֱלֹהִ֗ים שְׁתַּֽיִם־ז֥וּ שָׁמָ֑עְתִּי כִּ֥י עֹ֝֗ז לֵֽאלֹהִֽים׃\\nוּלְךָֽ־אֲדֹנָ֥י חָ֑סֶד כִּֽי־אַתָּ֨ה תְשַׁלֵּ֖ם לְאִ֣ישׁ כְּֽמַעֲשֵֽׂהוּ׃{פ}`,
      translation: `For the leader; on Jeduthun. A psalm of David.\\nTruly my soul waits quietly for God,from whom my deliverance comes.\\nTruly [God] is my rock and deliverance,my haven; I shall never be shaken.\\nHow long will all of you attackaattack Meaning of Heb. uncertain. someone,to crushbcrush Meaning of Heb. uncertain. them, as though they werea leaning wall, a tottering fence?\\nYou lay plans to topple them from their status;you delight in falsehood;you bless with your mouths,while inwardly you curse.cYou…your…you Heb. “They…their…they.”    Selah. \\nTruly, wait quietly for God, O my soul,from whom comes my hope.\\n[God] is my rock and deliverance,my haven; I shall not be shaken.\\nI rely on God, my deliverance and glory,my rock of strength;in God is my refuge.\\nTrust in [God] at all times, O people;pour out your hearts before the Holy One;God is our refuge.    Selah. \\nHumans are mere breath;mortals, an illusiondHumans are mere breath; / mortals, an illusion Or “The common people are mere breath; / even the notables, an illusion—”; or “Mortals are mere breath; / partisans, an illusion—.”—placed on a scale all together,they weigh even less than a breath.\\nDo not trust in violence,or put false hopes in robbery;if force bears fruit pay it no mind.\\nOne thing God has spoken;two things have I heard:that might belongs to God,\\nand faithfulness is Yours, O my Sovereign,to reward everyone according to their deeds.`,
    },
  ],
};

export const psalm63: Tefila = {
  id: "psalm-63",
  name: "Psalm 63",
  nameHe: "תהילים סג",
  category: "tehillim",
  sections: [
    {
      id: "psalm-63-text",
      title: "Psalm 63",
      titleHe: "תהילים סג",
      text: `מִזְמ֥וֹר לְדָוִ֑ד בִּ֝הְיוֹת֗וֹ בְּמִדְבַּ֥ר יְהוּדָֽה׃\\nאֱלֹהִ֤ים׀ אֵלִ֥י אַתָּ֗ה אֲֽשַׁ֫חֲרֶ֥ךָּ צָמְאָ֬ה לְךָ֨׀ נַפְשִׁ֗י כָּמַ֣הּ לְךָ֣ בְשָׂרִ֑י בְּאֶרֶץ־צִיָּ֖ה וְעָיֵ֣ף בְּלִי־מָֽיִם׃\\nכֵּ֭ן בַּקֹּ֣דֶשׁ חֲזִיתִ֑ךָ לִרְא֥וֹת עֻ֝זְּךָ֗ וּכְבוֹדֶֽךָ׃\\nכִּי־ט֣וֹב חַ֭סְדְּךָ מֵחַיִּ֗ים שְׂפָתַ֥י יְשַׁבְּחֽוּנְךָ׃\\nכֵּ֣ן אֲבָרֶכְךָ֣ בְחַיָּ֑י בְּ֝שִׁמְךָ֗ אֶשָּׂ֥א כַפָּֽי׃\\nכְּמ֤וֹ חֵ֣לֶב וָ֭דֶשֶׁן תִּשְׂבַּ֣ע נַפְשִׁ֑י וְשִׂפְתֵ֥י רְ֝נָנ֗וֹת יְהַלֶּל־פִּֽי׃\\nאִם־זְכַרְתִּ֥יךָ עַל־יְצוּעָ֑י בְּ֝אַשְׁמֻר֗וֹת אֶהְגֶּה־בָּֽךְ׃\\nכִּֽי־הָיִ֣יתָ עֶזְרָ֣תָה לִּ֑י וּבְצֵ֖ל כְּנָפֶ֣יךָ אֲרַנֵּֽן׃\\nדָּבְקָ֣ה נַפְשִׁ֣י אַחֲרֶ֑יךָ בִּ֝֗י תָּמְכָ֥ה יְמִינֶֽךָ׃\\nוְהֵ֗מָּה לְ֭שׁוֹאָה יְבַקְשׁ֣וּ נַפְשִׁ֑י יָ֝בֹ֗אוּ בְּֽתַחְתִּיּ֥וֹת הָאָֽרֶץ׃\\nיַגִּירֻ֥הוּ עַל־יְדֵי־חָ֑רֶב מְנָ֖ת שֻׁעָלִ֣ים יִהְיֽוּ׃\\nוְהַמֶּלֶךְ֮ יִשְׂמַ֢ח בֵּאלֹ֫הִ֥ים יִ֭תְהַלֵּל כׇּל־הַנִּשְׁבָּ֣ע בּ֑וֹ כִּ֥י יִ֝סָּכֵ֗ר פִּ֣י דוֹבְרֵי־שָֽׁקֶר׃{פ}`,
      translation: `A psalm of David, when he was in the Wilderness of Judah.\\nGod, You are my God;I search for You,my soul thirsts for You,my body yearns for You,as a parched and thirsty land that has no water.\\nI shall behold You in the sanctuary,and see Your might and glory,\\nTruly Your faithfulness is better than life;my lips declare Your praise.\\nI bless You all my life;I lift up my hands, invoking Your name.\\nI am sated as with a rich feast,arich feast Lit. “suet and fat.” I sing praises with joyful lips\\nwhen I call You to mind upon my bed,when I think of You in the watches of the night—\\nfor You are my help,and in the shadow of Your wingsI shout for joy.\\nMy soul is attached to You;Your right hand supports me.\\nMay those who seek to destroy my lifeenter the depths of the earth.\\nMay they be gutted by the sword;may they be prey to jackals.\\nBut the king shall rejoice in God;all who swear by [God] shall exult,when the mouth of liars is stopped.`,
    },
  ],
};

export const psalm64: Tefila = {
  id: "psalm-64",
  name: "Psalm 64",
  nameHe: "תהילים סד",
  category: "tehillim",
  sections: [
    {
      id: "psalm-64-text",
      title: "Psalm 64",
      titleHe: "תהילים סד",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\\nשְׁמַע־אֱלֹהִ֣ים קוֹלִ֣י בְשִׂיחִ֑י מִפַּ֥חַד א֝וֹיֵ֗ב תִּצֹּ֥ר חַיָּֽי׃\\nתַּ֭סְתִּירֵנִי מִסּ֣וֹד מְרֵעִ֑ים מֵ֝רִגְשַׁ֗ת פֹּ֣עֲלֵי אָֽוֶן׃\\nאֲשֶׁ֤ר שָׁנְנ֣וּ כַחֶ֣רֶב לְשׁוֹנָ֑ם דָּרְכ֥וּ חִ֝צָּ֗ם דָּבָ֥ר מָֽר׃\\nלִירֹ֣ת בַּמִּסְתָּרִ֣ים תָּ֑ם פִּתְאֹ֥ם יֹ֝רֻ֗הוּ וְלֹ֣א יִירָֽאוּ׃\\nיְחַזְּקוּ־לָ֨מוֹ׀ דָּ֘בָ֤ר רָ֗ע יְֽ֭סַפְּרוּ לִטְמ֣וֹן מוֹקְשִׁ֑ים אָ֝מְר֗וּ מִ֣י יִרְאֶה־לָּֽמוֹ׃\\nיַ֥חְפְּֽשׂוּ־עוֹלֹ֗ת תַּ֭מְנוּ חֵ֣פֶשׂ מְחֻפָּ֑שׂ וְקֶ֥רֶב אִ֝֗ישׁ וְלֵ֣ב עָמֹֽק׃\\nוַיֹּרֵ֗ם אֱלֹ֫הִ֥ים חֵ֥ץ פִּתְא֑וֹם הָ֝י֗וּ מַכּוֹתָֽם׃\\nוַיַּכְשִׁיל֣וּהוּ עָלֵ֣ימוֹ לְשׁוֹנָ֑ם יִ֝תְנֹדְד֗וּ כׇּל־רֹ֥אֵה בָֽם׃\\nוַיִּֽירְא֗וּ כׇּל־אָ֫דָ֥ם וַ֭יַּגִּידוּ פֹּ֥עַל אֱלֹהִ֗ים וּֽמַעֲשֵׂ֥הוּ הִשְׂכִּֽילוּ׃\\nיִשְׂמַ֬ח צַדִּ֣יק בַּ֭יהֹוָה וְחָ֣סָה ב֑וֹ וְ֝יִתְהַלְל֗וּ כׇּל־יִשְׁרֵי־לֵֽב׃{פ}`,
      translation: `For the leader. A psalm of David.\\nHear my voice, O God, when I plead;guard my life from the enemy’s terror.\\nHide me from a band of evildoers,from a crowd of wrongdoers,\\nwho whet their tongues like swords;they aim their arrows—cruel words—\\nto shoot from hiding at someone blameless,shooting suddenly and without fear.\\nThey arm themselves with an evil word;when they speak, it is to conceal traps;aThey arm themselves … conceal traps Meaning of Heb. uncertain. they think, “Who will see them?”\\nbMeaning of verse uncertain. Let the wrongdoings they have concealed,cthey have concealed Reading ṭamnu with some mss. (cf. Minḥat Shai) and Rashi; most printed editions tamnu, traditionally rendered “they have accomplished.” each one’s inner, secret thoughts,be wholly exposed.\\nGod shall shoot them with arrows;they shall be struck down suddenly.\\nTheir tongue shall be their downfall;all who see them shall recoil in horror;\\nall people shall stand in awe;they shall proclaim the work of Godwhose deed they perceived.\\nIn GOD shall the righteous rejoiceand take refuge;all the upright shall exult.`,
    },
  ],
};

export const psalm65: Tefila = {
  id: "psalm-65",
  name: "Psalm 65",
  nameHe: "תהילים סה",
  category: "tehillim",
  sections: [
    {
      id: "psalm-65-text",
      title: "Psalm 65",
      titleHe: "תהילים סה",
      text: `לַמְנַצֵּ֥חַ מִזְמ֗וֹר לְדָוִ֥ד שִֽׁיר׃\\nלְךָ֤ דֻֽמִיָּ֬ה תְהִלָּ֓ה אֱלֹ֘הִ֥ים בְּצִיּ֑וֹן וּ֝לְךָ֗ יְשֻׁלַּם־נֶֽדֶר׃\\nשֹׁמֵ֥עַ תְּפִלָּ֑ה עָ֝דֶ֗יךָ כׇּל־בָּשָׂ֥ר יָבֹֽאוּ׃\\nדִּבְרֵ֣י עֲ֭וֺנֹת גָּ֣בְרוּ מֶ֑נִּי פְּ֝שָׁעֵ֗ינוּ אַתָּ֥ה תְכַפְּרֵֽם׃\\nאַשְׁרֵ֤י׀ תִּ֥בְחַ֣ר וּתְקָרֵב֮ יִשְׁכֹּ֢ן חֲצֵ֫רֶ֥יךָ נִ֭שְׂבְּעָה בְּט֣וּב בֵּיתֶ֑ךָ קְ֝דֹ֗שׁ הֵיכָלֶֽךָ׃\\nנ֤וֹרָא֨וֹת׀ בְּצֶ֣דֶק תַּ֭עֲנֵנוּ אֱלֹהֵ֣י יִשְׁעֵ֑נוּ מִבְטָ֥ח כׇּל־קַצְוֵי־אֶ֝֗רֶץ וְיָ֣ם רְחֹקִֽים׃\\nמֵכִ֣ין הָרִ֣ים בְּכֹח֑וֹ נֶ֝אְזָ֗ר בִּגְבוּרָֽה׃\\nמַשְׁבִּ֤יחַ׀ שְׁא֣וֹן יַ֭מִּים שְׁא֥וֹן גַּלֵּיהֶ֗ם וַהֲמ֥וֹן לְאֻמִּֽים׃\\nוַיִּ֤ירְא֨וּ׀ יֹשְׁבֵ֣י קְ֭צָוֺת מֵאוֹתֹתֶ֑יךָ מ֤וֹצָֽאֵי־בֹ֖קֶר וָעֶ֣רֶב תַּרְנִֽין׃\\nפָּ֤קַֽדְתָּ־הָאָ֨רֶץ וַתְּשֹׁ֪קְקֶ֡הָ רַבַּ֬ת תַּעְשְׁרֶ֗נָּה פֶּ֣לֶג אֱ֭לֹהִים מָ֣לֵא מָ֑יִם תָּכִ֥ין דְּ֝גָנָ֗ם כִּי־כֵ֥ן תְּכִינֶֽהָ׃\\nתְּלָמֶ֣יהָ רַ֭וֵּה נַחֵ֣ת גְּדוּדֶ֑הָ בִּרְבִיבִ֥ים תְּ֝מֹגְגֶ֗נָּה צִמְחָ֥הּ תְּבָרֵֽךְ׃\\nעִ֭טַּרְתָּ שְׁנַ֣ת טוֹבָתֶ֑ךָ וּ֝מַעְגָּלֶ֗יךָ יִרְעֲפ֥וּן דָּֽשֶׁן׃\\nיִ֭רְעֲפוּ נְא֣וֹת מִדְבָּ֑ר וְ֝גִ֗יל גְּבָע֥וֹת תַּחְגֹּֽרְנָה׃\\nלָבְשׁ֬וּ כָרִ֨ים׀ הַצֹּ֗אן וַעֲמָקִ֥ים יַֽעַטְפוּ־בָ֑ר יִ֝תְרוֹעֲע֗וּ אַף־יָשִֽׁירוּ׃{פ}`,
      translation: `For the leader. A psalm of David. A song.\\nPraise befits You in Zion, O God;vows are paid to You;\\nall humankindahumankind Lit. “flesh.” comes to You,You who hear prayer.\\nWhen all manner of sins overwhelm me,it is You who forgive our iniquities.\\nHappy is the one You choose and bring nearto dwell in Your courts;may we be sated with the blessings of Your house,Your holy temple.\\nAnswer us with victory through awesome deeds,O God, our deliverer,in whom all the ends of the earthand the distant seasput their trust;\\nwho by divine power fixed the mountains firmly,who is girded with might,\\nwho stills the raging seas,the raging waves,and tumultuous peoples.\\nThose who live at the ends of the earth are awed by Your signs;You make the lands of sunrise and sunset shout for joy.\\nYou take care of the earth and irrigate it;You enrich it greatly,with the channel of God full of water;You provide grain for all;bgrain for all Heb. “their grain.” for so do You prepare it.\\nSaturating its furrows,leveling its ridges,You soften it with showers,You bless its growth.\\nYou crown the year with Your bounty;fatness is distilled in Your paths—\\nthe pasturelands distill it;the hills are girded with joy.\\nThe meadows are clothed with flocks,the valleys mantled with grain;they raise a shout, they break into song.`,
    },
  ],
};

export const psalm66: Tefila = {
  id: "psalm-66",
  name: "Psalm 66",
  nameHe: "תהילים סו",
  category: "tehillim",
  sections: [
    {
      id: "psalm-66-text",
      title: "Psalm 66",
      titleHe: "תהילים סו",
      text: `לַ֭מְנַצֵּחַ שִׁ֣יר מִזְמ֑וֹר הָרִ֥יעוּ לֵ֝אלֹהִ֗ים כׇּל־הָאָֽרֶץ׃\\nזַמְּר֥וּ כְבֽוֹד־שְׁמ֑וֹ שִׂ֥ימוּ כָ֝ב֗וֹד תְּהִלָּתֽוֹ׃\\nאִמְר֣וּ לֵ֭אלֹהִים מַה־נּוֹרָ֣א מַעֲשֶׂ֑יךָ בְּרֹ֥ב עֻ֝זְּךָ֗ יְֽכַחֲשׁ֖וּ לְךָ֣ אֹיְבֶֽיךָ׃\\nכׇּל־הָאָ֤רֶץ׀ יִשְׁתַּחֲו֣וּ לְ֭ךָ וִיזַמְּרוּ־לָ֑ךְ יְזַמְּר֖וּ שִׁמְךָ֣ סֶֽלָה׃\\nלְכ֣וּ וּ֭רְאוּ מִפְעֲל֣וֹת אֱלֹהִ֑ים נוֹרָ֥א עֲ֝לִילָ֗ה עַל־בְּנֵ֥י אָדָֽם׃\\nהָ֤פַךְ יָ֨ם׀ לְֽיַבָּשָׁ֗ה בַּ֭נָּהָר יַעַבְר֣וּ בְרָ֑גֶל שָׁ֝֗ם נִשְׂמְחָה־בּֽוֹ׃\\nמֹ֘שֵׁ֤ל בִּגְבוּרָת֨וֹ׀ עוֹלָ֗ם עֵ֭ינָיו בַּגּוֹיִ֣ם תִּצְפֶּ֑ינָה הַסּוֹרְרִ֓ים׀ אַל־[יָר֖וּמוּ] (ירימו) לָ֣מוֹ סֶֽלָה׃\\nבָּרְכ֖וּ עַמִּ֥ים׀אֱלֹהֵ֑ינוּ וְ֝הַשְׁמִ֗יעוּ ק֣וֹל תְּהִלָּתֽוֹ׃\\nהַשָּׂ֣ם נַ֭פְשֵׁנוּ בַּחַיִּ֑ים וְלֹֽא־נָתַ֖ן לַמּ֣וֹט רַגְלֵֽנוּ׃\\nכִּֽי־בְחַנְתָּ֥נוּ אֱלֹהִ֑ים צְ֝רַפְתָּ֗נוּ כִּצְרׇף־כָּֽסֶף׃\\nהֲבֵאתָ֥נוּ בַמְּצוּדָ֑ה שַׂ֖מְתָּ מוּעָקָ֣ה בְמׇתְנֵֽינוּ׃\\nהִרְכַּ֥בְתָּֽ אֱנ֗וֹשׁ לְרֹ֫אשֵׁ֥נוּ בָּֽאנוּ־בָאֵ֥שׁ וּבַמַּ֑יִם וַ֝תּוֹצִיאֵ֗נוּ לָרְוָיָֽה׃\\nאָב֣וֹא בֵיתְךָ֣ בְעוֹל֑וֹת אֲשַׁלֵּ֖ם לְךָ֣ נְדָרָֽי׃\\nאֲשֶׁר־פָּצ֥וּ שְׂפָתָ֑י וְדִבֶּר־פִּ֝֗י בַּצַּר־לִֽי׃\\nעֹ֘ל֤וֹת מֵיחִ֣ים אַֽעֲלֶה־לָּ֭ךְ עִם־קְטֹ֣רֶת אֵילִ֑ים אֶ֥עֱשֶֽׂה־בָקָ֖ר עִם־עַתּוּדִ֣ים סֶֽלָה׃\\nלְכוּ־שִׁמְע֣וּ וַ֭אֲסַפְּרָה כׇּל־יִרְאֵ֣י אֱלֹהִ֑ים אֲשֶׁ֖ר עָשָׂ֣ה לְנַפְשִֽׁי׃\\nאֵלָ֥יו פִּֽי־קָרָ֑אתִי וְ֝רוֹמַ֗ם תַּ֣חַת לְשׁוֹנִֽי׃\\nאָ֭וֶן אִם־רָאִ֣יתִי בְלִבִּ֑י לֹ֖א יִשְׁמַ֣ע׀אֲדֹנָֽי׃\\nאָ֭כֵן שָׁמַ֣ע אֱלֹהִ֑ים הִ֝קְשִׁ֗יב בְּק֣וֹל תְּפִלָּתִֽי׃\\nבָּר֥וּךְ אֱלֹהִ֑ים אֲשֶׁ֥ר לֹֽא־הֵסִ֘יר־תְּפִלָּתִ֥י וְ֝חַסְדּ֗וֹ מֵאִתִּֽי׃{פ}`,
      translation: `For the leader. A song. A psalm.Raise a shout for God, all the earth;\\nsing the glory of God’s name,make glorious God’s praise.\\nSay to God,“How awesome are Your deeds,Your enemies cower before Your great strength;\\nall the earth bows to You,and sings hymns to You;all sing hymns to Your name.”    Selah. \\nCome and see the works of God,who is held in awe by mortals for acts divine,\\nand who turned the sea into dry land:IsraelaIsrael Heb. “they”; cf. Josh. 4.23. crossed the river on foot;we therefore rejoice in [God].\\n[God] rules forever with divine might,eyes scanning the nations—not letting the rebellious assert themselves.    Selah. \\nO peoples, bless our God;celebrate with praises\\nthe One who has granted us life,and has not let our feet slip.\\nYou have tried us, O God,refining us, as one refines silver.\\nYou have caught us in a net,caught us in trammels.bcaught us in trammels Lit. “put a trammel on our loins.” \\nYou have let people ride over us;we have endured fire and water,and You have brought us through to prosperity.\\nI enter Your house with burnt offerings,I pay my vows to You,\\n[vows] that my lips pronounced,that my mouth uttered in my distress.\\nI offer up fatlings to You,with the odor of burning rams;I sacrifice bulls and he-goats.    Selah. \\nCome and hear, all you who fear God,as I tell what was done for me.\\nI called aloud to [God],glorification on my tongue.\\nHad I an evil thought in my mind,my Sovereign would not have listened.\\nBut God did listen—paying heed to my prayer.\\nBlessed is God who has not turned away my prayer,or faithful care, from me.`,
    },
  ],
};

export const psalm67: Tefila = {
  id: "psalm-67",
  name: "Psalm 67",
  nameHe: "תהילים סז",
  category: "tehillim",
  sections: [
    {
      id: "psalm-67-text",
      title: "Psalm 67",
      titleHe: "תהילים סז",
      text: `לַמְנַצֵּ֥חַ בִּנְגִינֹ֗ת מִזְמ֥וֹר שִֽׁיר׃\\nאֱֽלֹהִ֗ים יְחׇנֵּ֥נוּ וִיבָרְכֵ֑נוּ יָ֤אֵֽר־פָּנָ֖יו אִתָּ֣נוּ סֶֽלָה׃\\nלָדַ֣עַת בָּאָ֣רֶץ דַּרְכֶּ֑ךָ בְּכׇל־גּ֝וֹיִ֗ם יְשׁוּעָתֶֽךָ׃\\nיוֹד֖וּךָ עַמִּ֥ים׀אֱלֹהִ֑ים י֝וֹד֗וּךָ עַמִּ֥ים כֻּלָּֽם׃\\nיִ֥שְׂמְח֥וּ וִירַנְּנ֗וּ לְאֻ֫מִּ֥ים כִּֽי־תִשְׁפֹּ֣ט עַמִּ֣ים מִישֹׁ֑ר וּלְאֻמִּ֓ים׀ בָּאָ֖רֶץ תַּנְחֵ֣ם סֶֽלָה׃\\nיוֹד֖וּךָ עַמִּ֥ים׀אֱלֹהִ֑ים י֝וֹד֗וּךָ עַמִּ֥ים כֻּלָּֽם׃\\nאֶ֭רֶץ נָתְנָ֣ה יְבוּלָ֑הּ יְ֝בָרְכֵ֗נוּ אֱלֹהִ֥ים אֱלֹהֵֽינוּ׃\\nיְבָרְכֵ֥נוּ אֱלֹהִ֑ים וְיִֽירְא֥וּ א֝וֹת֗וֹ כׇּל־אַפְסֵי־אָֽרֶץ׃{פ}`,
      translation: `For the leader; with instrumental music. A psalm. A song.\\nMay God be gracious to us and bless us,showing us favor,    selah \\nthat Your way be known on earth,Your deliverance among all nations.\\nPeoples will praise You, O God;all peoples will praise You.\\nNations will exult and shout for joy,for You rule the peoples with equity,You guide the nations of the earth.    Selah. \\nThe peoples will praise You, O God;all peoples will praise You.\\nMay the earth yield its produce;may God, our God, bless us.\\nMay God bless us,and be revered to the ends of the earth.`,
    },
  ],
};

export const psalm68: Tefila = {
  id: "psalm-68",
  name: "Psalm 68",
  nameHe: "תהילים סח",
  category: "tehillim",
  sections: [
    {
      id: "psalm-68-text",
      title: "Psalm 68",
      titleHe: "תהילים סח",
      text: `לַמְנַצֵּ֥חַ לְדָוִ֗ד מִזְמ֥וֹר שִֽׁיר׃\\nיָק֣וּם אֱ֭לֹהִים יָפ֣וּצוּ אוֹיְבָ֑יו וְיָנ֥וּסוּ מְ֝שַׂנְאָ֗יו מִפָּנָֽיו׃\\nכְּהִנְדֹּ֥ף עָשָׁ֗ן תִּ֫נְדֹּ֥ף כְּהִמֵּ֣ס דּ֭וֹנַג מִפְּנֵי־אֵ֑שׁ יֹאבְד֥וּ רְ֝שָׁעִ֗ים מִפְּנֵ֥י אֱלֹהִֽים׃\\nוְֽצַדִּיקִ֗ים יִשְׂמְח֣וּ יַ֭עַלְצוּ לִפְנֵ֥י אֱלֹהִ֗ים וְיָשִׂ֥ישׂוּ בְשִׂמְחָֽה׃\\nשִׁ֤ירוּ׀ לֵאלֹהִים֮ זַמְּר֢וּ שְׁ֫מ֥וֹ סֹ֡לּוּ לָרֹכֵ֣ב בָּ֭עֲרָבוֹת בְּיָ֥הּ שְׁמ֗וֹ וְעִלְז֥וּ לְפָנָֽיו׃\\nאֲבִ֣י יְ֭תוֹמִים וְדַיַּ֣ן אַלְמָנ֑וֹת אֱ֝לֹהִ֗ים בִּמְע֥וֹן קׇדְשֽׁוֹ׃\\nאֱלֹהִ֤ים׀ מ֘וֹשִׁ֤יב יְחִידִ֨ים׀ בַּ֗יְתָה מוֹצִ֣יא אֲ֭סִירִים בַּכּוֹשָׁר֑וֹת אַ֥ךְ ס֝וֹרְרִ֗ים שָׁכְנ֥וּ צְחִיחָֽה׃\\nאֱֽלֹהִ֗ים בְּ֭צֵאתְךָ לִפְנֵ֣י עַמֶּ֑ךָ בְּצַעְדְּךָ֖ בִישִׁימ֣וֹן סֶֽלָה׃\\nאֶ֤רֶץ רָעָ֨שָׁה׀ אַף־שָׁמַ֣יִם נָטְפוּ֮ מִפְּנֵ֢י אֱלֹ֫הִ֥ים זֶ֥ה סִינַ֑י מִפְּנֵ֥י אֱ֝לֹהִ֗ים אֱלֹהֵ֥י יִשְׂרָאֵֽל׃\\nגֶּ֣שֶׁם נְ֭דָבוֹת תָּנִ֣יף אֱלֹהִ֑ים נַחֲלָתְךָ֥ וְ֝נִלְאָ֗ה אַתָּ֥ה כוֹנַנְתָּֽהּ׃\\nחַיָּתְךָ֥ יָשְׁבוּ־בָ֑הּ תָּ֤כִֽין־בְּטוֹבָתְךָ֖ לֶֽעָנִ֣י אֱלֹהִֽים׃\\nאֲדֹנָ֥י יִתֶּן־אֹ֑מֶר הַֽ֝מְבַשְּׂר֗וֹת צָבָ֥א רָֽב׃\\nמַלְכֵ֣י צְ֭בָאוֹת יִדֹּד֣וּן יִדֹּד֑וּן וּנְוַת־בַּ֝֗יִת תְּחַלֵּ֥ק שָׁלָֽל׃\\nאִֽם־תִּשְׁכְּבוּן֮ בֵּ֤ין שְׁפַ֫תָּ֥יִם כַּנְפֵ֣י י֭וֹנָה נֶחְפָּ֣ה בַכֶּ֑סֶף וְ֝אֶבְרוֹתֶ֗יהָ בִּירַקְרַ֥ק חָרֽוּץ׃\\nבְּפָ֘רֵ֤שׂ שַׁדַּ֓י מְלָ֘כִ֤ים בָּ֗הּ תַּשְׁלֵ֥ג בְּצַלְמֽוֹן׃\\nהַר־אֱ֭לֹהִים הַר־בָּשָׁ֑ן הַ֥ר גַּ֝בְנֻנִּ֗ים הַר־בָּשָֽׁן׃\\nלָ֤מָּה׀ תְּֽרַצְּדוּן֮ הָרִ֢ים גַּבְנֻ֫נִּ֥ים הָהָ֗ר חָמַ֣ד אֱלֹהִ֣ים לְשִׁבְתּ֑וֹ אַף־יְ֝הֹוָ֗ה יִשְׁכֹּ֥ן לָנֶֽצַח׃\\nרֶ֤כֶב אֱלֹהִ֗ים רִבֹּתַ֣יִם אַלְפֵ֣י שִׁנְאָ֑ן אֲדֹנָ֥י בָֿ֝֗ם סִינַ֥י בַּקֹּֽדֶשׁ׃\\nעָ֘לִ֤יתָ לַמָּר֨וֹם׀ שָׁ֘בִ֤יתָ שֶּׁ֗בִי לָקַ֣חְתָּ מַ֭תָּנוֹת בָּאָדָ֑ם וְאַ֥ף ס֝וֹרְרִ֗ים לִשְׁכֹּ֤ן׀ יָ֬הּ אֱלֹהִֽים׃\\nבָּ֤ר֣וּךְ אֲדֹנָי֮ י֤וֹם׀ י֥֫וֹם יַעֲמׇס־לָ֗נוּ הָ֘אֵ֤ל יְֽשׁוּעָתֵ֬נוּ סֶֽלָה׃\\nהָ֤אֵ֣ל׀לָנוּ֮ אֵ֤ל לְֽמ֫וֹשָׁע֥וֹת וְלֵיהֹוִ֥ה אֲדֹנָ֑י לַ֝מָּ֗וֶת תֹּצָאֽוֹת׃\\nאַךְ־אֱלֹהִ֗ים יִמְחַץ֮ רֹ֤אשׁ אֹ֫יְבָ֥יו קׇדְקֹ֥ד שֵׂעָ֑ר מִ֝תְהַלֵּ֗ךְ בַּאֲשָׁמָֽיו׃\\nאָמַ֣ר אֲ֭דֹנָי מִבָּשָׁ֣ן אָשִׁ֑יב אָ֝שִׁ֗יב מִֽמְּצֻל֥וֹת יָֽם׃\\nלְמַ֤עַן׀ תִּ֥מְחַ֥ץ רַגְלְךָ֗ בְּ֫דָ֥ם לְשׁ֥וֹן כְּלָבֶ֑יךָ מֵאֹיְבִ֥ים מִנֵּֽהוּ׃\\nרָא֣וּ הֲלִיכוֹתֶ֣יךָ אֱלֹהִ֑ים הֲלִ֘יכ֤וֹת אֵלִ֖י מַלְכִּ֣י בַקֹּֽדֶשׁ׃\\nקִדְּמ֣וּ שָׁ֭רִים אַחַ֣ר נֹגְנִ֑ים בְּת֥וֹךְ עֲ֝לָמ֗וֹת תּוֹפֵפֽוֹת׃\\nבְּֽ֭מַקְהֵלוֹת בָּרְכ֣וּ אֱלֹהִ֑ים אֲ֝דֹנָ֗י מִמְּק֥וֹר יִשְׂרָאֵֽל׃\\nשָׁ֤ם בִּנְיָמִ֨ן׀ צָעִ֡יר רֹדֵ֗ם שָׂרֵ֣י יְ֭הוּדָה רִגְמָתָ֑ם שָׂרֵ֥י זְ֝בֻל֗וּן שָׂרֵ֥י נַפְתָּלִֽי׃\\nצִוָּ֥ה אֱלֹהֶ֗יךָ עֻ֫זֶּ֥ךָ עוּזָּ֥ה אֱלֹהִ֑ים ז֝֗וּ פָּעַ֥לְתָּ לָּֽנוּ׃\\nמֵ֭הֵיכָלֶךָ עַל־יְרוּשָׁלָ֑͏ִם לְךָ֤ יוֹבִ֖ילוּ מְלָכִ֣ים שָֽׁי׃\\nגְּעַ֨ר חַיַּ֪ת קָנֶ֡ה עֲדַ֤ת אַבִּירִ֨ים׀ בְּעֶגְלֵ֬י עַמִּ֗ים מִתְרַפֵּ֥ס בְּרַצֵּי־כָ֑סֶף בִּזַּ֥ר עַ֝מִּ֗ים קְרָב֥וֹת יֶחְפָּֽצוּ׃\\nיֶאֱתָ֣יוּ חַ֭שְׁמַנִּים מִנִּ֣י מִצְרָ֑יִם כּ֥וּשׁ תָּרִ֥יץ יָ֝דָ֗יו לֵאלֹהִֽים׃\\nמַמְלְכ֣וֹת הָ֭אָרֶץ שִׁ֣ירוּ לֵאלֹהִ֑ים זַמְּר֖וּ אֲדֹנָ֣י סֶֽלָה׃\\nלָ֭רֹכֵב בִּשְׁמֵ֣י שְׁמֵי־קֶ֑דֶם הֵ֥ן יִתֵּ֥ן בְּ֝קוֹל֗וֹ ק֣וֹל עֹֽז׃\\nתְּנ֥וּ עֹ֗ז לֵאלֹ֫הִ֥ים עַֽל־יִשְׂרָאֵ֥ל גַּאֲוָת֑וֹ וְ֝עֻזּ֗וֹ בַּשְּׁחָקִֽים׃\\nנ֤וֹרָ֥א אֱלֹהִ֗ים מִֽמִּקְדָּ֫שֶׁ֥יךָ אֵ֤ל יִשְׂרָאֵ֗ל ה֤וּא נֹתֵ֨ן׀ עֹ֖ז וְתַעֲצֻמ֥וֹת לָעָ֗ם בָּר֥וּךְ אֱלֹהִֽים׃{פ}`,
      translation: `aThe coherence of this psalm and the meaning of many of its passages are uncertain. For the leader. Of David. A psalm. A song.\\nGod will arise;all opponents shall be scattered,and foes shall flee.\\nDisperse them as smoke is dispersed;as wax melts at fire,so the wicked shall perish before God.\\nBut the righteous shall rejoice;they shall exult in the presence of God;they shall be exceedingly joyful.\\nSing to God, chant hymns to the divine name;extol the One who rides the clouds,the One whose name is Yah.bYah A shortened form of the divine Name; see Isa. 12.2; 26.4. Exult in God’s presence—\\nthe guardian of the fatherless, the champion of widows,God, dwelling in holiness.\\nGod restores the lonely to their homes,sets free the imprisoned, safe and sound,while the rebellious must live in a parched land.\\nO God, when You went at the head of Your army,when You marched through the desert,    selah \\nthe earth trembled, the sky rained because of God,yon Sinai, because of God—the God of Israel.\\nYou released a bountiful rain, O God;when Your own land languished, You sustained it.\\nYour tribe dwells there;O God, in Your goodness You provide for the needy.\\nMy Sovereign gives a command;the women who bring the news are a great host:\\n“The kings and their armies are in headlong flight;the women at home are sharing in the spoils;\\neven for those of you who lie among the sheepfoldsthere are wings of a dove sheathed in silver,its pinions in fine gold.”\\nWhen Shaddai scattered the kings,it seemed like a snowstorm in Zalmon.\\nO majestic mountain, Mount Bashan;O jagged mountain, Mount Bashan;\\nwhy so hostile, O jagged mountains,toward the mountain God desired as a dwelling? GOD shall abide there forever.\\nGod’s chariots are myriads upon myriads,thousands upon thousands;my Sovereign is among them as in Sinai in holiness.\\nYou went up to the heights, having taken captives,having received tribute of people,even of those who rebelagainst the abiding there of Yah—who is God.\\nBlessed is my Sovereign,day by day supporting us—God, our deliverance.    Selah. \\nGod is for us a God of deliverance; GOD my Sovereign provides an escape from death.\\nGod will smash the heads of all opponents,the hairy crown of the one who walks about in guilt.\\nMy Sovereign said, “I will retrieve from Bashan,I will retrieve from the depths of the sea;\\nthat your feet may wade through blood,that the tongue of your dogs may have its portion of your enemies.”\\nPeople see Your processions, O God,the processions of my God, my monarch,into the sanctuary.\\nFirst come singers, then musicians,amidst maidens playing hand-drums.cmaidens playing hand-drums See note at Exod. 15.20. \\nIn assemblies bless God, ETERNAL One, O you who are from the fountain of Israel.\\nThere is little Benjamin who rules them,the princes of Judah who command them,the princes of Zebulun and Naphtali.\\nYour God has ordained strength for you,the strength, O God,that You displayed for us\\nfrom Your temple above Jerusalem.The kings bring You tribute.\\nBlast the beast of the marsh,the herd of bulls among the peoples, the calves,till they come cringing with pieces of silver.Scatter the peoples who delight in wars!\\nTribute-bearers shall come from Egypt;Cush shall hasten its gifts to God.\\nO kingdoms of the earth,sing to God;chant hymns to my Sovereign,    selah \\nto the One who rides the ancient highest heavens,who thunders forth with a mighty voice.\\nAscribe might to God,whose majesty is over Israel,whose might is in the skies.\\nYou are awesome, O God, in Your holy places;it is the God of Israel who gives might and power to the people.Blessed is God.`,
    },
  ],
};

export const psalm69: Tefila = {
  id: "psalm-69",
  name: "Psalm 69",
  nameHe: "תהילים סט",
  category: "tehillim",
  sections: [
    {
      id: "psalm-69-text",
      title: "Psalm 69",
      titleHe: "תהילים סט",
      text: `לַמְנַצֵּ֬חַ׀עַֽל־שׁוֹשַׁנִּ֬ים לְדָוִֽד׃\\nהוֹשִׁיעֵ֥נִי אֱלֹהִ֑ים כִּ֤י בָ֖אוּ מַ֣יִם עַד־נָֽפֶשׁ׃\\nטָבַ֤עְתִּי׀ בִּיוֵ֣ן מְ֭צוּלָה וְאֵ֣ין מׇעֳמָ֑ד בָּ֥אתִי בְמַעֲמַקֵּי־מַ֝֗יִם וְשִׁבֹּ֥לֶת שְׁטָפָֽתְנִי׃\\nיָגַ֣עְתִּי בְקׇרְאִי֮ נִחַ֢ר גְּר֫וֹנִ֥י כָּל֥וּ עֵינַ֑י מְ֝יַחֵ֗ל לֵאלֹהָֽי׃\\nרַבּ֤וּ׀ מִשַּׂעֲר֣וֹת רֹאשִׁי֮ שֹׂנְאַ֢י חִ֫נָּ֥ם עָצְמ֣וּ מַ֭צְמִיתַי אֹיְבַ֣י שֶׁ֑קֶר אֲשֶׁ֥ר לֹֽא־גָ֝זַ֗לְתִּי אָ֣ז אָשִֽׁיב׃\\nאֱֽלֹהִ֗ים אַתָּ֣ה יָ֭דַעְתָּ לְאִוַּלְתִּ֑י וְ֝אַשְׁמוֹתַ֗י מִמְּךָ֥ לֹֽא־נִכְחָֽדוּ׃\\nאַל־יֵ֘בֹ֤שׁוּ בִ֨י׀ קֹוֶיךָ֮ אֲדֹנָ֥י יֱהֹוִ֗ה צְבָ֫א֥וֹת אַל־יִכָּ֣לְמֽוּ בִ֣י מְבַקְשֶׁ֑יךָ אֱ֝לֹהֵ֗י יִשְׂרָאֵֽל׃\\nכִּֽי־עָ֭לֶיךָ נָשָׂ֣אתִי חֶרְפָּ֑ה כִּסְּתָ֖ה כְלִמָּ֣ה פָנָֽי׃\\nמ֭וּזָר הָיִ֣יתִי לְאֶחָ֑י וְ֝נׇכְרִ֗י לִבְנֵ֥י אִמִּֽי׃\\nכִּֽי־קִנְאַ֣ת בֵּיתְךָ֣ אֲכָלָ֑תְנִי וְחֶרְפּ֥וֹת ח֝וֹרְפֶ֗יךָ נָפְל֥וּ עָלָֽי׃\\nוָאֶבְכֶּ֣ה בַצּ֣וֹם נַפְשִׁ֑י וַתְּהִ֖י לַחֲרָפ֣וֹת לִֽי׃\\nוָאֶתְּנָ֣ה לְבוּשִׁ֣י שָׂ֑ק וָאֱהִ֖י לָהֶ֣ם לְמָשָֽׁל׃\\nיָשִׂ֣יחוּ בִ֭י יֹ֣שְׁבֵי שָׁ֑עַר וּ֝נְגִינ֗וֹת שׁוֹתֵ֥י שֵׁכָֽר׃\\nוַאֲנִ֤י תְפִלָּֽתִי־לְךָ֨׀ יְהֹוָ֡ה עֵ֤ת רָצ֗וֹן אֱלֹהִ֥ים בְּרׇב־חַסְדֶּ֑ךָ עֲ֝נֵ֗נִי בֶּאֱמֶ֥ת יִשְׁעֶֽךָ׃\\nהַצִּילֵ֣נִי מִ֭טִּיט וְאַל־אֶטְבָּ֑עָה אִנָּצְלָ֥ה מִ֝שֹּׂנְאַ֗י וּמִמַּ֖עֲמַקֵּי־מָֽיִם׃\\nאַל־תִּשְׁטְפֵ֤נִי׀ שִׁבֹּ֣לֶת מַ֭יִם וְאַל־תִּבְלָעֵ֣נִי מְצוּלָ֑ה וְאַל־תֶּאְטַר־עָלַ֖י בְּאֵ֣ר פִּֽיהָ׃\\nעֲנֵ֣נִי יְ֭הֹוָה כִּי־ט֣וֹב חַסְדֶּ֑ךָ כְּרֹ֥ב רַ֝חֲמֶ֗יךָ פְּנֵ֣ה אֵלָֽי׃\\nוְאַל־תַּסְתֵּ֣ר פָּ֭נֶיךָ מֵעַבְדֶּ֑ךָ כִּי־צַר־לִ֝֗י מַהֵ֥ר עֲנֵֽנִי׃\\nקׇרְבָ֣ה אֶל־נַפְשִׁ֣י גְאָלָ֑הּ לְמַ֖עַן אֹיְבַ֣י פְּדֵֽנִי׃\\nאַתָּ֤ה יָדַ֗עְתָּ חֶרְפָּתִ֣י וּ֭בׇשְׁתִּי וּכְלִמָּתִ֑י נֶ֝גְדְּךָ֗ כׇּל־צוֹרְרָֽי׃\\nחֶרְפָּ֤ה׀ שָׁ֥בְרָ֥ה לִבִּ֗י וָאָ֫נ֥וּשָׁה וָאֲקַוֶּ֣ה לָנ֣וּד וָאַ֑יִן וְ֝לַמְנַחֲמִ֗ים וְלֹ֣א מָצָֽאתִי׃\\nוַיִּתְּנ֣וּ בְּבָרוּתִ֣י רֹ֑אשׁ וְ֝לִצְמָאִ֗י יַשְׁק֥וּנִי חֹֽמֶץ׃\\nיְהִי־שֻׁלְחָנָ֣ם לִפְנֵיהֶ֣ם לְפָ֑ח וְלִשְׁלוֹמִ֥ים לְמוֹקֵֽשׁ׃\\nתֶּחְשַׁ֣כְנָה עֵ֭ינֵיהֶם מֵרְא֑וֹת וּ֝מׇתְנֵיהֶ֗ם תָּמִ֥יד הַמְעַֽד׃\\nשְׁפׇךְ־עֲלֵיהֶ֥ם זַעְמֶ֑ךָ וַחֲר֥וֹן אַ֝פְּךָ֗ יַשִּׂיגֵֽם׃\\nתְּהִי־טִירָתָ֥ם נְשַׁמָּ֑ה בְּ֝אׇהֳלֵיהֶ֗ם אַל־יְהִ֥י יֹשֵֽׁב׃\\nכִּי־אַתָּ֣ה אֲשֶׁר־הִכִּ֣יתָ רָדָ֑פוּ וְאֶל־מַכְא֖וֹב חֲלָלֶ֣יךָ יְסַפֵּֽרוּ׃\\nתְּֽנָה־עָ֭וֺן עַל־עֲוֺנָ֑ם וְאַל־יָ֝בֹ֗אוּ בְּצִדְקָתֶֽךָ׃\\nיִ֭מָּחֽוּ מִסֵּ֣פֶר חַיִּ֑ים וְעִ֥ם צַ֝דִּיקִ֗ים אַל־יִכָּתֵֽבוּ׃\\nוַ֭אֲנִי עָנִ֣י וְכוֹאֵ֑ב יְשׁוּעָתְךָ֖ אֱלֹהִ֣ים תְּשַׂגְּבֵֽנִי׃\\nאֲהַלְלָ֣ה שֵׁם־אֱלֹהִ֣ים בְּשִׁ֑יר וַאֲגַדְּלֶ֥נּוּ בְתוֹדָֽה׃\\nוְתִיטַ֣ב לַ֭יהֹוָה מִשּׁ֥וֹר פָּ֗ר מַקְרִ֥ן מַפְרִֽיס׃\\nרָא֣וּ עֲנָוִ֣ים יִשְׂמָ֑חוּ דֹּרְשֵׁ֥י אֱ֝לֹהִ֗ים וִיחִ֥י לְבַבְכֶֽם׃\\nכִּי־שֹׁמֵ֣עַ אֶל־אֶבְיוֹנִ֣ים יְהֹוָ֑ה וְאֶת־אֲ֝סִירָ֗יו לֹ֣א בָזָֽה׃\\nיְֽ֭הַלְלוּהוּ שָׁמַ֣יִם וָאָ֑רֶץ יַ֝מִּ֗ים וְֽכׇל־רֹמֵ֥שׂ בָּֽם׃\\nכִּ֤י אֱלֹהִ֨ים׀ י֘וֹשִׁ֤יעַ צִיּ֗וֹן וְ֭יִבְנֶה עָרֵ֣י יְהוּדָ֑ה וְיָ֥שְׁבוּ שָׁ֝֗ם וִירֵשֽׁוּהָ׃\\nוְזֶ֣רַע עֲ֭בָדָיו יִנְחָל֑וּהָ וְאֹהֲבֵ֥י שְׁ֝מ֗וֹ יִשְׁכְּנוּ־בָֽהּ׃{פ}`,
      translation: `For the leader. On shoshannim.ashoshannim Meaning of Heb. uncertain. Of David.\\nDeliver me, O God,for the waters have reached my neck;\\nI am sinking into the slimy deepand find no foothold;I have come into the watery depths;the flood sweeps me away.\\nI am weary with calling;my throat is dry;my eyes failwhile I wait for God.\\nMore numerous than the hairs of my headare those who hate me without reason;many are those who would destroy me,my treacherous enemies.Must I restore what I have not stolen?\\nGod, You know my folly;my guilty deeds are not hidden from You.\\nLet those who look to You,O my Sovereign, GOD of hosts,not be disappointed on my account;let those who seek You,O God of Israel,not be shamed because of me.\\nIt is for Your sake that I have been reviled,that shame covers my face;\\nI am a stranger to my kin,an alien to my own siblings.\\nMy zeal for Your house has been my undoing;the reproaches of those who revile You have fallen upon me.\\nWhen I wept and fasted,I was reviled for it.\\nI made sackcloth my garment;I became a byword among them.\\nThose who sit in the gate talk about me;I am the taunt of drunkards.\\nAs for me, may my prayer come to You, O ETERNAL One,at a favorable moment;O God, in Your abundant faithfulness,answer me with Your sure deliverance.\\nRescue me from the mire;let me not sink;let me be rescued from my enemies,and from the watery depths.\\nLet the floodwaters not sweep me away;let the deep not swallow me;let the mouth of the Pit not close over me.\\nAnswer me, O ETERNAL One,according to Your great steadfastness;in accordance with Your abundant mercyturn to me;\\ndo not hide Your face from Your servant,for I am in distress;answer me quickly.\\nCome near to me and redeem me;free me from my enemies.\\nYou know my reproach,my shame, my disgrace;You are aware of all my foes.\\nReproach breaks my heart,I am in despair;bin despair Meaning of Heb. uncertain. I hope for consolation, but there is none,for comforters, but find none.\\nThey give me gall for food,vinegar to quench my thirst.\\nMay their table be a trap for them,a snare for their allies.\\nMay their eyes grow dim so that they cannot see;may their loins collapse continually.\\nPour out Your wrath on them;may Your blazing anger overtake them;\\nmay their encampments be desolate;may their tents stand empty.\\nFor they persecute those You have struck;they talk about the pain of those You have felled.\\nAdd that to their guilt;let them have no share of Your beneficence;\\nmay they be erased from the book of life,and not be inscribed with the righteous.\\nBut I am lowly and in pain;Your help, O God, keeps me safe.\\nI will extol God’s name with song,exultation, and praise.\\nThat will please GOD more than oxen,than bulls with horns and hoofs.\\nThe lowly will see and rejoice;you who are mindful of God, take heart!\\nFor GOD listens to the needy,and does not spurn those held captive.\\nHeaven and earth shall sing praise,the seas, and all that moves in them.\\nFor God will deliver Zionand rebuild the cities of Judah;they shall live there and inherit it;\\nthe offspring of God’s servants shall possess it;those who cherish God’s name shall dwell there.`,
    },
  ],
};

export const psalm70: Tefila = {
  id: "psalm-70",
  name: "Psalm 70",
  nameHe: "תהילים ע",
  category: "tehillim",
  sections: [
    {
      id: "psalm-70-text",
      title: "Psalm 70",
      titleHe: "תהילים ע",
      text: `לַ֝מְנַצֵּ֗חַ לְדָוִ֥ד לְהַזְכִּֽיר׃\\nאֱלֹהִ֥ים לְהַצִּילֵ֑נִי יְ֝הֹוָ֗ה לְעֶזְרָ֥תִי חֽוּשָׁה׃\\nיֵבֹ֣שׁוּ וְיַחְפְּרוּ֮ מְבַקְשֵׁ֢י נַ֫פְשִׁ֥י יִסֹּ֣גוּ אָ֭חוֹר וְיִכָּלְמ֑וּ חֲ֝פֵצֵ֗י רָעָתִֽי׃\\nיָ֭שׁוּבוּ עַל־עֵ֣קֶב בׇּשְׁתָּ֑ם הָ֝אֹמְרִ֗ים הֶ֘אָ֥ח׀הֶאָֽח׃\\nיָ֘שִׂ֤ישׂוּ וְיִשְׂמְח֨וּ׀ בְּךָ֗ כׇּֽל־מְבַ֫קְשֶׁ֥יךָ וְיֹאמְר֣וּ תָ֭מִיד יִגְדַּ֣ל אֱלֹהִ֑ים אֹ֝הֲבֵ֗י יְשׁוּעָתֶֽךָ׃\\nוַאֲנִ֤י׀ עָנִ֣י וְאֶבְיוֹן֮ אֱלֹהִ֢ים ח֫וּשָׁה־לִּ֥י עֶזְרִ֣י וּמְפַלְטִ֣י אַ֑תָּה יְ֝הֹוָ֗ה אַל־תְּאַחַֽר׃{פ}`,
      translation: `For the leader. Of David. Lehazkir.aLehazkir Meaning of Heb. uncertain. \\nbCf. Ps. 40.14–18. Hasten, O God, to save me;O ETERNAL One, to aid me!\\nLet those who seek my lifebe frustrated and disgraced;let those who wish me harm,fall back in shame.\\nLet those who say, “Aha! Aha!”turn back because of their frustration.\\nBut let all who seek You be glad and rejoice in You;let those who are eager for Your deliverance always say,“Extolled be God!”\\nBut I am poor and needy;O God, hasten to me!You are my help and my rescuer;O ETERNAL One, do not delay.`,
    },
  ],
};

export const psalm71: Tefila = {
  id: "psalm-71",
  name: "Psalm 71",
  nameHe: "תהילים עא",
  category: "tehillim",
  sections: [
    {
      id: "psalm-71-text",
      title: "Psalm 71",
      titleHe: "תהילים עא",
      text: `בְּךָֽ־יְהֹוָ֥ה חָסִ֑יתִי אַל־אֵב֥וֹשָׁה לְעוֹלָֽם׃\\nבְּצִדְקָתְךָ֗ תַּצִּילֵ֥נִי וּֽתְפַלְּטֵ֑נִי הַטֵּֽה־אֵלַ֥י אׇ֝זְנְךָ֗ וְהוֹשִׁיעֵֽנִי׃\\nהֱיֵ֤ה לִ֨י׀ לְצ֥וּר מָע֡וֹן לָב֗וֹא תָּמִ֗יד צִוִּ֥יתָ לְהוֹשִׁיעֵ֑נִי כִּֽי־סַלְעִ֖י וּמְצוּדָתִ֣י אָֽתָּה׃\\nאֱֽלֹהַ֗י פַּ֭לְּטֵנִי מִיַּ֣ד רָשָׁ֑ע מִכַּ֖ף מְעַוֵּ֣ל וְחוֹמֵֽץ׃\\nכִּֽי־אַתָּ֥ה תִקְוָתִ֑י אֲדֹנָ֥י יֱ֝הֹוִ֗ה מִבְטַחִ֥י מִנְּעוּרָֽי׃\\nעָלֶ֤יךָ׀ נִסְמַ֬כְתִּי מִבֶּ֗טֶן מִמְּעֵ֣י אִ֭מִּי אַתָּ֣ה גוֹזִ֑י בְּךָ֖ תְהִלָּתִ֣י תָמִֽיד׃\\nכְּ֭מוֹפֵת הָיִ֣יתִי לְרַבִּ֑ים וְ֝אַתָּ֗ה מַֽחֲסִי־עֹֽז׃\\nיִמָּ֣לֵא פִ֭י תְּהִלָּתֶ֑ךָ כׇּל־הַ֝יּ֗וֹם תִּפְאַרְתֶּֽךָ׃\\nאַֽל־תַּ֭שְׁלִיכֵנִי לְעֵ֣ת זִקְנָ֑ה כִּכְל֥וֹת כֹּ֝חִ֗י אַֽל־תַּעַזְבֵֽנִי׃\\nכִּֽי־אָמְר֣וּ אוֹיְבַ֣י לִ֑י וְשֹׁמְרֵ֥י נַ֝פְשִׁ֗י נוֹעֲצ֥וּ יַחְדָּֽו׃\\nלֵ֭אמֹר אֱלֹהִ֣ים עֲזָב֑וֹ רִֽדְפ֥וּ וְ֝תִפְשׂ֗וּהוּ כִּי־אֵ֥ין מַצִּֽיל׃\\nאֱ֭לֹהִים אַל־תִּרְחַ֣ק מִמֶּ֑נִּי אֱ֝לֹהַ֗י לְעֶזְרָ֥תִי (חישה) [חֽוּשָׁה]׃\\nיֵבֹ֣שׁוּ יִכְלוּ֮ שֹׂטְנֵ֢י נַ֫פְשִׁ֥י יַעֲט֣וּ חֶ֭רְפָּה וּכְלִמָּ֑ה מְ֝בַקְשֵׁ֗י רָעָתִֽי׃\\nוַ֭אֲנִי תָּמִ֣יד אֲיַחֵ֑ל וְ֝הוֹסַפְתִּ֗י עַל־כׇּל־תְּהִלָּתֶֽךָ׃\\nפִּ֤י׀ יְסַפֵּ֬ר צִדְקָתֶ֗ךָ כׇּל־הַיּ֥וֹם תְּשׁוּעָתֶ֑ךָ כִּ֤י לֹ֖א יָדַ֣עְתִּי סְפֹרֽוֹת׃\\nאָב֗וֹא בִּ֭גְבֻרוֹת אֲדֹנָ֣י יֱהֹוִ֑ה אַזְכִּ֖יר צִדְקָתְךָ֣ לְבַדֶּֽךָ׃\\nאֱֽלֹהִ֗ים לִמַּדְתַּ֥נִי מִנְּעוּרָ֑י וְעַד־הֵ֝֗נָּה אַגִּ֥יד נִפְלְאוֹתֶֽיךָ׃\\nוְגַ֤ם עַד־זִקְנָ֨ה׀ וְשֵׂיבָה֮ אֱלֹהִ֢ים אַֽל־תַּ֫עַזְבֵ֥נִי עַד־אַגִּ֣יד זְרוֹעֲךָ֣ לְד֑וֹר לְכׇל־יָ֝ב֗וֹא גְּבוּרָתֶֽךָ׃\\nוְצִדְקָתְךָ֥ אֱלֹהִ֗ים עַד־מָ֫ר֥וֹם אֲשֶׁר־עָשִׂ֥יתָ גְדֹל֑וֹת אֱ֝לֹהִ֗ים מִ֣י כָמֽוֹךָ׃\\nאֲשֶׁ֤ר (הראיתנו) [הִרְאִיתַ֨נִי׀] צָר֥וֹת רַבּ֗וֹת וְרָ֫ע֥וֹת תָּשׁ֥וּב (תחינו) [תְּחַיֵּ֑נִי] וּֽמִתְּהֹמ֥וֹת הָ֝אָ֗רֶץ תָּשׁ֥וּב תַּעֲלֵֽנִי׃\\nתֶּ֤רֶב׀ גְּֽדֻלָּתִ֗י וְתִסֹּ֥ב תְּֽנַחֲמֵֽנִי׃\\nגַּם־אֲנִ֤י׀ אוֹדְךָ֣ בִכְלִי־נֶבֶל֮ אֲמִתְּךָ֢ אֱלֹ֫הָ֥י אֲזַמְּרָ֣ה לְךָ֣ בְכִנּ֑וֹר קְ֝ד֗וֹשׁ יִשְׂרָאֵֽל׃\\nתְּרַנֵּ֣נָּה שְׂ֭פָתַי כִּ֣י אֲזַמְּרָה־לָּ֑ךְ וְ֝נַפְשִׁ֗י אֲשֶׁ֣ר פָּדִֽיתָ׃\\nגַּם־לְשׁוֹנִ֗י כׇּל־הַ֭יּוֹם תֶּהְגֶּ֣ה צִדְקָתֶ֑ךָ כִּי־בֹ֥שׁוּ כִי־חָ֝פְר֗וּ מְבַקְשֵׁ֥י רָעָתִֽי׃{פ}`,
      translation: `I seek refuge in You, O ETERNAL One;may I never be disappointed.\\nAs You are beneficent, save me and rescue me;incline Your ear to me and deliver me.\\nBe a sheltering rock for me to which I may always repair;decree my deliverance,for You are my rock and my fortress.\\nMy God, rescue me from the hand of the wicked,from the grasp of the unjust and the lawless.\\nFor You are my hope,O my Sovereign GOD,my trust from my youth.\\nWhile yet unborn, I depended on You;in the womb of my mother, You were my support;asupport Meaning of Heb. uncertain. I sing Your praises always.\\nI have become an example for many,since You are my mighty refuge.\\nMy mouth is full of praise to You,glorifying You all day long.\\nDo not cast me off in old age;when my strength fails, do not forsake me!\\nFor my enemies talk against me;those who wait for me are of one mind,\\nsaying, “God has forsaken him;chase him and catch him,for no one will save him!”\\nO God, be not far from me;my God, hasten to my aid!\\nLet my accusers perish in frustration;let those who seek my ruin be clothed in reproach and disgrace!\\nAs for me, I will hope always,and add to the many praises of You.\\nMy mouth tells of Your beneficence,of Your deliverance all day long,though I know not how to tell it.\\nI come with praise of Your mighty acts, O my Sovereign GOD;I celebrate Your beneficence, Yours alone.\\nYou have let me experience it, God, from my youth;until now I have proclaimed Your wondrous deeds,\\nand even in hoary old age do not forsake me, God,until I proclaim Your strength to the next generation,Your mighty acts, to all who are to come,\\nYour beneficence, high as the heavens, O God,You who have done great things;O God, who is Your peer!\\nYou who have made me undergo many troubles and misfortuneswill revive me again,and raise me up from the depths of the earth.\\nYou will grant me much greatness,You will turn and comfort me.\\nThen I will acclaim You to the music of the lyrefor Your faithfulness, O my God;I will sing a hymn to You with a harp,O Holy One of Israel.\\nMy lips shall be jubilant, as I sing a hymn to You,my whole being, which You have redeemed.\\nAll day long my tongue shall recite Your beneficent acts,how those who sought my ruin were frustrated and disgraced.`,
    },
  ],
};

export const psalm72: Tefila = {
  id: "psalm-72",
  name: "Psalm 72",
  nameHe: "תהילים עב",
  category: "tehillim",
  sections: [
    {
      id: "psalm-72-text",
      title: "Psalm 72",
      titleHe: "תהילים עב",
      text: `לִשְׁלֹמֹ֨ה׀ אֱֽלֹהִ֗ים מִ֭שְׁפָּטֶיךָ לְמֶ֣לֶךְ תֵּ֑ן וְצִדְקָתְךָ֥ לְבֶן־מֶֽלֶךְ׃\\nיָדִ֣ין עַמְּךָ֣ בְצֶ֑דֶק וַעֲנִיֶּ֥יךָ בְמִשְׁפָּֽט׃\\nיִשְׂא֤וּ הָרִ֓ים שָׁ֘ל֥וֹם לָעָ֑ם וּ֝גְבָע֗וֹת בִּצְדָקָֽה׃\\nיִשְׁפֹּ֤ט׀ עֲֽנִיֵּי־עָ֗ם י֭וֹשִׁיעַ לִבְנֵ֣י אֶבְי֑וֹן וִ֖ידַכֵּ֣א עוֹשֵֽׁק׃\\nיִירָא֥וּךָ עִם־שָׁ֑מֶשׁ וְלִפְנֵ֥י יָ֝רֵ֗חַ דּ֣וֹר דּוֹרִֽים׃\\nיֵ֭רֵד כְּמָטָ֣ר עַל־גֵּ֑ז כִּ֝רְבִיבִ֗ים זַרְזִ֥יף אָֽרֶץ׃\\nיִֽפְרַח־בְּיָמָ֥יו צַדִּ֑יק וְרֹ֥ב שָׁ֝ל֗וֹם עַד־בְּלִ֥י יָרֵֽחַ׃\\nוְ֭יֵרְדְּ מִיָּ֣ם עַד־יָ֑ם וּ֝מִנָּהָ֗ר עַד־אַפְסֵי־אָֽרֶץ׃\\nלְ֭פָנָיו יִכְרְע֣וּ צִיִּ֑ים וְ֝אֹיְבָ֗יו עָפָ֥ר יְלַחֵֽכוּ׃\\nמַלְכֵ֬י תַרְשִׁ֣ישׁ וְ֭אִיִּים מִנְחָ֣ה יָשִׁ֑יבוּ מַלְכֵ֥י שְׁבָ֥א וּ֝סְבָ֗א אֶשְׁכָּ֥ר יַקְרִֽיבוּ׃\\nוְיִשְׁתַּחֲווּ־ל֥וֹ כׇל־מְלָכִ֑ים כׇּל־גּוֹיִ֥ם יַעַבְדֽוּהוּ׃\\nכִּֽי־יַ֭צִּיל אֶבְי֣וֹן מְשַׁוֵּ֑עַ וְ֝עָנִ֗י וְֽאֵין־עֹזֵ֥ר לֽוֹ׃\\nיָ֭חֹס עַל־דַּ֣ל וְאֶבְי֑וֹן וְנַפְשׁ֖וֹת אֶבְיוֹנִ֣ים יוֹשִֽׁיעַ׃\\nמִתּ֣וֹךְ וּ֭מֵחָמָס יִגְאַ֣ל נַפְשָׁ֑ם וְיֵיקַ֖ר דָּמָ֣ם בְּעֵינָֽיו׃\\nוִיחִ֗י וְיִתֶּן־לוֹ֮ מִזְּהַ֢ב שְׁ֫בָ֥א וְיִתְפַּלֵּ֣ל בַּעֲד֣וֹ תָמִ֑יד כׇּל־הַ֝יּ֗וֹם יְבָרְכֶֽנְהוּ׃\\nיְהִ֤י פִסַּת־בַּ֨ר׀ בָּאָרֶץ֮ בְּרֹ֢אשׁ הָ֫רִ֥ים יִרְעַ֣שׁ כַּלְּבָנ֣וֹן פִּרְי֑וֹ וְיָצִ֥יצוּ מֵ֝עִ֗יר כְּעֵ֣שֶׂב הָאָֽרֶץ׃\\nיְהִ֤י שְׁמ֨וֹ׀ לְֽעוֹלָ֗ם לִפְנֵי־שֶׁמֶשׁ֮ (ינין) [יִנּ֢וֹן] שְׁ֫מ֥וֹ וְיִתְבָּ֥רְכוּ ב֑וֹ כׇּל־גּוֹיִ֥ם יְאַשְּׁרֽוּהוּ׃\\nבָּר֤וּךְ׀ יְהֹוָ֣ה אֱ֭לֹהִים אֱלֹהֵ֣י יִשְׂרָאֵ֑ל עֹשֵׂ֖ה נִפְלָא֣וֹת לְבַדּֽוֹ׃\\nוּבָר֤וּךְ׀ שֵׁ֥ם כְּבוֹד֗וֹ לְע֫וֹלָ֥ם וְיִמָּלֵ֣א כְ֭בוֹדוֹ אֶת־כֹּ֥ל הָאָ֗רֶץ אָ֘מֵ֥ן׀וְאָמֵֽן׃\\nכׇּלּ֥וּ תְפִלּ֑וֹת דָּ֝וִ֗ד בֶּן־יִשָֽׁי׃`,
      translation: `Of Solomon.O God, endow the king with Your judgments,the king’s son with Your righteousness;\\nthat he may judge Your people rightly,Your lowly ones, justly.\\nLet the mountains produce well-being for the people,the hills, the reward of justice.\\nLet him champion the lowly among the people,deliver the needy folk,and crush those who wrong them.\\nLet them fear You as long as the sun shines,while the moon lasts, generations on end.\\nLet him be like rain that falls on a mown field,like a downpour of rain on the ground,\\nthat the righteous may flourish in his time,and well-being abound, till the moon is no more.\\nLet him rule from sea to sea,from the river to the ends of the earth.\\nLet desert-dwellers kneel before him,and his enemies lick the dust.\\nLet kings of Tarshish and the islands pay tribute,kings of Sheba and Seba offer gifts.\\nLet all kings bow to him,and all nations serve him.\\nFor he saves the needy who cry out,the lowly who have no helper.\\nHe cares about the poor and the needy;He brings the needy deliverance.\\nHe redeems them from fraud and lawlessness;the shedding of their blood weighs heavily upon him.athe shedding of their blood weighs heavily upon him Or “their life is precious in his sight.” \\nSo let him live, and receive gold of Sheba;let prayers for him be said always,blessings on him invoked at all times.\\nLet abundant grain be in the land, to the tops of the mountains;let his crops thrive like the forest of Lebanon;and let the people sprout up in towns like country grass.\\nMay his name be eternal;while the sun lasts, may his name endure;bLet abundant grain … endure Meaning of some Heb. phrases in these verses uncertain. let peoples invoke his blessedness upon themselves;let all nations count him happy.\\nBlessed is the ETERNAL God, God of Israel,who alone does wondrous things;\\nBlessed is God’s glorious name forever;such glory fills the whole world.Amen and Amen.\\nEnd of the prayers of David son of Jesse.`,
    },
  ],
};

export const psalm73: Tefila = {
  id: "psalm-73",
  name: "Psalm 73",
  nameHe: "תהילים עג",
  category: "tehillim",
  sections: [
    {
      id: "psalm-73-text",
      title: "Psalm 73",
      titleHe: "תהילים עג",
      text: `מִזְמ֗וֹר לְאָ֫סָ֥ף אַ֤ךְ ט֖וֹב לְיִשְׂרָאֵ֥ל אֱלֹהִ֗ים לְבָרֵ֥י לֵבָֽב׃\\nוַאֲנִ֗י כִּ֭מְעַט (נטוי) [נָטָ֣יוּ] רַגְלָ֑י כְּ֝אַ֗יִן (שפכה) [שֻׁפְּכ֥וּ] אֲשֻׁרָֽי׃\\nכִּֽי־קִ֭נֵּאתִי בַּהוֹלְלִ֑ים שְׁל֖וֹם רְשָׁעִ֣ים אֶרְאֶֽה׃\\nכִּ֤י אֵ֖ין חַרְצֻבּ֥וֹת לְמוֹתָ֗ם וּבָרִ֥יא אוּלָֽם׃\\nבַּעֲמַ֣ל אֱנ֣וֹשׁ אֵינֵ֑מוֹ וְעִם־אָ֝דָ֗ם לֹ֣א יְנֻגָּֽעוּ׃\\nלָ֭כֵן עֲנָקַ֣תְמוֹ גַאֲוָ֑ה יַעֲטָף־שִׁ֝֗ית חָמָ֥ס לָֽמוֹ׃\\nיָ֭צָא מֵחֵ֣לֶב עֵינֵ֑מוֹ עָ֝בְר֗וּ מַשְׂכִּיּ֥וֹת לֵבָֽב׃\\nיָמִ֤יקוּ׀ וִידַבְּר֣וּ בְרָ֣ע עֹ֑שֶׁק מִמָּר֥וֹם יְדַבֵּֽרוּ׃\\nשַׁתּ֣וּ בַשָּׁמַ֣יִם פִּיהֶ֑ם וּ֝לְשׁוֹנָ֗ם תִּהֲלַ֥ךְ בָּאָֽרֶץ׃\\nלָכֵ֤ן׀ (ישיב) [יָשׁ֣וּב] עַמּ֣וֹ הֲלֹ֑ם וּמֵ֥י מָ֝לֵ֗א יִמָּ֥צוּ לָֽמוֹ׃\\nוְֽאָמְר֗וּ אֵיכָ֥ה יָדַֽע־אֵ֑ל וְיֵ֖שׁ דֵּעָ֣ה בְעֶלְיֽוֹן׃\\nהִנֵּה־אֵ֥לֶּה רְשָׁעִ֑ים וְשַׁלְוֵ֥י ע֝וֹלָ֗ם הִשְׂגּוּ־חָֽיִל׃\\nאַךְ־רִ֭יק זִכִּ֣יתִי לְבָבִ֑י וָאֶרְחַ֖ץ בְּנִקָּי֣וֹן כַּפָּֽי׃\\nוָאֱהִ֣י נָ֭גוּעַ כׇּל־הַיּ֑וֹם וְ֝תוֹכַחְתִּ֗י לַבְּקָרִֽים׃\\nאִם־אָ֭מַרְתִּי אֲסַפְּרָ֥ה כְמ֑וֹ הִנֵּ֤ה ד֖וֹר בָּנֶ֣יךָ בָגָֽדְתִּי׃\\nוָ֭אֲחַשְּׁבָה לָדַ֣עַת זֹ֑את עָמָ֖ל (היא) [ה֣וּא] בְעֵינָֽי׃\\nעַד־אָ֭בוֹא אֶל־מִקְדְּשֵׁי־אֵ֑ל אָ֝בִ֗ינָה לְאַחֲרִיתָֽם׃\\nאַ֣ךְ בַּ֭חֲלָקוֹת תָּשִׁ֣ית לָ֑מוֹ הִ֝פַּלְתָּ֗ם לְמַשּׁוּאֽוֹת׃\\nאֵ֤יךְ הָי֣וּ לְשַׁמָּ֣ה כְרָ֑גַע סָ֥פוּ תַ֝֗מּוּ מִן־בַּלָּהֽוֹת׃\\nכַּחֲל֥וֹם מֵהָקִ֑יץ אֲ֝דֹנָ֗י בָּעִ֤יר׀ צַלְמָ֬ם תִּבְזֶֽה׃\\nכִּ֭י יִתְחַמֵּ֣ץ לְבָבִ֑י וְ֝כִלְיוֹתַ֗י אֶשְׁתּוֹנָֽן׃\\nוַאֲנִי־בַ֭עַר וְלֹ֣א אֵדָ֑ע בְּ֝הֵמ֗וֹת הָיִ֥יתִי עִמָּֽךְ׃\\nוַאֲנִ֣י תָמִ֣יד עִמָּ֑ךְ אָ֝חַ֗זְתָּ בְּיַד־יְמִינִֽי׃\\nבַּעֲצָתְךָ֥ תַנְחֵ֑נִי וְ֝אַחַ֗ר כָּב֥וֹד תִּקָּחֵֽנִי׃\\nמִי־לִ֥י בַשָּׁמָ֑יִם וְ֝עִמְּךָ֗ לֹא־חָפַ֥צְתִּי בָאָֽרֶץ׃\\nכָּלָ֥ה שְׁאֵרִ֗י וּלְבָ֫בִ֥י צוּר־לְבָבִ֥י וְחֶלְקִ֗י אֱלֹהִ֥ים לְעוֹלָֽם׃\\nכִּֽי־הִנֵּ֣ה רְחֵקֶ֣יךָ יֹאבֵ֑דוּ הִ֝צְמַ֗תָּה כׇּל־זוֹנֶ֥ה מִמֶּֽךָּ׃\\nוַאֲנִ֤י׀ קִ֥רְבַ֥ת אֱלֹהִ֗ים לִ֫י־ט֥וֹב שַׁתִּ֤י׀ בַּאדֹנָ֣י יֱהֹוִ֣ה מַחְסִ֑י לְ֝סַפֵּ֗ר כׇּל־מַלְאֲכוֹתֶֽיךָ׃{פ}`,
      translation: `A psalm of Asaph.God is truly good to Israel,to those whose heart is pure.\\nAs for me, my feet had almost strayed,my steps were nearly led off course,\\nfor I envied the wanton;I saw the wicked at ease.\\nDeath has no pangs for them;their body is healthy.\\nThey have no part in human travail;they are not afflicted like the rest of humankind.\\nSo pride adorns their necks,lawlessness enwraps them as a mantle.\\nFat shuts out their eyes;their fancies are extravagant.aFat … extravagant Meaning of Heb. uncertain. \\nThey scoff and plan evil;from their eminence they plan wrongdoing.\\nThey set their mouths against heaven,and their tongues range over the earth.\\nbMeaning of verse uncertain. So they pound this people again and again,until they are drained of their very last tear.\\nThen they say, “How could God know?Is there knowledge with the Most High?”\\nSuch are the wicked;ever tranquil, they amass wealth.\\nIt was for nothing that I kept my heart pureand washed my hands in innocence,\\nseeing that I have been constantly afflicted,that each morning brings new punishments.\\nHad I decided to say these things,I should have been false to the circle of Your disciples.\\nSo I applied myself to understand this,but it seemed a hopeless task\\ntill I entered God’s sanctuaryand reflected on their fate.\\nYou surround them with flattery;You make them fall through blandishments.\\nHow suddenly are they ruined,wholly swept away by terrors.\\nWhen You are aroused You despise their image,as one does a dream after waking, O my Sovereign.\\nMy mind was stripped of its reason,my feelings were numbed.cmy feelings were numbed Lit. “I was pierced through in my kidneys.” \\nI was a dolt, without knowledge;I was brutish toward You.\\nYet I was always with You,You held my right hand;\\nYou guided me by Your counseland led me toward honor.dand led me toward honor Meaning of Heb. uncertain; in contrast to others “And afterward receive me with glory.” \\nWhom else have I in heaven?And having You, I want no one on earth.\\nMy body and mind fail;but God is the stayestay Lit. “rock.” of my mind, my portion forever.\\nThose who keep far from You perish;You annihilate all who are untrue to You.\\nAs for me, nearness to God is good;I have made the Sovereign GOD my refuge,that I may recount all Your works.`,
    },
  ],
};

export const psalm74: Tefila = {
  id: "psalm-74",
  name: "Psalm 74",
  nameHe: "תהילים עד",
  category: "tehillim",
  sections: [
    {
      id: "psalm-74-text",
      title: "Psalm 74",
      titleHe: "תהילים עד",
      text: `מַשְׂכִּ֗יל לְאָ֫סָ֥ף לָמָ֣ה אֱ֭לֹהִים זָנַ֣חְתָּ לָנֶ֑צַח יֶעְשַׁ֥ן אַ֝פְּךָ֗ בְּצֹ֣אן מַרְעִיתֶֽךָ׃\\nזְכֹ֤ר עֲדָתְךָ֨׀ קָ֘נִ֤יתָ קֶּ֗דֶם גָּ֭אַלְתָּ שֵׁ֣בֶט נַחֲלָתֶ֑ךָ הַר־צִ֝יּ֗וֹן זֶ֤ה׀ שָׁכַ֬נְתָּ בּֽוֹ׃\\nהָרִ֣ימָה פְ֭עָמֶיךָ לְמַשֻּׁא֣וֹת נֶ֑צַח כׇּל־הֵרַ֖ע אוֹיֵ֣ב בַּקֹּֽדֶשׁ׃\\nשָׁאֲג֣וּ צֹ֭רְרֶיךָ בְּקֶ֣רֶב מוֹעֲדֶ֑ךָ שָׂ֖מוּ אוֹתֹתָ֣ם אֹתֽוֹת׃\\nיִ֭וָּדַע כְּמֵבִ֣יא לְמָ֑עְלָה בִּסְבׇךְ־עֵ֝֗ץ קַרְדֻּמּֽוֹת׃\\n(ועת) [וְ֭עַתָּה] פִּתּוּחֶ֣יהָ יָּ֑חַד בְּכַשִּׁ֥יל וְ֝כֵילַפּ֗וֹת יַהֲלֹמֽוּן׃\\nשִׁלְח֣וּ בָ֭אֵשׁ מִקְדָּשֶׁ֑ךָ לָ֝אָ֗רֶץ חִלְּל֥וּ מִֽשְׁכַּן־שְׁמֶֽךָ׃\\nאָמְר֣וּ בְ֭לִבָּם נִינָ֣ם יָ֑חַד שָׂרְפ֖וּ כׇל־מוֹעֲדֵי־אֵ֣ל בָּאָֽרֶץ׃\\nאֽוֹתֹתֵ֗ינוּ לֹ֥א־רָ֫אִ֥ינוּ אֵֽין־ע֥וֹד נָבִ֑יא וְלֹֽא־אִ֝תָּ֗נוּ יֹדֵ֥עַ עַד־מָֽה׃\\nעַד־מָתַ֣י אֱ֭לֹהִים יְחָ֣רֶף צָ֑ר יְנָ֘אֵ֤ץ אוֹיֵ֖ב שִׁמְךָ֣ לָנֶֽצַח׃\\nלָ֤מָּה תָשִׁ֣יב יָ֭דְךָ וִימִינֶ֑ךָ מִקֶּ֖רֶב (חוקך) [חֵיקְךָ֣] כַלֵּֽה׃\\nוֵ֭אלֹהִים מַלְכִּ֣י מִקֶּ֑דֶם פֹּעֵ֥ל יְ֝שׁוּע֗וֹת בְּקֶ֣רֶב הָאָֽרֶץ׃\\nאַתָּ֤ה פוֹרַ֣רְתָּ בְעׇזְּךָ֣ יָ֑ם שִׁבַּ֥רְתָּ רָאשֵׁ֥י תַ֝נִּינִ֗ים עַל־הַמָּֽיִם׃\\nאַתָּ֣ה רִ֭צַּצְתָּ רָאשֵׁ֣י לִוְיָתָ֑ן תִּתְּנֶ֥נּוּ מַ֝אֲכָ֗ל לְעָ֣ם לְצִיִּֽים׃\\nאַתָּ֣ה בָ֭קַעְתָּ מַעְיָ֣ן וָנָ֑חַל אַתָּ֥ה ה֝וֹבַ֗שְׁתָּ נַהֲר֥וֹת אֵיתָֽן׃\\nלְךָ֣ י֭וֹם אַף־לְךָ֥ לָ֑יְלָה אַתָּ֥ה הֲ֝כִינ֗וֹתָ מָא֥וֹר וָשָֽׁמֶשׁ׃\\nאַתָּ֣ה הִ֭צַּבְתָּ כׇּל־גְּבוּל֣וֹת אָ֑רֶץ קַ֥יִץ וָ֝חֹ֗רֶף אַתָּ֥ה יְצַרְתָּֽם׃\\nזְכׇר־זֹ֗את א֭וֹיֵב חֵרֵ֣ף׀יְהֹוָ֑ה וְעַ֥ם נָ֝בָ֗ל נִאֲצ֥וּ שְׁמֶֽךָ׃\\nאַל־תִּתֵּ֣ן לְ֭חַיַּת נֶ֣פֶשׁ תּוֹרֶ֑ךָ חַיַּ֥ת עֲ֝נִיֶּ֗יךָ אַל־תִּשְׁכַּ֥ח לָנֶֽצַח׃\\nהַבֵּ֥ט לַבְּרִ֑ית כִּ֥י מָלְא֥וּ מַחֲשַׁכֵּי־אֶ֝֗רֶץ נְא֣וֹת חָמָֽס׃\\nאַל־יָשֹׁ֣ב דַּ֣ךְ נִכְלָ֑ם עָנִ֥י וְ֝אֶבְי֗וֹן יְֽהַלְל֥וּ שְׁמֶֽךָ׃\\nקוּמָ֣ה אֱ֭לֹהִים רִיבָ֣ה רִיבֶ֑ךָ זְכֹ֥ר חֶרְפָּתְךָ֥ מִנִּי־נָ֝בָ֗ל כׇּל־הַיּֽוֹם׃\\nאַל־תִּ֭שְׁכַּח ק֣וֹל צֹרְרֶ֑יךָ שְׁא֥וֹן קָ֝מֶ֗יךָ עֹלֶ֥ה תָמִֽיד׃{פ}`,
      translation: `A maskil of Asaph.Why, O God, do You forever reject us,do You fume in anger at the flock that You tend?\\nRemember the community You made Yours long ago,Your very own tribe that You redeemed,Mount Zion, where You dwell.\\nBestir YourselfaBestir Yourself Lit. “Lift up Your feet.” because of the perpetual tumult,bperpetual tumult Meaning of Heb. uncertain. all the outrages of the enemy in the sanctuary.\\nYour foes roar inside Your meeting-place;they take their signs for true signs.\\nIt is like those who wield axesagainst a gnarled tree;\\nwith hatchet and pikethey hacked away at its carved work.cIt is like … carved work Meaning of Heb. uncertain. \\nThey made Your sanctuary go up in flames;they brought low in dishonor the dwelling-place of Your presence.\\nThey resolved, “Let us destroy them altogether!”They burned all God’s tabernacles in the land.\\nNo signs appear for us;there is no longer any prophet;no one among us knows for how long.\\nTill when, O God, will the foe blaspheme,will the enemy forever revile Your name?\\nWhy do You hold back Your hand, Your right hand?Draw it out of Your bosom!dDraw it out of Your bosom Meaning of Heb. uncertain. \\nO God, my Sovereign from of old,who brings deliverance throughout the land;\\nit was You who drove back the sea with Your might,who smashed the heads of the monsters in the waters;\\nit was You who crushed the heads of Leviathan,who left it as food for the denizens of the desert;ethe denizens of the desert Or “seafaring peoples”; meaning of Heb. uncertain. \\nit was You who released springs and torrents,who made mighty rivers run dry;\\nthe day is Yours, the night also;it was You who set in place the orb of the sun;\\nYou fixed all the boundaries of the earth;summer and winter—You made them.\\nBe mindful of how the enemy blasphemes GOD,how base people revile Your name.\\nDo not deliver Your dove to the wild beast;do not ignore forever the band of Your lowly ones.\\nLook to the covenant!For the dark places of the land are full of the haunts of lawlessness.\\nLet not the downtrodden turn away disappointed;let the poor and needy praise Your name.\\nRise, O God, champion Your cause;be mindful that You are blasphemed by scoundrels all day long.\\nDo not ignore the shouts of Your foes,the din of Your adversaries that ascends all the time.`,
    },
  ],
};

export const psalm75: Tefila = {
  id: "psalm-75",
  name: "Psalm 75",
  nameHe: "תהילים עה",
  category: "tehillim",
  sections: [
    {
      id: "psalm-75-text",
      title: "Psalm 75",
      titleHe: "תהילים עה",
      text: `לַמְנַצֵּ֥חַ אַל־תַּשְׁחֵ֑ת מִזְמ֖וֹר לְאָסָ֣ף שִֽׁיר׃\\nה֘וֹדִ֤ינוּ לְּךָ֨׀ אֱֽלֹהִ֗ים ה֭וֹדִינוּ וְקָר֣וֹב שְׁמֶ֑ךָ סִ֝פְּר֗וּ נִפְלְאוֹתֶֽיךָ׃\\nכִּ֭י אֶקַּ֣ח מוֹעֵ֑ד אֲ֝נִ֗י מֵישָׁרִ֥ים אֶשְׁפֹּֽט׃\\nנְֽמֹגִ֗ים אֶ֥רֶץ וְכׇל־יֹשְׁבֶ֑יהָ אָנֹכִ֨י תִכַּ֖נְתִּי עַמּוּדֶ֣יהָ סֶּֽלָה׃\\nאָמַ֣רְתִּי לַ֭הוֹלְלִים אַל־תָּהֹ֑לּוּ וְ֝לָרְשָׁעִ֗ים אַל־תָּרִ֥ימוּ קָֽרֶן׃\\nאַל־תָּרִ֣ימוּ לַמָּר֣וֹם קַרְנְכֶ֑ם תְּדַבְּר֖וּ בְצַוָּ֣אר עָתָֽק׃\\nכִּ֤י לֹ֣א מִ֭מּוֹצָא וּמִֽמַּעֲרָ֑ב וְ֝לֹ֗א מִמִּדְבַּ֥ר הָרִֽים׃\\nכִּֽי־אֱלֹהִ֥ים שֹׁפֵ֑ט זֶ֥ה יַ֝שְׁפִּ֗יל וְזֶ֣ה יָרִֽים׃\\nכִּ֤י כ֪וֹס בְּֽיַד־יְהֹוָ֡ה וְיַ֤יִן חָמַ֨ר׀ מָ֥לֵא מֶסֶךְ֮ וַיַּגֵּ֢ר מִ֫זֶּ֥ה אַךְ־שְׁ֭מָרֶיהָ יִמְצ֣וּ יִשְׁתּ֑וּ כֹּ֝֗ל רִשְׁעֵי־אָֽרֶץ׃\\nוַ֭אֲנִי אַגִּ֣יד לְעֹלָ֑ם אֲ֝זַמְּרָ֗ה לֵאלֹהֵ֥י יַעֲקֹֽב׃\\nוְכׇל־קַרְנֵ֣י רְשָׁעִ֣ים אֲגַדֵּ֑עַ תְּ֝רוֹמַ֗מְנָה קַֽרְנ֥וֹת צַדִּֽיק׃{פ}`,
      translation: `For the leader; al tashḥeth.A psalm of Asaph, a song.\\nWe praise You, O God;we praise You;Your presence is near;people tell of Your wondrous deeds.\\n“At the time I choose,I will give judgment equitably.\\nEarth and all its inhabitants dissolve;it is I who keep its pillars firm.    Selah. \\nTo the wanton I say, ‘Do not be wanton!’to the wicked, ‘Do not lift up your horns!’”\\nDo not lift your horns up highin vainglorious bluster.ain vainglorious bluster Lit. “with arrogant neck you speak.” \\nFor exaltation comes not from the eastor from the west or the wilderness;bwilderness Reading midbār (with qamaṣ, not pataḥ), as in many mss. \\nfor God it is who gives judgment—bringing down one and lifting up another.\\nThere is a cup in GOD’s handwith foaming wine fully mixed;from this [God] pours;all the wicked of the earth drink,draining it to the very dregs.\\nAs for me, I will declare forever,I will sing a hymn to the God of Jacob.\\n“All the horns of the wicked I will cut;but the horns of the righteous shall be lifted up.”`,
    },
  ],
};

export const psalms51to75: Tefila[] = [
  psalm51,
  psalm52,
  psalm53,
  psalm54,
  psalm55,
  psalm56,
  psalm57,
  psalm58,
  psalm59,
  psalm60,
  psalm61,
  psalm62,
  psalm63,
  psalm64,
  psalm65,
  psalm66,
  psalm67,
  psalm68,
  psalm69,
  psalm70,
  psalm71,
  psalm72,
  psalm73,
  psalm74,
  psalm75,
];
