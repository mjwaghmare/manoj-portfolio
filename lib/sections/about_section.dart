import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_fonts.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../widgets/gradient_widgets.dart';
import '../widgets/section_container.dart';

class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    final textTheme = Theme.of(context).textTheme;

    final intro = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionTitle('About Me'),
        const SizedBox(height: 12),
        Text(PortfolioData.profile.about, style: textTheme.bodyMedium?.copyWith(fontSize: 16, height: 1.65)),
      ],
    );

    final cards = [
      for (final item in PortfolioData.aboutHighlights)
        _HighlightCard(value: item.value, icon: item.icon, iconColor: item.color, label: item.label),
    ];

    return SectionContainer(
      // Side by side only when the text column stays readable next to the 512px of cards.
      child: MediaQuery.sizeOf(context).width >= AppConstants.wideLayoutMinWidth
          // Text and cards share one height, so the paragraph never runs past the cards.
          ? IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(child: intro),
                  const SizedBox(width: 40),
                  SizedBox(
                    width: 160 * 3 + 16 * 2,
                    child: _HighlightRow(cards: cards, minHeight: 164, spacing: 16),
                  ),
                ],
              ),
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                intro,
                const SizedBox(height: 24),
                _HighlightRow(cards: cards, minHeight: screen.isMobile ? 140 : 160, spacing: screen.isMobile ? 10 : 16),
              ],
            ),
    );
  }
}

/// Equal-height row of cards that can grow when labels wrap (e.g. large text settings).
class _HighlightRow extends StatelessWidget {
  const _HighlightRow({required this.cards, required this.minHeight, required this.spacing});

  final List<Widget> cards;
  final double minHeight;
  final double spacing;

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final (index, card) in cards.indexed) ...[
            if (index > 0) SizedBox(width: spacing),
            Expanded(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: minHeight),
                child: card,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _HighlightCard extends StatelessWidget {
  const _HighlightCard({required this.label, this.value, this.icon, this.iconColor});

  final String? value;
  final IconData? icon;
  final Color? iconColor;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final isMobile = ScreenSize.of(context).isMobile;

    final value = this.value;
    final Widget top = value != null
        ? GradientText(
            value,
            colors: colors.brandGradient,
            // Bebas is condensed, so it runs larger than the icons beside it to match their visual weight.
            style: TextStyle(fontFamily: AppFonts.display, fontSize: isMobile ? 36 : 44, height: 1, letterSpacing: 0.5),
          )
        : Icon(icon, size: isMobile ? 28 : 34, color: iconColor);

    return MergeSemantics(
      child: Container(
        padding: EdgeInsets.all(isMobile ? 8 : 12),
        decoration: BoxDecoration(
          color: colors.statCardBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: colors.tileBorder),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: isMobile ? 30 : 36,
              child: Center(child: top),
            ),
            SizedBox(height: isMobile ? 10 : 16),
            Text(
              label,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: isMobile ? 12 : 14.5,
                height: 1.45,
                fontWeight: FontWeight.w500,
                color: theme.colorScheme.onSurface.withValues(alpha: 0.85),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
