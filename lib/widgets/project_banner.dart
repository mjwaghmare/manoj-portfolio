import 'package:flutter/material.dart';

import '../core/theme/app_fonts.dart';
import '../models/project_model.dart';

/// The artwork at the top of a project card, drawn from the project's data so every
/// card shares one look.
///
/// By default it shows the project's headline beside two illustrated phones in the
/// project's colours, so client apps never need their screenshots. A project with three
/// [ProjectModel.screens] shows them in three phone frames instead.
class ProjectBanner extends StatelessWidget {
  const ProjectBanner({required this.project, super.key});

  final ProjectModel project;

  @override
  Widget build(BuildContext context) {
    final colors = project.bannerGradient;
    final screens = project.screens;

    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final height = constraints.maxHeight;
        final hasScreens = screens.length == 3;

        return ClipRect(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: colors),
            ),
            child: Stack(
              children: [
                // Soft glow behind the phones.
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        center: hasScreens ? const Alignment(0, 0.2) : const Alignment(0.5, 0.2),
                        radius: 1,
                        colors: [Colors.white.withValues(alpha: 0.2), Colors.white.withValues(alpha: 0)],
                      ),
                    ),
                  ),
                ),
                if (hasScreens)
                  Semantics(
                    image: true,
                    label: '${project.title} app screenshots',
                    child: Stack(
                      children: [
                        _place(
                          width,
                          height,
                          left: 0.105,
                          top: 0.2,
                          size: 0.27,
                          angle: -0.08,
                          screen: _Screenshot(screens[0]),
                        ),
                        _place(
                          width,
                          height,
                          left: 0.625,
                          top: 0.2,
                          size: 0.27,
                          angle: 0.08,
                          screen: _Screenshot(screens[2]),
                        ),
                        _place(
                          width,
                          height,
                          left: 0.345,
                          top: 0.07,
                          size: 0.31,
                          angle: 0,
                          screen: _Screenshot(screens[1]),
                        ),
                      ],
                    ),
                  )
                else ...[
                  Positioned(
                    left: width * 0.064,
                    top: 0,
                    bottom: 0,
                    // Ends short of the front phone (left edge at 55%) so text never touches it.
                    width: width * 0.45,
                    child: _Headline(project: project),
                  ),
                  // Back phone first so the front one overlaps it.
                  ExcludeSemantics(
                    child: Stack(
                      children: [
                        _place(
                          width,
                          height,
                          left: 0.74,
                          top: 0.25,
                          size: 0.25,
                          angle: 0.157,
                          screen: _SketchScreen(colors),
                        ),
                        _place(
                          width,
                          height,
                          left: 0.55,
                          top: 0.12,
                          size: 0.29,
                          angle: -0.052,
                          screen: _SketchScreen(colors),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  /// Positions a phone by fractions of the banner: [left]/[top] of its corner, [size] of its width.
  Widget _place(
    double width,
    double height, {
    required double left,
    required double top,
    required double size,
    required double angle,
    required Widget screen,
  }) {
    final phoneWidth = width * size;
    return Positioned(
      left: width * left,
      top: height * top,
      width: phoneWidth,
      height: phoneWidth * _PhoneFrame.aspectRatio,
      child: Transform.rotate(
        angle: angle,
        child: _PhoneFrame(screen: screen),
      ),
    );
  }
}

class _Headline extends StatelessWidget {
  const _Headline({required this.project});

  final ProjectModel project;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          project.category.toUpperCase(),
          style: TextStyle(
            fontSize: 10.5,
            fontWeight: FontWeight.w700,
            letterSpacing: 1.2,
            color: Colors.white.withValues(alpha: 0.78),
          ),
        ),
        const SizedBox(height: 8),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(text: '${project.headline} '),
              TextSpan(
                text: project.headlineAccent,
                style: const TextStyle(
                  fontFamily: AppFonts.editorial,
                  fontStyle: FontStyle.italic,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          style: const TextStyle(
            fontSize: 21,
            height: 1.2,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.3,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}

class _PhoneFrame extends StatelessWidget {
  const _PhoneFrame({required this.screen});

  final Widget screen;

  /// Height / width of a modern iPhone, including the bezel.
  static const aspectRatio = 2.05;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final bezel = w * 0.035;
        final screenWidth = w - bezel * 2;

        return DecoratedBox(
          decoration: BoxDecoration(
            color: const Color(0xFF0B0C10),
            borderRadius: BorderRadius.circular(w * 0.16),
            border: Border.all(color: const Color(0xFF3A3D46), width: w * 0.008),
            boxShadow: const [BoxShadow(color: Color(0x61000000), blurRadius: 28, offset: Offset(0, 14))],
          ),
          child: Padding(
            padding: EdgeInsets.all(bezel),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(w * 0.13),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ColoredBox(color: Colors.white, child: screen),
                  // Dynamic Island, sized to also cover the one baked into store screenshots.
                  Align(
                    alignment: Alignment.topCenter,
                    child: Container(
                      margin: EdgeInsets.only(top: screenWidth * 0.025),
                      width: screenWidth * 0.34,
                      height: screenWidth * 0.1,
                      decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(w)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _Screenshot extends StatelessWidget {
  const _Screenshot(this.asset);

  final String asset;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      asset,
      fit: BoxFit.fitWidth,
      alignment: Alignment.topCenter,
      // Phones render a few hundred pixels wide at most.
      cacheWidth: 400,
    );
  }
}

/// An illustrated app screen in the project's colours: header card, chips and two list rows.
class _SketchScreen extends StatelessWidget {
  const _SketchScreen(this.colors);

  final List<Color> colors;

  @override
  Widget build(BuildContext context) {
    final accent = colors.first;
    final tint = Color.lerp(accent, Colors.white, 0.8)!;
    final line = Color.lerp(accent, Colors.white, 0.5)!;

    return LayoutBuilder(
      builder: (context, constraints) {
        // Laid out for a ~92px-wide screen and scaled to the real width.
        final s = constraints.maxWidth / 92;
        Widget bar(double widthFactor, Color color) => FractionallySizedBox(
          widthFactor: widthFactor,
          alignment: Alignment.centerLeft,
          child: Container(
            height: 4 * s,
            decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(2 * s)),
          ),
        );
        Widget chip(Color color) => Expanded(
          child: Container(
            height: 9 * s,
            decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(5 * s)),
          ),
        );
        Widget row() => Container(
          margin: EdgeInsets.only(top: 6 * s),
          padding: EdgeInsets.all(4 * s),
          decoration: BoxDecoration(color: const Color(0xFFF5F7FB), borderRadius: BorderRadius.circular(7 * s)),
          child: Row(
            children: [
              Container(
                width: 20 * s,
                height: 20 * s,
                decoration: BoxDecoration(color: tint, borderRadius: BorderRadius.circular(5 * s)),
              ),
              SizedBox(width: 5 * s),
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    bar(0.8, line),
                    SizedBox(height: 3 * s),
                    bar(0.5, tint),
                  ],
                ),
              ),
            ],
          ),
        );

        return Padding(
          padding: EdgeInsets.fromLTRB(7 * s, 21 * s, 7 * s, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                height: 36 * s,
                padding: EdgeInsets.all(7 * s),
                decoration: BoxDecoration(
                  gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: colors),
                  borderRadius: BorderRadius.circular(8 * s),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    bar(0.6, Colors.white.withValues(alpha: 0.9)),
                    SizedBox(height: 3 * s),
                    bar(0.38, Colors.white.withValues(alpha: 0.55)),
                  ],
                ),
              ),
              SizedBox(height: 6 * s),
              Row(
                children: [
                  chip(accent),
                  SizedBox(width: 4 * s),
                  chip(tint),
                  SizedBox(width: 4 * s),
                  chip(tint),
                ],
              ),
              row(),
              row(),
            ],
          ),
        );
      },
    );
  }
}
