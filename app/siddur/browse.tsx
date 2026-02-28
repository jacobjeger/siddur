import { useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { useSiddurDb, getChildNodes, nusachToDbNusach } from "../../src/services/database";
import type { SiddurNode } from "../../src/services/database";

export default function BrowseTefilosScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { nusach } = useSettingsStore();
  const { isReady } = useSiddurDb();
  const [viewMode, setViewMode] = useState<"siddur" | "categories">("siddur");

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
        {/* View mode toggle */}
        <View
          style={{
            flexDirection: "row",
            padding: 12,
            gap: 8,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <TouchableOpacity
            onPress={() => setViewMode("siddur")}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: viewMode === "siddur" ? colors.primary : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: viewMode === "siddur" ? "#ffffff" : colors.textSecondary,
              }}
            >
              Siddur
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode("categories")}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: viewMode === "categories" ? colors.primary : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: viewMode === "categories" ? "#ffffff" : colors.textSecondary,
              }}
            >
              Categories
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {viewMode === "siddur" && isReady ? (
            <SiddurHierarchyView nusach={nusach} />
          ) : (
            <CategoriesView />
          )}
          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </>
  );
}

/** Browse the siddur by its natural hierarchy from the database. */
function SiddurHierarchyView({ nusach }: { nusach: string }) {
  const { colors } = useTheme();
  const router = useRouter();
  const dbNusach = nusachToDbNusach(nusach as any);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const rootNodes = useMemo(
    () => getChildNodes(dbNusach, ""),
    [dbNusach]
  );

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
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
      // Navigate to view this section
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
        {!node.isLeaf && (
          <Ionicons
            name={isExpanded ? "chevron-down" : "chevron-forward"}
            size={18}
            color={colors.textMuted}
            style={{ marginRight: 8 }}
          />
        )}
        {node.isLeaf && (
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

/** Original categories-based browse view (fallback). */
function CategoriesView() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <>
      {TEFILA_CATEGORIES.map((category) => {
        const tefilos = getTefilosByCategory(category.id);
        if (tefilos.length === 0) return null;

        return (
          <View key={category.id} style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <Ionicons
                name={category.icon as any}
                size={20}
                color={colors.accent}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text,
                  marginLeft: 8,
                }}
              >
                {category.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textMuted,
                  marginLeft: 8,
                  fontFamily: "NotoSerifHebrew-Bold",
                }}
              >
                {category.nameHe}
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
              {tefilos.map((tefila, index) => (
                <TouchableOpacity
                  key={tefila.id}
                  onPress={() => router.push(`/siddur/${tefila.id}`)}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < tefilos.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.text,
                      }}
                    >
                      {tefila.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.textMuted,
                        marginTop: 2,
                        fontFamily: "NotoSerifHebrew-Regular",
                      }}
                    >
                      {tefila.nameHe}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}
    </>
  );
}
