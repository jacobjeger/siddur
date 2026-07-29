import { useRef, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { HebrewText } from "../../src/components/common/HebrewText";
import { SectionBody } from "../../src/components/common/SectionBody";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { useKeepScreenOn } from "../../src/hooks/useKeepScreenOn";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import type { PrayerSection } from "../../src/data/types";

import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { isSectionSaid } from "../../src/utils/sectionConditions";
import { RunningHead } from "../../src/components/common/RunningHead";
/** Build a deduplicated TOC: unique titles mapped to first section with that title */
function buildTocEntries(sections: PrayerSection[]) {
  const seen = new Set<string>();
  const entries: { title: string; sectionId: string }[] = [];
  for (const s of sections) {
    if (!seen.has(s.titleHe)) {
      seen.add(s.titleHe);
      entries.push({ title: s.titleHe, sectionId: s.id });
    }
  }
  return entries;
}

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  // Scoped to the davening screens so it matches its label; mounting it at the
  // app root kept the screen awake on every tab.
  useKeepScreenOn();
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});
  const [tocVisible, setTocVisible] = useState(false);
  // Drives the running head. Kept in state (not a ref) because the head has to
  // re-render as you scroll; throttled to 16ms so `group` and `n/62` stay
  // truthful rather than lagging a section behind.
  const [scroll, setScroll] = useState({ offset: 0, visible: 0, total: 1 });

  const baseTefila = getTefilaById(tefilaId ?? "");
  const hebrew = useHebrewDate();
  // Was `getInsertionContext()` with NO arguments and memoised on [], so it
  // silently used {inIsrael: false} with no tzeis and froze at mount. It now
  // takes the same options as the rest of the app and rebuilds when the day
  // rolls at nightfall.
  const context = useMemo(
    () => getInsertionContext(new Date(), hebrew.options),
    [hebrew.options]
  );
  const assembled = useMemo(
    () => (baseTefila ? assemblePrayer(baseTefila, context) : undefined),
    [baseTefila, context]
  );

  /**
   * Drop the sections that are not said today.
   *
   * Without this the reader ignored the day rules entirely: on Tu B'Av the
   * Today panel said "Tachanun: Not said" and the reader rendered all three
   * Tachanun sections anyway.
   *
   * `withMinyan` defaults to true because there is no setting for it yet, and
   * a wrong default that HIDES liturgy is far worse than one that shows a
   * little extra — the same reason an absent `when` means "say it".
   */
  const tefila = useMemo(() => {
    if (!assembled) return undefined;
    const conditionContext = {
      day: hebrew.dayDavening,
      dayOfWeek: hebrew.dayOfWeek,
      withMinyan: true,
    };
    return {
      ...assembled,
      sections: assembled.sections.filter((section) =>
        isSectionSaid(section, conditionContext)
      ),
    };
  }, [assembled, hebrew.dayDavening, hebrew.dayOfWeek]);

  if (!tefila) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <HebrewText bold style={{ fontSize: 18 }}>
          לא נמצאה תפילה
        </HebrewText>
      </View>
    );
  }

  // Which section the top of the viewport is in. Offsets come from the same
  // onLayout measurements the jump list already used.
  const currentIndex = (() => {
    const positions = sectionYPositions.current;
    let index = 0;
    tefila.sections.forEach((section, i) => {
      const y = positions[section.id];
      if (y != null && y <= scroll.offset + 8) index = i;
    });
    return index;
  })();
  const currentSection = tefila.sections[currentIndex];
  const progress =
    scroll.total > scroll.visible
      ? Math.min(1, scroll.offset / (scroll.total - scroll.visible))
      : 0;

  const tocEntries = buildTocEntries(tefila.sections);
  const showToc = tocEntries.length >= 3;

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
          title: tefila.name,
          headerBackTitle: "Back",
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <RunningHead
        tefilaName={tefila.name}
        section={currentSection}
        index={currentIndex}
        total={tefila.sections.length}
        progress={progress}
        onPressIndex={showToc ? () => setTocVisible(true) : undefined}
      />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
        scrollEventThrottle={16}
        onScroll={(e) =>
          setScroll({
            offset: e.nativeEvent.contentOffset.y,
            visible: e.nativeEvent.layoutMeasurement.height,
            total: e.nativeEvent.contentSize.height,
          })
        }
      >
        {/* Prayer sections */}
        {tefila.sections.map((section, index) => (
          <View
            key={`${section.id}-${index}`}
            onLayout={(e) => {
              sectionYPositions.current[section.id] = e.nativeEvent.layout.y;
            }}
            style={{
              paddingHorizontal: 16,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {/* Right-aligned, like the text it introduces. The old centred
                rule-divider cost 40dp per section and gave all 118 sections
                equal weight; the running head now carries the hierarchy. */}
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
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => scrollToSection(item.sectionId)}
                    activeOpacity={0.6}
                    style={{
                      paddingHorizontal: 24,
                      paddingVertical: 15,
                      borderBottomWidth: index < tocEntries.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifHebrew-Regular",
                        fontSize: 16,
                        color: colors.primary,
                        textAlign: "right",
                        writingDirection: "rtl",
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}
