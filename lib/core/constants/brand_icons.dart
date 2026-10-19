import 'package:flutter/widgets.dart';

/// Brand glyphs bundled in `assets/fonts/BrandIcons.ttf` (Font Awesome Free Brands subset).
abstract final class BrandIcons {
  static const String _fontFamily = 'BrandIcons';

  static const IconData github = IconData(0xf09b, fontFamily: _fontFamily);
  static const IconData linkedin = IconData(0xf0e1, fontFamily: _fontFamily);
  static const IconData youtube = IconData(0xf167, fontFamily: _fontFamily);
}
