import 'package:flutter/material.dart';

import 'core/constants/app_constants.dart';
import 'core/theme/app_theme.dart';
import 'core/theme/theme_provider.dart';
import 'portfolio_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Resolve the saved theme before the first frame to avoid a light/dark flash.
  final themeProvider = ThemeProvider();
  await themeProvider.loadTheme();

  runApp(PortfolioApp(themeProvider: themeProvider));
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({required this.themeProvider, super.key});

  final ThemeProvider themeProvider;

  // MediaQuery isn't available above MaterialApp, so read the OS setting directly.
  static bool get _reduceMotion => WidgetsBinding.instance.platformDispatcher.accessibilityFeatures.disableAnimations;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: themeProvider,
      builder: (context, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Manoj Waghmare | Senior Flutter Developer',
          theme: AppTheme.light,
          darkTheme: AppTheme.dark,
          themeMode: themeProvider.themeMode,
          // Cross-fades every theme color (including PortfolioColors) between light and dark.
          themeAnimationDuration: _reduceMotion ? Duration.zero : AppConstants.themeDuration,
          themeAnimationCurve: AppConstants.themeCurve,
          home: child,
        );
      },
      // Built once; theme changes don't recreate the page widget.
      child: PortfolioPage(themeProvider: themeProvider),
    );
  }
}
