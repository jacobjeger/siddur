import { View, Text } from "react-native";
import { useHebrewDate } from "../../hooks/useHebrewDate";

export function HebrewDateHeader() {
  const { hebrewDate, englishDate, parsha, specialDay } = useHebrewDate();

  return (
    <View className="bg-blue-900 px-4 py-4">
      <Text
        className="text-white text-center text-lg"
        style={{ fontFamily: "NotoSerifHebrew-Bold" }}
      >
        {hebrewDate || "Loading..."}
      </Text>
      <Text className="text-blue-200 text-center text-sm mt-1">
        {englishDate}
      </Text>
      {parsha ? (
        <Text className="text-yellow-300 text-center text-sm mt-1">
          Parashat {parsha}
        </Text>
      ) : null}
      {specialDay ? (
        <Text className="text-yellow-300 text-center text-sm mt-1">
          {specialDay}
        </Text>
      ) : null}
    </View>
  );
}
