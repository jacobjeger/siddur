const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Include .db files as assets so the pre-built siddur database is bundled
config.resolver.assetExts.push("db");

module.exports = withNativeWind(config, { input: "./global.css" });
