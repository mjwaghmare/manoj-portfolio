import 'package:flutter/material.dart';
import 'package:url_launcher/link.dart';
import 'package:url_launcher/url_launcher.dart';

/// Wraps [builder] in a real anchor element on web, so links keep link
/// semantics, a hover URL preview and the browser's "open in new tab" menu.
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
    final isMailto = uri.scheme == 'mailto';
    return Link(
      uri: uri,
      target: isMailto ? LinkTarget.self : LinkTarget.blank,
      // Link's own `followLink` only navigates when the tap and the anchor's DOM click
      // pair up, which fails silently in some browsers. Opening directly from the tap
      // works everywhere; the anchor's click is then cancelled, so it never opens twice.
      builder: (context, _) =>
          builder(context, () => launchUrl(uri, webOnlyWindowName: isMailto ? '_self' : '_blank')),
    );
  }
}
