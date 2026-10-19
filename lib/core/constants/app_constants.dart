import 'package:flutter/widgets.dart';

abstract final class AppConstants {
  /// Content width excluding the horizontal page padding.
  static const double maxContentWidth = 1100;
  static const double headerHeight = 64;

  /// Side-by-side layouts that need extra room (hero intro line breaks, About text + cards)
  /// only switch on above this width; between desktop and this they stack or wrap naturally.
  static const double wideLayoutMinWidth = 1200;

  static const Duration scrollDuration = Duration(milliseconds: 650);
  static const Duration hoverDuration = Duration(milliseconds: 180);

  /// Light/dark cross-fade; the toggle knob moves on the same timing.
  static const Duration themeDuration = Duration(milliseconds: 350);
  static const Curve themeCurve = Curves.easeInOutCubic;
}

/// Width breakpoints shared by every responsive layout.
enum ScreenSize {
  mobile,
  tablet,
  desktop;

  static const double tabletMinWidth = 700;
  static const double desktopMinWidth = 1024;

  static ScreenSize fromWidth(double width) {
    if (width >= desktopMinWidth) return ScreenSize.desktop;
    if (width >= tabletMinWidth) return ScreenSize.tablet;
    return ScreenSize.mobile;
  }

  /// Only rebuilds the caller when the window size changes.
  static ScreenSize of(BuildContext context) => fromWidth(MediaQuery.sizeOf(context).width);

  bool get isMobile => this == ScreenSize.mobile;
  bool get isDesktop => this == ScreenSize.desktop;

  double get horizontalPadding => switch (this) {
    ScreenSize.mobile => 20,
    ScreenSize.tablet => 40,
    ScreenSize.desktop => 72,
  };
}

/// Page sections, in page order. Used for scroll tracking.
enum PortfolioSection {
  home('Home'),
  about('About'),
  skills('Skills'),
  experience('Experience'),
  projects('Projects'),
  contact('Contact');

  const PortfolioSection(this.label);

  final String label;

  /// Order of the links in the navigation bar.
  static const navOrder = [home, about, experience, projects, skills, contact];
}
