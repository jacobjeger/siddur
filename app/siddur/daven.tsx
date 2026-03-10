import { useRef, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import type { Tefila, PrayerSection } from "../../src/data/types";

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
      const key = `${tefila.id}-${s.titleHe}`;
      if (!seen.has(key) && s.titleHe !== tefila.nameHe) {
        seen.add(key);
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
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});
  const [tocVisible, setTocVisible] = useState(false);

  const context = useMemo(() => getInsertionContext(), []);

  const ids = (tefilaIds ?? "").split(",").filter(Boolean);
  const tefilos: Tefila[] = ids
    .map((id) => getTefilaById(id))
    .filter((t): t is Tefila => t != null)
    .map((t) => assemblePrayer(t, context));

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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
            לא נמצאו תפילות
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>חזרה</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const mainTitle = tefilos.length === 1 ? tefilos[0].name : "Davening";
  const tocEntries = buildTocEntries(tefilos);
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
          title: mainTitle,
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
        {tefilos.map((tefila, tefilaIndex) => (
          <View key={tefila.id}>
            {/* Tefila header */}
            <View
              onLayout={(e) => {
                sectionYPositions.current[`tefila-header-${tefila.id}`] = e.nativeEvent.layout.y;
              }}
              style={{
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: colors.surface,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                marginTop: tefilaIndex > 0 ? 4 : 0,
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
              {tefilaIndex === 0 && showToc && (
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

            {/* Sections */}
            {tefila.sections.map((section, idx) => (
              <View
                key={`${section.id}-${idx}`}
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
          </View>
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
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
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
