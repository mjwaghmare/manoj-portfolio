import 'package:flutter/widgets.dart';

/// A card in the Tech Stack section: a titled group of related skills.
class SkillGroupModel {
  const SkillGroupModel({required this.title, required this.icon, required this.skills});

  final String title;
  final IconData icon;
  final List<String> skills;
}
