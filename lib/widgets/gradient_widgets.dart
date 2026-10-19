import 'package:flutter/material.dart';

/// Text painted with a left-to-right gradient.
///
/// The gradient is the glyphs' own paint rather than a mask over the text box, so
/// descenders that extend below the line box (e.g. "j", "g") are coloured too.
class GradientText extends StatelessWidget {
  const GradientText(this.text, {required this.colors, this.style, super.key});

  final String text;
  final List<Color> colors;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    final effectiveStyle = DefaultTextStyle.of(context).style.merge(style);

    // Measure the single-line width so the gradient spans exactly the text.
    final painter = TextPainter(
      text: TextSpan(text: text, style: effectiveStyle),
      textDirection: Directionality.of(context),
      textScaler: MediaQuery.textScalerOf(context),
      maxLines: 1,
    )..layout();
    final shader = LinearGradient(colors: colors).createShader(Offset.zero & painter.size);
    painter.dispose();

    // copyWith drops the inherited solid color, since a style can't have both color and foreground.
    return Text(text, style: effectiveStyle.copyWith(foreground: Paint()..shader = shader));
  }
}

/// Short gradient bar placed after section titles.
class AccentLine extends StatelessWidget {
  const AccentLine({required this.colors, this.width = 44, super.key});

  final List<Color> colors;
  final double width;

  @override
  Widget build(BuildContext context) {
    return ExcludeSemantics(
      child: Container(
        width: width,
        height: 3,
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: colors),
          borderRadius: BorderRadius.circular(2),
        ),
      ),
    );
  }
}

/// Filled button with a gradient background and an optional soft glow.
class GradientButton extends StatelessWidget {
  const GradientButton({
    required this.label,
    required this.onPressed,
    required this.colors,
    this.width,
    this.height = 54,
    this.horizontalPadding = 32,
    this.radius = 12,
    this.glow = true,
    this.fontSize = 15.5,
    super.key,
  });

  final String label;
  final VoidCallback? onPressed;

  /// Fixed width; when null the button sizes to its label plus [horizontalPadding].
  final double? width;
  final List<Color> colors;
  final double height;
  final double horizontalPadding;
  final double radius;
  final bool glow;
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    final borderRadius = BorderRadius.circular(radius);

    return Semantics(
      button: true,
      enabled: onPressed != null,
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: borderRadius,
          boxShadow: [
            if (glow) BoxShadow(color: colors.last.withValues(alpha: 0.28), blurRadius: 18, offset: const Offset(0, 8)),
          ],
        ),
        child: Material(
          type: MaterialType.transparency,
          child: Ink(
            width: width,
            height: height,
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: colors),
              borderRadius: borderRadius,
            ),
            child: InkWell(
              onTap: onPressed,
              borderRadius: borderRadius,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
                child: Center(
                  widthFactor: 1,
                  child: Text(
                    label,
                    maxLines: 1,
                    style: TextStyle(fontSize: fontSize, fontWeight: FontWeight.w600, color: Colors.white),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
