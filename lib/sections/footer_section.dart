import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
import '../models/profile_model.dart';
import '../widgets/external_link.dart';
import '../widgets/portfolio_header.dart';
import '../widgets/section_container.dart';

class FooterSection extends StatelessWidget {
  const FooterSection({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = PortfolioColors.of(context);
    final isMobile = ScreenSize.of(context).isMobile;

    final copyright = Text(
      '© ${DateTime.now().year} ${PortfolioData.profile.name}. All rights reserved.',
      textAlign: isMobile ? TextAlign.center : TextAlign.end,
      style: TextStyle(fontSize: 14.5, color: colors.textMuted),
    );

    final socials = Row(
      mainAxisSize: MainAxisSize.min,
      children: [for (final link in PortfolioData.profile.socialLinks) _SocialIconLink(link)],
    );

    return ColoredBox(
      color: colors.footerBackground,
      child: ContentWidth(
        child: isMobile
            ? Padding(
                padding: const EdgeInsets.symmetric(vertical: 18),
                child: Column(
                  children: [
                    const BrandLogo(logoHeight: 22),
                    const SizedBox(height: 8),
                    socials,
                    const SizedBox(height: 8),
                    copyright,
                  ],
                ),
              )
            : SizedBox(
                height: 56,
                child: Row(
                  children: [
                    const BrandLogo(logoHeight: 22),
                    const SizedBox(width: 24),
                    const Spacer(),
                    socials,
                    const SizedBox(width: 16),
                    Flexible(child: copyright),
                  ],
                ),
              ),
      ),
    );
  }
}

/// Icon-only social profile link; opens in a new tab like the contact section's links.
class _SocialIconLink extends StatelessWidget {
  const _SocialIconLink(this.link);

  final SocialLink link;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = PortfolioColors.of(context);

    return ExternalLink(
      url: link.url,
      builder: (context, open) => IconButton(
        onPressed: open,
        tooltip: link.label,
        icon: Icon(link.icon, size: 18),
        style: IconButton.styleFrom(
          foregroundColor: colors.textMuted,
          hoverColor: colors.badgeBackground,
          focusColor: colors.badgeBackground,
          highlightColor: theme.colorScheme.onSurface.withValues(alpha: 0.08),
        ),
      ),
    );
  }
}
