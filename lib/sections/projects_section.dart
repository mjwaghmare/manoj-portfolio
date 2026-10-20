import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../widgets/external_link.dart';
import '../widgets/project_card.dart';
import '../widgets/responsive_grid.dart';
import '../widgets/reveal_on_scroll.dart';
import '../widgets/section_container.dart';

class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final screen = ScreenSize.of(context);
    final linkColor = PortfolioColors.of(context).link;
    final columns = switch (screen) {
      ScreenSize.desktop => 3,
      ScreenSize.tablet => 2,
      ScreenSize.mobile => 1,
    };

    return SectionContainer(
      title: 'Featured Projects',
      trailing: screen.isMobile
          ? null
          : ExternalLink(
              url: PortfolioData.moreProjectsUrl,
              builder: (context, open) => TextButton.icon(
                onPressed: open,
                iconAlignment: IconAlignment.end,
                style: TextButton.styleFrom(
                  foregroundColor: linkColor,
                  textStyle: Theme.of(context).textTheme.labelLarge?.copyWith(fontSize: 14.5),
                ),
                icon: const Icon(Icons.arrow_forward_rounded, size: 17),
                label: const Text('View All Projects'),
              ),
            ),
      child: ResponsiveGrid(
        columns: columns,
        spacing: 28,
        // Staggered left to right within each row.
        children: [
          for (final (index, project) in PortfolioData.projects.indexed)
            RevealOnScroll(
              delay: RevealOnScroll.stagger(index % columns),
              child: ProjectCard(project: project),
            ),
        ],
      ),
    );
  }
}
