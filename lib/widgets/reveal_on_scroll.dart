import 'package:flutter/material.dart';

/// Fades [child] in while it rises a few pixels whenever it scrolls into view.
///
/// The same motion as [FadeSlideIn], but started by scrolling rather than on load. It
/// resets only once [child] is fully off screen, so nothing vanishes while visible.
/// Renders immediately when the platform asks for reduced motion.
class RevealOnScroll extends StatefulWidget {
  const RevealOnScroll({required this.child, this.delay = Duration.zero, super.key});

  final Widget child;

  /// Extra wait once [child] is in view, to stagger siblings that appear together.
  final Duration delay;

  /// Delay for the [index]th of several siblings that come into view together.
  static Duration stagger(int index) => Duration(milliseconds: 80 * index);

  @override
  State<RevealOnScroll> createState() => _RevealOnScrollState();
}

class _RevealOnScrollState extends State<RevealOnScroll> with SingleTickerProviderStateMixin {
  static const _duration = Duration(milliseconds: 600);
  static const _rise = 16.0;

  /// Reveal once the child's top edge is above this fraction of the viewport height.
  static const _threshold = 0.9;

  late final AnimationController _controller = AnimationController(vsync: this, duration: _duration + widget.delay);
  late CurvedAnimation _progress = _curve();

  ScrollableState? _scrollable;

  bool get _hidden => _controller.status == AnimationStatus.dismissed;

  /// The motion runs in the last [_duration] of the controller, after [RevealOnScroll.delay].
  CurvedAnimation _curve() => CurvedAnimation(
    parent: _controller,
    curve: Interval(
      widget.delay.inMilliseconds / (_duration + widget.delay).inMilliseconds,
      1,
      curve: Curves.easeOutCubic,
    ),
  );

  @override
  void didUpdateWidget(RevealOnScroll oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Staggered delays follow the grid's column count, which changes with the window width.
    if (widget.delay != oldWidget.delay) {
      _controller.duration = _duration + widget.delay;
      _progress.dispose();
      _progress = _curve();
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    if (MediaQuery.disableAnimationsOf(context)) {
      _stopListening();
      _controller.value = 1;
      return;
    }

    final scrollable = Scrollable.maybeOf(context);
    if (scrollable != _scrollable) {
      _stopListening();
      _scrollable = scrollable?..position.addListener(_check);
    }
    // Content already on screen when the page loads reveals without any scrolling.
    WidgetsBinding.instance.addPostFrameCallback((_) => _check());
  }

  void _check() {
    if (!mounted) return;
    final box = context.findRenderObject() as RenderBox?;
    final viewport = _scrollable?.context.findRenderObject() as RenderBox?;
    if (box == null || !box.attached || !box.hasSize || viewport == null || !viewport.hasSize) return;

    final top = box.localToGlobal(Offset.zero, ancestor: viewport).dy;
    final bottom = top + box.size.height;
    final height = viewport.size.height;

    if (_hidden) {
      // Mostly in view, or wholly in view (short content at the very end of the page).
      if (bottom > 0 && (top < height * _threshold || bottom <= height)) _controller.forward();
    } else if (bottom <= 0 || top >= height) {
      // Fully off screen in either direction: reset, so it animates again on the way back.
      _controller.reset();
    }
  }

  void _stopListening() {
    _scrollable?.position.removeListener(_check);
    _scrollable = null;
  }

  @override
  void dispose() {
    _stopListening();
    _progress.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _progress,
      child: AnimatedBuilder(
        animation: _progress,
        child: widget.child,
        builder: (context, child) =>
            Transform.translate(offset: Offset(0, _rise * (1 - _progress.value)), child: child),
      ),
    );
  }
}
