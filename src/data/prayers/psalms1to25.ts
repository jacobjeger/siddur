import type { Tefila } from "../types";

// Psalms 1-25 fetched from Sefaria API (https://www.sefaria.org/api/v3/texts/)
// Hebrew: Miqra according to the Masorah (with nikkud/cantillation)
// English: The Koren Jerusalem Bible

export const psalm1: Tefila = {
  id: "psalm-1",
  name: "Psalm 1",
  nameHe: "תהילים א",
  category: "tehillim",
  sections: [
    {
      id: "psalm-1-text",
      title: "Psalm 1",
      titleHe: "תהילים א",
      text: `אַ֥שְֽׁרֵי־הָאִ֗ישׁ אֲשֶׁ֤ר׀ לֹ֥א הָלַךְ֮ בַּעֲצַ֢ת רְשָׁ֫עִ֥ים וּבְדֶ֣רֶךְ חַ֭טָּאִים לֹ֥א עָמָ֑ד וּבְמוֹשַׁ֥ב לֵ֝צִ֗ים לֹ֣א יָשָֽׁב׃\nכִּ֤י אִ֥ם־בְּתוֹרַ֥ת יְהֹוָ֗ה חֶ֫פְצ֥וֹ וּֽבְתוֹרָת֥וֹ יֶהְגֶּ֗ה יוֹמָ֥ם וָלָֽיְלָה׃\nוְֽהָיָ֗ה כְּעֵץ֮ שָׁת֢וּל עַֽל־פַּלְגֵ֫י־מָ֥יִם אֲשֶׁ֤ר פִּרְי֨וֹ׀ יִתֵּ֬ן בְּעִתּ֗וֹ וְעָלֵ֥הוּ לֹֽא־יִבּ֑וֹל וְכֹ֖ל אֲשֶׁר־יַעֲשֶׂ֣ה יַצְלִֽיחַ׃\nלֹא־כֵ֥ן הָרְשָׁעִ֑ים כִּ֥י אִם־כַּ֝מֹּ֗ץ אֲֽשֶׁר־תִּדְּפֶ֥נּוּ רֽוּחַ׃\nעַל־כֵּ֤ן׀ לֹא־יָקֻ֣מוּ רְ֭שָׁעִים בַּמִּשְׁפָּ֑ט וְ֝חַטָּאִ֗ים בַּעֲדַ֥ת צַדִּיקִֽים׃\nכִּֽי־יוֹדֵ֣עַ יְ֭הֹוָה דֶּ֣רֶךְ צַדִּיקִ֑ים וְדֶ֖רֶךְ רְשָׁעִ֣ים תֹּאבֵֽד׃ {פ}`,
      translation: `Blessed is the man who does not walk in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scorners.\nBut his delight is in the Tora of the Lord; and in his Tora he meditates day and night.\nAnd he shall be like a tree planted by streams of water, that brings forth its fruit in its season; its leaf also shall not wither; and in whatever he does he shall prosper.\nNot so the wicked: but they are like the chaff which the wind drives away.\nTherefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous.\nFor the Lord knows the way of the righteous: but the way of the wicked shall perish.`,
    },
  ],
};

export const psalm2: Tefila = {
  id: "psalm-2",
  name: "Psalm 2",
  nameHe: "תהילים ב",
  category: "tehillim",
  sections: [
    {
      id: "psalm-2-text",
      title: "Psalm 2",
      titleHe: "תהילים ב",
      text: `לָ֭מָּה רָגְשׁ֣וּ גוֹיִ֑ם וּ֝לְאֻמִּ֗ים יֶהְגּוּ־רִֽיק׃\nיִ֥תְיַצְּב֨וּ׀ מַלְכֵי־אֶ֗רֶץ וְרוֹזְנִ֥ים נֽוֹסְדוּ־יָ֑חַד עַל־יְ֝הֹוָ֗ה וְעַל־מְשִׁיחֽוֹ׃\nנְֽ֭נַתְּקָה אֶת־מֽוֹסְרוֹתֵ֑ימוֹ וְנַשְׁלִ֖יכָה מִמֶּ֣נּוּ עֲבֹתֵֽימוֹ׃\nיוֹשֵׁ֣ב בַּשָּׁמַ֣יִם יִשְׂחָ֑ק אֲ֝דֹנָ֗י יִלְעַג־לָֽמוֹ׃\nאָ֤ז יְדַבֵּ֣ר אֵלֵ֣ימוֹ בְאַפּ֑וֹ וּֽבַחֲרוֹנ֥וֹ יְבַהֲלֵֽמוֹ׃\nוַ֭אֲנִי נָסַ֣כְתִּי מַלְכִּ֑י עַל־צִ֝יּ֗וֹן הַר־קׇדְשִֽׁי׃\nאֲסַפְּרָ֗ה אֶֽ֫ל־חֹ֥ק יְֽהֹוָ֗ה אָמַ֘ר־אֵלַ֥י בְּנִ֥י אַ֑תָּה אֲ֝נִ֗י הַיּ֥וֹם יְלִדְתִּֽיךָ׃\nשְׁאַ֤ל מִמֶּ֗נִּי וְאֶתְּנָ֣ה ג֭וֹיִם נַחֲלָתֶ֑ךָ וַ֝אֲחֻזָּתְךָ֗ אַפְסֵי־אָֽרֶץ׃\nתְּ֭רֹעֵם בְּשֵׁ֣בֶט בַּרְזֶ֑ל כִּכְלִ֖י יוֹצֵ֣ר תְּנַפְּצֵֽם׃\nוְ֭עַתָּה מְלָכִ֣ים הַשְׂכִּ֑ילוּ הִ֝וָּסְר֗וּ שֹׁ֣פְטֵי אָֽרֶץ׃\nעִבְד֣וּ אֶת־יְהֹוָ֣ה בְּיִרְאָ֑ה וְ֝גִ֗ילוּ בִּרְעָדָֽה׃\nנַשְּׁקוּ־בַ֡ר פֶּן־יֶאֱנַ֤ף׀ וְתֹ֬אבְדוּ דֶ֗רֶךְ כִּֽי־יִבְעַ֣ר כִּמְעַ֣ט אַפּ֑וֹ אַ֝שְׁרֵ֗י כׇּל־ח֥וֹסֵי בֽוֹ׃ {פ}`,
      translation: `Why are the nations in uproar, and the people mutter a vain thing?\nThe kings of the earth set themselves, and the rulers take counsel together, against the Lord, and against his anointed, saying,\nLet us break their bonds asunder, and cast away their cords from us.\nHe who sits in the heavens laughs: the Lord has them in derision.\nThen shall he speak to them in his wrath, and terrify them in his burning anger.\nBut I have set my king upon Żiyyon, my holy hill.\nI will tell of the decree: the Lord has said to me, Thou art my son; this day have I begotten thee.\nAsk of me, and I shall give thee nations for thy inheritance, and the uttermost parts of the earth for thy possession.\nThou shalt break them with a rod of iron; thou shalt dash them in pieces like a potter’s vessel.\nBe wise now therefore, O kings: be warned, O judges of the earth.\nServe the Lord with fear, and rejoice with trembling.\nWorship in purity, lest he be angry, and you perish from the way, for in a little while his anger will blaze. Blessed are all who put their trust in him.`,
    },
  ],
};

export const psalm3: Tefila = {
  id: "psalm-3",
  name: "Psalm 3",
  nameHe: "תהילים ג",
  category: "tehillim",
  sections: [
    {
      id: "psalm-3-text",
      title: "Psalm 3",
      titleHe: "תהילים ג",
      text: `מִזְמ֥וֹר לְדָוִ֑ד בְּ֝בׇרְח֗וֹ מִפְּנֵ֤י׀ אַבְשָׁל֬וֹם בְּנֽוֹ׃\nיְ֭הֹוָה מָה־רַבּ֣וּ צָרָ֑י רַ֝בִּ֗ים קָמִ֥ים עָלָֽי׃\nרַבִּים֮ אֹמְרִ֢ים לְנַ֫פְשִׁ֥י אֵ֤ין יְֽשׁוּעָ֓תָה לּ֬וֹ בֵאלֹהִ֬ים סֶֽלָה׃\nוְאַתָּ֣ה יְ֭הֹוָה מָגֵ֣ן בַּעֲדִ֑י כְּ֝בוֹדִ֗י וּמֵרִ֥ים רֹאשִֽׁי׃\nק֭וֹלִי אֶל־יְהֹוָ֣ה אֶקְרָ֑א וַיַּעֲנֵ֨נִי מֵהַ֖ר קׇדְשׁ֣וֹ סֶֽלָה׃\nאֲנִ֥י שָׁכַ֗בְתִּי וָאִ֫ישָׁ֥נָה הֱקִיצ֑וֹתִי כִּ֖י יְהֹוָ֣ה יִסְמְכֵֽנִי׃\nלֹֽא־אִ֭ירָא מֵרִבְב֥וֹת עָ֑ם אֲשֶׁ֥ר סָ֝בִ֗יב שָׁ֣תוּ עָלָֽי׃\nק֘וּמָ֤ה יְהֹוָ֨ה׀ הוֹשִׁ֘יעֵ֤נִי אֱלֹהַ֗י כִּֽי־הִכִּ֣יתָ אֶת־כׇּל־אֹיְבַ֣י לֶ֑חִי שִׁנֵּ֖י רְשָׁעִ֣ים שִׁבַּֽרְתָּ׃\nלַֽיהֹוָ֥ה הַיְשׁוּעָ֑ה עַֽל־עַמְּךָ֖ בִרְכָתֶ֣ךָ סֶּֽלָה׃ {פ}`,
      translation: `A Psalm of David, when he fled from Avshalom his son.\nLord, how many are my enemies become! many are they who rise up against me:\nmany there be who say of my soul, There is no help for him in God. (Sela.)\nBut Thou, O Lord, art a shield for me; my glory, and the lifter up of my head.\nI cried to the Lord with my voice, and he heard me out of his holy hill. (Sela.)\nI lie me down and sleep; I awake; for the Lord sustains me.\nI will not be afraid of ten thousands of people, that have set themselves against me round about.\nArise, O Lord; save me, O my God: for Thou hast smitten all my enemies upon the cheek; Thou hast broken the teeth of the wicked.\nSalvation belongs to the Lord: Thy blessing be upon Thy people. (Sela.)`,
    },
  ],
};

export const psalm4: Tefila = {
  id: "psalm-4",
  name: "Psalm 4",
  nameHe: "תהילים ד",
  category: "tehillim",
  sections: [
    {
      id: "psalm-4-text",
      title: "Psalm 4",
      titleHe: "תהילים ד",
      text: `לַמְנַצֵּ֥חַ בִּנְגִינ֗וֹת מִזְמ֥וֹר לְדָוִֽד׃\nבְּקׇרְאִ֡י עֲנֵ֤נִי׀ אֱלֹ֘הֵ֤י צִדְקִ֗י בַּ֭צָּר הִרְחַ֣בְתָּ לִּ֑י חׇ֝נֵּ֗נִי וּשְׁמַ֥ע תְּפִלָּתִֽי׃\nבְּנֵ֥י אִ֡ישׁ עַד־מֶ֬ה כְבוֹדִ֣י לִ֭כְלִמָּה תֶּאֱהָב֣וּן רִ֑יק תְּבַקְשׁ֖וּ כָזָ֣ב סֶֽלָה׃\nוּדְע֗וּ כִּֽי־הִפְלָ֣ה יְ֭הֹוָה חָסִ֣יד ל֑וֹ יְהֹוָ֥ה יִ֝שְׁמַ֗ע בְּקׇרְאִ֥י אֵלָֽיו׃\nרִגְז֗וּ וְֽאַל־תֶּ֫חֱטָ֥אוּ אִמְר֣וּ בִ֭לְבַבְכֶם עַֽל־מִשְׁכַּבְכֶ֗ם וְדֹ֣מּוּ סֶֽלָה׃\nזִבְח֥וּ זִבְחֵי־צֶ֑דֶק וּ֝בִטְח֗וּ אֶל־יְהֹוָֽה׃\nרַבִּ֥ים אֹמְרִים֮ מִֽי־יַרְאֵ֢נ֫וּ ט֥וֹב נְֽסָה־עָ֭לֵינוּ א֨וֹר פָּנֶ֬יךָ יְהֹוָֽה׃\nנָתַ֣תָּה שִׂמְחָ֣ה בְלִבִּ֑י מֵעֵ֬ת דְּגָנָ֖ם וְתִירוֹשָׁ֣ם רָֽבּוּ׃\nבְּשָׁל֣וֹם יַחְדָּו֮ אֶשְׁכְּבָ֢ה וְאִ֫ישָׁ֥ן כִּֽי־אַתָּ֣ה יְהֹוָ֣ה לְבָדָ֑ד לָ֝בֶ֗טַח תּוֹשִׁיבֵֽנִי׃ {פ}`,
      translation: `For the chief Musician on strings, A Psalm of David.\nHear me when I call, O God of my righteousness: Thou hast enlarged me when I was in distress; have mercy upon me, and hear my prayer.\nO sons of men, how long will you turn my glory into shame? you love vanity, and seek after falsehood. (Sela.)\nBut know that the Lord has set apart the godly man as his own: the Lord will hear when I call to him.\nTremble, and sin not: commune with your own heart upon your bed, and be still. (Sela.)\nOffer the sacrifices of righteousness, and put your trust in the Lord.\nThere are many who say, Who will show us good? Lord, lift Thou up the light of Thy countenance upon us.\nThou hast put more gladness in my heart than they have whose corn and wine are increased.\nI will both lie down and sleep, in peace: for Thou, Lord, alone, makest me to dwell in safety.`,
    },
  ],
};

export const psalm5: Tefila = {
  id: "psalm-5",
  name: "Psalm 5",
  nameHe: "תהילים ה",
  category: "tehillim",
  sections: [
    {
      id: "psalm-5-text",
      title: "Psalm 5",
      titleHe: "תהילים ה",
      text: `לַמְנַצֵּ֥חַ אֶֽל־הַנְּחִיל֗וֹת מִזְמ֥וֹר לְדָוִֽד׃\nאֲמָרַ֖י הַאֲזִ֥ינָה׀יְהֹוָ֗ה בִּ֣ינָה הֲגִיגִֽי׃\nהַקְשִׁ֤יבָה׀ לְק֬וֹל שַׁוְעִ֗י מַלְכִּ֥י וֵאלֹהָ֑י כִּֽי־אֵ֝לֶ֗יךָ אֶתְפַּלָּֽל׃\nיְֽהֹוָ֗ה בֹּ֭קֶר תִּשְׁמַ֣ע קוֹלִ֑י בֹּ֥קֶר אֶעֱרׇךְ־לְ֝ךָ֗ וַאֲצַפֶּֽה׃\nכִּ֤י׀ לֹ֤א אֵֽל־חָפֵ֘ץ־רֶ֥שַׁע׀אָ֑תָּה לֹ֖א יְגֻרְךָ֣ רָֽע׃\nלֹֽא־יִתְיַצְּב֣וּ ה֭וֹלְלִים לְנֶ֣גֶד עֵינֶ֑יךָ שָׂ֝נֵ֗אתָ כׇּל־פֹּ֥עֲלֵי אָֽוֶן׃\nתְּאַבֵּד֮ דֹּבְרֵ֢י כָ֫זָ֥ב אִישׁ־דָּמִ֥ים וּמִרְמָ֗ה יְתָ֘עֵ֥ב׀יְהֹוָֽה׃\nוַאֲנִ֗י בְּרֹ֣ב חַ֭סְדְּךָ אָב֣וֹא בֵיתֶ֑ךָ אֶשְׁתַּחֲוֶ֥ה אֶל־הֵֽיכַל־קׇ֝דְשְׁךָ֗ בְּיִרְאָתֶֽךָ׃\nיְהֹוָ֤ה׀ נְחֵ֬נִי בְצִדְקָתֶ֗ךָ לְמַ֥עַן שׁוֹרְרָ֑י (הושר) [הַיְשַׁ֖ר] לְפָנַ֣י דַּרְכֶּֽךָ׃\nכִּ֤י אֵ֪ין בְּפִ֡יהוּ נְכוֹנָה֮ קִרְבָּ֢ם הַ֫וּ֥וֹת קֶֽבֶר־פָּת֥וּחַ גְּרֹנָ֑ם לְ֝שׁוֹנָ֗ם יַחֲלִיקֽוּן׃\nהַ֥אֲשִׁימֵ֨ם׀ אֱֽלֹהִ֗ים יִפְּלוּ֮ מִֽמֹּעֲצ֢וֹתֵ֫יהֶ֥ם בְּרֹ֣ב פִּ֭שְׁעֵיהֶם הַדִּיחֵ֑מוֹ כִּי־מָ֥רוּ בָֽךְ׃\nוְיִשְׂמְח֨וּ כׇל־ח֪וֹסֵי בָ֡ךְ לְעוֹלָ֣ם יְ֭רַנֵּנוּ וְתָסֵ֣ךְ עָלֵ֑ימוֹ וְֽיַעְלְצ֥וּ בְ֝ךָ֗ אֹהֲבֵ֥י שְׁמֶֽךָ׃\nכִּֽי־אַתָּה֮ תְּבָרֵ֢ךְ צַ֫דִּ֥יק יְהֹוָ֑ה כַּ֝צִּנָּ֗ה רָצ֥וֹן תַּעְטְרֶֽנּוּ׃ {פ}`,
      translation: `To the chief Musician for flutes, A Psalm of David.\nGive ear to my words, O Lord, consider my meditation.\nHearken to the voice of my cry, my King, and my God: for to Thee I will pray.\nMy voice shalt Thou hear in the morning, O Lord; in the morning I will direct my prayer to Thee; and will wait expectantly.\nFor Thou art not a God That hast pleasure in wickedness: nor shall evil dwell with Thee.\nThe boastful shall not stand in Thy sight: Thou hatest all workers of iniquity.\nThou dost destroy them that speak falsehood: the Lord abhors the bloody and deceitful man.\nBut as for me, I will come into Thy house in the multitude of Thy love: and in the fear of Thee I will worship towards Thy holy temple.\nLead me, O Lord, in Thy righteousness because of my enemies; make Thy way straight before my face.\nFor there is no sincerity in their mouth; in their heart is malice; their throat is an open sepulchre; they flatter with their tongue.\nCondemn them, O God; let them fall by their own counsels; cast them out for the multitude of their transgressions; for they have rebelled against Thee.\nBut let all those that put their trust in Thee rejoice: let them ever shout for joy, because Thou dost defend them: and let those who love Thy name be joyful in Thee.\nFor Thou, Lord, dost bless the righteous; Thou dost encircle him with favour as with a shield.`,
    },
  ],
};

export const psalm6: Tefila = {
  id: "psalm-6",
  name: "Psalm 6",
  nameHe: "תהילים ו",
  category: "tehillim",
  sections: [
    {
      id: "psalm-6-text",
      title: "Psalm 6",
      titleHe: "תהילים ו",
      text: `לַמְנַצֵּ֣חַ בִּ֭נְגִינוֹת עַֽל־הַשְּׁמִינִ֗ית מִזְמ֥וֹר לְדָוִֽד׃\nיְֽהֹוָ֗ה אַל־בְּאַפְּךָ֥ תוֹכִיחֵ֑נִי וְֽאַל־בַּחֲמָתְךָ֥ תְיַסְּרֵֽנִי׃\nחׇנֵּ֥נִי יְהֹוָה֮ כִּ֤י אֻמְלַ֫ל־אָ֥נִי רְפָאֵ֥נִי יְהֹוָ֑ה כִּ֖י נִבְהֲל֣וּ עֲצָמָֽי׃\nוְ֭נַפְשִׁי נִבְהֲלָ֣ה מְאֹ֑ד (ואת) [וְאַתָּ֥ה] יְ֝הֹוָ֗ה עַד־מָתָֽי׃\nשׁוּבָ֣ה יְ֭הֹוָה חַלְּצָ֣ה נַפְשִׁ֑י ה֝וֹשִׁיעֵ֗נִי לְמַ֣עַן חַסְדֶּֽךָ׃\nכִּ֤י אֵ֣ין בַּמָּ֣וֶת זִכְרֶ֑ךָ בִּ֝שְׁא֗וֹל מִ֣י יֽוֹדֶה־לָּֽךְ׃\nיָגַ֤עְתִּי׀ בְּֽאַנְחָתִ֗י אַשְׂחֶ֣ה בְכׇל־לַ֭יְלָה מִטָּתִ֑י בְּ֝דִמְעָתִ֗י עַרְשִׂ֥י אַמְסֶֽה׃\nעָשְׁשָׁ֣ה מִכַּ֣עַס עֵינִ֑י עָ֝תְקָ֗ה בְּכׇל־צוֹרְרָֽי׃\nס֣וּרוּ מִ֭מֶּנִּי כׇּל־פֹּ֣עֲלֵי אָ֑וֶן כִּֽי־שָׁמַ֥ע יְ֝הֹוָ֗ה ק֣וֹל בִּכְיִֽי׃\nשָׁמַ֣ע יְ֭הֹוָה תְּחִנָּתִ֑י יְ֝הֹוָ֗ה תְּֽפִלָּתִ֥י יִקָּֽח׃\nיֵבֹ֤שׁוּ׀ וְיִבָּהֲל֣וּ מְ֭אֹד כׇּל־אֹיְבָ֑י יָ֝שֻׁ֗בוּ יֵבֹ֥שׁוּ רָֽגַע׃ {פ}`,
      translation: `To the chief Musician on strings upon the Sheminit, A Psalm of David.\nO Lord, rebuke me not in Thy anger, nor chasten me in Thy hot displeasure.\nHave mercy upon me, O Lord; for I am weak: O Lord, heal me; for my bones shudder;\nand my soul is much affrighted. And Thou, O Lord, how long?\nReturn, O Lord, deliver my soul: oh save me on account of Thy steadfast love.\nFor in death there is no remembrance of Thee: in She᾽ol who shall give Thee thanks?\nI am weary with my groaning: all the night I make my bed to swim; I water my couch with my tears.\nMy eye is wasted because of grief; it grows weak because of all my enemies.\nDepart from me, all you workers of iniquity; for the Lord has heard the voice of my weeping.\nThe Lord has heard my supplication; the Lord receives my prayer.\nAll my enemies will be ashamed and much affrighted: they will turn back and be confounded in a moment.`,
    },
  ],
};

export const psalm7: Tefila = {
  id: "psalm-7",
  name: "Psalm 7",
  nameHe: "תהילים ז",
  category: "tehillim",
  sections: [
    {
      id: "psalm-7-text",
      title: "Psalm 7",
      titleHe: "תהילים ז",
      text: `שִׁגָּי֗וֹן לְדָ֫וִ֥ד אֲשֶׁר־שָׁ֥ר לַֽיהֹוָ֑ה עַל־דִּבְרֵי־כ֝֗וּשׁ בֶּן־יְמִינִֽי׃\nיְהֹוָ֣ה אֱ֭לֹהַי בְּךָ֣ חָסִ֑יתִי הוֹשִׁיעֵ֥נִי מִכׇּל־רֹ֝דְפַ֗י וְהַצִּילֵֽנִי׃\nפֶּן־יִטְרֹ֣ף כְּאַרְיֵ֣ה נַפְשִׁ֑י פֹּ֝רֵ֗ק וְאֵ֣ין מַצִּֽיל׃\nיְהֹוָ֣ה אֱ֭לֹהַי אִם־עָשִׂ֣יתִי זֹ֑את אִֽם־יֶשׁ־עָ֥וֶל בְּכַפָּֽי׃\nאִם־גָּ֭מַלְתִּי שֽׁוֹלְמִ֥י רָ֑ע וָאֲחַלְּצָ֖ה צֽוֹרְרִ֣י רֵיקָֽם׃\nיִ֥רַדֹּֽף־אוֹיֵ֨ב׀ נַפְשִׁ֡י וְיַשֵּׂ֗ג וְיִרְמֹ֣ס לָאָ֣רֶץ חַיָּ֑י וּכְבוֹדִ֓י׀ לֶעָפָ֖ר יַשְׁכֵּ֣ן סֶֽלָה׃\nק֘וּמָ֤ה יְהֹוָ֨ה׀ בְּאַפֶּ֗ךָ הִ֭נָּשֵׂא בְּעַבְר֣וֹת צוֹרְרָ֑י וְע֥וּרָה אֵ֝לַ֗י מִשְׁפָּ֥ט צִוִּֽיתָ׃\nוַעֲדַ֣ת לְ֭אֻמִּים תְּסֽוֹבְבֶ֑ךָּ וְ֝עָלֶ֗יהָ לַמָּר֥וֹם שֽׁוּבָה׃\nיְהֹוָה֮ יָדִ֢ין עַ֫מִּ֥ים שׇׁפְטֵ֥נִי יְהֹוָ֑ה כְּצִדְקִ֖י וּכְתֻמִּ֣י עָלָֽי׃\nיִגְמׇר־נָ֬א רַ֨ע׀ רְשָׁעִים֮ וּתְכוֹנֵ֢ן צַ֫דִּ֥יק וּבֹחֵ֣ן לִ֭בּוֹת וּכְלָי֗וֹת אֱלֹהִ֥ים צַדִּֽיק׃\nמָגִנִּ֥י עַל־אֱלֹהִ֑ים מ֝וֹשִׁ֗יעַ יִשְׁרֵי־לֵֽב׃\nאֱ֭לֹהִים שׁוֹפֵ֣ט צַדִּ֑יק וְ֝אֵ֗ל זֹעֵ֥ם בְּכׇל־יֽוֹם׃\nאִם־לֹ֣א יָ֭שׁוּב חַרְבּ֣וֹ יִלְט֑וֹשׁ קַשְׁתּ֥וֹ דָ֝רַ֗ךְ וַֽיְכוֹנְנֶֽהָ׃\nוְ֭לוֹ הֵכִ֣ין כְּלֵי־מָ֑וֶת חִ֝צָּ֗יו לְֽדֹלְקִ֥ים יִפְעָֽל׃\nהִנֵּ֥ה יְחַבֶּל־אָ֑וֶן וְהָרָ֥ה עָ֝מָ֗ל וְיָ֣לַד שָֽׁקֶר׃\nבּ֣וֹר כָּ֭רָה וַֽיַּחְפְּרֵ֑הוּ וַ֝יִּפֹּ֗ל בְּשַׁ֣חַת יִפְעָֽל׃\nיָשׁ֣וּב עֲמָל֣וֹ בְרֹאשׁ֑וֹ וְעַ֥ל קׇ֝דְקֳד֗וֹ חֲמָס֥וֹ יֵרֵֽד׃\nאוֹדֶ֣ה יְהֹוָ֣ה כְּצִדְק֑וֹ וַ֝אֲזַמְּרָ֗ה שֵֽׁם־יְהֹוָ֥ה עֶלְיֽוֹן׃ {פ}`,
      translation: `A Shiggayon of David, which he sang to the Lord, concerning the words of Kush the Benyeminite.\nO Lord my God, in Thee do I put my trust: save me from all them that persecute me, and deliver me:\nlest he tear my soul like a lion, rending it in pieces, while there is none to deliver.\nO Lord my God, if I have done this; if there be iniquity in my hands;\nif I have rewarded evil to him that was at peace with me; (indeed, I have rescued him that without cause is my enemy:)\nlet the enemy persecute my soul, and take it; and let him tread down my life to the earth, and lay my honour in the dust. (Sela.)\nArise, O Lord, in Thy anger, lift up Thyself against the fury of my enemies: and awake for me: Thou hast commanded judgment.\nLet the congregation of the peoples compass Thee about: and for their sakes return Thou on high.\nThe Lord shall judge the peoples. Judge me, O Lord, according to my righteousness, and according to my integrity that is in me.\nO let the wickedness of the wicked come to an end; but establish the just: for the righteous God tries the hearts and reins.\nMy defence is of God, who saves the upright in heart.\nGod is a righteous judge; and a God who has indignation every day.\nIf a man does not turn, then he will whet his sword; he has bent his bow, and made it ready.\nHe has also prepared for him the instruments of death; he makes arrows for the pursuers.\nBehold, he travails with iniquity, and has conceived mischief, and brings forth falsehood.\nHe has made a pit, and has dug it out, and has fallen into the ditch which he made.\nHis mischief shall return upon his own head, and his violent dealing shall come down upon his own pate.\nI will praise the Lord according to his righteousness: and will sing praise to the name of the Lord most high.`,
    },
  ],
};

export const psalm8: Tefila = {
  id: "psalm-8",
  name: "Psalm 8",
  nameHe: "תהילים ח",
  category: "tehillim",
  sections: [
    {
      id: "psalm-8-text",
      title: "Psalm 8",
      titleHe: "תהילים ח",
      text: `לַמְנַצֵּ֥חַ עַֽל־הַגִּתִּ֗ית מִזְמ֥וֹר לְדָוִֽד׃\nיְהֹוָ֤ה אֲדֹנֵ֗ינוּ מָה־אַדִּ֣יר שִׁ֭מְךָ בְּכׇל־הָאָ֑רֶץ אֲשֶׁ֥ר תְּנָ֥ה ה֝וֹדְךָ֗ עַל־הַשָּׁמָֽיִם׃\nמִפִּ֤י עוֹלְלִ֨ים׀ וְֽיֹנְקִים֮ יִסַּ֢דְתָּ֫ עֹ֥ז לְמַ֥עַן צוֹרְרֶ֑יךָ לְהַשְׁבִּ֥ית א֝וֹיֵ֗ב וּמִתְנַקֵּֽם׃\nכִּֽי־אֶרְאֶ֣ה שָׁ֭מֶיךָ מַעֲשֵׂ֣ה אֶצְבְּעֹתֶ֑יךָ יָרֵ֥חַ וְ֝כוֹכָבִ֗ים אֲשֶׁ֣ר כּוֹנָֽנְתָּה׃\nמָה־אֱנ֥וֹשׁ כִּֽי־תִזְכְּרֶ֑נּוּ וּבֶן־אָ֝דָ֗ם כִּ֣י תִפְקְדֶֽנּוּ׃\nוַתְּחַסְּרֵ֣הוּ מְּ֭עַט מֵאֱלֹהִ֑ים וְכָב֖וֹד וְהָדָ֣ר תְּעַטְּרֵֽהוּ׃\nתַּ֭מְשִׁילֵהוּ בְּמַעֲשֵׂ֣י יָדֶ֑יךָ כֹּ֝֗ל שַׁ֣תָּה תַֽחַת־רַגְלָֽיו׃\nצֹנֶ֣ה וַאֲלָפִ֣ים כֻּלָּ֑ם וְ֝גַ֗ם בַּהֲמ֥וֹת שָׂדָֽי׃\nצִפּ֣וֹר שָׁ֭מַיִם וּדְגֵ֣י הַיָּ֑ם עֹ֝בֵ֗ר אׇרְח֥וֹת יַמִּֽים׃\nיְהֹוָ֥ה אֲדֹנֵ֑ינוּ מָה־אַדִּ֥יר שִׁ֝מְךָ֗ בְּכׇל־הָאָֽרֶץ׃ {פ}`,
      translation: `To the chief Musician upon the Gittit, A Psalm of David.\nO Lord our Lord, how majestic is Thy name in all the earth; who hast set Thy glory above the heavens.\nOut of the mouth of babes and sucklings hast Thou founded strength because of Thy enemies, that Thou mightest still the enemy and the avenger.\nWhen I behold Thy heavens, the work of Thy fingers, the moon and the stars, which Thou hast ordained;\nwhat is man, that Thou art mindful of him? and the son of man, that Thou visitest him?\nYet Thou hast made him a little lower than the angels, and Thou dost crown him with glory and honour.\nThou makest him to have dominion over the works of Thy hands; Thou hast put all things under his feet:\nall sheep, and oxen, and also the beasts of the field;\nthe birds of the sky, and the fish of the sea; whatever passes through the paths of the seas.\nO Lord our Lord, how majestic is Thy name in all the earth!`,
    },
  ],
};

export const psalm9: Tefila = {
  id: "psalm-9",
  name: "Psalm 9",
  nameHe: "תהילים ט",
  category: "tehillim",
  sections: [
    {
      id: "psalm-9-text",
      title: "Psalm 9",
      titleHe: "תהילים ט",
      text: `לַ֭מְנַצֵּחַ עַל־מ֥וּת לַבֵּ֗ן מִזְמ֥וֹר לְדָוִֽד׃\nאוֹדֶ֣ה יְ֭הֹוָה בְּכׇל־לִבִּ֑י אֲ֝סַפְּרָ֗ה כׇּל־נִפְלְאוֹתֶֽיךָ׃\nאֶשְׂמְחָ֣ה וְאֶעֶלְצָ֣ה בָ֑ךְ אֲזַמְּרָ֖ה שִׁמְךָ֣ עֶלְיֽוֹן׃\nבְּשׁוּב־אוֹיְבַ֥י אָח֑וֹר יִכָּשְׁל֥וּ וְ֝יֹאבְד֗וּ מִפָּנֶֽיךָ׃\nכִּֽי־עָ֭שִׂיתָ מִשְׁפָּטִ֣י וְדִינִ֑י יָשַׁ֥בְתָּ לְ֝כִסֵּ֗א שׁוֹפֵ֥ט צֶֽדֶק׃\nגָּעַ֣רְתָּ ג֭וֹיִם אִבַּ֣דְתָּ רָשָׁ֑ע שְׁמָ֥ם מָ֝חִ֗יתָ לְעוֹלָ֥ם וָעֶֽד׃\nהָֽאוֹיֵ֨ב׀ תַּ֥מּוּ חֳרָב֗וֹת לָ֫נֶ֥צַח וְעָרִ֥ים נָתַ֑שְׁתָּ אָבַ֖ד זִכְרָ֣ם הֵֽמָּה׃\nוַֽ֭יהֹוָה לְעוֹלָ֣ם יֵשֵׁ֑ב כּוֹנֵ֖ן לַמִּשְׁפָּ֣ט כִּסְאֽוֹ׃\nוְה֗וּא יִשְׁפֹּֽט־תֵּבֵ֥ל בְּצֶ֑דֶק יָדִ֥ין לְ֝אֻמִּ֗ים בְּמֵישָׁרִֽים׃\nוִ֘יהִ֤י יְהֹוָ֣ה מִשְׂגָּ֣ב לַדָּ֑ךְ מִ֝שְׂגָּ֗ב לְעִתּ֥וֹת בַּצָּרָֽה׃\nוְיִבְטְח֣וּ בְ֭ךָ יוֹדְעֵ֣י שְׁמֶ֑ךָ כִּ֤י לֹֽא־עָזַ֖בְתָּ דֹרְשֶׁ֣יךָ יְהֹוָֽה׃\nזַמְּר֗וּ לַ֭יהֹוָה יֹשֵׁ֣ב צִיּ֑וֹן הַגִּ֥ידוּ בָ֝עַמִּ֗ים עֲלִֽילוֹתָֽיו׃\nכִּֽי־דֹרֵ֣שׁ דָּ֭מִים אוֹתָ֣ם זָכָ֑ר לֹֽא־שָׁ֝כַ֗ח צַעֲקַ֥ת (עניים) [עֲנָוִֽים]׃\nחָֽנְנֵ֬נִי יְהֹוָ֗ה רְאֵ֣ה עׇ֭נְיִי מִשֹּׂנְאָ֑י מְ֝רוֹמְמִ֗י מִשַּׁ֥עֲרֵי מָֽוֶת׃\nלְמַ֥עַן אֲסַפְּרָ֗ה כׇּֽל־תְּהִלָּ֫תֶ֥יךָ בְּשַׁעֲרֵ֥י בַת־צִיּ֑וֹן אָ֝גִ֗ילָה בִּישׁוּעָתֶֽךָ׃\nטָבְע֣וּ ג֭וֹיִם בְּשַׁ֣חַת עָשׂ֑וּ בְּרֶֽשֶׁת־ז֥וּ טָ֝מָ֗נוּ נִלְכְּדָ֥ה רַגְלָֽם׃\nנ֤וֹדַ֨ע׀ יְהֹוָה֮ מִשְׁפָּ֢ט עָ֫שָׂ֥ה בְּפֹ֣עַל כַּ֭פָּיו נוֹקֵ֣שׁ רָשָׁ֑ע הִגָּי֥וֹן סֶֽלָה׃\nיָשׁ֣וּבוּ רְשָׁעִ֣ים לִשְׁא֑וֹלָה כׇּל־גּ֝וֹיִ֗ם שְׁכֵחֵ֥י אֱלֹהִֽים׃\nכִּ֤י לֹ֣א לָ֭נֶצַח יִשָּׁכַ֣ח אֶבְי֑וֹן תִּקְוַ֥ת (ענוים) [עֲ֝נִיִּ֗ים] תֹּאבַ֥ד לָעַֽד׃\nקוּמָ֣ה יְ֭הֹוָה אַל־יָעֹ֣ז אֱנ֑וֹשׁ יִשָּׁפְט֥וּ ג֝וֹיִ֗ם עַל־פָּנֶֽיךָ׃\nשִׁ֘יתָ֤ה יְהֹוָ֨ה׀ מוֹרָ֗ה לָ֫הֶ֥ם יֵדְע֥וּ גוֹיִ֑ם אֱנ֖וֹשׁ הֵ֣מָּה סֶּֽלָה׃ {פ}`,
      translation: `To the chief Musician on the death of Labben, A Psalm of David.\nI will praise Thee, O Lord, with my whole heart; I will relate all Thy marvellous works.\nI will be glad and rejoice in Thee: I will sing praise to Thy name, O Thou most High:\nwhen my enemies are turned back, when they stumble and perish at Thy presence.\nFor Thou hast maintained my right and my cause; Thou didst sit on the throne giving righteous judgment.\nThou hast rebuked the nations, Thou hast destroyed the wicked, Thou hast blotted out their name for ever and ever.\nThe enemies are come to an end, in perpetual ruins: for Thou hast destroyed the cities; their memorial is perished.\nBut the Lord shall endure forever: he has prepared his throne for judgment.\nAnd he will judge the world in righteousness, he will minister judgment to the people in uprightness.\nThe Lord also will be a stronghold for the oppressed, a refuge in times of trouble.\nAnd they that know Thy name will put their trust in Thee: for Thou, Lord, hast not forsaken those who seek Thee.\nSing praises to the Lord, who dwells in Żiyyon: declare among the peoples his doings.\nFor he avenges blood, he remembers it: he does not forget the cry of the humble.\nBe gracious to me, O Lord; consider my trouble which I suffer from those who hate me, Thou that liftest me up from the gates of death:\nthat I may relate all Thy praise in the gates of the daughter of Żiyyon. I will rejoice in Thy salvation.\nThe nations are sunk down in the pit that they have made: in the net which they hid is their own foot taken.\nThe Lord is known by the judgment which he executes: the wicked is snared in the work of his own hands. (A Higgayon. Sela.)\nThe wicked shall be turned back to She᾽ol, all the nations that forget God.\nFor the needy shall not always be forgotten: the expectation of the poor shall not perish forever.\nArise, O Lord; let man not prevail: let the nations be judged in Thy sight.\nPut them in fear, O Lord: the nations will then know themselves to be but men. (Sela.)`,
    },
  ],
};

export const psalm10: Tefila = {
  id: "psalm-10",
  name: "Psalm 10",
  nameHe: "תהילים י",
  category: "tehillim",
  sections: [
    {
      id: "psalm-10-text",
      title: "Psalm 10",
      titleHe: "תהילים י",
      text: `לָמָ֣ה יְ֭הֹוָה תַּעֲמֹ֣ד בְּרָח֑וֹק תַּ֝עְלִ֗ים לְעִתּ֥וֹת בַּצָּרָֽה׃\nבְּגַאֲוַ֣ת רָ֭שָׁע יִדְלַ֣ק עָנִ֑י יִתָּפְשׂ֓וּ׀ בִּמְזִמּ֖וֹת ז֣וּ חָשָֽׁבוּ׃\nכִּֽי־הִלֵּ֣ל רָ֭שָׁע עַל־תַּאֲוַ֣ת נַפְשׁ֑וֹ וּבֹצֵ֥עַ בֵּ֝רֵ֗ךְ נִ֘אֵ֥ץ׀יְהֹוָֽה׃\nרָשָׁ֗ע כְּגֹ֣בַהּ אַ֭פּוֹ בַּל־יִדְרֹ֑שׁ אֵ֥ין אֱ֝לֹהִ֗ים כׇּל־מְזִמּוֹתָֽיו׃\nיָ֘חִ֤ילוּ דְרָכָ֨ו׀ בְּכׇל־עֵ֗ת מָר֣וֹם מִ֭שְׁפָּטֶיךָ מִנֶּגְדּ֑וֹ כׇּל־צ֝וֹרְרָ֗יו יָפִ֥יחַ בָּהֶֽם׃\nאָמַ֣ר בְּ֭לִבּוֹ בַּל־אֶמּ֑וֹט לְדֹ֥ר וָ֝דֹ֗ר אֲשֶׁ֣ר לֹֽא־בְרָֽע׃\nאָלָ֤ה׀ פִּ֣יהוּ מָ֭לֵא וּמִרְמ֣וֹת וָתֹ֑ךְ תַּ֥חַת לְ֝שׁוֹנ֗וֹ עָמָ֥ל וָאָֽוֶן׃\nיֵשֵׁ֤ב׀ בְּמַאְרַ֬ב חֲצֵרִ֗ים בַּֽ֭מִּסְתָּרִים יַהֲרֹ֣ג נָקִ֑י עֵ֝ינָ֗יו לְֽחֵלְכָ֥ה יִצְפֹּֽנוּ׃\nיֶאֱרֹ֬ב בַּמִּסְתָּ֨ר׀ כְּאַרְיֵ֬ה בְסֻכֹּ֗ה יֶ֭אֱרֹב לַחֲט֣וֹף עָנִ֑י יַחְטֹ֥ף עָ֝נִ֗י בְּמׇשְׁכ֥וֹ בְרִשְׁתּֽוֹ׃\n(ודכה) [יִדְכֶּ֥ה] יָשֹׁ֑חַ וְנָפַ֥ל בַּ֝עֲצוּמָ֗יו (חלכאים) [חֵ֣ל כָּאִֽים]׃\nאָמַ֣ר בְּ֭לִבּוֹ שָׁ֣כַֽח אֵ֑ל הִסְתִּ֥יר פָּ֝נָ֗יו בַּל־רָאָ֥ה לָנֶֽצַח׃\nקוּמָ֤ה יְהֹוָ֗ה אֵ֭ל נְשָׂ֣א יָדֶ֑ךָ אַל־תִּשְׁכַּ֥ח (עניים) [עֲנָוִֽים]׃\nעַל־מֶ֤ה׀ נִאֵ֖ץ רָשָׁ֥ע׀אֱלֹהִ֑ים אָמַ֥ר בְּ֝לִבּ֗וֹ לֹ֣א תִדְרֹֽשׁ׃\nרָאִ֡תָה כִּי־אַתָּ֤ה׀ עָ֘מָ֤ל וָכַ֨עַס׀ תַּבִּיט֮ לָתֵ֢ת בְּיָ֫דֶ֥ךָ עָ֭לֶיךָ יַעֲזֹ֣ב חֵלֵ֑כָה יָ֝ת֗וֹם אַתָּ֤ה׀ הָיִ֬יתָ עוֹזֵֽר׃\nשְׁ֭בֹר זְר֣וֹעַ רָשָׁ֑ע וָ֝רָ֗ע תִּֽדְרוֹשׁ־רִשְׁע֥וֹ בַל־תִּמְצָֽא׃\nיְהֹוָ֣ה מֶ֭לֶךְ עוֹלָ֣ם וָעֶ֑ד אָבְד֥וּ ג֝וֹיִ֗ם מֵאַרְצֽוֹ׃\nתַּאֲוַ֬ת עֲנָוִ֣ים שָׁמַ֣עְתָּ יְהֹוָ֑ה תָּכִ֥ין לִ֝בָּ֗ם תַּקְשִׁ֥יב אׇזְנֶֽךָ׃\nלִשְׁפֹּ֥ט יָת֗וֹם וָ֫דָ֥ךְ בַּל־יוֹסִ֥יף ע֑וֹד לַעֲרֹ֥ץ אֱ֝נ֗וֹשׁ מִן־הָאָֽרֶץ׃ {פ}`,
      translation: `Why standest Thou afar off, O Lord? why hidest Thou Thyself in times of trouble?\nThe wicked in his pride hotly pursues the poor: let them be taken in the devices that they have imagined.\nFor the wicked boasts of his heart’s desire, and the greedy wretch curses and renounces the Lord.\nThe wicked, through the pride of his countenance thinks, He will not seek out: all his thoughts are, God is not.\nHis ways are always strong; thy judgments are far above out of his sight: as for all his enemies, he hisses at them.\nHe says in his heart, I shall not be moved: for I shall never be in adversity.\nHis mouth is full of cursing and deceit and fraud: under his tongue is mischief and iniquity.\nHe sits in the lurking places of the villages: in the secret places he murders the innocent: his eyes stealthily watch for the helpless.\nHe lies in wait secretly like a lion in his den: he lies in wait to catch the poor: he catches the poor, when he draws him into his net.\nThe helpless collapse: they bow down, and fall into his power.\nHe says in his heart, God has forgotten: he hides his face; he will never see it.\nArise, O Lord; O God, lift up Thy hand: forget not the humble.\nWhy does the wicked man renounce God? he says in his heart, Thou wilt not avenge.\nThou hast seen it; for Thou beholdest mischief and spite, to requite it with Thy hand: the helpless man commits himself to Thee; Thou art the helper of the fatherless.\nBreak Thou the arm of the wicked and the evil man: seek out his wickedness till Thou find none left.\nThe Lord is King for ever and ever: the nations are perished out of his land.\nLord, Thou hast heard the desire of the humble: Thou wilt strengthen their heart, Thou wilt cause Thy ear to hear:\nto judge the fatherless and the oppressed, so that none shall any longer terrify innocent men from the earth.`,
    },
  ],
};

export const psalm11: Tefila = {
  id: "psalm-11",
  name: "Psalm 11",
  nameHe: "תהילים יא",
  category: "tehillim",
  sections: [
    {
      id: "psalm-11-text",
      title: "Psalm 11",
      titleHe: "תהילים 11",
      text: `לַמְנַצֵּ֗חַ לְדָ֫וִ֥ד בַּֽיהֹוָ֨ה׀ חָסִ֗יתִי אֵ֭יךְ תֹּאמְר֣וּ לְנַפְשִׁ֑י (נודו) [נ֝֗וּדִי] הַרְכֶ֥ם צִפּֽוֹר׃\nכִּ֤י הִנֵּ֪ה הָרְשָׁעִ֡ים יִדְרְכ֬וּן קֶ֗שֶׁת כּוֹנְנ֣וּ חִצָּ֣ם עַל־יֶ֑תֶר לִיר֥וֹת בְּמוֹ־אֹ֝֗פֶל לְיִשְׁרֵי־לֵֽב׃\nכִּ֣י הַ֭שָּׁתוֹת יֵהָרֵס֑וּן צַ֝דִּ֗יק מַה־פָּעָֽל׃\nיְהֹוָ֤ה׀ בְּֽהֵ֘יכַ֤ל קׇדְשׁ֗וֹ יְהֹוָה֮ בַּשָּׁמַ֢יִם כִּ֫סְא֥וֹ עֵינָ֥יו יֶחֱז֑וּ עַפְעַפָּ֥יו יִ֝בְחֲנ֗וּ בְּנֵ֣י אָדָֽם׃\nיְהֹוָה֮ צַדִּ֢יק יִ֫בְחָ֥ן וְ֭רָשָׁע וְאֹהֵ֣ב חָמָ֑ס שָֽׂנְאָ֥ה נַפְשֽׁוֹ׃\nיַמְטֵ֥ר עַל־רְשָׁעִ֗ים פַּ֫חִ֥ים אֵ֣שׁ וְ֭גׇפְרִית וְר֥וּחַ זִלְעָפ֗וֹת מְנָ֣ת כּוֹסָֽם׃\nכִּֽי־צַדִּ֣יק יְ֭הֹוָה צְדָק֣וֹת אָהֵ֑ב יָ֝שָׁ֗ר יֶחֱז֥וּ פָנֵֽימוֹ׃ {פ}`,
      translation: `To the chief Musician, of David. In the Lord I put my trust: how can you say to my soul, Flee like a bird to your mountain?\nFor, lo, the wicked bend the bow, they make ready their arrow upon the string, that they may shoot in darkness at the upright in heart.\nFor when the foundations are destroyed, what can the righteous do?\nThe Lord in his holy temple, the Lord whose throne is in heaven, whose eyes behold, whose eyelids try, the children of men:\nthe Lord tries the righteous: but the wicked and him who loves violence his soul hates.\nUpon the wicked he shall rain coals, fire and brimstone, and a scorching wind shall be the portion of their cup.\nFor the Lord is righteous, he loves righteousness; the upright shall behold his face.`,
    },
  ],
};

export const psalm12: Tefila = {
  id: "psalm-12",
  name: "Psalm 12",
  nameHe: "תהילים 12",
  category: "tehillim",
  sections: [
    {
      id: "psalm-12-text",
      title: "Psalm 12",
      titleHe: "תהילים 12",
      text: `לַמְנַצֵּ֥חַ עַֽל־הַשְּׁמִינִ֗ית מִזְמ֥וֹר לְדָוִֽד׃\nהוֹשִׁ֣יעָה יְ֭הֹוָה כִּֽי־גָמַ֣ר חָסִ֑יד כִּי־פַ֥סּוּ אֱ֝מוּנִ֗ים מִבְּנֵ֥י אָדָֽם׃\nשָׁ֤וְא׀ יְֽדַבְּרוּ֮ אִ֤ישׁ אֶת־רֵ֫עֵ֥הוּ שְׂפַ֥ת חֲלָק֑וֹת בְּלֵ֖ב וָלֵ֣ב יְדַבֵּֽרוּ׃\nיַכְרֵ֣ת יְ֭הֹוָה כׇּל־שִׂפְתֵ֣י חֲלָק֑וֹת לָ֝שׁ֗וֹן מְדַבֶּ֥רֶת גְּדֹלֽוֹת׃\nאֲשֶׁ֤ר אָמְר֨וּ׀ לִלְשֹׁנֵ֣נוּ נַ֭גְבִּיר שְׂפָתֵ֣ינוּ אִתָּ֑נוּ מִ֖י אָד֣וֹן לָֽנוּ׃\nמִשֹּׁ֥ד עֲנִיִּים֮ מֵאֶנְקַ֢ת אֶבְי֫וֹנִ֥ים עַתָּ֣ה אָ֭קוּם יֹאמַ֣ר יְהֹוָ֑ה אָשִׁ֥ית בְּ֝יֵ֗שַׁע יָפִ֥יחַֽ־לֽוֹ׃\nאִ֥מְר֣וֹת יְהֹוָה֮ אֲמָר֢וֹת טְהֹ֫ר֥וֹת כֶּ֣סֶף צָ֭רוּף בַּעֲלִ֣יל לָאָ֑רֶץ מְ֝זֻקָּ֗ק שִׁבְעָתָֽיִם׃\nאַתָּֽה־יְהֹוָ֥ה תִּשְׁמְרֵ֑ם תִּצְּרֶ֓נּוּ׀ מִן־הַדּ֖וֹר ז֣וּ לְעוֹלָֽם׃\nסָבִ֗יב רְשָׁעִ֥ים יִתְהַלָּכ֑וּן כְּרֻ֥ם זֻ֝לּ֗וּת לִבְנֵ֥י אָדָֽם׃ {פ}`,
      translation: `To the chief Musician upon the Sheminit, A Psalm of David.\nHelp, Lord; for the godly man ceases; for the faithful fail from among the children of men.\nThey speak vanity every one with his fellow: with flattering lips and with a double heart they speak.\nMay the Lord cut off all flattering lips, the tongue that speaks proud things:\nwho have said, With our tongue we will prevail; our lips are our own: who is lord over us?\nFor the violence done to the poor, for the sighing of the needy, now will I arise, says the Lord; I will set him in safety at whom they hiss.\nThe words of the Lord are pure words: silver refined in a furnace upon the ground, purified seven times.\nThou shalt keep them, O Lord, Thou shalt preserve them from this generation forever.\nThe wicked walk on every side, when vileness is exalted among the children of men.`,
    },
  ],
};

export const psalm13: Tefila = {
  id: "psalm-13",
  name: "Psalm 13",
  nameHe: "תהילים 13",
  category: "tehillim",
  sections: [
    {
      id: "psalm-13-text",
      title: "Psalm 13",
      titleHe: "תהילים 13",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\nעַד־אָ֣נָה יְ֭הֹוָה תִּשְׁכָּחֵ֣נִי נֶ֑צַח עַד־אָ֓נָה׀ תַּסְתִּ֖יר אֶת־פָּנֶ֣יךָ מִמֶּֽנִּי׃\nעַד־אָ֨נָה אָשִׁ֪ית עֵצ֡וֹת בְּנַפְשִׁ֗י יָג֣וֹן בִּלְבָבִ֣י יוֹמָ֑ם עַד־אָ֓נָה׀ יָר֖וּם אֹיְבִ֣י עָלָֽי׃\nהַבִּ֣יטָֽה עֲ֭נֵנִי יְהֹוָ֣ה אֱלֹהָ֑י הָאִ֥ירָה עֵ֝ינַ֗י פֶּן־אִישַׁ֥ן הַמָּֽוֶת׃\nפֶּן־יֹאמַ֣ר אֹיְבִ֣י יְכׇלְתִּ֑יו צָרַ֥י יָ֝גִ֗ילוּ כִּ֣י אֶמּֽוֹט׃\nוַאֲנִ֤י׀ בְּחַסְדְּךָ֣ בָטַחְתִּי֮ יָ֤גֵ֥ל לִבִּ֗י בִּישׁוּעָ֫תֶ֥ךָ אָשִׁ֥ירָה לַֽיהֹוָ֑ה כִּ֖י גָמַ֣ל עָלָֽי׃ {פ}`,
      translation: `To the chief Musician, A Psalm of David.\nHow long wilt Thou forget me O Lord? forever? how long wilt Thou hide Thy face from me?\nHow long shall I take counsel in my soul, having sorrow in my heart daily? how long shall my enemy be exalted over me?\nLook, and hear me, O Lord my God: lighten my eyes, lest I sleep the sleep of death;\nlest my enemy say, I have prevailed against him; and those who trouble me rejoice when I am moved.\nBut I have trusted in Thy mercy; my heart shall rejoice in Thy salvation. I will sing to the Lord, because he has dealt bountifully with me.`,
    },
  ],
};

export const psalm14: Tefila = {
  id: "psalm-14",
  name: "Psalm 14",
  nameHe: "תהילים 14",
  category: "tehillim",
  sections: [
    {
      id: "psalm-14-text",
      title: "Psalm 14",
      titleHe: "תהילים 14",
      text: `לַמְנַצֵּ֗חַ לְדָ֫וִ֥ד אָ֘מַ֤ר נָבָ֣ל בְּ֭לִבּוֹ אֵ֣ין אֱלֹהִ֑ים הִֽשְׁחִ֗יתוּ הִֽתְעִ֥יבוּ עֲלִילָ֗ה אֵ֣ין עֹֽשֵׂה־טֽוֹב׃\nיְֽהֹוָ֗ה מִשָּׁמַיִם֮ הִשְׁקִ֢יף עַֽל־בְּנֵי־אָ֫דָ֥ם לִ֭רְאוֹת הֲיֵ֣שׁ מַשְׂכִּ֑יל דֹּ֝רֵ֗שׁ אֶת־אֱלֹהִֽים׃\nהַכֹּ֥ל סָר֮ יַחְדָּ֢ו נֶ֫אֱלָ֥חוּ אֵ֤ין עֹֽשֵׂה־ט֑וֹב אֵ֝֗ין גַּם־אֶחָֽד׃\nהֲלֹ֥א יָדְעוּ֮ כׇּל־פֹּ֢עֲלֵ֫י אָ֥וֶן אֹכְלֵ֣י עַ֭מִּי אָ֣כְלוּ לֶ֑חֶם יְ֝הֹוָ֗ה לֹ֣א קָרָֽאוּ׃\nשָׁ֤ם׀ פָּ֣חֲדוּ פָ֑חַד כִּֽי־אֱ֝לֹהִ֗ים בְּד֣וֹר צַדִּֽיק׃\nעֲצַת־עָנִ֥י תָבִ֑ישׁוּ כִּ֖י יְהֹוָ֣ה מַחְסֵֽהוּ׃\nמִ֥י־יִתֵּ֣ן מִצִּיּוֹן֮ יְשׁוּעַ֢ת יִשְׂרָ֫אֵ֥ל בְּשׁ֣וּב יְ֭הֹוָה שְׁב֣וּת עַמּ֑וֹ יָגֵ֥ל יַ֝עֲקֹ֗ב יִשְׂמַ֥ח יִשְׂרָאֵֽל׃ {פ}`,
      translation: `To the chief Musician, of David. The fool has said in his heart, There is no God. They are corrupt, they have done abominable works, there is none that does good.\nThe Lord looked down from heaven upon the children of men, to see if there were any that understood, and sought God.\nThey are all gone aside, they are all together become filthy: there is none that does good, no, not one.\nHave all the workers of iniquity no knowledge? who eat up my people as they eat bread, and call not upon the Lord.\nThere were they in great fear: for God is in the generation of the righteous.\nYou shame the counsel of the poor, because the Lord is his refuge.\nOh that the salvation of Yisra᾽el were come out of Żiyyon! when the Lord brings back the captivity of his people, Ya῾aqov shall rejoice, and Yisra᾽el shall be glad.`,
    },
  ],
};

export const psalm15: Tefila = {
  id: "psalm-15",
  name: "Psalm 15",
  nameHe: "תהילים 15",
  category: "tehillim",
  sections: [
    {
      id: "psalm-15-text",
      title: "Psalm 15",
      titleHe: "תהילים 15",
      text: `מִזְמ֗וֹר לְדָ֫וִ֥ד יְ֭הֹוָה מִי־יָג֣וּר בְּאׇהֳלֶ֑ךָ מִֽי־יִ֝שְׁכֹּ֗ן בְּהַ֣ר קׇדְשֶֽׁךָ׃\nהוֹלֵ֣ךְ תָּ֭מִים וּפֹעֵ֥ל צֶ֑דֶק וְדֹבֵ֥ר אֱ֝מֶ֗ת בִּלְבָבֽוֹ׃\nלֹֽא־רָגַ֨ל׀ עַל־לְשֹׁנ֗וֹ לֹא־עָשָׂ֣ה לְרֵעֵ֣הוּ רָעָ֑ה וְ֝חֶרְפָּ֗ה לֹא־נָשָׂ֥א עַל־קְרֹבֽוֹ׃\nנִבְזֶ֤ה׀ בְּֽעֵ֘ינָ֤יו נִמְאָ֗ס וְאֶת־יִרְאֵ֣י יְהֹוָ֣ה יְכַבֵּ֑ד נִשְׁבַּ֥ע לְ֝הָרַ֗ע וְלֹ֣א יָמִֽר׃\nכַּסְפּ֤וֹ׀ לֹא־נָתַ֣ן בְּנֶשֶׁךְ֮ וְשֹׁ֥חַד עַל־נָקִ֗י לֹ֥א־לָ֫קָ֥ח עֹֽשֵׂה־אֵ֑לֶּה לֹ֖א יִמּ֣וֹט לְעוֹלָֽם׃ {פ}`,
      translation: `A Psalm of David. Lord, who shall abide in Thy tent? who shall dwell in Thy holy hill?\nHe that walks uprightly, and acts justly, and speaks the truth in his heart.\nHe that does not slander with his tongue, nor does evil to his fellow, nor takes up a reproach against his neighbour.\nIn whose eyes a vile person is despised; but he honours them that fear the Lord. He that swears to his own hurt, and changes not.\nHe that does not put out his money on interest, nor takes a bribe against the innocent. He that does these things shall never be moved.`,
    },
  ],
};

export const psalm16: Tefila = {
  id: "psalm-16",
  name: "Psalm 16",
  nameHe: "תהילים 16",
  category: "tehillim",
  sections: [
    {
      id: "psalm-16-text",
      title: "Psalm 16",
      titleHe: "תהילים 16",
      text: `מִכְתָּ֥ם לְדָוִ֑ד שׇֽׁמְרֵ֥נִי אֵ֝֗ל כִּֽי־חָסִ֥יתִי בָֽךְ׃\nאָמַ֣רְתְּ לַֽ֭יהֹוָה אֲדֹנָ֣י אָ֑תָּה ט֝וֹבָתִ֗י בַּל־עָלֶֽיךָ׃\nלִ֭קְדוֹשִׁים אֲשֶׁר־בָּאָ֣רֶץ הֵ֑מָּה וְ֝אַדִּירֵ֗י כׇּל־חֶפְצִי־בָֽם׃\nיִרְבּ֥וּ עַצְּבוֹתָם֮ אַחֵ֢ר מָ֫הָ֥רוּ בַּל־אַסִּ֣יךְ נִסְכֵּיהֶ֣ם מִדָּ֑ם וּֽבַל־אֶשָּׂ֥א אֶת־שְׁ֝מוֹתָ֗ם עַל־שְׂפָתָֽי׃\nיְֽהֹוָ֗ה מְנָת־חֶלְקִ֥י וְכוֹסִ֑י אַ֝תָּ֗ה תּוֹמִ֥יךְ גּוֹרָלִֽי׃\nחֲבָלִ֣ים נָֽפְלוּ־לִ֭י בַּנְּעִמִ֑ים אַף־נַ֝חֲלָ֗ת שָֽׁפְרָ֥ה עָלָֽי׃\nאֲבָרֵ֗ךְ אֶת־יְ֭הֹוָה אֲשֶׁ֣ר יְעָצָ֑נִי אַף־לֵ֝יל֗וֹת יִסְּר֥וּנִי כִלְיוֹתָֽי׃\nשִׁוִּ֬יתִי יְהֹוָ֣ה לְנֶגְדִּ֣י תָמִ֑יד כִּ֥י מִֽ֝ימִינִ֗י בַּל־אֶמּֽוֹט׃\nלָכֵ֤ן׀ שָׂמַ֣ח לִ֭בִּי וַיָּ֣גֶל כְּבוֹדִ֑י אַף־בְּ֝שָׂרִ֗י יִשְׁכֹּ֥ן לָבֶֽטַח׃\nכִּ֤י׀ לֹא־תַעֲזֹ֣ב נַפְשִׁ֣י לִשְׁא֑וֹל לֹֽא־תִתֵּ֥ן חֲ֝סִידְךָ֗ לִרְא֥וֹת שָֽׁחַת׃\nתּֽוֹדִיעֵנִי֮ אֹ֤רַח חַ֫יִּ֥ים שֹׂ֣בַע שְׂ֭מָחוֹת אֶת־פָּנֶ֑יךָ נְעִמ֖וֹת בִּימִינְךָ֣ נֶֽצַח׃ {פ}`,
      translation: `A Mikhtam of David. Preserve me, O God: for in Thee do I put my trust.\nI have said to the Lord, Thou art my Lord: I have no good apart from Thee;\nand to the saints that are on the earth, They are the excellent, in whom is all my delight.\nTheir sorrows shall be multiplied that hasten after another god: their drink offerings of blood will I not offer, nor take up their names upon my lips.\nThe Lord is the portion of my inheritance and of my cup: Thou maintainest my lot.\nThe lines are fallen to me in pleasant places; yea, I have a goodly heritage.\nI bless the Lord, who gives me counsel: my reins also admonish me in the night seasons.\nI have set the Lord always before me: surely he is at my right hand, I shall not be moved.\nTherefore my heart is glad, and my glory rejoices: my flesh also dwells secure.\nFor Thou wilt not abandon my soul to She᾽ol; nor wilt Thou suffer thy holy one to see the pit.\nThou wilt make known to me the path of life: in Thy presence is fulness of joy; at Thy right hand are pleasures for evermore.`,
    },
  ],
};

export const psalm17: Tefila = {
  id: "psalm-17",
  name: "Psalm 17",
  nameHe: "תהילים 17",
  category: "tehillim",
  sections: [
    {
      id: "psalm-17-text",
      title: "Psalm 17",
      titleHe: "תהילים 17",
      text: `תְּפִלָּ֗ה לְדָ֫וִ֥ד שִׁמְעָ֤ה יְהֹוָ֨ה׀ צֶ֗דֶק הַקְשִׁ֥יבָה רִנָּתִ֗י הַאֲזִ֥ינָה תְפִלָּתִ֑י בְּ֝לֹ֗א שִׂפְתֵ֥י מִרְמָֽה׃\nמִ֭לְּפָנֶיךָ מִשְׁפָּטִ֣י יֵצֵ֑א עֵ֝ינֶ֗יךָ תֶּחֱזֶ֥ינָה מֵישָׁרִֽים׃\nבָּ֘חַ֤נְתָּ לִבִּ֨י׀ פָּ֘קַ֤דְתָּ לַּ֗יְלָה צְרַפְתַּ֥נִי בַל־תִּמְצָ֑א זַ֝מֹּתִ֗י בַּל־יַעֲבׇר־פִּֽי׃\nלִפְעֻלּ֣וֹת אָ֭דָם בִּדְבַ֣ר שְׂפָתֶ֑יךָ אֲנִ֥י שָׁ֝מַ֗רְתִּי אׇרְח֥וֹת פָּרִֽיץ׃\nתָּמֹ֣ךְ אֲ֭שֻׁרַי בְּמַעְגְּלוֹתֶ֑יךָ בַּל־נָמ֥וֹטּוּ פְעָמָֽי׃\nאֲנִֽי־קְרָאתִ֣יךָ כִֽי־תַעֲנֵ֣נִי אֵ֑ל הַֽט־אׇזְנְךָ֥ לִ֝֗י שְׁמַ֣ע אִמְרָתִֽי׃\nהַפְלֵ֣ה חֲ֭סָדֶיךָ מוֹשִׁ֣יעַ חוֹסִ֑ים מִ֝מִּתְקוֹמְמִ֗ים בִּֽימִינֶֽךָ׃\nשׇׁ֭מְרֵנִי כְּאִישׁ֣וֹן בַּת־עָ֑יִן בְּצֵ֥ל כְּ֝נָפֶ֗יךָ תַּסְתִּירֵֽנִי׃\nמִפְּנֵ֣י רְ֭שָׁעִים ז֣וּ שַׁדּ֑וּנִי אֹיְבַ֥י בְּ֝נֶ֗פֶשׁ יַקִּ֥יפוּ עָלָֽי׃\nחֶלְבָּ֥מוֹ סָּגְר֑וּ פִּ֝֗ימוֹ דִּבְּר֥וּ בְגֵאֽוּת׃\nאַ֭שֻּׁרֵינוּ עַתָּ֣ה (סבבוני) [סְבָב֑וּנוּ] עֵינֵיהֶ֥ם יָ֝שִׁ֗יתוּ לִנְט֥וֹת בָּאָֽרֶץ׃\nדִּמְיֹנ֗וֹ כְּ֭אַרְיֵה יִכְס֣וֹף לִטְרֹ֑ף וְ֝כִכְפִ֗יר יֹשֵׁ֥ב בְּמִסְתָּרִֽים׃\nקוּמָ֤ה יְהֹוָ֗ה קַדְּמָ֣ה פָ֭נָיו הַכְרִיעֵ֑הוּ פַּלְּטָ֥ה נַ֝פְשִׁ֗י מֵרָשָׁ֥ע חַרְבֶּֽךָ׃\nמִ֥מְתִֽים־יָדְךָ֨׀ יְהֹוָ֡ה מִֽמְתִ֬ים מֵחֶ֗לֶד חֶלְקָ֥ם בַּֽחַיִּים֮ (וצפינך) [וּֽצְפוּנְךָ֮] תְּמַלֵּ֢א בִ֫טְנָ֥ם יִשְׂבְּע֥וּ בָנִ֑ים וְהִנִּ֥יחוּ יִ֝תְרָ֗ם לְעוֹלְלֵיהֶֽם׃\nאֲנִ֗י בְּ֭צֶדֶק אֶחֱזֶ֣ה פָנֶ֑יךָ אֶשְׂבְּעָ֥ה בְ֝הָקִ֗יץ תְּמוּנָתֶֽךָ׃ {פ}`,
      translation: `A Prayer of David. Hear the right, O Lord, attend to my cry, give ear to my prayer, from lips without deceit.\nLet my sentence come forth from Thy presence; let Thy eyes behold the right.\nThou hast proved my heart; Thou hast visited it in the night: Thou hast tried me, but Thou findest nothing; let no presumptuous thought pass my lips.\nConcerning the works of men, by the word of Thy lips I have kept me from the paths of the violent.\nMy steps have held fast to Thy paths; my feet have not slipped.\nI have called upon Thee, for Thou wilt hear me, O God: incline Thy ear to me, and hear my speech.\nShow marvellously Thy steadfast love, saving with Thy right hand from their enemies those who seek refuge.\nKeep me as the apple of the eye, hide me under the shadow of Thy wings,\nfrom the wicked that oppress me, from my deadly enemies, who compass me about.\nThey are inclosed in their own fat: with their mouth they speak proudly.\nThey dog our footsteps; they surround us: they set their eyes to tread us down to the earth;\nhe is like a lion greedy for its prey, and as it were a young lion lurking in secret places.\nArise, O Lord, confront him, cast him down: deliver my soul from the wicked, by Thy sword:\nfrom men, by Thy hand, O Lord, from men whose portion in life is of the world, and whose belly Thou fillest with Thy treasure: who have children in plenty, and who leave their abundance to their babes.\nAs for me, I will behold Thy face in righteousness: I shall be satisfied, when I awake, with beholding Thy likeness.`,
    },
  ],
};

export const psalm18: Tefila = {
  id: "psalm-18",
  name: "Psalm 18",
  nameHe: "תהילים 18",
  category: "tehillim",
  sections: [
    {
      id: "psalm-18-text",
      title: "Psalm 18",
      titleHe: "תהילים 18",
      text: `לַמְנַצֵּ֤חַ׀ לְעֶ֥בֶד יְהֹוָ֗ה לְדָ֫וִ֥ד אֲשֶׁ֤ר דִּבֶּ֨ר׀ לַיהֹוָ֗ה אֶת־דִּ֭בְרֵי הַשִּׁירָ֣ה הַזֹּ֑את בְּי֤וֹם הִֽצִּיל־יְהֹוָ֘ה־אוֹת֥וֹ מִכַּ֥ף כׇּל־אֹ֝יְבָ֗יו וּמִיַּ֥ד שָׁאֽוּל׃\nוַיֹּאמַ֡ר אֶרְחׇמְךָ֖ יְהֹוָ֣ה חִזְקִֽי׃\nיְהֹוָ֤ה׀ סַ֥לְעִ֥י וּמְצוּדָתִ֗י וּמְפַ֫לְטִ֥י אֵלִ֣י צ֭וּרִי אֶֽחֱסֶה־בּ֑וֹ מָֽגִנִּ֥י וְקֶֽרֶן־יִ֝שְׁעִ֗י מִשְׂגַּבִּֽי׃\nמְ֭הֻלָּל אֶקְרָ֣א יְהֹוָ֑ה וּמִן־אֹ֝יְבַ֗י אִוָּשֵֽׁעַ׃\nאֲפָפ֥וּנִי חֶבְלֵי־מָ֑וֶת וְֽנַחֲלֵ֖י בְלִיַּ֣עַל יְבַֽעֲתֽוּנִי׃\nחֶבְלֵ֣י שְׁא֣וֹל סְבָב֑וּנִי קִ֝דְּמ֗וּנִי מ֣וֹקְשֵׁי מָֽוֶת׃\nבַּצַּר־לִ֤י׀ אֶ֥קְרָ֣א יְהֹוָה֮ וְאֶל־אֱלֹהַ֢י אֲשַׁ֫וֵּ֥עַ יִשְׁמַ֣ע מֵהֵיכָל֣וֹ קוֹלִ֑י וְ֝שַׁוְעָתִ֗י לְפָנָ֤יו׀ תָּב֬וֹא בְאׇזְנָֽיו׃\nוַתִּגְעַ֬שׁ וַתִּרְעַ֨שׁ׀ הָאָ֗רֶץ וּמוֹסְדֵ֣י הָרִ֣ים יִרְגָּ֑זוּ וַ֝יִּתְגָּֽעֲשׁ֗וּ כִּי־חָ֥רָה לֽוֹ׃\nעָ֘לָ֤ה עָשָׁ֨ן׀ בְּאַפּ֗וֹ וְאֵשׁ־מִפִּ֥יו תֹּאכֵ֑ל גֶּ֝חָלִ֗ים בָּעֲר֥וּ מִמֶּֽנּוּ׃\nוַיֵּ֣ט שָׁ֭מַיִם וַיֵּרַ֑ד וַ֝עֲרָפֶ֗ל תַּ֣חַת רַגְלָֽיו׃\nוַיִּרְכַּ֣ב עַל־כְּ֭רוּב וַיָּעֹ֑ף וַ֝יֵּ֗דֶא עַל־כַּנְפֵי־רֽוּחַ׃\nיָ֤שֶׁת־חֹ֨שֶׁךְ׀ סִתְר֗וֹ סְבִֽיבוֹתָ֥יו סֻכָּת֑וֹ חֶשְׁכַת־מַ֝֗יִם עָבֵ֥י שְׁחָקִֽים׃\nמִנֹּ֗גַהּ נֶ֫גְדּ֥וֹ עָבָ֥יו עָבְר֑וּ בָּ֝רָ֗ד וְגַֽחֲלֵי־אֵֽשׁ׃\nוַיַּרְעֵ֬ם בַּשָּׁמַ֨יִם׀ יְֽהֹוָ֗ה וְ֭עֶלְיוֹן יִתֵּ֣ן קֹל֑וֹ בָּ֝רָ֗ד וְגַֽחֲלֵי־אֵֽשׁ׃\nוַיִּשְׁלַ֣ח חִ֭צָּיו וַיְפִיצֵ֑ם וּבְרָקִ֥ים רָ֝֗ב וַיְהֻמֵּֽם׃\nוַיֵּ֤רָא֨וּ׀ אֲפִ֥יקֵי מַ֗יִם וַֽיִּגָּלוּ֮ מוֹסְד֢וֹת תֵּ֫בֵ֥ל מִגַּעֲרָ֣תְךָ֣ יְהֹוָ֑ה מִ֝נִּשְׁמַ֗ת ר֣וּחַ אַפֶּֽךָ׃\nיִשְׁלַ֣ח מִ֭מָּרוֹם יִקָּחֵ֑נִי יַֽ֝מְשֵׁ֗נִי מִמַּ֥יִם רַבִּֽים׃\nיַצִּילֵ֗נִי מֵאֹיְבִ֥י עָ֑ז וּ֝מִשֹּׂנְאַ֗י כִּֽי־אָמְצ֥וּ מִמֶּֽנִּי׃\nיְקַדְּמ֥וּנִי בְיוֹם־אֵידִ֑י וַֽיְהִי־יְהֹוָ֖ה לְמִשְׁעָ֣ן לִֽי׃\nוַיּוֹצִיאֵ֥נִי לַמֶּרְחָ֑ב יְ֝חַלְּצֵ֗נִי כִּ֘י־חָ֥פֵֽץ־בִּֽי׃\nיִגְמְלֵ֣נִי יְהֹוָ֣ה כְּצִדְקִ֑י כְּבֹ֥ר יָ֝דַ֗י יָשִׁ֥יב לִֽי׃\nכִּֽי־שָׁ֭מַרְתִּי דַּרְכֵ֣י יְהֹוָ֑ה וְלֹֽא־רָ֝שַׁ֗עְתִּי מֵאֱלֹהָֽי׃\nכִּ֣י כׇל־מִשְׁפָּטָ֣יו לְנֶגְדִּ֑י וְ֝חֻקֹּתָ֗יו לֹא־אָסִ֥יר מֶֽנִּי׃\nוָאֱהִ֣י תָמִ֣ים עִמּ֑וֹ וָ֝אֶשְׁתַּמֵּ֗ר מֵעֲוֺנִֽי׃\nוַיָּֽשֶׁב־יְהֹוָ֣ה לִ֣י כְצִדְקִ֑י כְּבֹ֥ר יָ֝דַ֗י לְנֶ֣גֶד עֵינָֽיו׃\nעִם־חָסִ֥יד תִּתְחַסָּ֑ד עִם־גְּבַ֥ר תָּ֝מִ֗ים תִּתַּמָּֽם׃\nעִם־נָבָ֥ר תִּתְבָּרָ֑ר וְעִם־עִ֝קֵּ֗שׁ תִּתְפַּתָּֽל׃\nכִּֽי־אַ֭תָּה עַם־עָנִ֣י תוֹשִׁ֑יעַ וְעֵינַ֖יִם רָמ֣וֹת תַּשְׁפִּֽיל׃\nכִּֽי־אַ֭תָּה תָּאִ֣יר נֵרִ֑י יְהֹוָ֥ה אֱ֝לֹהַ֗י יַגִּ֥יהַּ חׇשְׁכִּֽי׃\nכִּֽי־בְ֭ךָ אָרֻ֣ץ גְּד֑וּד וּ֝בֵֽאלֹהַ֗י אֲדַלֶּג־שֽׁוּר׃\nהָאֵל֮ תָּמִ֢ים דַּ֫רְכּ֥וֹ אִמְרַֽת־יְהֹוָ֥ה צְרוּפָ֑ה מָגֵ֥ן ה֝֗וּא לְכֹ֤ל׀ הַחֹסִ֬ים בּֽוֹ׃\nכִּ֤י מִ֣י אֱ֭לוֹהַּ מִבַּלְעֲדֵ֣י יְהֹוָ֑ה וּמִ֥י צ֝֗וּר זוּלָתִ֥י אֱלֹהֵֽינוּ׃\nהָ֭אֵל הַמְאַזְּרֵ֣נִי חָ֑יִל וַיִּתֵּ֖ן תָּמִ֣ים דַּרְכִּֽי׃\nמְשַׁוֶּ֣ה רַ֭גְלַי כָּאַיָּל֑וֹת וְעַ֥ל בָּ֝מֹתַ֗י יַעֲמִידֵֽנִי׃\nמְלַמֵּ֣ד יָ֭דַי לַמִּלְחָמָ֑ה וְֽנִחֲתָ֥ה קֶֽשֶׁת־נְ֝חוּשָׁ֗ה זְרוֹעֹתָֽי׃\nוַתִּתֶּן־לִי֮ מָגֵ֢ן יִ֫שְׁעֶ֥ךָ וִֽימִינְךָ֥ תִסְעָדֵ֑נִי וְֽעַנְוַתְךָ֥ תַרְבֵּֽנִי׃\nתַּרְחִ֣יב צַעֲדִ֣י תַחְתָּ֑י וְלֹ֥א מָ֝עֲד֗וּ קַרְסֻלָּֽי׃\nאֶרְדּ֣וֹף א֭וֹיְבַי וְאַשִּׂיגֵ֑ם וְלֹֽא־אָ֝שׁ֗וּב עַד־כַּלּוֹתָֽם׃\nאֶ֭מְחָצֵם וְלֹא־יֻ֣כְלוּ ק֑וּם יִ֝פְּל֗וּ תַּ֣חַת רַגְלָֽי׃\nוַתְּאַזְּרֵ֣נִי חַ֭יִל לַמִּלְחָמָ֑ה תַּכְרִ֖יעַ קָמַ֣י תַּחְתָּֽי׃\nוְֽאֹיְבַ֗י נָתַ֣תָּה לִּ֣י עֹ֑רֶף וּ֝מְשַׂנְאַ֗י אַצְמִיתֵֽם׃\nיְשַׁוְּע֥וּ וְאֵין־מוֹשִׁ֑יעַ עַל־יְ֝הֹוָ֗ה וְלֹ֣א עָנָֽם׃\nוְֽאֶשְׁחָקֵ֗ם כְּעָפָ֥ר עַל־פְּנֵי־ר֑וּחַ כְּטִ֖יט חוּצ֣וֹת אֲרִיקֵֽם׃\nתְּפַלְּטֵנִי֮ מֵרִ֢יבֵ֫י עָ֥ם תְּ֭שִׂימֵנִי לְרֹ֣אשׁ גּוֹיִ֑ם עַ֖ם לֹא־יָדַ֣עְתִּי יַֽעַבְדֽוּנִי׃\nלְשֵׁ֣מַֽע אֹ֭זֶן יִשָּׁ֣מְעוּ לִ֑י בְּנֵֽי־נֵ֝כָ֗ר יְכַחֲשׁוּ־לִֽי׃\nבְּנֵי־נֵכָ֥ר יִבֹּ֑לוּ וְ֝יַחְרְג֗וּ מִֽמִּסְגְּרֽוֹתֵיהֶֽם׃\nחַי־יְ֭הֹוָה וּבָר֣וּךְ צוּרִ֑י וְ֝יָר֗וּם אֱלוֹהֵ֥י יִשְׁעִֽי׃\nהָאֵ֗ל הַנּוֹתֵ֣ן נְקָמ֣וֹת לִ֑י וַיַּדְבֵּ֖ר עַמִּ֣ים תַּחְתָּֽי׃\nמְפַלְּטִ֗י מֵאֹ֫יְבָ֥י אַ֣ף מִן־קָ֭מַי תְּרוֹמְמֵ֑נִי מֵאִ֥ישׁ חָ֝מָ֗ס תַּצִּילֵֽנִי׃\nעַל־כֵּ֤ן׀ אוֹדְךָ֖ בַגּוֹיִ֥ם׀יְהֹוָ֑ה וּלְשִׁמְךָ֥ אֲזַמֵּֽרָה׃\nמַגְדִּל֮ יְשׁוּע֢וֹת מַ֫לְכּ֥וֹ וְעֹ֤שֶׂה חֶ֨סֶד׀ לִמְשִׁיח֗וֹ לְדָוִ֥ד וּלְזַרְע֗וֹ עַד־עוֹלָֽם׃ {פ}`,
      translation: `To the chief Musician, of David, the servant of the Lord, who spoke to the Lord the words of this song in the day that the Lord delivered him from the hand of all his enemies, and from the hand of Sha᾽ul:\nand he said, I will love Thee, O Lord, my strength.\nThe Lord is my rock, and my fortress, and my deliverer; my God, my rock, in whom I will trust; my shield, and the horn of my salvation, and my high tower.\nHe is worthy to be praised: I will call upon the Lord: so shall I be saved from my enemies.\nThe bonds of death encircled me, and the floods of ungodly men made me afraid.\nThe cords of She᾽ol compassed me about: the snares of death took me by surprise.\nIn my distress I called upon the Lord, and cried to my God: he heard my voice out of his temple, and my cry came before him, into his ears.\nThen the earth shook and trembled; and the foundations of the hills moved and were shaken, because of his anger.\nThere went up a smoke out of his nostrils, and fire out of his mouth devoured: coals were kindled by it.\nHe bowed the heavens also, and came down: and darkness was under his feet.\nAnd he rode upon a keruv, and did fly: he soared on the wings of the wind.\nHe made darkness his secret place; his pavilion round about him was dark water and thick clouds of the skies.\nAt the brightness that was before him his thick clouds passed, hail and coals of fire.\nThe Lord also thundered in the heavens, and the Highest gave his voice; hail and coals of fire.\nAnd he sent out his arrows, and scattered them; and he shot out lightnings, and confounded them.\nThen the channels of waters were seen, and the foundations of the world were laid bare, at Thy rebuke, O Lord, at the blast of the breath of Thy nostrils.\nHe sent from above, he took me, he drew me out of many waters.\nHe delivered me from my strong enemy, and from those who hated me: for they were too strong for me.\nThey surprised me in the day of my calamity: but the Lord was my stay.\nHe brought me forth also into a large place; he delivered me, because he delighted in me.\nThe Lord rewards me according to my righteousness; according to the cleanness of my hands he recompenses me.\nFor I have kept the ways of the Lord, and have not wickedly departed from my God.\nFor all his judgments were before me, and I did not put away his statutes from me.\nI was also upright before him, and I kept myself from my iniquity.\nTherefore the Lord recompenses me according to my righteousness, according to the cleanness of my hands in his eyesight.\nWith the merciful Thou wilt show Thyself merciful; with an upright man Thou wilt show Thyself upright;\nwith the pure Thou wilt show Thyself pure; and with the perverse Thou wilt show Thyself subtle.\nFor Thou wilt save the afflicted people; but wilt bring down high looks.\nFor Thou wilt light my candle: the Lord my God will enlighten my darkness.\nFor by Thee I run through a troop; and by my God I leap over a wall.\nAs for God, his way is perfect: the word of the Lord is tried: he is a shield to all those who trust in him.\nFor who is God save the Lord? or who is a rock save our God?\nIt is God that girds me with strength, and makes my way perfect.\nHe makes my feet like hinds’ feet, and sets me upon my heights.\nHe teaches my hands to war, so that a bow of brass is bent in my arms.\nThou hast also given me the shield of Thy salvation: and Thy right hand has supported me and Thy condescension has made me great.\nThou hast enlarged my steps under me, that my feet did not slip.\nI have pursued my enemies, and overtaken them: neither did I turn back till they were consumed.\nI have crushed them so that they were not able to rise: they are fallen under my feet.\nFor Thou hast girded me with strength to the battle: Thou hast subdued under me those who rose up against me.\nThou hast also made my enemies turn their backs on me; that I might destroy those who hate me.\nThey cried, but there was none to save them: to the Lord, but he answered them not.\nThen did I beat them small like the dust before the wind: I did cast them out like the dirt in the streets.\nThou deliverest me from the strivings of the people; Thou makest me the head of nations: a people whom I have not known shall serve me.\nAs soon as they hear of me, they shall obey me: the strangers shall submit themselves to me.\nThe strangers shall fade away, and come trembling out of their close places.\nThe Lord lives; and blessed is my rock; and let the God of my salvation be exalted.\nIt is God who avenges me, and has subdued peoples under me.\nHe delivers me from my enemies: indeed, thou liftest me up above those who rise up against me: Thou deliverest me from the violent man.\nTherefore will I give thanks to Thee, O Lord, among the nations, and sing praises to Thy name.\nGreat deliverance he gives to his king; and shows steadfast love to his anointed, to David, and to his seed for evermore.`,
    },
  ],
};

export const psalm19: Tefila = {
  id: "psalm-19",
  name: "Psalm 19",
  nameHe: "תהילים 19",
  category: "tehillim",
  sections: [
    {
      id: "psalm-19-text",
      title: "Psalm 19",
      titleHe: "תהילים 19",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\nהַשָּׁמַ֗יִם מְֽסַפְּרִ֥ים כְּבֽוֹד־אֵ֑ל וּֽמַעֲשֵׂ֥ה יָ֝דָ֗יו מַגִּ֥יד הָרָקִֽיעַ׃\nי֣וֹם לְ֭יוֹם יַבִּ֣יעַֽ אֹ֑מֶר וְלַ֥יְלָה לְּ֝לַ֗יְלָה יְחַוֶּה־דָּֽעַת׃\nאֵֽין־אֹ֭מֶר וְאֵ֣ין דְּבָרִ֑ים בְּ֝לִ֗י נִשְׁמָ֥ע קוֹלָֽם׃\nבְּכׇל־הָאָ֨רֶץ׀ יָ֘צָ֤א קַוָּ֗ם וּבִקְצֵ֣ה תֵ֭בֵל מִלֵּיהֶ֑ם לַ֝שֶּׁ֗מֶשׁ שָֽׂם־אֹ֥הֶל בָּהֶֽם׃\nוְה֗וּא כְּ֭חָתָן יֹצֵ֣א מֵחֻפָּת֑וֹ יָשִׂ֥ישׂ כְּ֝גִבּ֗וֹר לָר֥וּץ אֹֽרַח׃\nמִקְצֵ֤ה הַשָּׁמַ֨יִם׀ מֽוֹצָא֗וֹ וּתְקוּפָת֥וֹ עַל־קְצוֹתָ֑ם וְאֵ֥ין נִ֝סְתָּ֗ר מֵחַמָּתֽוֹ׃\nתּ֘וֹרַ֤ת יְהֹוָ֣ה תְּ֭מִימָה מְשִׁ֣יבַת נָ֑פֶשׁ עֵד֥וּת יְהֹוָ֥ה נֶ֝אֱמָנָ֗ה מַחְכִּ֥ימַת פֶּֽתִי׃\nפִּקּ֘וּדֵ֤י יְהֹוָ֣ה יְ֭שָׁרִים מְשַׂמְּחֵי־לֵ֑ב מִצְוַ֥ת יְהֹוָ֥ה בָּ֝רָ֗ה מְאִירַ֥ת עֵינָֽיִם׃\nיִרְאַ֤ת יְהֹוָ֨ה׀ טְהוֹרָה֮ עוֹמֶ֢דֶת לָ֫עַ֥ד מִֽשְׁפְּטֵי־יְהֹוָ֥ה אֱמֶ֑ת צָֽדְק֥וּ יַחְדָּֽו׃\nהַֽנֶּחֱמָדִ֗ים מִ֭זָּהָב וּמִפַּ֣ז רָ֑ב וּמְתוּקִ֥ים מִ֝דְּבַ֗שׁ וְנֹ֣פֶת צוּפִֽים׃\nגַּֽם־עַ֭בְדְּךָ נִזְהָ֣ר בָּהֶ֑ם בְּ֝שׇׁמְרָ֗ם עֵ֣קֶב רָֽב׃\nשְׁגִיא֥וֹת מִֽי־יָבִ֑ין מִֽנִּסְתָּר֥וֹת נַקֵּֽנִי׃\nגַּ֤ם מִזֵּדִ֨ים׀ חֲשֹׂ֬ךְ עַבְדֶּ֗ךָ אַֽל־יִמְשְׁלוּ־בִ֣י אָ֣ז אֵיתָ֑ם וְ֝נִקֵּ֗יתִי מִפֶּ֥שַֽׁע רָֽב׃\nיִ֥הְיֽוּ־לְרָצ֨וֹן׀ אִמְרֵי־פִ֡י וְהֶגְי֣וֹן לִבִּ֣י לְפָנֶ֑יךָ יְ֝הֹוָ֗ה צוּרִ֥י וְגֹאֲלִֽי׃ {פ}`,
      translation: `To the chief Musician, A Psalm of David.\nThe heavens declare the glory of God; and the firmament proclaims his handiwork.\nDay to day utters speech, and night to night expresses knowledge.\nThere is no speech nor are there words; their voice is not heard.\nTheir line is gone out through all the earth, and their words to the end of the world. In them he has set a tent for the sun,\nwhich is like a bridegroom coming out of his chamber, and rejoices like a strong man to run a race.\nHis going forth is from the end of the heaven, and his circuit to the ends of it: and there is nothing hid from his heat.\nThe Tora of the Lord is perfect, restoring the soul: the testimony of the Lord is sure, making wise the simple.\nThe statutes of the Lord are right, rejoicing the heart: the commandment of the Lord is pure, enlightening the eyes.\nThe fear of the Lord is clean, enduring forever: the judgments of the Lord are true and are righteous altogether.\nMore to be desired are they than gold, even much fine gold: sweeter also than honey and the honeycomb.\nMoreover by them is Thy servant enlightened: and in keeping of them there is great reward.\nWho can discern errors? cleanse Thou me from secret faults.\nKeep back Thy servant also from presumptuous sins; let them not have dominion over me: then shall I be upright, and I shall be clear of much transgression.\nLet the words of my mouth, and the meditation of my heart, be acceptable in Thy sight, O Lord, my rock, and my redeemer.`,
    },
  ],
};

export const psalm20: Tefila = {
  id: "psalm-20",
  name: "Psalm 20",
  nameHe: "תהילים 20",
  category: "tehillim",
  sections: [
    {
      id: "psalm-20-text",
      title: "Psalm 20",
      titleHe: "תהילים 20",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\nיַֽעַנְךָ֣ יְ֭הֹוָה בְּי֣וֹם צָרָ֑ה יְ֝שַׂגֶּבְךָ֗ שֵׁ֤ם׀ אֱלֹהֵ֬י יַעֲקֹֽב׃\nיִשְׁלַֽח־עֶזְרְךָ֥ מִקֹּ֑דֶשׁ וּ֝מִצִּיּ֗וֹן יִסְעָדֶֽךָּ׃\nיִזְכֹּ֥ר כׇּל־מִנְחֹתֶ֑ךָ וְעוֹלָתְךָ֖ יְדַשְּׁנֶ֣ה סֶֽלָה׃\nיִֽתֶּן־לְךָ֥ כִלְבָבֶ֑ךָ וְֽכׇל־עֲצָתְךָ֥ יְמַלֵּֽא׃\nנְרַנְּנָ֤ה׀ בִּ֘ישׁ֤וּעָתֶ֗ךָ וּבְשֵֽׁם־אֱלֹהֵ֥ינוּ נִדְגֹּ֑ל יְמַלֵּ֥א יְ֝הֹוָ֗ה כׇּל־מִשְׁאֲלוֹתֶֽיךָ׃\nעַתָּ֤ה יָדַ֗עְתִּי כִּ֤י הוֹשִׁ֥יעַ׀יְהֹוָ֗ה מְשִׁ֫יח֥וֹ יַ֭עֲנֵהוּ מִשְּׁמֵ֣י קׇדְשׁ֑וֹ בִּ֝גְבֻר֗וֹת יֵ֣שַׁע יְמִינֽוֹ׃\nאֵ֣לֶּה בָ֭רֶכֶב וְאֵ֣לֶּה בַסּוּסִ֑ים וַאֲנַ֓חְנוּ׀ בְּשֵׁם־יְהֹוָ֖ה אֱלֹהֵ֣ינוּ נַזְכִּֽיר׃\nהֵ֭מָּה כָּרְע֣וּ וְנָפָ֑לוּ וַאֲנַ֥חְנוּ קַּ֝֗מְנוּ וַנִּתְעוֹדָֽד׃\nיְהֹוָ֥ה הוֹשִׁ֑יעָה הַ֝מֶּ֗לֶךְ יַעֲנֵ֥נוּ בְיוֹם־קׇרְאֵֽנוּ׃ {פ}`,
      translation: `To the chief Musician, A Psalm for David.\nMay the Lord hear thee in the day of trouble; may the name of the God of Ya῾aqov defend thee!\nMay he send thee help from the sanctuary, and strengthen thee out of Żiyyon!\nMay he remember all thy offerings, and accept with favour thy burnt offering! (Sela.)\nMay he grant thee thy heart’s desire, and fulfil all thy counsel!\nMay we rejoice in Thy salvation, and in the name of our God set up our banner! Let the Lord fulfil all thy petitions!\nNow I know that the Lord saves his anointed; that he answers him from his holy heaven with the saving strength of his right hand.\nSome trust in chariots, and some in horses: but we will make mention of the name of the Lord our God.\nThey are bowed down and fallen: but we are risen, and stand upright.\nSave, Lord; O King, who hears us on the day when we call.`,
    },
  ],
};

export const psalm21: Tefila = {
  id: "psalm-21",
  name: "Psalm 21",
  nameHe: "תהילים 21",
  category: "tehillim",
  sections: [
    {
      id: "psalm-21-text",
      title: "Psalm 21",
      titleHe: "תהילים 21",
      text: `לַמְנַצֵּ֗חַ מִזְמ֥וֹר לְדָוִֽד׃\nיְֽהֹוָ֗ה בְּעׇזְּךָ֥ יִשְׂמַח־מֶ֑לֶךְ וּ֝בִישׁ֥וּעָתְךָ֗ מַה־[יָּ֥גֶל] (יגיל) מְאֹֽד׃\nתַּאֲוַ֣ת לִ֭בּוֹ נָתַ֣תָּה לּ֑וֹ וַאֲרֶ֥שֶׁת שְׂ֝פָתָ֗יו בַּל־מָנַ֥עְתָּ סֶּֽלָה׃\nכִּֽי־תְ֭קַדְּמֶנּוּ בִּרְכ֣וֹת ט֑וֹב תָּשִׁ֥ית לְ֝רֹאשׁ֗וֹ עֲטֶ֣רֶת פָּֽז׃\nחַיִּ֤ים׀ שָׁאַ֣ל מִ֭מְּךָ נָתַ֣תָּה לּ֑וֹ אֹ֥רֶךְ יָ֝מִ֗ים עוֹלָ֥ם וָעֶֽד׃\nגָּד֣וֹל כְּ֭בוֹדוֹ בִּישׁוּעָתֶ֑ךָ ה֥וֹד וְ֝הָדָ֗ר תְּשַׁוֶּ֥ה עָלָֽיו׃\nכִּֽי־תְשִׁיתֵ֣הוּ בְרָכ֣וֹת לָעַ֑ד תְּחַדֵּ֥הוּ בְ֝שִׂמְחָ֗ה אֶת־פָּנֶֽיךָ׃\nכִּֽי־הַ֭מֶּלֶךְ בֹּטֵ֣חַ בַּיהֹוָ֑ה וּבְחֶ֥סֶד עֶ֝לְי֗וֹן בַּל־יִמּֽוֹט׃\nתִּמְצָ֣א יָ֭דְךָ לְכׇל־אֹיְבֶ֑יךָ יְ֝מִֽינְךָ֗ תִּמְצָ֥א שֹׂנְאֶֽיךָ׃\nתְּשִׁיתֵ֤מוֹ׀ כְּתַנּ֥וּר אֵשׁ֮ לְעֵ֢ת פָּ֫נֶ֥יךָ יְ֭הֹוָה בְּאַפּ֣וֹ יְבַלְּעֵ֑ם וְֽתֹאכְלֵ֥ם אֵֽשׁ׃\nפִּ֭רְיָמוֹ מֵאֶ֣רֶץ תְּאַבֵּ֑ד וְ֝זַרְעָ֗ם מִבְּנֵ֥י אָדָֽם׃\nכִּי־נָט֣וּ עָלֶ֣יךָ רָעָ֑ה חָֽשְׁב֥וּ מְ֝זִמָּ֗ה בַּל־יוּכָֽלוּ׃\nכִּ֭י תְּשִׁיתֵ֣מוֹ שֶׁ֑כֶם בְּ֝מֵֽיתָרֶ֗יךָ תְּכוֹנֵ֥ן עַל־פְּנֵיהֶֽם׃\nר֣וּמָה יְהֹוָ֣ה בְּעֻזֶּ֑ךָ נָשִׁ֥ירָה וּֽ֝נְזַמְּרָ֗ה גְּבוּרָתֶֽךָ׃ {פ}`,
      translation: `To the chief Musicians, A Psalm of David.\nThe king joys in Thy strength, O Lord; and in Thy salvation how greatly he rejoices!\nThou hast given him his heart’s desire, and hast not withheld the request of his lips. (Sela.)\nFor Thou dost meet him with the blessings of goodness: Thou settest a crown of pure gold on his head.\nHe asked life of Thee, and Thou didst give it him; length of days for ever and ever.\nHis glory is great in Thy salvation: honour and majesty Thou dost lay upon him.\nFor Thou dost make him most blessed forever: Thou makest him exceeding glad with Thy countenance.\nFor the king trusts in the Lord, and through the steadfast love of the most High he shall not be moved.\nThy hand shall find out all Thy enemies: Thy right hand shall seize those that hate Thee.\nThou shalt make them like a fiery oven in the time of Thy anger: the Lord shall swallow them up in his wrath, and the fire shall devour them.\nTheir fruit shalt Thou destroy from the earth, and their seed from among the children of men.\nFor they intended evil against Thee: they imagined a mischievous device, but they will not succeed.\nFor Thou shalt make them turn their back; Thou shalt aim Thy bowstrings against the face of them.\nBe Thou exalted, Lord, in Thy own strength: we will sing and praise Thy power.`,
    },
  ],
};

export const psalm22: Tefila = {
  id: "psalm-22",
  name: "Psalm 22",
  nameHe: "תהילים 22",
  category: "tehillim",
  sections: [
    {
      id: "psalm-22-text",
      title: "Psalm 22",
      titleHe: "תהילים 22",
      text: `לַ֭מְנַצֵּחַ עַל־אַיֶּ֥לֶת הַשַּׁ֗חַר מִזְמ֥וֹר לְדָוִֽד׃\nאֵלִ֣י אֵ֭לִי לָמָ֣ה עֲזַבְתָּ֑נִי רָח֥וֹק מִֽ֝ישׁוּעָתִ֗י דִּבְרֵ֥י שַׁאֲגָתִֽי׃\nאֱֽלֹהַ֗י אֶקְרָ֣א י֭וֹמָם וְלֹ֣א תַעֲנֶ֑ה וְ֝לַ֗יְלָה וְֽלֹא־דֻֽמִיָּ֥ה לִֽי׃\nוְאַתָּ֥ה קָד֑וֹשׁ י֝וֹשֵׁ֗ב תְּהִלּ֥וֹת יִשְׂרָאֵֽל׃\nבְּ֭ךָ בָּטְח֣וּ אֲבֹתֵ֑ינוּ בָּ֝טְח֗וּ וַֽתְּפַלְּטֵֽמוֹ׃\nאֵלֶ֣יךָ זָעֲק֣וּ וְנִמְלָ֑טוּ בְּךָ֖ בָטְח֣וּ וְלֹא־בֽוֹשׁוּ׃\nוְאָנֹכִ֣י תוֹלַ֣עַת וְלֹא־אִ֑ישׁ חֶרְפַּ֥ת אָ֝דָ֗ם וּבְז֥וּי עָֽם׃\nכׇּל־רֹ֭אַי יַלְעִ֣גוּ לִ֑י יַפְטִ֥ירוּ בְ֝שָׂפָ֗ה יָנִ֥יעוּ רֹֽאשׁ׃\nגֹּ֣ל אֶל־יְהֹוָ֣ה יְפַלְּטֵ֑הוּ יַ֝צִּילֵ֗הוּ כִּ֘י־חָ֥פֵֽץ־בּֽוֹ׃\nכִּֽי־אַתָּ֣ה גֹחִ֣י מִבָּ֑טֶן מַ֝בְטִיחִ֗י עַל־שְׁדֵ֥י אִמִּֽי׃\nעָ֭לֶיךָ הׇשְׁלַ֣כְתִּי מֵרָ֑חֶם מִבֶּ֥טֶן אִ֝מִּ֗י אֵ֣לִי אָֽתָּה׃\nאַל־תִּרְחַ֣ק מִ֭מֶּנִּי כִּי־צָרָ֣ה קְרוֹבָ֑ה כִּי־אֵ֥ין עוֹזֵֽר׃\nסְ֭בָבוּנִי פָּרִ֣ים רַבִּ֑ים אַבִּירֵ֖י בָשָׁ֣ן כִּתְּרֽוּנִי׃\nפָּצ֣וּ עָלַ֣י פִּיהֶ֑ם אַ֝רְיֵ֗ה טֹרֵ֥ף וְשֹׁאֵֽג׃\nכַּמַּ֥יִם נִשְׁפַּכְתִּי֮ וְהִתְפָּֽרְד֗וּ כׇּֽל־עַצְמ֫וֹתָ֥י הָיָ֣ה לִ֭בִּי כַּדּוֹנָ֑ג נָ֝מֵ֗ס בְּת֣וֹךְ מֵעָֽי׃\nיָ֘בֵ֤שׁ כַּחֶ֨רֶשׂ׀ כֹּחִ֗י וּ֭לְשׁוֹנִי מֻדְבָּ֣ק מַלְקוֹחָ֑י וְֽלַעֲפַר־מָ֥וֶת תִּשְׁפְּתֵֽנִי׃\nכִּ֥י סְבָב֗וּנִי כְּלָ֫בִ֥ים עֲדַ֣ת מְ֭רֵעִים הִקִּיפ֑וּנִי כָּ֝אֲרִ֗י יָדַ֥י וְרַגְלָֽי׃\nאֲסַפֵּ֥ר כׇּל־עַצְמוֹתָ֑י הֵ֥מָּה יַ֝בִּ֗יטוּ יִרְאוּ־בִֽי׃\nיְחַלְּק֣וּ בְגָדַ֣י לָהֶ֑ם וְעַל־לְ֝בוּשִׁ֗י יַפִּ֥ילוּ גוֹרָֽל׃\nוְאַתָּ֣ה יְ֭הֹוָה אַל־תִּרְחָ֑ק אֱ֝יָלוּתִ֗י לְעֶזְרָ֥תִי חֽוּשָׁה׃\nהַצִּ֣ילָה מֵחֶ֣רֶב נַפְשִׁ֑י מִיַּד־כֶּ֝֗לֶב יְחִידָתִֽי׃\nה֭וֹשִׁיעֵנִי מִפִּ֣י אַרְיֵ֑ה וּמִקַּרְנֵ֖י רֵמִ֣ים עֲנִיתָֽנִי׃\nאֲסַפְּרָ֣ה שִׁמְךָ֣ לְאֶחָ֑י בְּת֖וֹךְ קָהָ֣ל אֲהַלְלֶֽךָּ׃\nיִרְאֵ֤י יְהֹוָ֨ה׀ הַֽלְל֗וּהוּ כׇּל־זֶ֣רַע יַעֲקֹ֣ב כַּבְּד֑וּהוּ וְג֥וּרוּ מִ֝מֶּ֗נּוּ כׇּל־זֶ֥רַע יִשְׂרָאֵֽל׃\nכִּ֤י לֹֽא־בָזָ֨ה וְלֹ֪א שִׁקַּ֡ץ עֱנ֬וּת עָנִ֗י וְלֹא־הִסְתִּ֣יר פָּנָ֣יו מִמֶּ֑נּוּ וּֽבְשַׁוְּע֖וֹ אֵלָ֣יו שָׁמֵֽעַ׃\nמֵ֥אִתְּךָ֗ תְּֽהִלָּ֫תִ֥י בְּקָהָ֥ל רָ֑ב נְדָרַ֥י אֲ֝שַׁלֵּ֗ם נֶ֣גֶד יְרֵאָֽיו׃\nיֹאכְל֬וּ עֲנָוִ֨ים׀ וְיִשְׂבָּ֗עוּ יְהַֽלְל֣וּ יְ֭הֹוָה דֹּ֣רְשָׁ֑יו יְחִ֖י לְבַבְכֶ֣ם לָעַֽד׃\nיִזְכְּר֤וּ׀ וְיָשֻׁ֣בוּ אֶל־יְ֭הֹוָה כׇּל־אַפְסֵי־אָ֑רֶץ וְיִֽשְׁתַּחֲו֥וּ לְ֝פָנֶ֗יךָ כׇּֽל־מִשְׁפְּח֥וֹת גּוֹיִֽם׃\nכִּ֣י לַ֭יהֹוָה הַמְּלוּכָ֑ה וּ֝מֹשֵׁ֗ל בַּגּוֹיִֽם׃\nאָכְל֬וּ וַיִּֽשְׁתַּחֲו֨וּ׀ כׇּֽל־דִּשְׁנֵי־אֶ֗רֶץ לְפָנָ֣יו יִ֭כְרְעוּ כׇּל־יוֹרְדֵ֣י עָפָ֑ר וְ֝נַפְשׁ֗וֹ לֹ֣א חִיָּֽה׃\nזֶ֥רַע יַֽעַבְדֶ֑נּוּ יְסֻפַּ֖ר לַֽאדֹנָ֣י לַדּֽוֹר׃\nיָ֭בֹאוּ וְיַגִּ֣ידוּ צִדְקָת֑וֹ לְעַ֥ם נ֝וֹלָ֗ד כִּ֣י עָשָֽׂה׃ {פ}`,
      translation: `To the chief Musician upon Ayyelet-hashshaĥar, A Psalm of David.\nMy God, my God, why hast Thou forsaken me? why art Thou so far from helping me, from the words of my loud complaint?\nO my God, I cry in the daytime, but Thou hearest not; and in the night season, and I have no rest.\nBut Thou art holy, O Thou That art enthroned upon the praises of Yisra᾽el.\nOur fathers trusted in Thee: they trusted, and Thou didst deliver them.\nThey cried to Thee, and were delivered: they trusted in Thee, and were not confounded.\nBut I am a worm, and no man; a reproach of men, and despised of the people.\nAll that see me laugh me to scorn: they shoot out the lip, they shake the head,\nsaying, He trusts in the Lord that he will deliver him! Let him deliver him, seeing he delights in him.\nBut Thou art he that took me out of the womb: Thou didst make me hope when I was upon my mother’s breasts.\nI was cast upon Thee from the womb: Thou art my God from my mother’s belly.\nBe not far from me; for trouble is near; for there is none to help.\nMany bulls have compassed me: strong bulls of Bashan have beset me round.\nThey gape upon me with their mouths, like a ravening and a roaring lion.\nI am poured out like water, and all my bones are out of joint: my heart is become like wax; it is melted in the midst of my bowels.\nMy strength is dried up like a potsherd; and my tongue cleaves to my jaws; and Thou layest me down in the dust of death.\nFor dogs have compassed me: the assembly of the wicked have inclosed me: they seize my hands and my feet like a lion.\nI can count all my bones: they look and stare upon me.\nThey part my garments among them, and cast lots upon my vesture.\nBut be not Thou far from me, O Lord: O my strength, haste Thee to help me.\nDeliver my life from the sword; my only one from the power of the dog.\nSave me from the lion’s mouth: for Thou hast answered me from the horns of the wild oxen.\nI will declare Thy name to my brethren: in the midst of the congregation I will praise Thee.\nYou who fear the Lord, praise him; all you the seed of Ya῾aqov, glorify him; and fear him, all the seed of Yisra᾽el.\nFor he has not despised nor abhorred the affliction of the afflicted; nor has he hid his face from him; but when he cried to him, he heard.\nMy praise shall be of Thee in the great congregation: I will pay my vows before those who fear him.\nThe meek shall eat and be satisfied: those who seek him shall praise the Lord: may your heart forever revive!\nAll the ends of the world shall remember and turn to the Lord: and all the families of the nations shall worship before Thee.\nFor the kingdom is the Lord’s: and he is ruler over the nations.\nAll the fat ones of the earth shall eat and worship: all they that go down to the dust, and he that cannot keep alive his own soul, shall bow before him.\nTheir seed shall serve him; it shall be told of the Lord to the coming generation.\nThey shall come, and shall declare his righteousness to a people that shall be born, that he has done this.`,
    },
  ],
};

export const psalm23: Tefila = {
  id: "psalm-23",
  name: "Psalm 23",
  nameHe: "תהילים 23",
  category: "tehillim",
  sections: [
    {
      id: "psalm-23-text",
      title: "Psalm 23",
      titleHe: "תהילים 23",
      text: `מִזְמ֥וֹר לְדָוִ֑ד יְהֹוָ֥ה רֹ֝עִ֗י לֹ֣א אֶחְסָֽר׃\nבִּנְא֣וֹת דֶּ֭שֶׁא יַרְבִּיצֵ֑נִי עַל־מֵ֖י מְנֻח֣וֹת יְנַהֲלֵֽנִי׃\nנַפְשִׁ֥י יְשׁוֹבֵ֑ב יַֽנְחֵ֥נִי בְמַעְגְּלֵי־צֶ֝֗דֶק לְמַ֣עַן שְׁמֽוֹ׃\nגַּ֤ם כִּֽי־אֵלֵ֨ךְ בְּגֵ֪יא צַלְמָ֡וֶת לֹא־אִ֘ירָ֤א רָ֗ע כִּי־אַתָּ֥ה עִמָּדִ֑י שִׁבְטְךָ֥ וּ֝מִשְׁעַנְתֶּ֗ךָ הֵ֣מָּה יְנַֽחֲמֻֽנִי׃\nתַּעֲרֹ֬ךְ לְפָנַ֨י׀ שֻׁלְחָ֗ן נֶ֥גֶד צֹרְרָ֑י דִּשַּׁ֥נְתָּ בַשֶּׁ֥מֶן רֹ֝אשִׁ֗י כּוֹסִ֥י רְוָיָֽה׃\nאַ֤ךְ׀ ט֤וֹב וָחֶ֣סֶד יִ֭רְדְּפוּנִי כׇּל־יְמֵ֣י חַיָּ֑י וְשַׁבְתִּ֥י בְּבֵית־יְ֝הֹוָ֗ה לְאֹ֣רֶךְ יָמִֽים׃ {פ}`,
      translation: `A Psalm of David. The Lord is my shepherd; I shall not want.\nHe makes me to lie down in green pastures: he leads me beside the still waters.\nHe restores my soul: he leads me in the paths of righteousness for his name’s sake.\nEven though I walk through the valley of the shadow of death, I will fear no evil: for Thou art with me; Thy rod and Thy staff they comfort me.\nThou preparest a table before me in the presence of my enemies: Thou anointest my head with oil; my cup runs over.\nSurely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord forever.`,
    },
  ],
};

export const psalm24: Tefila = {
  id: "psalm-24",
  name: "Psalm 24",
  nameHe: "תהילים 24",
  category: "tehillim",
  sections: [
    {
      id: "psalm-24-text",
      title: "Psalm 24",
      titleHe: "תהילים 24",
      text: `לְדָוִ֗ד מִ֫זְמ֥וֹר לַֽ֭יהֹוָה הָאָ֣רֶץ וּמְלוֹאָ֑הּ תֵּ֝בֵ֗ל וְיֹ֣שְׁבֵי בָֽהּ׃\nכִּי־ה֭וּא עַל־יַמִּ֣ים יְסָדָ֑הּ וְעַל־נְ֝הָר֗וֹת יְכוֹנְנֶֽהָ׃\nמִֽי־יַעֲלֶ֥ה בְהַר־יְהֹוָ֑ה וּמִי־יָ֝ק֗וּם בִּמְק֥וֹם קׇדְשֽׁוֹ׃\nנְקִ֥י כַפַּ֗יִם וּֽבַר־לֵ֫בָ֥ב אֲשֶׁ֤ר׀ לֹא־נָשָׂ֣א לַשָּׁ֣וְא נַפְשִׁ֑י וְלֹ֖א נִשְׁבַּ֣ע לְמִרְמָֽה׃\nיִשָּׂ֣א בְ֭רָכָה מֵאֵ֣ת יְהֹוָ֑ה וּ֝צְדָקָ֗ה מֵאֱלֹהֵ֥י יִשְׁעֽוֹ׃\nזֶ֭ה דּ֣וֹר דֹּרְשָׁ֑ו מְבַקְשֵׁ֨י פָנֶ֖יךָ יַעֲקֹ֣ב סֶֽלָה׃\nשְׂא֤וּ שְׁעָרִ֨ים׀ רָֽאשֵׁיכֶ֗ם וְֽ֭הִנָּשְׂאוּ פִּתְחֵ֣י עוֹלָ֑ם וְ֝יָב֗וֹא מֶ֣לֶךְ הַכָּבֽוֹד׃\nמִ֥י זֶה֮ מֶ֤לֶךְ הַכָּ֫ב֥וֹד יְ֭הֹוָה עִזּ֣וּז וְגִבּ֑וֹר יְ֝הֹוָ֗ה גִּבּ֥וֹר מִלְחָמָֽה׃\nשְׂא֤וּ שְׁעָרִ֨ים׀ רָֽאשֵׁיכֶ֗ם וּ֭שְׂאוּ פִּתְחֵ֣י עוֹלָ֑ם וְ֝יָבֹ֗א מֶ֣לֶךְ הַכָּבֽוֹד׃\nמִ֤י־ה֣וּא זֶה֮ מֶ֤לֶךְ הַכָּ֫ב֥וֹד יְהֹוָ֥ה צְבָא֑וֹת ה֤וּא מֶ֖לֶךְ הַכָּב֣וֹד סֶֽלָה׃ {פ}`,
      translation: `A Psalm of David. The earth is the Lord’s, and the fulness thereof; the world, and they that dwell in it.\nFor he has founded it upon the seas, and established it upon the floods.\nWho shall ascend into the mountain of the Lord? or who shall stand in his holy place?\nHe that has clean hands, and a pure heart; who has not taken my name in vain, nor sworn deceitfully.\nHe shall receive a blessing from the Lord, and righteousness from the God of his salvation.\nThis is Ya῾aqov, the generation of those who seek him, that seek Thy face. (Sela.)\nLift up your heads, O you gates; and be lifted up, you everlasting doors; and the King of glory shall come in.\nWho is this King of glory? The Lord strong and mighty, the Lord mighty in battle.\nLift up your heads, O you gates; and lift them up, you everlasting doors; that the King of glory may come in.\nWho is this King of glory? The Lord of hosts, he is the King of glory. (Sela.)`,
    },
  ],
};

export const psalm25: Tefila = {
  id: "psalm-25",
  name: "Psalm 25",
  nameHe: "תהילים 25",
  category: "tehillim",
  sections: [
    {
      id: "psalm-25-text",
      title: "Psalm 25",
      titleHe: "תהילים 25",
      text: `לְדָוִ֡ד אֵלֶ֥יךָ יְ֝הֹוָ֗ה נַפְשִׁ֥י אֶשָּֽׂא׃\nאֱֽלֹהַ֗י בְּךָ֣ בָ֭טַחְתִּי אַל־אֵב֑וֹשָׁה אַל־יַעַלְצ֖וּ אוֹיְבַ֣י לִֽי׃\nגַּ֣ם כׇּל־קֹ֭וֶיךָ לֹ֣א יֵבֹ֑שׁוּ יֵ֝בֹ֗שׁוּ הַבּוֹגְדִ֥ים רֵיקָֽם׃\nדְּרָכֶ֣יךָ יְ֭הֹוָה הוֹדִיעֵ֑נִי אֹ֖רְחוֹתֶ֣יךָ לַמְּדֵֽנִי׃\nהַדְרִ֘יכֵ֤נִי בַאֲמִתֶּ֨ךָ׀ וְֽלַמְּדֵ֗נִי כִּֽי־אַ֭תָּה אֱלֹהֵ֣י יִשְׁעִ֑י אוֹתְךָ֥ קִ֝וִּ֗יתִי כׇּל־הַיּֽוֹם׃\nזְכֹר־רַחֲמֶ֣יךָ יְ֭הֹוָה וַחֲסָדֶ֑יךָ כִּ֖י מֵעוֹלָ֣ם הֵֽמָּה׃\nחַטֹּ֤אות נְעוּרַ֨י׀ וּפְשָׁעַ֗י אַל־תִּ֫זְכֹּ֥ר כְּחַסְדְּךָ֥ זְכׇר־לִי־אַ֑תָּה לְמַ֖עַן טוּבְךָ֣ יְהֹוָֽה׃\nטוֹב־וְיָשָׁ֥ר יְהֹוָ֑ה עַל־כֵּ֤ן יוֹרֶ֖ה חַטָּאִ֣ים בַּדָּֽרֶךְ׃\nיַדְרֵ֣ךְ עֲ֭נָוִים בַּמִּשְׁפָּ֑ט וִילַמֵּ֖ד עֲנָוִ֣ים דַּרְכּֽוֹ׃\nכׇּל־אׇרְח֣וֹת יְ֭הֹוָה חֶ֣סֶד וֶאֱמֶ֑ת לְנֹצְרֵ֥י בְ֝רִית֗וֹ וְעֵדֹתָֽיו׃\nלְמַֽעַן־שִׁמְךָ֥ יְהֹוָ֑ה וְֽסָלַחְתָּ֥ לַ֝עֲוֺנִ֗י כִּ֣י רַב־הֽוּא׃\nמִי־זֶ֣ה הָ֭אִישׁ יְרֵ֣א יְהֹוָ֑ה י֝וֹרֶ֗נּוּ בְּדֶ֣רֶךְ יִבְחָֽר׃\nנַ֭פְשׁוֹ בְּט֣וֹב תָּלִ֑ין וְ֝זַרְע֗וֹ יִ֣ירַשׁ אָֽרֶץ׃\nס֣וֹד יְ֭הֹוָה לִירֵאָ֑יו וּ֝בְרִית֗וֹ לְהוֹדִיעָֽם׃\nעֵינַ֣י תָּ֭מִיד אֶל־יְהֹוָ֑ה כִּ֤י הֽוּא־יוֹצִ֖יא מֵרֶ֣שֶׁת רַגְלָֽי׃\nפְּנֵֽה־אֵלַ֥י וְחׇנֵּ֑נִי כִּֽי־יָחִ֖יד וְעָנִ֣י אָֽנִי׃\nצָר֣וֹת לְבָבִ֣י הִרְחִ֑יבוּ מִ֝מְּצוּקוֹתַ֗י הוֹצִיאֵֽנִי׃\nרְאֵ֣ה עׇ֭נְיִי וַעֲמָלִ֑י וְ֝שָׂ֗א לְכׇל־חַטֹּאותָֽי׃\nרְאֵֽה־אֹיְבַ֥י כִּי־רָ֑בּוּ וְשִׂנְאַ֖ת חָמָ֣ס שְׂנֵאֽוּנִי׃\nשׇׁמְרָ֣ה נַ֭פְשִׁי וְהַצִּילֵ֑נִי אַל־אֵ֝ב֗וֹשׁ כִּֽי־חָסִ֥יתִי בָֽךְ׃\nתֹּם־וָיֹ֥שֶׁר יִצְּר֑וּנִי כִּ֝֗י קִוִּיתִֽיךָ׃\nפְּדֵ֣ה אֱ֭לֹהִים אֶת־יִשְׂרָאֵ֑ל מִ֝כֹּ֗ל צָרוֹתָֽיו׃ {פ}`,
      translation: `Of David. To Thee, O Lord, do I lift up my soul.\nO my God, I trust in Thee: let me not be ashamed, let not my enemies triumph over me.\nMoreover let none that wait on Thee be ashamed: let them be ashamed who betray without cause.\nMake me know Thy ways, O Lord; teach me Thy paths.\nLead me in Thy truth, and teach me: for Thou art the God of my salvation; for Thee do I wait all the day.\nRemember, O Lord, Thy tender mercies and Thy truth; for they have been from of old.\nRemember not the sins of my youth, nor my transgressions: according to Thy loyal love remember Thou me for Thy goodness’ sake, O Lord.\nGood and upright is the Lord: therefore does he instruct sinners in the way.\nHe directs the humble in justice: and he teaches the meek his way.\nAll the paths of the Lord are mercy and truth to such as keep his covenant and his testimonies.\nFor Thy name’s sake, O Lord, pardon my iniquity; for it is great.\nWhat man is he that fears the Lord? him shall he teach in the way that he should choose.\nHis soul shall abide in prosperity; and his seed shall inherit the earth.\nThe counsel of the Lord is with them that fear him; and he will reveal to them his covenant.\nMy eyes are ever towards the Lord; for he shall pluck my feet out of the net.\nTurn Thee to me, and be gracious to me; for I am desolate and afflicted.\nThe troubles of my heart are enlarged: O bring me out of my distresses.\nLook upon my affliction and my pain; and forgive all my sins.\nConsider my enemies; for they are many; and they hate me with a cruel hatred.\nO keep my soul, and deliver me: let me not be ashamed; for I put my trust in Thee.\nLet integrity and uprightness preserve me; because I wait for Thee.\nRedeem Yisra᾽el, O God, out of all his troubles.`,
    },
  ],
};

export const psalms1to25: Tefila[] = [
  psalm1,
  psalm2,
  psalm3,
  psalm4,
  psalm5,
  psalm6,
  psalm7,
  psalm8,
  psalm9,
  psalm10,
  psalm11,
  psalm12,
  psalm13,
  psalm14,
  psalm15,
  psalm16,
  psalm17,
  psalm18,
  psalm19,
  psalm20,
  psalm21,
  psalm22,
  psalm23,
  psalm24,
  psalm25,
];
