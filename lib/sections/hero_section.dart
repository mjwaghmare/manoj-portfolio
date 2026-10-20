import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_fonts.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../widgets/fade_slide_in.dart';
import '../widgets/gradient_widgets.dart';
import '../widgets/resume_download_button.dart';
import '../widgets/section_container.dart';

/// Shared by both hero buttons so they render at identical sizes.
const _heroButtonSize = Size(180, 48);

class HeroSection extends StatelessWidget {
  const HeroSection({required this.onNavigate, super.key});

  final ValueChanged<PortfolioSection> onNavigate;

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    final intro = _HeroIntro(onNavigate: onNavigate);

    return SectionContainer(
      topPadding: screen.isMobile ? 24 : 22,
      bottomPadding: screen.isMobile ? 24 : 44,
      child: screen.isDesktop
          ? Row(
              children: [
                Expanded(flex: 57, child: intro),
                const Expanded(
                  flex: 43,
                  child: FadeSlideIn(
                    delay: Duration(milliseconds: 150),
                    child: Align(alignment: Alignment.centerRight, child: _HeroVisual()),
                  ),
                ),
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 360), child: const _HeroVisual()),
                ),
                const SizedBox(height: 28),
                intro,
              ],
            ),
    );
  }
}

class _HeroIntro extends StatelessWidget {
  const _HeroIntro({required this.onNavigate});

  final ValueChanged<PortfolioSection> onNavigate;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textTheme = theme.textTheme;
    final colors = PortfolioColors.of(context);
    final screen = ScreenSize.of(context);
    final profile = PortfolioData.profile;

    final headlineStyle = switch (screen) {
      ScreenSize.desktop => textTheme.displayLarge,
      ScreenSize.tablet => textTheme.displayMedium,
      ScreenSize.mobile => textTheme.displaySmall,
    };

    return FadeSlideIn(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Keeps the name above the fold now that the headline describes the work instead.
          Text(
            '${profile.name} · ${profile.role}'.toUpperCase(),
            semanticsLabel: '${profile.name}, ${profile.role}',
            style: TextStyle(
              fontSize: screen.isMobile ? 11 : 13.5,
              fontWeight: FontWeight.w700,
              letterSpacing: screen.isMobile ? 1 : 1.6,
              color: colors.link,
            ),
          ),
          const SizedBox(height: 14),
          _Headline(text: profile.headline, accent: profile.headlineAccent, style: headlineStyle),
          const SizedBox(height: 18),
          Text(
            // Designed line breaks only where the column is wide enough to hold each line.
            profile.heroIntroLines.join(
              MediaQuery.sizeOf(context).width >= AppConstants.wideLayoutMinWidth ? '\n' : ' ',
            ),
            style: textTheme.bodyLarge?.copyWith(color: colors.heroBody, fontSize: screen.isMobile ? 17 : null),
          ),
          const SizedBox(height: 32),
          Wrap(
            spacing: 18,
            runSpacing: 14,
            children: [
              ResumeDownloadButton(
                url: profile.resumeUrl,
                colors: colors.buttonGradient,
                width: _heroButtonSize.width,
                height: _heroButtonSize.height,
                horizontalPadding: 16,
                fontSize: 15,
              ),
              _OutlineButton(label: 'Contact Me', onPressed: () => onNavigate(PortfolioSection.contact)),
            ],
          ),
        ],
      ),
    );
  }
}

/// Hero heading whose trailing [accent] is painted with the brand gradient.
class _Headline extends StatelessWidget {
  const _Headline({required this.text, required this.accent, required this.style});

  final String text;
  final String accent;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    final Widget content = text.endsWith(accent) && accent.isNotEmpty
        ? Text.rich(
            TextSpan(
              children: [
                TextSpan(text: text.substring(0, text.length - accent.length)),
                // A widget span keeps the full gradient across the accent wherever it wraps.
                WidgetSpan(
                  alignment: PlaceholderAlignment.baseline,
                  baseline: TextBaseline.alphabetic,
                  child: GradientText(accent, colors: PortfolioColors.of(context).brandGradient, style: style),
                ),
              ],
            ),
            style: style,
          )
        : Text(text, style: style);

    return Semantics(header: true, label: text, excludeSemantics: true, child: content);
  }
}

class _OutlineButton extends StatelessWidget {
  const _OutlineButton({required this.label, required this.onPressed});

  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        fixedSize: _heroButtonSize,
        // Desktop web defaults to compact density, which would shrink this below the gradient button.
        visualDensity: VisualDensity.standard,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        side: BorderSide(color: colors.outlineButtonBorder, width: 1.2),
        backgroundColor: colors.outlineButtonBackground,
        foregroundColor: theme.colorScheme.onSurface,
        textStyle: theme.textTheme.labelLarge?.copyWith(fontSize: 15),
      ),
      child: Text(label),
    );
  }
}

/// Portrait over an organic blob, with the handwritten note and arrow.
/// Laid out on a fixed canvas and scaled down to fit narrower screens.
class _HeroVisual extends StatelessWidget {
  const _HeroVisual();

  static const double _width = 500;
  static const double _height = 440;

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    final profile = PortfolioData.profile;
    final photo = profile.photoAsset;
    final noteColor = colors.handwriting;

    return FittedBox(
      fit: BoxFit.scaleDown,
      child: SizedBox(
        width: _width,
        height: _height,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Positioned(
              left: 0,
              top: 56,
              width: 390,
              height: 384,
              child: CustomPaint(
                painter: _BlobPainter(color: colors.blob, glowColor: colors.blobGlow),
              ),
            ),
            if (photo != null)
              // Cut-out portrait standing on the bottom edge at its natural aspect ratio,
              // so shoulders and hands aren't cropped.
              Positioned(
                left: 4,
                right: 26,
                top: 0,
                bottom: 0,
                child: ClipRRect(
                  borderRadius: const BorderRadius.vertical(bottom: Radius.circular(18)),
                  child: Image.asset(
                    photo,
                    fit: BoxFit.contain,
                    alignment: Alignment.bottomCenter,
                    filterQuality: FilterQuality.medium,
                    semanticLabel: 'Portrait of ${profile.name}',
                  ),
                ),
              )
            else
              Positioned(
                left: 58,
                top: 96,
                child: _MonogramPortrait(initials: profile.initials, name: profile.name),
              ),
            if (profile.handwrittenNote.isNotEmpty) ...[
              Positioned(
                right: 0,
                top: 24,
                child: ExcludeSemantics(
                  child: Transform.rotate(
                    angle: -0.2,
                    child: Text(
                      profile.handwrittenNote.join('\n'),
                      textAlign: TextAlign.center,
                      style: TextStyle(fontFamily: AppFonts.handwritten, fontSize: 27, height: 1.08, color: noteColor),
                    ),
                  ),
                ),
              ),
              Positioned(
                right: 14,
                top: 168,
                width: 48,
                height: 84,
                child: CustomPaint(painter: _ArrowPainter(color: noteColor)),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _MonogramPortrait extends StatelessWidget {
  const _MonogramPortrait({required this.initials, required this.name});

  final String initials;
  final String name;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return Container(
      width: 290,
      height: 290,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        shape: BoxShape.circle,
        border: Border.all(color: theme.colorScheme.outlineVariant, width: 1.5),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 30, offset: const Offset(0, 14)),
        ],
      ),
      child: Semantics(
        label: 'Monogram of $name',
        excludeSemantics: true,
        child: GradientText(
          initials,
          colors: colors.brandGradient,
          style: const TextStyle(fontSize: 104, height: 1, fontWeight: FontWeight.w800, letterSpacing: -3),
        ),
      ),
    );
  }
}

/// Smooth organic shape drawn through a closed Catmull-Rom spline.
class _BlobPainter extends CustomPainter {
  const _BlobPainter({required this.color, required this.glowColor});

  final Color color;

  /// Blurred halo; fully transparent in light mode, so it fades in with the dark theme.
  final Color glowColor;

  static const _points = [
    Offset(0.22, 0.30),
    Offset(0.55, 0.12),
    Offset(0.80, 0.02),
    Offset(0.97, 0.30),
    Offset(0.96, 0.72),
    Offset(0.70, 0.97),
    Offset(0.30, 0.95),
    Offset(0.03, 0.70),
  ];

  @override
  void paint(Canvas canvas, Size size) {
    final pts = [for (final p in _points) Offset(p.dx * size.width, p.dy * size.height)];
    final path = Path()..moveTo(pts[0].dx, pts[0].dy);
    for (var i = 0; i < pts.length; i++) {
      final p0 = pts[(i - 1 + pts.length) % pts.length];
      final p1 = pts[i];
      final p2 = pts[(i + 1) % pts.length];
      final p3 = pts[(i + 2) % pts.length];
      path.cubicTo(
        p1.dx + (p2.dx - p0.dx) / 6,
        p1.dy + (p2.dy - p0.dy) / 6,
        p2.dx - (p3.dx - p1.dx) / 6,
        p2.dy - (p3.dy - p1.dy) / 6,
        p2.dx,
        p2.dy,
      );
    }
    path.close();

    if (glowColor.a > 0) {
      canvas.drawPath(
        path,
        Paint()
          ..color = glowColor
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 28),
      );
    }
    canvas.drawPath(path, Paint()..color = color);
  }

  @override
  bool shouldRepaint(_BlobPainter oldDelegate) => oldDelegate.color != color || oldDelegate.glowColor != glowColor;
}

/// Hand-drawn style arrow curving down and to the left.
class _ArrowPainter extends CustomPainter {
  const _ArrowPainter({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 1.8
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final start = Offset(size.width * 0.78, 0);
    final end = Offset(size.width * 0.12, size.height * 0.9);
    final control = Offset(size.width * 1.05, size.height * 0.75);
    canvas.drawPath(
      Path()
        ..moveTo(start.dx, start.dy)
        ..quadraticBezierTo(control.dx, control.dy, end.dx, end.dy),
      paint,
    );

    // Arrowhead aligned with the curve's final direction.
    final direction = math.atan2(end.dy - control.dy, end.dx - control.dx);
    const headLength = 12.0;
    for (final spread in const [0.5, -0.5]) {
      final angle = direction + math.pi + spread;
      canvas.drawLine(end, end + Offset(math.cos(angle), math.sin(angle)) * headLength, paint);
    }
  }

  @override
  bool shouldRepaint(_ArrowPainter oldDelegate) => oldDelegate.color != color;
}
