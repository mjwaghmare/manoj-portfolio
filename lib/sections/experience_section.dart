import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_fonts.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../models/experience_model.dart';
import '../widgets/section_container.dart';

class ExperienceSection extends StatelessWidget {
  const ExperienceSection({super.key});

  @override
  Widget build(BuildContext context) {
    const experiences = PortfolioData.experiences;

    return SectionContainer(
      title: 'Professional Experience',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 10),
          for (final (index, experience) in experiences.indexed)
            _TimelineEntry(experience: experience, isFirst: index == 0, isLast: index == experiences.length - 1),
        ],
      ),
    );
  }
}

class _TimelineEntry extends StatelessWidget {
  const _TimelineEntry({required this.experience, required this.isFirst, required this.isLast});

  final ExperienceModel experience;
  final bool isFirst;
  final bool isLast;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final isMobile = ScreenSize.of(context).isMobile;

    final period = Text(
      experience.period.toUpperCase(),
      style: TextStyle(
        fontFamily: AppFonts.display,
        fontSize: isMobile ? 17 : 20,
        height: 1.25,
        letterSpacing: 1,
        color: colors.textMuted,
      ),
    );

    final heading = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(experience.company, style: theme.textTheme.titleLarge),
        const SizedBox(height: 4),
        Text(
          experience.role,
          style: TextStyle(fontSize: 15, height: 1.4, fontWeight: FontWeight.w600, color: colors.roleText),
        ),
      ],
    );

    // Width is limited with padding below, not a max-width box: IntrinsicHeight would
    // otherwise measure the text wider than it is laid out and clip the last line.
    final description = Text(
      experience.description,
      style: theme.textTheme.bodyMedium?.copyWith(color: colors.textMuted),
    );

    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (isMobile) ...[period, const SizedBox(height: 6)],
        heading,
        const SizedBox(height: 8),
        description,
      ],
    );

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (!isMobile)
            SizedBox(
              width: 150,
              child: Padding(padding: const EdgeInsets.only(left: 14, top: 2), child: period),
            ),
          _TimelineRail(isFirst: isFirst),
          SizedBox(width: isMobile ? 18 : 32),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 8 : (isMobile ? 32 : 48), right: isMobile ? 0 : 40),
              child: MergeSemantics(child: content),
            ),
          ),
        ],
      ),
    );
  }
}

class _TimelineRail extends StatelessWidget {
  const _TimelineRail({required this.isFirst});

  final bool isFirst;

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    final line = Container(width: 1.5, color: colors.timelineLine);

    return SizedBox(
      width: 16,
      child: Column(
        children: [
          SizedBox(height: 8, child: isFirst ? null : line),
          Container(
            width: 9,
            height: 9,
            decoration: BoxDecoration(color: colors.timelineDot, shape: BoxShape.circle),
          ),
          Expanded(child: line),
        ],
      ),
    );
  }
}
