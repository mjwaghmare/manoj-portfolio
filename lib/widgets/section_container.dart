import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_fonts.dart';
import '../core/theme/app_theme.dart';
import 'gradient_widgets.dart';

/// Centers section content at [AppConstants.maxContentWidth] with responsive padding
/// and an optional heading.
class SectionContainer extends StatelessWidget {
  const SectionContainer({
    required this.child,
    this.title,
    this.trailing,
    this.topPadding,
    this.bottomPadding,
    super.key,
  });

  final Widget child;
  final String? title;

  /// Shown at the end of the heading row, e.g. a "View all" link.
  final Widget? trailing;
  final double? topPadding;
  final double? bottomPadding;

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    final verticalPadding = screen.isMobile ? 20.0 : 22.0;

    return ContentWidth(
      child: Padding(
        padding: EdgeInsets.only(top: topPadding ?? verticalPadding, bottom: bottomPadding ?? verticalPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (title != null) ...[
              Row(
                children: [
                  // Title takes all the width the trailing widget doesn't need.
                  Expanded(
                    child: Align(alignment: AlignmentDirectional.centerStart, child: SectionTitle(title!)),
                  ),
                  ?trailing,
                ],
              ),
              SizedBox(height: screen.isMobile ? 18 : 20),
            ],
            child,
          ],
        ),
      ),
    );
  }
}

/// Constrains [child] to the page's content column with responsive side padding.
class ContentWidth extends StatelessWidget {
  const ContentWidth({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final padding = ScreenSize.of(context).horizontalPadding;
    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: AppConstants.maxContentWidth + padding * 2),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: padding),
          child: child,
        ),
      ),
    );
  }
}

class SectionTitle extends StatelessWidget {
  const SectionTitle(this.text, {this.accentWord, super.key});

  final String text;

  /// A word within [text] set in the italic editorial font, e.g. "Together".
  final String? accentWord;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final style = ScreenSize.of(context).isMobile ? theme.textTheme.headlineSmall : theme.textTheme.headlineMedium;
    final accentWord = this.accentWord;
    final accentIndex = accentWord == null ? -1 : text.indexOf(accentWord);

    final Widget title = accentWord == null || accentIndex < 0
        ? Text(text, style: style)
        : Text.rich(
            TextSpan(
              children: [
                TextSpan(text: text.substring(0, accentIndex)),
                TextSpan(
                  text: accentWord,
                  style: TextStyle(
                    fontFamily: AppFonts.editorial,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.w600,
                    // Playfair has a smaller x-height; nudge it up so it sits evenly with the sans text.
                    fontSize: (style?.fontSize ?? 28) * 1.08,
                    letterSpacing: 0,
                    color: theme.colorScheme.primary,
                  ),
                ),
                TextSpan(text: text.substring(accentIndex + accentWord.length)),
              ],
            ),
            style: style,
          );

    return Semantics(
      header: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Flexible(child: title),
          const SizedBox(width: 24),
          AccentLine(colors: PortfolioColors.of(context).accentGradient),
        ],
      ),
    );
  }
}
