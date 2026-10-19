import 'package:flutter/material.dart';

import '../core/constants/brand_icons.dart';
import '../models/experience_model.dart';
import '../models/profile_model.dart';
import '../models/project_model.dart';
import '../models/tech_item_model.dart';

/// All portfolio content lives here. Edit this file to update the site.
///
/// Sources: Manoj_Waghmare_Resume_2026.pdf, the Popverse project README, and the
/// copy in the portfolio design mockup. Employment details follow the resume.
abstract final class PortfolioData {
  static const _githubUrl = 'https://github.com/mjwaghmare';

  /// Target of the "View All Projects" link.
  static const moreProjectsUrl = _githubUrl;

  static const profile = ProfileModel(
    name: 'Manoj Waghmare',
    initials: 'MW',
    // Trimmed, transparent version of assets/images/profile.png (the MWStudio wordmark).
    logoAsset: 'assets/images/mwstudio_logo.png',
    role: 'Senior Flutter Developer',
    location: 'Pune, India',
    email: 'mjwaghmare@gmail.com',
    // Served from web/Manoj_Waghmare_Resume.pdf. Replace the file to update it.
    resumeUrl: 'Manoj_Waghmare_Resume.pdf',
    // Transparent cut-out portrait. Set to null to show the "MW" monogram instead.
    photoAsset: 'assets/images/mj.png',
    // \u2011 is a non-breaking hyphen (mapped to the hyphen glyph in the bundled font),
    // so "high-performance" never splits across lines.
    headline: 'Building high\u2011performance mobile experiences with Flutter.',
    headlineAccent: 'with Flutter.',
    heroIntroLines: ['7+ years building scalable, production-ready', 'apps for Android and iOS.'],
    about:
        'I\'m a Senior Flutter Developer with over 7 years of experience in mobile application development. '
        'I build scalable, production-ready cross-platform apps for Android and iOS, focusing on performance, '
        'clean architecture and user experience. I enjoy solving complex problems, working in Agile teams, '
        'and turning ideas into reliable products.',
    contactMessage: 'I\'m open to new opportunities and interesting projects.\nFeel free to reach out!',
    handwrittenNote: ['Flutter', 'Mobile Apps', 'Clean Code', 'Better UX'],
    linkedin: SocialLink(
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/manoj-waghmare-90a883124/',
      handle: '/in/manoj-waghmare',
      icon: BrandIcons.linkedin,
    ),
    github: SocialLink(label: 'GitHub', url: _githubUrl, handle: '/mjwaghmare', icon: BrandIcons.github),
  );

  static const aboutHighlights = [
    (value: '7+', icon: null, color: null, label: 'Years\nExperience'),
    (value: null, icon: Icons.work_rounded, color: Color(0xFF8B51FA), label: 'Mobile App\nDevelopment'),
    (value: null, icon: Icons.location_on_rounded, color: Color(0xFF5B85F7), label: 'Pune\nIndia'),
  ];

  static const techStack = [
    TechItemModel(name: 'Flutter', svgAsset: 'assets/icons/tech/flutter.svg'),
    TechItemModel(name: 'Dart', svgAsset: 'assets/icons/tech/dart.svg'),
    TechItemModel(name: 'Android', svgAsset: 'assets/icons/tech/android.svg'),
    TechItemModel(name: 'iOS', svgAsset: 'assets/icons/tech/apple.svg', monochrome: true),
    TechItemModel(name: 'Firebase', svgAsset: 'assets/icons/tech/firebase.svg'),
    TechItemModel(name: 'REST APIs', icon: Icons.cloud_outlined),
    TechItemModel(name: 'Go', svgAsset: 'assets/icons/tech/go.svg'),
  ];

  static const experiences = [
    ExperienceModel(
      company: 'Apptware Solutions LLP',
      role: 'Senior Mobile Developer',
      period: '2021 - Present',
      description:
          'Building production-grade Flutter apps for Android and iOS, from architecture and feature '
          'development to testing, performance work and app-store releases.',
    ),
    ExperienceModel(
      company: 'Aceventura Services',
      role: 'Android / Flutter Developer',
      period: '2018 - 2020',
      description:
          'Delivered Android and Flutter applications with responsive interfaces, REST API integrations '
          'and platform-specific features, and improved app performance.',
    ),
    ExperienceModel(
      company: 'Freelance',
      role: 'Android Developer',
      period: '2017 - 2018',
      description:
          'Built Android application features, integrated backend APIs and resolved defects '
          'based on client requirements.',
    ),
  ];

  static const projects = [
    ProjectModel(
      title: 'PCLive247',
      description: 'Live auction app for sports cards with real-time bidding, Stripe payments and alerts.',
      type: ProjectType.professional,
      tags: ['Flutter', 'WebSockets', 'Real-time'],
      placeholderIcon: Icons.gavel_rounded,
      placeholderGradient: [Color(0xFF14161D), Color(0xFF2C303C)],
      url: 'https://pclive247.com/',
    ),
    ProjectModel(
      title: 'Popverse',
      description: 'Track, discover and manage your favorite TV shows and movies using TMDB.',
      type: ProjectType.personal,
      tags: ['Flutter', 'TMDB API', 'Firebase'],
      placeholderIcon: Icons.movie_filter_outlined,
      placeholderGradient: [Color(0xFF3A2D6B), Color(0xFF8C6BC8)],
      imageAsset: 'assets/images/projects/popverse.jpg',
    ),
    ProjectModel(
      title: 'Honeywell PDV',
      // TODO(manoj): Confirm this description and the tags; no source files were available locally.
      description: 'Flutter concept for an enterprise portal bringing business dashboards into one app.',
      type: ProjectType.concept,
      tags: ['Flutter', 'Dashboards', 'Enterprise'],
      placeholderIcon: Icons.dashboard_outlined,
      placeholderGradient: [Color(0xFF4F86D4), Color(0xFFA9C5EC)],
    ),
  ];
}
