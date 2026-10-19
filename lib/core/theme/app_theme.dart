import 'package:flutter/material.dart';

import 'app_fonts.dart';

/// Design tokens that don't map onto [ColorScheme]: gradients and per-component surfaces.
/// Read with `PortfolioColors.of(context)`.
///
/// Every value differs between themes only by color, never by a light/dark flag, so the
/// whole palette cross-fades smoothly when the theme changes (see [lerp]).
@immutable
class PortfolioColors extends ThemeExtension<PortfolioColors> {
  const PortfolioColors({
    required this.brandGradient,
    required this.buttonGradient,
    required this.accentGradient,
    required this.heroBody,
    required this.textMuted,
    required this.roleText,
    required this.navActive,
    required this.badgeBackground,
    required this.badgeText,
    required this.statCardBackground,
    required this.tileBackground,
    required this.tileBorder,
    required this.footerBackground,
    required this.tagBackground,
    required this.tagText,
    required this.link,
    required this.timelineLine,
    required this.timelineDot,
    required this.blob,
    required this.blobGlow,
    required this.handwriting,
    required this.cardShadow,
    required this.projectCardBackground,
    required this.projectCardBorder,
    required this.projectTitle,
    required this.projectBody,
    required this.contactIconBackground,
    required this.contactIcon,
    required this.outlineButtonBorder,
    required this.outlineButtonBackground,
    required this.toggleTrack,
    required this.toggleKnob,
    required this.toggleIcon,
  });

  final List<Color> brandGradient;
  final List<Color> buttonGradient;
  final List<Color> accentGradient;
  final Color heroBody;
  final Color textMuted;
  final Color roleText;

  /// Active nav link.
  final Color navActive;
  final Color badgeBackground;
  final Color badgeText;
  final Color statCardBackground;
  final Color tileBackground;
  final Color tileBorder;
  final Color footerBackground;

  /// Project cards stay light in dark mode (per the design), so their tags do too.
  final Color tagBackground;
  final Color tagText;
  final Color link;
  final Color timelineLine;
  final Color timelineDot;
  final Color blob;

  /// Soft halo behind the hero blob; transparent in light mode.
  final Color blobGlow;

  /// Handwritten hero note and its arrow.
  final Color handwriting;

  /// Hover/resting shadow for cards.
  final Color cardShadow;
  final Color projectCardBackground;
  final Color projectCardBorder;
  final Color projectTitle;
  final Color projectBody;
  final Color contactIconBackground;
  final Color contactIcon;
  final Color outlineButtonBorder;
  final Color outlineButtonBackground;
  final Color toggleTrack;
  final Color toggleKnob;
  final Color toggleIcon;

  static PortfolioColors of(BuildContext context) => Theme.of(context).extension<PortfolioColors>()!;

  static const light = PortfolioColors(
    brandGradient: [Color(0xFF0A5FE0), Color(0xFF5E3DF7)],
    buttonGradient: [Color(0xFF425CEA), Color(0xFF7B5EF4)],
    accentGradient: [Color(0xFF2B55EA), Color(0xFFA955FD)],
    heroBody: Color(0xFF505765),
    textMuted: Color(0xFF656B7F),
    roleText: Color(0xFF3E4353),
    navActive: Color(0xFF0B0F1A),
    badgeBackground: Color(0xFFEBF0FD),
    badgeText: Color(0xFF3E4A66),
    statCardBackground: Color(0xFFF4F6FD),
    tileBackground: Color(0xFFF7F8FA),
    tileBorder: Color(0xFFEEF0F4),
    footerBackground: Color(0xFFF7F8FA),
    tagBackground: Color(0xFFE8F0FC),
    tagText: Color(0xFF2D66D8),
    link: Color(0xFF345DE3),
    timelineLine: Color(0xFFC5CDE3),
    timelineDot: Color(0xFF0E5EEF),
    blob: Color(0xFFDDE7FC),
    blobGlow: Color(0x00DDE7FC),
    handwriting: Color(0xFF2A2F3A),
    cardShadow: Color(0x12000000),
    projectCardBackground: Color(0xFFFFFFFF),
    projectCardBorder: Color(0xFFE8EBF1),
    projectTitle: Color(0xFF0B0F1A),
    projectBody: Color(0xFF5A6070),
    contactIconBackground: Color(0xFFECF1FD),
    contactIcon: Color(0xFF2257F6),
    outlineButtonBorder: Color(0xFFD9DCE3),
    outlineButtonBackground: Color(0xFFFFFFFF),
    toggleTrack: Color(0xFFF2F4F7),
    toggleKnob: Color(0xFF0F1420),
    toggleIcon: Color(0xFF1C2731),
  );

  static const dark = PortfolioColors(
    brandGradient: [Color(0xFF3792F5), Color(0xFF704DF7)],
    buttonGradient: [Color(0xFF4B5BEB), Color(0xFF7057F0)],
    accentGradient: [Color(0xFF3B63F0), Color(0xFF6D7CF5)],
    heroBody: Color(0xFFE6E8EE),
    textMuted: Color(0xFFA3AAB8),
    roleText: Color(0xFFC9CED8),
    navActive: Color(0xFF5B7BF0),
    badgeBackground: Color(0xFF272D3B),
    badgeText: Color(0xFFD7DCE6),
    statCardBackground: Color(0xFF101720),
    tileBackground: Color(0xFF111720),
    tileBorder: Color(0xFF19212C),
    footerBackground: Color(0xFF0F161F),
    tagBackground: Color(0xFFE8F0FC),
    tagText: Color(0xFF2D66D8),
    link: Color(0xFF5B7BE0),
    timelineLine: Color(0xFF2A3550),
    timelineDot: Color(0xFF3B7BF6),
    blob: Color(0xFF17205A),
    blobGlow: Color(0xB317205A),
    handwriting: Color(0xFFD5D9E2),
    cardShadow: Color(0x59000000),
    projectCardBackground: Color(0xFFFFFFFF),
    projectCardBorder: Color(0xFFDCE2EE),
    projectTitle: Color(0xFF0B0F1A),
    projectBody: Color(0xFF5A6070),
    contactIconBackground: Color(0xFF242C41),
    contactIcon: Color(0xFF8EA2E0),
    outlineButtonBorder: Color(0xFF3A4150),
    outlineButtonBackground: Color(0x00080E16),
    toggleTrack: Color(0xFF161D29),
    toggleKnob: Color(0xFF2C3445),
    toggleIcon: Color(0xFFE5E7EB),
  );

  @override
  PortfolioColors copyWith() => this;

  @override
  PortfolioColors lerp(PortfolioColors? other, double t) {
    if (other == null) return this;
    Color c(Color a, Color b) => Color.lerp(a, b, t)!;
    List<Color> g(List<Color> a, List<Color> b) => [for (var i = 0; i < a.length; i++) c(a[i], b[i])];

    return PortfolioColors(
      brandGradient: g(brandGradient, other.brandGradient),
      buttonGradient: g(buttonGradient, other.buttonGradient),
      accentGradient: g(accentGradient, other.accentGradient),
      heroBody: c(heroBody, other.heroBody),
      textMuted: c(textMuted, other.textMuted),
      roleText: c(roleText, other.roleText),
      navActive: c(navActive, other.navActive),
      badgeBackground: c(badgeBackground, other.badgeBackground),
      badgeText: c(badgeText, other.badgeText),
      statCardBackground: c(statCardBackground, other.statCardBackground),
      tileBackground: c(tileBackground, other.tileBackground),
      tileBorder: c(tileBorder, other.tileBorder),
      footerBackground: c(footerBackground, other.footerBackground),
      tagBackground: c(tagBackground, other.tagBackground),
      tagText: c(tagText, other.tagText),
      link: c(link, other.link),
      timelineLine: c(timelineLine, other.timelineLine),
      timelineDot: c(timelineDot, other.timelineDot),
      blob: c(blob, other.blob),
      blobGlow: c(blobGlow, other.blobGlow),
      handwriting: c(handwriting, other.handwriting),
      cardShadow: c(cardShadow, other.cardShadow),
      projectCardBackground: c(projectCardBackground, other.projectCardBackground),
      projectCardBorder: c(projectCardBorder, other.projectCardBorder),
      projectTitle: c(projectTitle, other.projectTitle),
      projectBody: c(projectBody, other.projectBody),
      contactIconBackground: c(contactIconBackground, other.contactIconBackground),
      contactIcon: c(contactIcon, other.contactIcon),
      outlineButtonBorder: c(outlineButtonBorder, other.outlineButtonBorder),
      outlineButtonBackground: c(outlineButtonBackground, other.outlineButtonBackground),
      toggleTrack: c(toggleTrack, other.toggleTrack),
      toggleKnob: c(toggleKnob, other.toggleKnob),
      toggleIcon: c(toggleIcon, other.toggleIcon),
    );
  }
}

abstract final class AppTheme {
  /// Kept in sync with the pre-load background in `web/index.html`.
  static const Color lightBackground = Color(0xFFFDFDFE);
  static const Color darkBackground = Color(0xFF080E16);

  static final ThemeData light = _build(
    brightness: Brightness.light,
    background: lightBackground,
    surface: const Color(0xFFFFFFFF),
    border: const Color(0xFFECEEF3),
    heading: const Color(0xFF0B0F1A),
    body: const Color(0xFF505765),
    primary: const Color(0xFF345DE3),
    extension: PortfolioColors.light,
  );

  static final ThemeData dark = _build(
    brightness: Brightness.dark,
    background: darkBackground,
    surface: const Color(0xFF101720),
    border: const Color(0xFF1C2430),
    heading: const Color(0xFFF5F7FA),
    body: const Color(0xFF9AA3B2),
    primary: const Color(0xFF5B7BF0),
    extension: PortfolioColors.dark,
  );

  static ThemeData _build({
    required Brightness brightness,
    required Color background,
    required Color surface,
    required Color border,
    required Color heading,
    required Color body,
    required Color primary,
    required PortfolioColors extension,
  }) {
    final colorScheme = ColorScheme.fromSeed(seedColor: primary, brightness: brightness).copyWith(
      primary: primary,
      onPrimary: Colors.white,
      primaryContainer: extension.badgeBackground,
      onPrimaryContainer: extension.badgeText,
      surface: surface,
      onSurface: heading,
      onSurfaceVariant: body,
      surfaceContainerLow: extension.tileBackground,
      outline: body,
      outlineVariant: border,
    );

    final textTheme = _textTheme(heading: heading, body: body);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: background,
      fontFamily: AppFonts.primary,
      textTheme: textTheme,
      extensions: [extension],
      dividerTheme: DividerThemeData(color: border, thickness: 1, space: 1),
      // Buttons skip their own color animation so they track the theme cross-fade frame by
      // frame; otherwise each restarts a 200ms tween every frame and lags behind the page.
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(10))),
          textStyle: textTheme.labelLarge,
          animationDuration: Duration.zero,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(style: OutlinedButton.styleFrom(animationDuration: Duration.zero)),
      iconButtonTheme: IconButtonThemeData(
        style: IconButton.styleFrom(foregroundColor: heading, animationDuration: Duration.zero),
      ),
      tooltipTheme: const TooltipThemeData(waitDuration: Duration(milliseconds: 400)),
      drawerTheme: DrawerThemeData(backgroundColor: background, surfaceTintColor: Colors.transparent),
    );
  }

  static TextTheme _textTheme({required Color heading, required Color body}) {
    return TextTheme(
      // Hero headline: desktop / tablet / mobile.
      displayLarge: TextStyle(
        fontSize: 42,
        height: 1.18,
        fontWeight: FontWeight.w800,
        letterSpacing: -1,
        color: heading,
      ),
      displayMedium: TextStyle(
        fontSize: 38,
        height: 1.18,
        fontWeight: FontWeight.w800,
        letterSpacing: -0.9,
        color: heading,
      ),
      displaySmall: TextStyle(
        fontSize: 31,
        height: 1.2,
        fontWeight: FontWeight.w800,
        letterSpacing: -0.6,
        color: heading,
      ),
      // Section titles: desktop / mobile.
      headlineMedium: TextStyle(
        fontSize: 29,
        height: 1.25,
        fontWeight: FontWeight.w700,
        letterSpacing: -0.5,
        color: heading,
      ),
      headlineSmall: TextStyle(
        fontSize: 24,
        height: 1.25,
        fontWeight: FontWeight.w700,
        letterSpacing: -0.4,
        color: heading,
      ),
      titleLarge: TextStyle(
        fontSize: 18,
        height: 1.4,
        fontWeight: FontWeight.w700,
        letterSpacing: -0.2,
        color: heading,
      ),
      titleMedium: TextStyle(fontSize: 16, height: 1.4, fontWeight: FontWeight.w700, color: heading),
      titleSmall: TextStyle(fontSize: 15, height: 1.4, fontWeight: FontWeight.w600, color: heading),
      bodyLarge: TextStyle(fontSize: 19, height: 1.78, fontWeight: FontWeight.w400, color: body),
      bodyMedium: TextStyle(fontSize: 16.5, height: 1.72, fontWeight: FontWeight.w400, color: body),
      bodySmall: TextStyle(fontSize: 15, height: 1.65, fontWeight: FontWeight.w400, color: body),
      labelLarge: const TextStyle(fontSize: 15, height: 1.2, fontWeight: FontWeight.w600),
      labelMedium: TextStyle(fontSize: 14, height: 1.3, fontWeight: FontWeight.w500, color: body),
      labelSmall: TextStyle(fontSize: 13, height: 1.3, fontWeight: FontWeight.w500, color: body),
    );
  }
}
