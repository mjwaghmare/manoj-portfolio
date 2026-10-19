import 'package:flutter/widgets.dart';

/// One tile in the Tech Stack row: an SVG logo, or an icon when no logo fits.
class TechItemModel {
  const TechItemModel({required this.name, this.svgAsset, this.icon, this.monochrome = false})
    : assert(svgAsset != null || icon != null, 'Provide a logo or an icon');

  final String name;
  final String? svgAsset;
  final IconData? icon;

  /// Single-color logos (e.g. Apple) are tinted with the text color so they work in dark mode.
  final bool monochrome;
}
