const { withProjectBuildGradle } = require("@expo/config-plugins");

/**
 * Declare async-storage's bundled Maven repository.
 *
 * @react-native-async-storage/async-storage 3.x depends on
 * `org.asyncstorage.shared_storage:storage-android`, which it does NOT publish
 * to Maven Central — it ships the artifact inside its own package under
 * `android/local_repo`. Without a repository entry the build fails with
 * "Could not find org.asyncstorage.shared_storage:storage-android:1.0.0".
 *
 * This has to be a config plugin rather than an edit to android/build.gradle,
 * because android/ is gitignored and regenerated: a hand-edit survives until
 * the next `expo prebuild --clean` and then vanishes, which is exactly how this
 * build broke.
 *
 * `expo-build-properties`' `extraMavenRepos` was tried first and does not work
 * here — it writes `android.extraMavenRepos` into gradle.properties, and
 * nothing in SDK 55 reads that property back.
 *
 * The path is resolved against `rootDir` (the android/ directory) rather than
 * written relative, because the dependency is resolved in the context of the
 * async-storage project, where a relative path points somewhere else entirely.
 */
const REPO_LINE =
  '        maven { url "${rootDir}/../node_modules/@react-native-async-storage/async-storage/android/local_repo" }';

module.exports = function withAsyncStorageLocalRepo(config) {
  return withProjectBuildGradle(config, (cfg) => {
    if (cfg.modResults.language !== "groovy") {
      throw new Error(
        "withAsyncStorageLocalRepo expects a groovy build.gradle"
      );
    }
    if (cfg.modResults.contents.includes("async-storage/android/local_repo")) {
      return cfg;
    }
    // Add to the allprojects block, which is what the library subprojects use.
    cfg.modResults.contents = cfg.modResults.contents.replace(
      /allprojects\s*\{\s*repositories\s*\{/,
      (match) => `${match}\n${REPO_LINE}`
    );
    return cfg;
  });
};
