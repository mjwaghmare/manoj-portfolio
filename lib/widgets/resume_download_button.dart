import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../core/utils/file_download_stub.dart' if (dart.library.js_interop) '../core/utils/file_download_web.dart';
import 'gradient_widgets.dart';

enum _Phase { idle, downloading, done }

/// [GradientButton] that downloads [url] and plays a short progress animation
/// with tongue-in-cheek status lines, so the click visibly does something.
class ResumeDownloadButton extends StatefulWidget {
  const ResumeDownloadButton({
    required this.url,
    required this.colors,
    this.width,
    this.height = 54,
    this.horizontalPadding = 32,
    this.fontSize = 15.5,
    super.key,
  });

  final String url;
  final List<Color> colors;
  final double? width;
  final double height;
  final double horizontalPadding;
  final double fontSize;

  @override
  State<ResumeDownloadButton> createState() => _ResumeDownloadButtonState();
}

class _ResumeDownloadButtonState extends State<ResumeDownloadButton> with SingleTickerProviderStateMixin {
  static const _label = 'Download Resume';

  /// Cycled evenly across the progress animation.
  static const _progressLines = ['Downloading…', 'Hiding typos…', 'Adding sparkle…'];

  /// Shown once the file is saved, picked by how many times it has been downloaded.
  static const _doneLines = ['Saved. Hire me?', 'Again? Flattered.', "It's the same PDF"];

  late final AnimationController _progress = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1800),
  )..addStatusListener(_onProgressStatus);

  _Phase _phase = _Phase.idle;
  int _downloads = 0;
  Timer? _resetTimer;

  @override
  void dispose() {
    _resetTimer?.cancel();
    _progress.dispose();
    super.dispose();
  }

  void _download() {
    if (_phase != _Phase.idle) return;
    // Starts the real download right away, inside the click, so browsers don't block it;
    // the animation is only feedback.
    downloadFile(widget.url, fileName: Uri.parse(widget.url).pathSegments.last);
    setState(() => _phase = _Phase.downloading);
    _progress.forward(from: 0);
  }

  void _onProgressStatus(AnimationStatus status) {
    if (status != AnimationStatus.completed) return;
    setState(() {
      _phase = _Phase.done;
      _downloads++;
    });
    _resetTimer = Timer(const Duration(milliseconds: 2600), () {
      if (mounted) setState(() => _phase = _Phase.idle);
    });
  }

  @override
  Widget build(BuildContext context) {
    // Once the download finishes, the full fill fades out rather than vanishing.
    return TweenAnimationBuilder<double>(
      tween: Tween(end: _phase == _Phase.downloading ? 1 : 0),
      duration: const Duration(milliseconds: 600),
      curve: Curves.easeOut,
      builder: (context, fillOpacity, _) => AnimatedBuilder(
        animation: _progress,
        builder: (context, _) {
          final t = _progress.value;
          return GradientButton(
            label: _label,
            onPressed: _download,
            colors: widget.colors,
            width: widget.width,
            height: widget.height,
            horizontalPadding: widget.horizontalPadding,
            fontSize: widget.fontSize,
            progress: _phase == _Phase.idle && fillOpacity == 0 ? null : Curves.easeInOut.transform(t),
            progressOpacity: fillOpacity,
            child: AnimatedSize(
              duration: const Duration(milliseconds: 350),
              curve: Curves.easeInOut,
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 350),
                switchInCurve: Curves.easeOut,
                switchOutCurve: Curves.easeIn,
                child: switch (_phase) {
                  _Phase.idle => const Text(_label, key: ValueKey('idle')),
                  _Phase.downloading => _status(
                    // Gentle bob, three per run; a cosine wave has no hard stop at the bottom.
                    icon: Transform.translate(
                      offset: Offset(0, -2.5 * (1 - math.cos(t * math.pi * 6)) / 2),
                      child: const Icon(Icons.arrow_downward_rounded),
                    ),
                    text: _progressLines[math.min((t * _progressLines.length).floor(), _progressLines.length - 1)],
                  ),
                  _Phase.done => _status(
                    icon: TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0.6, end: 1),
                      duration: const Duration(milliseconds: 400),
                      curve: Curves.easeOutBack,
                      builder: (context, scale, child) => Transform.scale(scale: scale, child: child),
                      child: const Icon(Icons.check_circle_rounded),
                    ),
                    text: _doneLines[math.min(_downloads - 1, _doneLines.length - 1)],
                  ),
                },
              ),
            ),
          );
        },
      ),
    );
  }

  /// Icon plus a status line; keyed by the text so each new line animates in.
  Widget _status({required Widget icon, required String text}) {
    return FittedBox(
      key: ValueKey(text),
      fit: BoxFit.scaleDown,
      child: Semantics(
        liveRegion: true,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconTheme.merge(
              data: IconThemeData(size: widget.fontSize + 2, color: Colors.white),
              child: icon,
            ),
            // Tight enough that every status line fits the hero button unscaled.
            const SizedBox(width: 6),
            Text(text),
          ],
        ),
      ),
    );
  }
}
