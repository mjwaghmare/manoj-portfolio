import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:manoj_portfolio/core/theme/app_theme.dart';
import 'package:manoj_portfolio/core/theme/theme_provider.dart';
import 'package:manoj_portfolio/data/portfolio_data.dart';
import 'package:manoj_portfolio/main.dart';
import 'package:manoj_portfolio/models/project_model.dart';
import 'package:manoj_portfolio/sections/contact_section.dart';
import 'package:manoj_portfolio/widgets/gradient_widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<ThemeProvider> _pumpApp(WidgetTester tester, {required Size size, Map<String, Object> prefs = const {}}) async {
  SharedPreferences.setMockInitialValues(prefs);
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.reset);

  final themeProvider = ThemeProvider();
  await themeProvider.loadTheme();
  await tester.pumpWidget(PortfolioApp(themeProvider: themeProvider));
  await tester.pumpAndSettle();
  return themeProvider;
}

void main() {
  // Lay text out with the site's real font instead of the wide test font, so layout
  // checks such as "one line on desktop" match what visitors see.
  setUpAll(() async {
    final loader = FontLoader('PlusJakartaSans');
    for (final weight in ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) {
      loader.addFont(rootBundle.load('assets/fonts/PlusJakartaSans-$weight.ttf'));
    }
    await loader.load();
  });

  for (final (name, size) in [
    ('desktop', const Size(1440, 900)),
    ('tablet', const Size(820, 1180)),
    ('mobile', const Size(375, 812)),
  ]) {
    testWidgets('renders every section without layout errors on $name', (tester) async {
      await _pumpApp(tester, size: size);

      expect(find.textContaining('Manoj Waghmare'), findsWidgets);
      expect(find.text('About Me', skipOffstage: false), findsOneWidget);
      expect(find.text('Tech Stack', skipOffstage: false), findsOneWidget);
      expect(find.text('Professional Experience', skipOffstage: false), findsOneWidget);
      expect(find.text('Featured Projects', skipOffstage: false), findsOneWidget);
      expect(find.text('Let\'s Work Together', skipOffstage: false), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  }

  testWidgets('labels each project type honestly', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    for (final type in ProjectType.values) {
      final count = PortfolioData.projects.where((project) => project.type == type).length;
      expect(find.text(type.label, skipOffstage: false), findsNWidgets(count));
    }
  });

  testWidgets('theme toggle switches brightness and persists the choice', (tester) async {
    final themeProvider = await _pumpApp(tester, size: const Size(1440, 900), prefs: {'is_dark_mode': false});
    expect(themeProvider.themeMode, ThemeMode.light);

    await tester.tap(find.byTooltip('Switch to dark theme'));
    await tester.pumpAndSettle();

    expect(themeProvider.themeMode, ThemeMode.dark);
    expect(find.byTooltip('Switch to light theme'), findsOneWidget);
    final prefs = await SharedPreferences.getInstance();
    expect(prefs.getBool('is_dark_mode'), isTrue);
  });

  test('custom theme colors cross-fade instead of snapping mid-transition', () {
    const light = PortfolioColors.light;
    const dark = PortfolioColors.dark;
    final mid = light.lerp(dark, 0.5);

    expect(mid.footerBackground, Color.lerp(light.footerBackground, dark.footerBackground, 0.5));
    expect(mid.brandGradient.first, Color.lerp(light.brandGradient.first, dark.brandGradient.first, 0.5));
    expect(mid.blobGlow, isNot(anyOf(light.blobGlow, dark.blobGlow)));
  });

  testWidgets('loads a saved dark theme before the first frame', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900), prefs: {'is_dark_mode': true});

    final context = tester.element(find.byType(Scaffold));
    expect(Theme.of(context).brightness, Brightness.dark);
  });

  testWidgets('follows the system theme when nothing is saved', (tester) async {
    final themeProvider = await _pumpApp(tester, size: const Size(1440, 900));
    expect(themeProvider.themeMode, ThemeMode.system);
  });

  testWidgets('desktop navigation scrolls to the selected section', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    final scrollable = tester.state<ScrollableState>(find.byType(Scrollable).first);
    expect(scrollable.position.pixels, 0);

    await tester.tap(find.widgetWithText(TextButton, 'Projects'));
    await tester.pumpAndSettle();

    expect(scrollable.position.pixels, greaterThan(0));
    expect(find.text('PCLive247'), findsWidgets);
  });

  testWidgets('"Let\'s talk" in the header scrolls to the contact section', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    // It replaces the plain Contact link on desktop.
    expect(find.widgetWithText(TextButton, 'Contact'), findsNothing);

    await tester.tap(find.widgetWithText(GradientButton, 'Let\'s talk'));
    await tester.pumpAndSettle();

    final scrollable = tester.state<ScrollableState>(find.byType(Scrollable).first);
    expect(scrollable.position.pixels, greaterThan(0));
    expect(tester.getCenter(find.byType(ContactSection)).dy, lessThan(900));
  });

  testWidgets('mobile menu opens the navigation drawer', (tester) async {
    await _pumpApp(tester, size: const Size(375, 812));

    await tester.tap(find.byTooltip('Open navigation menu'));
    await tester.pumpAndSettle();

    expect(find.byType(Drawer), findsOneWidget);
    await tester.tap(find.widgetWithText(ListTile, 'Contact'));
    await tester.pumpAndSettle();
    expect(find.byType(Drawer), findsNothing);
  });

  // Desktop platforms use compact visual density, which previously shrank the outlined button.
  testWidgets('hero buttons render at the same size', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    final contact = tester.getSize(find.widgetWithText(OutlinedButton, 'Contact Me'));
    final resumeSizes = find
        .widgetWithText(GradientButton, 'Download Resume')
        .evaluate()
        .map((element) => tester.getSize(find.byWidget(element.widget)));

    expect(resumeSizes, contains(contact));
  }, variant: TargetPlatformVariant.only(TargetPlatform.macOS));

  testWidgets('download resume shows progress, then a done message, then resets', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    await tester.tap(find.widgetWithText(GradientButton, 'Download Resume').first);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.text('Downloading…'), findsOneWidget);

    await tester.pump(const Duration(milliseconds: 2000));
    await tester.pump(const Duration(milliseconds: 300));
    expect(find.text('Saved. Hire me?'), findsOneWidget);

    await tester.pump(const Duration(milliseconds: 2600));
    await tester.pumpAndSettle();
    expect(find.text('Saved. Hire me?'), findsNothing);
    expect(find.widgetWithText(GradientButton, 'Download Resume'), findsWidgets);
  });

  testWidgets('contact options render on the same horizontal line on desktop', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    // Scoped to the contact section, since "GitHub" is also a Tech Stack skill.
    Finder contact(String label) => find.descendant(of: find.byType(ContactSection), matching: find.text(label));
    final emailY = tester.getCenter(contact('Email')).dy;
    final linkedInY = tester.getCenter(contact('LinkedIn')).dy;
    final gitHubY = tester.getCenter(contact('GitHub')).dy;
    final youTubeY = tester.getCenter(contact('YouTube')).dy;

    expect((emailY - linkedInY).abs(), lessThan(1.0));
    expect((emailY - gitHubY).abs(), lessThan(1.0));
    expect((emailY - youTubeY).abs(), lessThan(1.0));
  });
}

