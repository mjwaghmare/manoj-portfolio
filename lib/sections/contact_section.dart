import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../widgets/external_link.dart';
import '../widgets/reveal_on_scroll.dart';
import '../widgets/section_container.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  static const _linkedInBlue = Color(0xFF0A66C2);
  static const _youTubeRed = Color(0xFFFF0000);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final screen = ScreenSize.of(context);
    final profile = PortfolioData.profile;

    final intro = RevealOnScroll(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionTitle('Let\'s Work Together', accentWord: 'Together'),
          const SizedBox(height: 16),
          Text(
            profile.contactMessage,
            style: theme.textTheme.bodyMedium?.copyWith(fontSize: 16, color: colors.textMuted),
          ),
        ],
      ),
    );

    final contactItems = [
      _ContactItem(
        url: 'mailto:${profile.email}',
        label: 'Email',
        value: profile.email,
        // mailto does nothing for visitors without a mail app, so offer a copy as well.
        copyable: true,
        icon: Container(
          width: 42,
          height: 42,
          decoration: BoxDecoration(color: colors.contactIconBackground, borderRadius: BorderRadius.circular(10)),
          child: Icon(Icons.mail_rounded, size: 20, color: colors.contactIcon),
        ),
      ),
      _ContactItem(
        url: profile.linkedin.url,
        label: profile.linkedin.label,
        value: profile.linkedin.handle,
        icon: Container(
          width: 42,
          height: 42,
          decoration: BoxDecoration(color: _linkedInBlue, borderRadius: BorderRadius.circular(8)),
          child: Icon(profile.linkedin.icon, size: 22, color: Colors.white),
        ),
      ),
      _ContactItem(
        url: profile.github.url,
        label: profile.github.label,
        value: profile.github.handle,
        icon: SizedBox.square(
          dimension: 42,
          child: Icon(profile.github.icon, size: 32, color: theme.colorScheme.onSurface),
        ),
      ),
      _ContactItem(
        url: profile.youtube.url,
        label: profile.youtube.label,
        value: profile.youtube.handle,
        icon: Container(
          width: 42,
          height: 42,
          decoration: BoxDecoration(color: _youTubeRed, borderRadius: BorderRadius.circular(8)),
          child: Icon(profile.youtube.icon, size: 22, color: Colors.white),
        ),
      ),
    ];

    // The items follow the message, one after another.
    final items = [
      for (final (index, item) in contactItems.indexed)
        RevealOnScroll(delay: RevealOnScroll.stagger(index + 1), child: item),
    ];

    // Items keep their natural width so no value is cut off: one line spread across the
    // section when they fit, stacked when they don't.
    final itemRow = OverflowBar(
      alignment: MainAxisAlignment.spaceBetween,
      // Minimum gap only; spaceBetween spreads the items across the full width.
      spacing: 20,
      overflowSpacing: 12,
      children: items,
    );

    final layout = switch (screen) {
      // Four items beside the message would only fit scaled down, so the message sits above them.
      ScreenSize.desktop || ScreenSize.tablet => Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [intro, const SizedBox(height: 28), itemRow],
      ),
      ScreenSize.mobile => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          intro,
          const SizedBox(height: 24),
          for (final (index, item) in items.indexed) ...[
            if (index > 0) const SizedBox(height: 12),
            FittedBox(fit: BoxFit.scaleDown, alignment: Alignment.centerLeft, child: item),
          ],
        ],
      ),
    };

    return SectionContainer(
      topPadding: 6,
      bottomPadding: 32,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Divider(color: colors.tileBorder),
          SizedBox(height: screen.isMobile ? 28 : 34),
          layout,
        ],
      ),
    );
  }
}

class _ContactItem extends StatefulWidget {
  const _ContactItem({
    required this.url,
    required this.label,
    required this.value,
    required this.icon,
    this.copyable = false,
  });

  final String url;
  final String label;
  final String value;
  final Widget icon;

  /// Shows a button that copies [value] to the clipboard.
  final bool copyable;

  @override
  State<_ContactItem> createState() => _ContactItemState();
}

class _ContactItemState extends State<_ContactItem> {
  bool _hovered = false;
  bool _focused = false;

  Future<void> _copy() async {
    final messenger = ScaffoldMessenger.of(context);
    await Clipboard.setData(ClipboardData(text: widget.value));
    messenger
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(content: Text('${widget.label} copied: ${widget.value}'), behavior: SnackBarBehavior.floating),
      );
  }

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    final link = _link(context);
    if (!widget.copyable) return link;

    // Revealed on hover or keyboard focus; phones have no hover, so it always shows there.
    final showCopy = _hovered || _focused || ScreenSize.of(context).isMobile;
    final duration = MediaQuery.disableAnimationsOf(context) ? Duration.zero : const Duration(milliseconds: 150);

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: Focus(
        canRequestFocus: false,
        skipTraversal: true,
        onFocusChange: (focused) => setState(() => _focused = focused),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            link,
            AnimatedOpacity(
              opacity: showCopy ? 1 : 0,
              duration: duration,
              child: IconButton(
                tooltip: 'Copy ${widget.label.toLowerCase()}',
                onPressed: _copy,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints.tightFor(width: 32, height: 32),
                icon: Icon(Icons.copy_rounded, size: 17, color: colors.textMuted),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _link(BuildContext context) {
    final url = widget.url;
    final label = widget.label;
    final value = widget.value;
    final icon = widget.icon;
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return ExternalLink(
      url: url,
      builder: (context, open) => InkWell(
        onTap: open,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ExcludeSemantics(child: icon),
              const SizedBox(width: 10),
              // Natural width: the contact row scales as a whole rather than truncating values.
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(label, style: theme.textTheme.titleMedium?.copyWith(fontSize: 14)),
                  const SizedBox(height: 2),
                  Text(value, maxLines: 1, style: TextStyle(fontSize: 12.5, color: colors.textMuted)),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
