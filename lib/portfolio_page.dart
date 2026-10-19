import 'package:flutter/material.dart';

import 'core/constants/app_constants.dart';
import 'core/theme/theme_provider.dart';
import 'sections/about_section.dart';
import 'sections/contact_section.dart';
import 'sections/experience_section.dart';
import 'sections/footer_section.dart';
import 'sections/hero_section.dart';
import 'sections/projects_section.dart';
import 'sections/skills_section.dart';
import 'widgets/portfolio_header.dart';

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({required this.themeProvider, super.key});

  final ThemeProvider themeProvider;

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  final _scrollController = ScrollController();
  final _activeSection = ValueNotifier(PortfolioSection.home);
  final _sectionKeys = {for (final section in PortfolioSection.values) section: GlobalKey()};

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_updateActiveSection);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _activeSection.dispose();
    super.dispose();
  }

  void _scrollTo(PortfolioSection section) {
    final targetContext = _sectionKeys[section]?.currentContext;
    if (targetContext == null) return;
    final reduceMotion = MediaQuery.disableAnimationsOf(context);

    Scrollable.ensureVisible(
      targetContext,
      duration: reduceMotion ? Duration.zero : AppConstants.scrollDuration,
      curve: Curves.easeInOutCubic,
    );
  }

  /// Marks the last section whose top has passed just below the header.
  void _updateActiveSection() {
    final position = _scrollController.position;
    var active = PortfolioSection.home;

    if (position.pixels >= position.maxScrollExtent - 4) {
      active = PortfolioSection.values.last;
    } else {
      const threshold = AppConstants.headerHeight + 160;
      for (final section in PortfolioSection.values) {
        final box = _sectionKeys[section]?.currentContext?.findRenderObject() as RenderBox?;
        if (box == null || !box.attached) continue;
        if (box.localToGlobal(Offset.zero).dy <= threshold) active = section;
      }
    }
    _activeSection.value = active;
  }

  @override
  Widget build(BuildContext context) {
    final showInlineNav = ScreenSize.of(context).isDesktop;

    return Scaffold(
      endDrawer: showInlineNav ? null : MobileNavDrawer(activeSection: _activeSection, onNavigate: _scrollTo),
      body: Column(
        children: [
          PortfolioHeader(activeSection: _activeSection, onNavigate: _scrollTo, themeProvider: widget.themeProvider),
          Expanded(
            child: SelectionArea(
              child: SingleChildScrollView(
                controller: _scrollController,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    KeyedSubtree(
                      key: _sectionKeys[PortfolioSection.home],
                      child: HeroSection(onNavigate: _scrollTo),
                    ),
                    KeyedSubtree(key: _sectionKeys[PortfolioSection.about], child: const AboutSection()),
                    KeyedSubtree(key: _sectionKeys[PortfolioSection.skills], child: const SkillsSection()),
                    KeyedSubtree(key: _sectionKeys[PortfolioSection.experience], child: const ExperienceSection()),
                    KeyedSubtree(key: _sectionKeys[PortfolioSection.projects], child: const ProjectsSection()),
                    KeyedSubtree(key: _sectionKeys[PortfolioSection.contact], child: const ContactSection()),
                    const FooterSection(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
