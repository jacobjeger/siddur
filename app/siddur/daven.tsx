import { useRef, useMemo, useState, Fragment } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { HebrewText } from "../../src/components/common/HebrewText";
import { SectionBody } from "../../src/components/common/SectionBody";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { useKeepScreenOn } from "../../src/hooks/useKeepScreenOn";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import type { Tefila, PrayerSection } from "../../src/data/types";

import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { isSectionSaid } from "../../src/utils/sectionConditions";
import { RunningHead } from "../../src/components/common/RunningHead";
import { useReadingStore } from "../../src/stores/useReadingStore";
/** Build a deduplicated TOC from all tefilos' sections */
function buildTocEntries(tefilos: Tefila[]) {
  const seen = new Set<string>();
  const entries: { title: string; sectionId: string; tefilaName: string }[] = [];
  for (const tefila of tefilos) {
    // Add tefila header as a TOC entry
    if (!seen.has(tefila.nameHe)) {
      seen.add(tefila.nameHe);
      entries.push({
        title: tefila.nameHe,
        sectionId: `tefila-header-${tefila.id}`,
        tefilaName: tefila.nameHe,
      });
    }
    for (const s of tefila.sections) {
      // Keyed by section ID, not by title. Keying on the title collapsed every
      // repeated section to its first occurrence, so you could not jump to the
      // second Chatzi Kaddish — and Shacharis has several.
      if (!seen.has(s.id) && s.titleHe !== tefila.nameHe) {
        seen.add(s.id);
        entries.push({ title: s.titleHe, sectionId: s.id, tefilaName: tefila.nameHe });
      }
    }
  }
  return entries;
}

export default function DavenScreen() {
  const { tefilaIds } = useLocalSearchParams<{ tefilaIds: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  // Scoped to the davening screens so it matches its label; mounting it at the
  // app root kept the screen awake on every tab.
  useKeepScreenOn();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});
  const [tocVisible, setTocVisible] = useState(false);
  const [scroll, setScroll] = useState({ offset: 0, visible: 0, total: 1 });
  const savePosition = useReadingStore((state) => state.savePosition);
  const positions = useReadingStore((state) => state.positions);
  const readingKey = tefilaIds ?? "";
  // Restore once, after layout has measured, and only on first mount.
  const restored = useRef(false);

  const hebrew = useHebrewDate();
  // Was `getInsertionContext()` with no arguments, memoised on [] — so it used
  // {inIsrael: false} with no tzeis and froze at mount.
  const context = useMemo(
    () => getInsertionContext(new Date(), hebrew.options),
    [hebrew.options]
  );

  const ids = (tefilaIds ?? "").split(",").filter(Boolean);
  // Recomputed on every render before this, with no memo.
  const tefilos: Tefila[] = useMemo(() => {
    const conditionContext = {
      day: hebrew.dayDavening,
      dayOfWeek: hebrew.dayOfWeek,
      withMinyan: true,
    };
    return ids
      .map((id) => getTefilaById(id))
      .filter((t): t is Tefila => t != null)
      .map((t) => assemblePrayer(t, context))
      .map((t) => ({
        ...t,
        // Drop what is not said today. This is the flow OK opens, so without
        // it the whole day-rules fix would be invisible where it matters most.
        sections: t.sections.filter((section) =>
          isSectionSaid(section, conditionContext)
        ),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tefilaIds, context, hebrew.dayDavening, hebrew.dayOfWeek]);

  if (tefilos.length === 0) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Davening",
            headerStyle: { backgroundColor: colors.headerBg },
            headerTintColor: "#ffffff",
          }}
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
          <HebrewText bold style={{ fontSize: 18 }}>
            לא נמצאו תפילות
          </HebrewText>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <HebrewText style={{ fontSize: 16, color: colors.primary }}>
              חזרה
            </HebrewText>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const mainTitle = tefilos.length === 1 ? tefilos[0].name : "Davening";
  const tocEntries = buildTocEntries(tefilos);
  const showToc = tocEntries.length >= 3;

  // The running head counts across the whole flow, not per tefila — the user
  // is reading one continuous davening.
  const flat = tefilos.flatMap((t) =>
    t.sections.map((section) => ({ section, tefilaName: t.name }))
  );
  const currentIndex = (() => {
    const positions = sectionYPositions.current;
    let index = 0;
    flat.forEach((entry, i) => {
      const y = positions[entry.section.id];
      if (y != null && y <= scroll.offset + 8) index = i;
    });
    return index;
  })();
  const current = flat[currentIndex];
  const progress =
    scroll.total > scroll.visible
      ? Math.min(1, scroll.offset / (scroll.total - scroll.visible))
      : 0;

  /**
   * Persist the reading position. Throttled to whole line steps so a scroll
   * does not write to AsyncStorage on every one of its ~60 frames.
   */
  const lastSaved = useRef(0);
  const rememberPosition = (offset: number) => {
    if (Math.abs(offset - lastSaved.current) < textSize) return;
    lastSaved.current = offset;
    const section = current?.section;
    if (!section) return;
    savePosition(readingKey, {
      offset,
      sectionId: section.id,
      sectionTitle: section.title,
      sectionTitleHe: section.titleHe,
      savedAt: Date.now(),
    });
  };

  // Restore where you were, once, after the content has been laid out.
  const saved = positions[readingKey];
  const onContentReady = () => {
    if (restored.current || !saved) return;
    restored.current = true;
    if (saved.offset > 80) {
      scrollRef.current?.scrollTo({ y: saved.offset, animated: false });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setTocVisible(false);
    setTimeout(() => {
      const y = sectionYPositions.current[sectionId];
      if (y != null && scrollRef.current) {
        scrollRef.current.scrollTo({ y, animated: true });
      }
    }, 100);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: mainTitle,
          headerBackTitle: "Back",
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <RunningHead
        tefilaName={current?.tefilaName ?? ""}
        section={current?.section}
        index={currentIndex}
        total={flat.length || 1}
        progress={progress}
        onPressIndex={showToc ? () => setTocVisible(true) : undefined}
      />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
        // Snap to the liturgy line grid so a line is never left half-cut.
        //
        // Done with snapToInterval rather than by binding the d-pad's up/down
        // in JS: the native key module deliberately does NOT consume those keys
        // (Android's focus traversal depends on them), so a JS handler would
        // scroll on top of the scrolling Android already did.
        snapToInterval={textSize * 2}
        decelerationRate="normal"
        onContentSizeChange={onContentReady}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const offset = e.nativeEvent.contentOffset.y;
          setScroll({
            offset,
            visible: e.nativeEvent.layoutMeasurement.height,
            total: e.nativeEvent.contentSize.height,
          });
          rememberPosition(offset);
        }}
      >
        {tefilos.map((tefila, tefilaIndex) => (
          // No wrapper View. Section offsets are captured with onLayout and
          // `layout.y` is relative to the PARENT — so wrapping each tefila made
          // every offset after the first short by the height of everything
          // before it, and jumps landed in the wrong place. A Fragment keeps
          // the sections as direct children of the scroll content.
          <Fragment key={tefila.id}>
            {/* A slim anchor, not a header. The running head above the
                scroll view carries the tefila name permanently, so repeating
                it here (at textSize + 2, with a jump chip) cost ~101dp per
                tefila to say what is already on screen. Kept as a measured
                target so the jump list can still land on a tefila. */}
            <View
              onLayout={(e) => {
                sectionYPositions.current[`tefila-header-${tefila.id}`] = e.nativeEvent.layout.y;
              }}
              style={{
                paddingHorizontal: 16,
                paddingTop: tefilaIndex > 0 ? 18 : 8,
                paddingBottom: 2,
              }}
            >
              <HebrewText
                bold
                style={{ fontSize: 13, color: colors.textMuted, textAlign: "right" }}
              >
                {tefila.nameHe}
              </HebrewText>
            </View>

            {/* Sections */}
            {tefila.sections.map((section, idx) => (
              <View
                key={`${section.id}-${idx}`}
                onLayout={(e) => {
                  sectionYPositions.current[section.id] = e.nativeEvent.layout.y;
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                {(tefila.sections.length > 1 || section.titleHe !== tefila.nameHe) && (
                  <HebrewText
                    bold
                    style={{
                      fontSize: textSize * 1.15,
                      color: colors.textSecondary,
                      textAlign: "right",
                      marginBottom: 6,
                    }}
                  >
                    {section.titleHe}
                  </HebrewText>
                )}

                <SectionBody
                  text={getTextForNusach(section.text, nusach)}
                  instruction={section.instruction}
                  instructionHe={section.instructionHe}
                  textSize={textSize}
                />

                {showEnglish && section.translation && (
                  <View
                    style={{
                      marginTop: 20,
                      paddingTop: 16,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.textSecondary,
                        lineHeight: (textSize - 2) * 1.7,
                        fontSize: textSize - 2,
                      }}
                    >
                      {getTextForNusach(section.translation, nusach)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </Fragment>
        ))}

        {/* Completion */}
        <View style={{ alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "NotoSerifHebrew-Bold",
              fontSize: 20,
              color: colors.text,
            }}
          >
            סיום התפילה
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
              marginTop: 20,
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingHorizontal: 40,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                color: colors.onPrimary,
                fontFamily: "NotoSerifHebrew-Regular",
                fontSize: textSize - 6,
                fontWeight: "600",
              }}
            >
              סיום
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Section jump dropdown modal */}
      {showToc && (
        <Modal
          visible={tocVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setTocVisible(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}
            activeOpacity={1}
            onPress={() => setTocVisible(false)}
          >
            <View
              style={{
                maxHeight: "60%",
                backgroundColor: colors.surface,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Handle bar */}
              <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 6 }}>
                <View
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.border,
                  }}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSerifHebrew-Bold",
                    fontSize: 17,
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  דלג לקטע
                </Text>
              </View>
              <FlatList
                data={tocEntries}
                keyExtractor={(item) => item.sectionId}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item, index }) => {
                  const isTefilaHeader = item.sectionId.startsWith("tefila-header-");
                  return (
                    <TouchableOpacity
                      onPress={() => scrollToSection(item.sectionId)}
                      activeOpacity={0.6}
                      style={{
                        paddingHorizontal: isTefilaHeader ? 20 : 32,
                        paddingVertical: isTefilaHeader ? 14 : 13,
                        borderBottomWidth: index < tocEntries.length - 1 ? 1 : 0,
                        borderBottomColor: colors.border,
                        backgroundColor: isTefilaHeader ? colors.surfaceSecondary : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: isTefilaHeader ? "NotoSerifHebrew-Bold" : "NotoSerifHebrew-Regular",
                          fontSize: isTefilaHeader ? 16 : 15,
                          color: isTefilaHeader ? colors.text : colors.primary,
                          textAlign: "right",
                          writingDirection: "rtl",
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}
