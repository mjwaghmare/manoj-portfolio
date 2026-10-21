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
import 'package:manoj_portfolio/widgets/reveal_on_scroll.dart';
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
    expect(find.text('Live Auction App'), findsWidgets);
  });

  testWidgets('sections reveal each time they scroll into view', (tester) async {
    await _pumpApp(tester, size: const Size(1440, 900));

    double headingOpacity() => tester
        .widget<FadeTransition>(
          find.descendant(
            of: find.ancestor(of: find.text('Featured Projects'), matching: find.byType(RevealOnScroll)),
            matching: find.byType(FadeTransition),
          ),
        )
        .opacity
        .value;

    expect(headingOpacity(), 0);

    await tester.tap(find.widgetWithText(TextButton, 'Projects'));
    await tester.pumpAndSettle();
    expect(headingOpacity(), 1);

    // Leaving resets it, and coming back plays it again.
    await tester.tap(find.widgetWithText(TextButton, 'Home'));
    await tester.pumpAndSettle();
    expect(headingOpacity(), 0);

    await tester.tap(find.widgetWithText(TextButton, 'Projects'));
    await tester.pumpAndSettle();
    expect(headingOpacity(), 1);
  });

  // Real phones change the pixel ratio or gesture settings after load, which makes the
  // Scrollable replace its ScrollPosition; reveals must follow the new one.
  testWidgets('sections still reveal after the scroll position is replaced', (tester) async {
    await _pumpApp(tester, size: const Size(390, 844));

    tester.view.devicePixelRatio = 2;
    tester.view.physicalSize = const Size(780, 1688);
    await tester.pumpAndSettle();

    await tester.drag(find.byType(SingleChildScrollView), const Offset(0, -900));
    await tester.pumpAndSettle();

    final fade = find.descendant(
      of: find.ancestor(of: find.text('Tech Stack'), matching: find.byType(RevealOnScroll)),
      matching: find.byType(FadeTransition),
    );
    expect(tester.widget<FadeTransition>(fade.first).opacity.value, 1);
  });

  testWidgets('a changed reveal delay applies to the next reveal', (tester) async {
    final controller = ScrollController();
    addTearDown(controller.dispose);
    Widget page(Duration delay) => MaterialApp(
      home: SingleChildScrollView(
        controller: controller,
        child: Column(
          children: [
            const SizedBox(height: 2000),
            RevealOnScroll(
              delay: delay,
              child: const SizedBox(height: 100, child: Text('late')),
            ),
            const SizedBox(height: 2000),
          ],
        ),
      ),
    );
    double opacity() => tester
        .widget<FadeTransition>(find.descendant(of: find.byType(RevealOnScroll), matching: find.byType(FadeTransition)))
        .opacity
        .value;

    await tester.pumpWidget(page(const Duration(seconds: 1)));
    await tester.pumpWidget(page(Duration.zero));

    controller.jumpTo(1800);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 600));

    // With the original one-second delay it would still be invisible here.
    expect(opacity(), 1);
  });

  testWidgets('reduced motion shows every section without animating', (tester) async {
    tester.platformDispatcher.accessibilityFeaturesTestValue = const FakeAccessibilityFeatures(disableAnimations: true);
    addTearDown(tester.platformDispatcher.clearAccessibilityFeaturesTestValue);
    await _pumpApp(tester, size: const Size(1440, 900));

    // Each reveal's own fade is its first; later ones belong to content such as the hidden copy button.
    final reveals = find.byType(RevealOnScroll).evaluate().toList();
    expect(reveals, isNotEmpty);
    for (final reveal in reveals) {
      final fade = find.descendant(of: find.byWidget(reveal.widget), matching: find.byType(FadeTransition)).first;
      expect(tester.widget<FadeTransition>(fade).opacity.value, 1);
    }
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
