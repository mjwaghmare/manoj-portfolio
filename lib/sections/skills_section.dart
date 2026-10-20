import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../models/skill_group_model.dart';
import '../models/tech_item_model.dart';
import '../widgets/hover_card.dart';
import '../widgets/responsive_grid.dart';
import '../widgets/reveal_on_scroll.dart';
import '../widgets/section_container.dart';

/// "Tech Stack": a row of core platform logos, then grouped skill cards.
class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    const items = PortfolioData.techStack;
    final spacing = screen.isMobile ? 10.0 : 16.0;
    final groupColumns = switch (screen) {
      ScreenSize.desktop => 3,
      ScreenSize.tablet => 2,
      ScreenSize.mobile => 1,
    };

    return SectionContainer(
      title: 'Tech Stack',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ResponsiveGrid(
            columns: items.length,
            spacing: spacing,
            children: [
              for (final (index, item) in items.indexed)
                RevealOnScroll(delay: RevealOnScroll.stagger(index), child: _TechTile(item)),
            ],
          ),
          SizedBox(height: spacing),
          ResponsiveGrid(
            columns: groupColumns,
            spacing: spacing,
            // Staggered within each row; every row starts when it scrolls into view.
            children: [
              for (final (index, group) in PortfolioData.skillGroups.indexed)
                RevealOnScroll(delay: RevealOnScroll.stagger(index % groupColumns), child: _SkillGroupCard(group)),
            ],
          ),
        ],
      ),
    );
  }
}

class _SkillGroupCard extends StatelessWidget {
  const _SkillGroupCard(this.group);

  final SkillGroupModel group;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return HoverCard(
      color: colors.tileBackground,
      borderColor: colors.tileBorder,
      restingShadow: true,
      child: Padding(
        padding: const EdgeInsets.all(22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(group.icon, size: 22, color: const Color(0xFF2F74F2)),
                const SizedBox(width: 10),
                Flexible(
                  child: Text(
                    group.title,
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: theme.colorScheme.onSurface),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final skill in group.skills)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(color: colors.badgeBackground, borderRadius: BorderRadius.circular(8)),
                    child: Text(
                      skill,
                      style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.w500, color: colors.badgeText),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _TechTile extends StatelessWidget {
  const _TechTile(this.item);

  final TechItemModel item;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final isMobile = ScreenSize.of(context).isMobile;
    final logoSize = isMobile ? 28.0 : 44.0;
    final svgAsset = item.svgAsset;

    final logo = svgAsset != null
        ? SvgPicture.asset(
            svgAsset,
            width: logoSize,
            height: logoSize,
            excludeFromSemantics: true,
            colorFilter: item.monochrome ? ColorFilter.mode(theme.colorScheme.onSurface, BlendMode.srcIn) : null,
          )
        : Icon(item.icon, size: logoSize + 4, color: const Color(0xFF2F74F2));

    return HoverCard(
      color: colors.tileBackground,
      borderColor: colors.tileBorder,
      restingShadow: true,
      child: SizedBox(
        height: isMobile ? 96 : 136,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: logoSize,
              child: Center(child: logo),
            ),
            SizedBox(height: isMobile ? 10 : 24),
            Text(
              item.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: isMobile ? 12 : 14, fontWeight: FontWeight.w500, color: colors.roleText),
            ),
          ],
        ),
      ),
    );
  }
}
