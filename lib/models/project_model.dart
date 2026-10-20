import 'package:flutter/material.dart';

/// How a project is labelled on its card, so concepts are never presented as shipped work.
enum ProjectType {
  professional('Professional'),
  personal('Personal'),
  concept('Concept');

  const ProjectType(this.label);

  final String label;
}

class ProjectModel {
  const ProjectModel({
    required this.title,
    required this.description,
    required this.type,
    required this.tags,
    required this.category,
    required this.headline,
    required this.headlineAccent,
    required this.bannerGradient,
    this.screens = const [],
    this.url,
  });

  final String title;
  final String description;
  final ProjectType type;
  final List<String> tags;

  /// Banner copy: a short category above "[headline] [headlineAccent]", the accent in italics.
  final String category;
  final String headline;
  final String headlineAccent;

  /// Banner background, light to dark; the first colour also tints the illustrated phones.
  final List<Color> bannerGradient;

  /// Three portrait screenshots (left, centre, right) shown in phone frames instead of the
  /// headline. Only for apps whose screenshots may be shown; client apps leave it empty.
  final List<String> screens;

  /// Public website, store listing or repository. Null hides the link icon.
  final String? url;
}
