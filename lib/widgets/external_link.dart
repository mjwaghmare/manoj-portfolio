import 'package:flutter/material.dart';
import 'package:url_launcher/link.dart';

/// Wraps [builder] in a real anchor element on web, so links support
/// middle-click, "open in new tab" and screen-reader link semantics.
///
/// [url] may be absolute, `mailto:`, or relative to the site root.
class ExternalLink extends StatelessWidget {
  const ExternalLink({required this.url, required this.builder, super.key});

  final String url;
  final Widget Function(BuildContext context, VoidCallback? open) builder;

  @override
  Widget build(BuildContext context) {
    // Relative URIs would be treated as in-app routes, so resolve them against the page URL.
    final uri = Uri.base.resolve(url);
    return Link(
      uri: uri,
      target: uri.scheme == 'mailto' ? LinkTarget.self : LinkTarget.blank,
      builder: (context, followLink) => builder(context, followLink),
    );
  }
}
