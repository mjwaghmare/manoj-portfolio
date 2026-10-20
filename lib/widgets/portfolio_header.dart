import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../core/theme/theme_provider.dart';
import '../data/portfolio_data.dart';
import 'resume_download_button.dart';
import 'section_container.dart';

/// Sticky top bar: logo, centered section navigation and theme toggle.
/// Navigation collapses into the end drawer below desktop width.
class PortfolioHeader extends StatelessWidget {
  const PortfolioHeader({
    required this.activeSection,
    required this.onNavigate,
    required this.themeProvider,
    super.key,
  });

  final ValueListenable<PortfolioSection> activeSection;
  final ValueChanged<PortfolioSection> onNavigate;
  final ThemeProvider themeProvider;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final showInlineNav = ScreenSize.of(context).isDesktop;
    final logo = BrandLogo(onTap: () => onNavigate(PortfolioSection.home));

    return Semantics(
      container: true,
      explicitChildNodes: true,
      child: Container(
        height: AppConstants.headerHeight,
        decoration: BoxDecoration(
          color: theme.scaffoldBackgroundColor,
          border: Border(bottom: BorderSide(color: colors.tileBorder)),
        ),
        child: ContentWidth(
          child: Row(
            children: [
              logo,
              if (showInlineNav)
                Expanded(
                  child: Center(
                    // Scales down rather than overflowing under large text settings.
                    child: FittedBox(
                      fit: BoxFit.scaleDown,
                      child: _NavItems(activeSection: activeSection, onNavigate: onNavigate),
                    ),
                  ),
                )
              else
                const Spacer(),
              ThemeTogglePill(themeProvider: themeProvider),
              if (!showInlineNav) ...[
                const SizedBox(width: 8),
                IconButton(
                  tooltip: 'Open navigation menu',
                  onPressed: () => Scaffold.of(context).openEndDrawer(),
                  icon: const Icon(Icons.menu_rounded),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// Brand logo image.
class BrandLogo extends StatelessWidget {
  const BrandLogo({this.onTap, this.logoHeight = 24, super.key});

  final VoidCallback? onTap;
  final double logoHeight;

  @override
  Widget build(BuildContext context) {
    final profile = PortfolioData.profile;

    if (onTap == null) return Image.asset(profile.logoAsset, height: logoHeight, semanticLabel: profile.name);

    final content = Image.asset(profile.logoAsset, height: logoHeight, excludeFromSemantics: true);
    return Semantics(
      button: true,
      label: '${profile.name}, back to top',
      excludeSemantics: true,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Padding(padding: const EdgeInsets.symmetric(vertical: 8), child: content),
      ),
    );
  }
}

class _NavItems extends StatelessWidget {
  const _NavItems({required this.activeSection, required this.onNavigate});

  final ValueListenable<PortfolioSection> activeSection;
  final ValueChanged<PortfolioSection> onNavigate;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final activeColor = colors.navActive;

    // Only the nav items rebuild while scrolling, not the whole header.
    return ValueListenableBuilder<PortfolioSection>(
      valueListenable: activeSection,
      builder: (context, active, _) => Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (final section in PortfolioSection.navOrder)
            Semantics(
              selected: section == active,
              child: TextButton(
                onPressed: () => onNavigate(section),
                style: TextButton.styleFrom(
                  foregroundColor: section == active ? activeColor : colors.textMuted,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  textStyle: theme.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w500),
                ),
                child: Text(section.label),
              ),
            ),
        ],
      ),
    );
  }
}

/// Sun/moon pill. The knob sits on the theme a tap will switch to.
class ThemeTogglePill extends StatelessWidget {
  const ThemeTogglePill({required this.themeProvider, super.key});

  final ThemeProvider themeProvider;

  static const double _width = 76;
  static const double _height = 40;
  static const double _knob = 32;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(listenable: themeProvider, builder: (context, _) => _build(context));
  }

  Widget _build(BuildContext context) {
    // The theme being switched *to*, not the one still fading out, so the knob moves on tap.
    final brightness = themeProvider.resolveBrightness(MediaQuery.platformBrightnessOf(context));
    final isDark = brightness == Brightness.dark;
    final colors = PortfolioColors.of(context);
    final duration = MediaQuery.disableAnimationsOf(context) ? Duration.zero : AppConstants.themeDuration;

    Widget slotIcon(IconData icon, {required bool onKnob}) => SizedBox.square(
      dimension: _knob,
      child: TweenAnimationBuilder<Color?>(
        tween: ColorTween(end: onKnob ? Colors.white : colors.toggleIcon),
        duration: duration,
        builder: (context, color, _) => Icon(icon, size: 18, color: color),
      ),
    );

    return Tooltip(
      message: isDark ? 'Switch to light theme' : 'Switch to dark theme',
      child: Semantics(
        button: true,
        label: isDark ? 'Switch to light theme' : 'Switch to dark theme',
        excludeSemantics: true,
        child: Material(
          color: colors.toggleTrack,
          // Follow the theme cross-fade directly rather than re-animating each frame.
          animationDuration: Duration.zero,
          shape: const StadiumBorder(),
          clipBehavior: Clip.antiAlias,
          child: InkWell(
            onTap: () => themeProvider.toggleTheme(brightness),
            child: SizedBox(
              width: _width,
              height: _height,
              child: Padding(
                padding: const EdgeInsets.all(4),
                child: Stack(
                  children: [
                    AnimatedAlign(
                      duration: duration,
                      curve: AppConstants.themeCurve,
                      alignment: isDark ? Alignment.centerLeft : Alignment.centerRight,
                      child: Container(
                        width: _knob,
                        height: _knob,
                        decoration: BoxDecoration(color: colors.toggleKnob, shape: BoxShape.circle),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        slotIcon(Icons.light_mode_outlined, onKnob: isDark),
                        slotIcon(Icons.dark_mode, onKnob: !isDark),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Navigation drawer for mobile and tablet widths.
class MobileNavDrawer extends StatelessWidget {
  const MobileNavDrawer({required this.activeSection, required this.onNavigate, super.key});

  final ValueListenable<PortfolioSection> activeSection;
  final ValueChanged<PortfolioSection> onNavigate;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return Drawer(
      width: 300,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 12, 12, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Align(
                alignment: Alignment.centerRight,
                child: IconButton(
                  tooltip: 'Close navigation menu',
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.close_rounded),
                ),
              ),
              const SizedBox(height: 8),
              ValueListenableBuilder<PortfolioSection>(
                valueListenable: activeSection,
                builder: (context, active, _) => Column(
                  children: [
                    for (final section in PortfolioSection.navOrder)
                      ListTile(
                        selected: section == active,
                        selectedColor: theme.colorScheme.primary,
                        selectedTileColor: colors.badgeBackground,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        title: Text(
                          section.label,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: section == active ? theme.colorScheme.primary : null,
                          ),
                        ),
                        onTap: () {
                          Navigator.of(context).pop();
                          onNavigate(section);
                        },
                      ),
                  ],
                ),
              ),
              const Spacer(),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: ResumeDownloadButton(url: PortfolioData.profile.resumeUrl, colors: colors.buttonGradient),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
