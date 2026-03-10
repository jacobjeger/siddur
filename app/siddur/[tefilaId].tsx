import { useRef, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import type { PrayerSection } from "../../src/data/types";

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
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});
  const [tocVisible, setTocVisible] = useState(false);

  const baseTefila = getTefilaById(tefilaId ?? "");
  const context = useMemo(() => getInsertionContext(), []);
  const tefila = useMemo(
    () => (baseTefila ? assemblePrayer(baseTefila, context) : undefined),
    [baseTefila, context]
  );

  if (!tefila) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
          לא נמצאה תפילה
        </Text>
      </View>
    );
  }

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
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header with tefila name and jump-to button */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 24,
            paddingHorizontal: 20,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "NotoSerifHebrew-Bold",
              fontSize: textSize + 2,
              color: colors.text,
            }}
          >
            {tefila.nameHe}
          </Text>
          {showToc && (
            <TouchableOpacity
              onPress={() => setTocVisible(true)}
              activeOpacity={0.6}
              style={{
                marginTop: 12,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <Text style={{ fontSize: 14, color: colors.primary }}>
                דלג לקטע ▾
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Prayer sections */}
        {tefila.sections.map((section, index) => (
          <View
            key={`${section.id}-${index}`}
            onLayout={(e) => {
              sectionYPositions.current[section.id] = e.nativeEvent.layout.y;
            }}
            style={{
              paddingHorizontal: 20,
              paddingTop: 28,
              paddingBottom: 20,
            }}
          >
            {/* Hebrew section divider */}
            {(tefila.sections.length > 1 || section.titleHe !== tefila.nameHe) && (
              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Bold",
                  fontSize: textSize - 2,
                  color: colors.textSecondary,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                {section.titleHe}
              </Text>
            )}


            <Text
              style={{
                fontFamily: "NotoSerifHebrew-Regular",
                fontSize: textSize,
                lineHeight: textSize * 2,
                color: colors.text,
                writingDirection: "rtl",
                textAlign: "right",
              }}
            >
              {getTextForNusach(section.text, nusach)}
            </Text>

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
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}
            activeOpacity={1}
            onPress={() => setTocVisible(false)}
          >
            <View
              style={{
                marginHorizontal: 32,
                maxHeight: "70%",
                backgroundColor: colors.surface,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSerifHebrew-Bold",
                    fontSize: 16,
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
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => scrollToSection(item.sectionId)}
                    activeOpacity={0.6}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      borderBottomWidth: index < tocEntries.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerifHebrew-Regular",
                        fontSize: 16,
                        color: colors.text,
                        textAlign: "center",
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
