import { useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import {
  getChildNodes,
  getAvailableServices,
  nusachToDbNusach,
} from "../../src/services/database";
import type { SiddurNode, ServicePathMapping } from "../../src/services/database";

type ViewMode = "services" | "siddur" | "extras";

const SUPPLEMENTARY_ITEMS = [
  { source: "tehillim", name: "Tehillim", nameHe: "תהלים", icon: "book" as const, chapters: 150 },
  { source: "pirkei_avot", name: "Pirkei Avos", nameHe: "פרקי אבות", icon: "school" as const, chapters: 6 },
  { source: "shir_hashirim", name: "Shir HaShirim", nameHe: "שיר השירים", icon: "heart" as const, chapters: 8 },
  { source: "esther", name: "Megillas Esther", nameHe: "מגילת אסתר", icon: "scroll" as const, chapters: 10 },
  { source: "ruth", name: "Megillas Ruth", nameHe: "מגילת רות", icon: "scroll" as const, chapters: 4 },
  { source: "koheles", name: "Koheles", nameHe: "קהלת", icon: "scroll" as const, chapters: 12 },
  { source: "eichah", name: "Eichah", nameHe: "איכה", icon: "scroll" as const, chapters: 5 },
];

export default function BrowseTefilosScreen() {
  const { colors } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>("services");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Browse Tefilos",
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* View mode tabs */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            gap: 6,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          {(["services", "siddur", "extras"] as ViewMode[]).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: viewMode === mode ? colors.primary : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: viewMode === mode ? "#ffffff" : colors.textSecondary,
                }}
              >
                {mode === "services" ? "Services" : mode === "siddur" ? "Full Siddur" : "Extras"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={{ flex: 1 }}>
          {viewMode === "services" && <ServicesView />}
          {viewMode === "siddur" && <SiddurHierarchyView />}
          {viewMode === "extras" && <ExtrasView />}
          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </>
  );
}

/** Browse by prayer services (Shacharis, Mincha, Maariv, Shabbat, etc.) */
function ServicesView() {
  const { colors } = useTheme();
  const router = useRouter();
  const { nusach } = useSettingsStore();

  const services = useMemo(() => getAvailableServices(nusach), [nusach]);

  // Group services by category
  const groups = useMemo(() => {
    const map: Record<string, Array<{ key: string } & ServicePathMapping>> = {};
    for (const s of services) {
      const cat = s.category;
      if (!map[cat]) map[cat] = [];
      map[cat].push(s);
    }
    return map;
  }, [services]);

  const categoryOrder: Array<{ id: string; label: string; labelHe: string; icon: string }> = [
    { id: "shacharis", label: "Shacharis", labelHe: "שחרית", icon: "sunny" },
    { id: "mincha", label: "Mincha", labelHe: "מנחה", icon: "partly-sunny" },
    { id: "maariv", label: "Maariv", labelHe: "מעריב", icon: "moon" },
    { id: "shabbos", label: "Shabbat", labelHe: "שבת", icon: "flame" },
    { id: "holidays", label: "Holidays", labelHe: "חגים", icon: "calendar" },
    { id: "blessings", label: "Blessings", labelHe: "ברכות", icon: "heart" },
    { id: "lifecycle", label: "Lifecycle", labelHe: "מעגל החיים", icon: "people" },
    { id: "other", label: "Other", labelHe: "שונות", icon: "ellipsis-horizontal" },
  ];

  return (
    <View style={{ paddingTop: 8 }}>
      {categoryOrder.map((cat) => {
        const items = groups[cat.id];
        if (!items || items.length === 0) return null;

        return (
          <View key={cat.id} style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 8,
              }}
            >
              <Ionicons name={cat.icon as any} size={18} color={colors.accent} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.text,
                  marginLeft: 8,
                }}
              >
                {cat.label}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textMuted,
                  marginLeft: 8,
                  fontFamily: "NotoSerifHebrew-Bold",
                }}
              >
                {cat.labelHe}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                marginHorizontal: 16,
                borderRadius: 12,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              {items.map((service, index) => (
                <TouchableOpacity
                  key={service.key}
                  onPress={() =>
                    router.push({
                      pathname: "/siddur/[tefilaId]",
                      params: { tefilaId: `dbservice:${service.key}` },
                    })
                  }
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                      {service.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.textMuted,
                        marginTop: 2,
                        fontFamily: "NotoSerifHebrew-Regular",
                      }}
                    >
                      {service.nameHe}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/** Browse the siddur by its natural hierarchy from the database. */
function SiddurHierarchyView() {
  const { nusach } = useSettingsStore();
  const dbNusach = nusachToDbNusach(nusach);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const rootNodes = useMemo(
    () => getChildNodes(dbNusach, ""),
    [dbNusach]
  );

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  return (
    <View style={{ paddingTop: 8 }}>
      {rootNodes.map((node) => (
        <HierarchyNode
          key={node.path}
          node={node}
          dbNusach={dbNusach}
          nusach={nusach}
          depth={0}
          expandedPaths={expandedPaths}
          toggleExpand={toggleExpand}
        />
      ))}
    </View>
  );
}

function HierarchyNode({
  node,
  dbNusach,
  nusach,
  depth,
  expandedPaths,
  toggleExpand,
}: {
  node: SiddurNode;
  dbNusach: string;
  nusach: string;
  depth: number;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
}) {
  const { colors } = useTheme();
  const router = useRouter();
  const isExpanded = expandedPaths.has(node.path);

  const children = useMemo(
    () => (isExpanded ? getChildNodes(dbNusach, node.path) : []),
    [isExpanded, dbNusach, node.path]
  );

  const handlePress = () => {
    if (node.isLeaf) {
      router.push({
        pathname: "/siddur/[tefilaId]",
        params: { tefilaId: `dbpath:${nusach}:${node.path}` },
      });
    } else {
      toggleExpand(node.path);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.6}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16 + depth * 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: depth === 0 ? colors.surface : colors.background,
        }}
      >
        {!node.isLeaf ? (
          <Ionicons
            name={isExpanded ? "chevron-down" : "chevron-forward"}
            size={18}
            color={colors.textMuted}
            style={{ marginRight: 8 }}
          />
        ) : (
          <Ionicons
            name="document-text-outline"
            size={16}
            color={colors.textMuted}
            style={{ marginRight: 8 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: depth === 0 ? 16 : 15,
              fontWeight: depth === 0 ? "600" : "400",
              color: colors.text,
            }}
          >
            {node.name}
          </Text>
          {node.nameHe && node.nameHe !== node.name && (
            <Text
              style={{
                fontSize: 13,
                color: colors.textMuted,
                marginTop: 2,
                fontFamily: "NotoSerifHebrew-Regular",
              }}
            >
              {node.nameHe}
            </Text>
          )}
        </View>
        {!node.isLeaf && (
          <Text style={{ fontSize: 12, color: colors.textMuted }}>
            {node.childCount}
          </Text>
        )}
      </TouchableOpacity>

      {isExpanded &&
        children.map((child) => (
          <HierarchyNode
            key={child.path}
            node={child}
            dbNusach={dbNusach}
            nusach={nusach}
            depth={depth + 1}
            expandedPaths={expandedPaths}
            toggleExpand={toggleExpand}
          />
        ))}
    </View>
  );
}

/** Browse supplementary texts: Tehillim, Megillas, Pirkei Avos */
function ExtrasView() {
  const { colors } = useTheme();
  const router = useRouter();
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  return (
    <View style={{ paddingTop: 12 }}>
      {SUPPLEMENTARY_ITEMS.map((item) => (
        <View key={item.source}>
          <TouchableOpacity
            onPress={() =>
              setExpandedSource(expandedSource === item.source ? null : item.source)
            }
            activeOpacity={0.6}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 14,
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Ionicons
              name={expandedSource === item.source ? "chevron-down" : "chevron-forward"}
              size={18}
              color={colors.textMuted}
              style={{ marginRight: 8 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.textMuted,
                  fontFamily: "NotoSerifHebrew-Regular",
                }}
              >
                {item.nameHe}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: colors.textMuted }}>
              {item.chapters} chapters
            </Text>
          </TouchableOpacity>

          {expandedSource === item.source && (
            <View style={{ backgroundColor: colors.background }}>
              {Array.from({ length: item.chapters }, (_, i) => i + 1).map(
                (ch) => (
                  <TouchableOpacity
                    key={ch}
                    onPress={() =>
                      router.push({
                        pathname: "/siddur/[tefilaId]",
                        params: {
                          tefilaId: `dbsupplementary:${item.source}:${
                            item.source === "tehillim"
                              ? `Tehillim.Chapter ${ch}`
                              : item.source === "pirkei_avot"
                              ? `Pirkei Avot.Chapter ${ch}`
                              : `${item.name.replace("Megillas ", "")}.Chapter ${ch}`
                          }`,
                        },
                      })
                    }
                    activeOpacity={0.6}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 48,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: colors.text }}>
                      {item.source === "tehillim"
                        ? `Psalm ${ch}`
                        : `Chapter ${ch}`}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={colors.textMuted}
                      style={{ marginLeft: "auto" }}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
