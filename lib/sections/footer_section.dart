import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../core/theme/app_theme.dart';
import '../data/portfolio_data.dart';
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

    return ColoredBox(
      color: colors.footerBackground,
      child: ContentWidth(
        child: isMobile
            ? Padding(
                padding: const EdgeInsets.symmetric(vertical: 18),
                child: Column(children: [const BrandLogo(logoHeight: 22), const SizedBox(height: 12), copyright]),
              )
            : SizedBox(
                height: 56,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const BrandLogo(logoHeight: 22),
                    const SizedBox(width: 24),
                    Flexible(child: copyright),
                  ],
                ),
              ),
      ),
    );
  }
}
