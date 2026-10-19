import 'package:flutter/material.dart';

import '../core/theme/app_theme.dart';

/// Rounded technology tag used on project cards.
class SkillChip extends StatelessWidget {
  const SkillChip(this.label, {super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 7),
      decoration: BoxDecoration(color: colors.tagBackground, borderRadius: BorderRadius.circular(999)),
      child: Text(
        label,
        style: TextStyle(fontSize: 13.5, height: 1.3, fontWeight: FontWeight.w500, color: colors.tagText),
      ),
    );
  }
}
