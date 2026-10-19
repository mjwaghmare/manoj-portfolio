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
    required this.placeholderIcon,
    required this.placeholderGradient,
    this.imageAsset,
    this.imageAlignment = Alignment.topCenter,
    this.url,
  });

  final String title;
  final String description;
  final ProjectType type;
  final List<String> tags;

  /// Artwork shown when [imageAsset] is null.
  final IconData placeholderIcon;
  final List<Color> placeholderGradient;
  final String? imageAsset;
  final Alignment imageAlignment;

  /// Public website, store listing or repository. Null hides the link icon.
  final String? url;
}
