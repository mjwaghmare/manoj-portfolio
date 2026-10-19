import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Holds the selected [ThemeMode] and persists explicit user choices.
///
/// Until the user picks a theme, the app follows the system brightness.
/// Once they do, that choice wins on every later visit.
class ThemeProvider extends ChangeNotifier {
  /// Read by the inline script in `web/index.html` as `flutter.is_dark_mode`
  /// to paint the correct background before Flutter starts.
  static const _themeKey = 'is_dark_mode';

  ThemeMode _themeMode = ThemeMode.system;

  ThemeMode get themeMode => _themeMode;

  /// Call before `runApp` so the first frame already uses the saved theme.
  Future<void> loadTheme() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final isDark = prefs.getBool(_themeKey);
      _themeMode = switch (isDark) {
        true => ThemeMode.dark,
        false => ThemeMode.light,
        null => ThemeMode.system,
      };
    } catch (_) {
      // Storage can be unavailable (e.g. blocked site data); fall back to the system theme.
      _themeMode = ThemeMode.system;
    }
  }

  /// The brightness the app is showing, or animating towards, for the given system setting.
  Brightness resolveBrightness(Brightness platformBrightness) => switch (_themeMode) {
    ThemeMode.dark => Brightness.dark,
    ThemeMode.light => Brightness.light,
    ThemeMode.system => platformBrightness,
  };

  /// Switches away from the given brightness.
  Future<void> toggleTheme(Brightness current) {
    return setThemeMode(current == Brightness.dark ? ThemeMode.light : ThemeMode.dark);
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    if (mode == _themeMode) return;
    _themeMode = mode;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      if (mode == ThemeMode.system) {
        await prefs.remove(_themeKey);
      } else {
        await prefs.setBool(_themeKey, mode == ThemeMode.dark);
      }
    } catch (_) {
      // The current session still works if persistence fails.
    }
  }
}
