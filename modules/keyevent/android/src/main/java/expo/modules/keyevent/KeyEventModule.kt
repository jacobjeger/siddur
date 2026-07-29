package expo.modules.keyevent

import android.view.KeyEvent
import android.view.Window
import android.view.View
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Hardware key events for the MegaLife F1's d-pad, soft keys and numeric keypad.
 *
 * React Native 0.83 core exposes no key-event API — `TVEventHandler` ships only
 * in react-native-tvos — and `android/` in this repo is prebuild-generated and
 * gitignored, so an Activity override written there would be erased on the next
 * `expo prebuild`. A local Expo module is the one place native code survives.
 *
 * Interception is done by wrapping the Activity's `Window.Callback` rather than
 * by putting an `OnKeyListener` on the decor view. A decor-view listener only
 * fires when the decor view itself holds focus, which it does not once any
 * focusable content exists — i.e. exactly never, in this app.
 *
 * The module is deliberately **non-consuming for the d-pad**. Android's own
 * focus traversal is what makes the app navigable, and swallowing DPAD keys
 * here would break it. Digits and soft keys are consumed, because nothing else
 * handles them.
 */
class KeyEventModule : Module() {
  private var wrappedWindow: Window? = null
  private var originalCallback: Window.Callback? = null

  override fun definition() = ModuleDefinition {
    Name("KeyEvent")

    Events("onKeyEvent")

    OnCreate { attach() }
    OnActivityEntersForeground { attach() }
    OnDestroy { detach() }
  }

  private fun attach() {
    val activity = appContext.currentActivity
    if (activity == null) return
    val window = activity.window ?: return
    if (wrappedWindow === window) return

    detach()
    val original = window.callback ?: return
    originalCallback = original
    wrappedWindow = window
    window.callback = InterceptingCallback(original)
  }

  private fun detach() {
    val window = wrappedWindow
    val original = originalCallback
    if (window != null && original != null) {
      window.callback = original
    }
    wrappedWindow = null
    originalCallback = null
  }

  /**
   * Maps a keycode to the name JS knows it by, or null to ignore it.
   *
   * `select` is emitted only when no ACTIONABLE control holds focus. That is
   * what makes the "flip open, press OK, you are in the text" path work: when a
   * control is focused Android will click it, and JS must not also run the
   * screen default, or OK would fire two actions at once.
   *
   * Testing `currentFocus != null` was wrong and silently disabled the whole
   * path: Android essentially always has something focused — on a fresh Home
   * screen it is the ScrollView. The device log read
   * `key 23 hasFocus=true -> null` on every press. What matters is whether the
   * focused view would itself do something, i.e. whether it is clickable.
   */
  private fun nameFor(keyCode: Int, hasActionableFocus: Boolean): String? = when (keyCode) {
    KeyEvent.KEYCODE_DPAD_LEFT -> "left"
    KeyEvent.KEYCODE_DPAD_RIGHT -> "right"
    KeyEvent.KEYCODE_DPAD_UP -> "up"
    KeyEvent.KEYCODE_DPAD_DOWN -> "down"
    KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_ENTER ->
      if (hasActionableFocus) null else "select"
    KeyEvent.KEYCODE_SOFT_LEFT, KeyEvent.KEYCODE_MENU -> "softLeft"
    KeyEvent.KEYCODE_SOFT_RIGHT -> "softRight"
    in KeyEvent.KEYCODE_1..KeyEvent.KEYCODE_9 ->
      "digit${keyCode - KeyEvent.KEYCODE_0}"
    else -> null
  }

  /** Digits and soft keys have no other handler; the d-pad must pass through. */
  private fun shouldConsume(name: String): Boolean =
    name.startsWith("digit") || name.startsWith("soft") || name == "select"

  private inner class InterceptingCallback(
    private val delegate: Window.Callback
  ) : Window.Callback by delegate {

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
      if (event.action == KeyEvent.ACTION_DOWN) {
        val focused = appContext.currentActivity?.currentFocus
        val actionable = focused != null && focused.isClickable
        val name = nameFor(event.keyCode, actionable)
        if (name != null) {
          // A long press arrives as a repeat; report the first repeat only, so
          // holding a digit sets one bookmark rather than a stream of them.
          val longPress = event.isLongPress || event.repeatCount == 1
          sendEvent(
            "onKeyEvent",
            mapOf("key" to name, "longPress" to longPress)
          )
          if (shouldConsume(name)) return true
        }
      }
      return delegate.dispatchKeyEvent(event)
    }
  }
}
