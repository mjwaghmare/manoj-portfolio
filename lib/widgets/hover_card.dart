import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';

/// Rounded surface that lifts slightly and deepens its shadow on hover.
class HoverCard extends StatefulWidget {
  const HoverCard({
    required this.child,
    required this.color,
    required this.borderColor,
    this.padding = EdgeInsets.zero,
    this.radius = 14,
    this.restingShadow = false,
    super.key,
  });

  final Widget child;
  final Color color;
  final Color borderColor;
  final EdgeInsetsGeometry padding;
  final double radius;

  /// Adds a faint shadow even when not hovered.
  final bool restingShadow;

  @override
  State<HoverCard> createState() => _HoverCardState();
}

class _HoverCardState extends State<HoverCard> {
  bool _hovered = false;

  void _setHovered(bool value) {
    if (_hovered != value) setState(() => _hovered = value);
  }

  @override
  Widget build(BuildContext context) {
    final reduceMotion = MediaQuery.disableAnimationsOf(context);
    final shadowColor = PortfolioColors.of(context).cardShadow;
    final borderRadius = BorderRadius.circular(widget.radius);

    final restingShadow = BoxShadow(
      color: widget.restingShadow ? shadowColor.withValues(alpha: shadowColor.a * 0.6) : Colors.transparent,
      blurRadius: 18,
      offset: const Offset(0, 6),
    );
    final hoveredShadow = BoxShadow(color: shadowColor, blurRadius: 28, offset: const Offset(0, 12));

    return MouseRegion(
      onEnter: (_) => _setHovered(true),
      onExit: (_) => _setHovered(false),
      // Only the hover amount is animated. Colors are read straight from the theme each frame,
      // so they follow the light/dark cross-fade instead of trailing behind it.
      child: TweenAnimationBuilder<double>(
        tween: Tween(end: _hovered && !reduceMotion ? 1 : 0),
        duration: reduceMotion ? Duration.zero : AppConstants.hoverDuration,
        curve: Curves.easeOut,
        child: Padding(padding: widget.padding, child: widget.child),
        builder: (context, hover, child) => Transform.translate(
          offset: Offset(0, -4 * hover),
          child: Container(
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              color: widget.color,
              borderRadius: borderRadius,
              boxShadow: [BoxShadow.lerp(restingShadow, hoveredShadow, hover)!],
            ),
            // Border is painted above the content so edge-to-edge images (project screenshots)
            // can't cover it and leave ragged, unbordered corners.
            foregroundDecoration: BoxDecoration(
              borderRadius: borderRadius,
              border: Border.all(color: widget.borderColor),
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}
