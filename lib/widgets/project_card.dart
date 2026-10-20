import 'package:flutter/material.dart';

import '../core/theme/app_theme.dart';
import '../models/project_model.dart';
import 'external_link.dart';
import 'hover_card.dart';
import 'project_banner.dart';
import 'skill_chip.dart';

class ProjectCard extends StatelessWidget {
  const ProjectCard({required this.project, super.key});

  final ProjectModel project;

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    final url = project.url;

    final title = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Flexible(
          child: Text(
            project.title,
            style: TextStyle(
              fontSize: 19,
              height: 1.3,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.2,
              color: colors.projectTitle,
            ),
          ),
        ),
        if (url != null) ...[
          const SizedBox(width: 10),
          Icon(Icons.open_in_new_rounded, size: 17, color: colors.projectBody, semanticLabel: 'opens in a new tab'),
        ],
      ],
    );

    return HoverCard(
      color: colors.projectCardBackground,
      borderColor: colors.projectCardBorder,
      restingShadow: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          AspectRatio(aspectRatio: 1.94, child: ProjectBanner(project: project)),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 22, 20, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Align(
                          alignment: AlignmentDirectional.centerStart,
                          child: url == null
                              ? title
                              : ExternalLink(
                                  url: url,
                                  builder: (context, open) =>
                                      InkWell(onTap: open, borderRadius: BorderRadius.circular(6), child: title),
                                ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      _TypeLabel(project.type),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(project.description, style: TextStyle(fontSize: 15, height: 1.65, color: colors.projectBody)),
                  const Spacer(),
                  const SizedBox(height: 16),
                  // Always one line; scales down rather than wrapping if a card is too narrow.
                  FittedBox(
                    fit: BoxFit.scaleDown,
                    alignment: Alignment.centerLeft,
                    child: Row(
                      children: [
                        for (final (index, tag) in project.tags.indexed) ...[
                          if (index > 0) const SizedBox(width: 8),
                          SkillChip(tag),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TypeLabel extends StatelessWidget {
  const _TypeLabel(this.type);

  final ProjectType type;

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: colors.projectCardBorder),
      ),
      child: Text(
        type.label,
        style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w600, color: colors.projectBody, letterSpacing: 0.2),
      ),
    );
  }
}
