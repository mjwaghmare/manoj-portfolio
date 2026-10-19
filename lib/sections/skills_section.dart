import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../models/tech_item_model.dart';
import '../widgets/hover_card.dart';
import '../widgets/responsive_grid.dart';
import '../widgets/section_container.dart';

/// "Tech Stack": one row of logo tiles on desktop, a 4-column grid below that.
class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    const items = PortfolioData.techStack;

    return SectionContainer(
      title: 'Tech Stack',
      child: ResponsiveGrid(
        columns: screen.isDesktop ? items.length : 4,
        spacing: screen.isMobile ? 10 : 16,
        children: [for (final item in items) _TechTile(item)],
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
