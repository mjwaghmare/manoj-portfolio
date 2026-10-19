import 'package:flutter/material.dart';

/// One-shot entrance animation: fades in while rising a few pixels.
/// Renders immediately when the platform asks for reduced motion.
class FadeSlideIn extends StatelessWidget {
  const FadeSlideIn({required this.child, this.delay = Duration.zero, super.key});

  final Widget child;
  final Duration delay;

  static const _duration = Duration(milliseconds: 600);

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.disableAnimationsOf(context)) return child;

    final total = _duration + delay;
    final start = delay.inMilliseconds / total.inMilliseconds;

    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: 1),
      duration: total,
      curve: Interval(start, 1, curve: Curves.easeOutCubic),
      child: child,
      builder: (context, value, child) => Opacity(
        opacity: value,
        child: Transform.translate(offset: Offset(0, 16 * (1 - value)), child: child),
      ),
    );
  }
}
