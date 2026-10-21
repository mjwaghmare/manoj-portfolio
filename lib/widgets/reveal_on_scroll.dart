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

class _RevealOnScrollState extends State<RevealOnScroll> with SingleTickerProviderStateMixin, WidgetsBindingObserver {
  static const _duration = Duration(milliseconds: 600);
  static const _rise = 16.0;

  /// Reveal once the child's top edge is above this fraction of the viewport height.
  static const _threshold = 0.9;

  late final AnimationController _controller = AnimationController(vsync: this, duration: _duration + widget.delay);
  late CurvedAnimation _progress = _curve();

  ScrollableState? _scrollable;

  /// The position [_check] listens to. Tracked separately from [_scrollable] because a
  /// Scrollable replaces its position when e.g. the pixel ratio or gesture settings change,
  /// which happens after load on real phones.
  ScrollPosition? _position;

  bool get _hidden => _controller.status == AnimationStatus.dismissed;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  /// The viewport can grow without any scrolling, e.g. when a phone browser's toolbar collapses.
  @override
  void didChangeMetrics() => _scheduleCheck();

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

    // Nothing to watch, or no motion wanted: show the content rather than risk hiding it.
    final scrollable = Scrollable.maybeOf(context);
    if (MediaQuery.disableAnimationsOf(context) || scrollable == null) {
      _stopListening();
      _controller.value = 1;
      return;
    }

    // Called again when the Scrollable swaps in a new position, so the listener follows it.
    _scrollable = scrollable;
    final position = scrollable.position;
    if (position != _position) {
      _position?.removeListener(_check);
      _position = position..addListener(_check);
    }
    // Content already on screen (or brought there by the swap) reveals without scrolling.
    _scheduleCheck();
  }

  void _scheduleCheck() => WidgetsBinding.instance.addPostFrameCallback((_) => _check());

  void _check() {
    if (!mounted || _position == null) return;
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
    _position?.removeListener(_check);
    _position = null;
    _scrollable = null;
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
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
