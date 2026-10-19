import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../widgets/external_link.dart';
import '../widgets/section_container.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  static const _linkedInBlue = Color(0xFF0A66C2);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);
    final screen = ScreenSize.of(context);
    final profile = PortfolioData.profile;

    final intro = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionTitle('Let\'s Work Together', accentWord: 'Together'),
        const SizedBox(height: 16),
        Text(
          profile.contactMessage,
          style: theme.textTheme.bodyMedium?.copyWith(fontSize: 16, color: colors.textMuted),
        ),
      ],
    );

    final items = [
      _ContactItem(
        url: 'mailto:${profile.email}',
        label: 'Email',
        value: profile.email,
        icon: Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(color: colors.contactIconBackground, borderRadius: BorderRadius.circular(14)),
          child: Icon(Icons.mail_rounded, size: 26, color: colors.contactIcon),
        ),
      ),
      _ContactItem(
        url: profile.linkedin.url,
        label: profile.linkedin.label,
        value: profile.linkedin.handle,
        icon: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(color: _linkedInBlue, borderRadius: BorderRadius.circular(8)),
          child: Icon(profile.linkedin.icon, size: 28, color: Colors.white),
        ),
      ),
      _ContactItem(
        url: profile.github.url,
        label: profile.github.label,
        value: profile.github.handle,
        icon: SizedBox.square(
          dimension: 48,
          child: Icon(profile.github.icon, size: 40, color: theme.colorScheme.onSurface),
        ),
      ),
    ];

    final layout = switch (screen) {
      ScreenSize.desktop => Row(
        children: [
          Expanded(flex: 40, child: intro),
          const SizedBox(width: 24),
          Expanded(
            flex: 60,
            // Items keep their natural width and spread out; they wrap rather than truncate if space runs short.
            child: Wrap(
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 16,
              runSpacing: 16,
              children: items,
            ),
          ),
        ],
      ),
      ScreenSize.tablet => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          intro,
          const SizedBox(height: 28),
          Wrap(spacing: 40, runSpacing: 20, children: items),
        ],
      ),
      ScreenSize.mobile => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          intro,
          const SizedBox(height: 24),
          for (final (index, item) in items.indexed) ...[if (index > 0) const SizedBox(height: 12), item],
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

class _ContactItem extends StatelessWidget {
  const _ContactItem({required this.url, required this.label, required this.value, required this.icon});

  final String url;
  final String label;
  final String value;
  final Widget icon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return ExternalLink(
      url: url,
      builder: (context, open) => InkWell(
        onTap: open,
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.all(6),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ExcludeSemantics(child: icon),
              const SizedBox(width: 16),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(label, style: theme.textTheme.titleMedium?.copyWith(fontSize: 15.5)),
                    const SizedBox(height: 2),
                    Text(
                      value,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(fontSize: 13.5, color: colors.textMuted),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
