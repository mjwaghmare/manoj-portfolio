import 'package:flutter/material.dart';

import '../core/constants/brand_icons.dart';
import '../models/experience_model.dart';
import '../models/profile_model.dart';
import '../models/project_model.dart';
import '../models/skill_group_model.dart';
import '../models/tech_item_model.dart';

/// All portfolio content lives here. Edit this file to update the site.
///
/// Sources: Manoj_Waghmare_Resume_2026.pdf, the Popverse project README, and the
/// copy in the portfolio design mockup. Employment details follow the resume.
abstract final class PortfolioData {
  static const _githubUrl = 'https://github.com/mjwaghmare';

  /// Channel from the resume header; change it here if the channel moves.
  static const _youtubeUrl = 'https://www.youtube.com/@MWStudiooo';

  /// Target of the "View All Projects" link.
  static const moreProjectsUrl = _githubUrl;

  static const profile = ProfileModel(
    name: 'Manoj Waghmare',
    initials: 'MW',
    // Trimmed, transparent version of assets/images/profile.png (the MWStudio wordmark).
    logoAsset: 'assets/images/mwstudio_logo.png',
    role: 'Senior Mobile Developer',
    location: 'Pune, India',
    email: 'mjwaghmare@gmail.com',
    // Served from web/Manoj_Waghmare_Resume.pdf. Replace the file to update it.
    resumeUrl: 'Manoj_Waghmare_Resume.pdf',
    // Transparent cut-out portrait. Set to null to show the "MW" monogram instead.
    photoAsset: 'assets/images/mj.png',
    // \u2011 is a non-breaking hyphen (mapped to the hyphen glyph in the bundled font),
    // so "high-performance" never splits across lines.
    headline: 'Building high\u2011performance mobile experiences',
    headlineAccent: 'mobile experiences',
    heroIntroLines: ['7+ years building scalable, production-ready', 'apps for Android and iOS.'],
    about:
        'I\'m a Senior Flutter Developer with over 7 years of experience in mobile application development. '
        'I build scalable, production-ready cross-platform apps for Android and iOS, focusing on performance, '
        'clean architecture and user experience. I enjoy solving complex problems, working in Agile teams, '
        'and turning ideas into reliable products.',
    // An invitation to talk shop, not a job-search notice; availability lives on the resume and LinkedIn.
    contactMessage:
        'Building a mobile product or scaling a Flutter app? Let\'s talk architecture, real-time features '
        'and getting to production.',
    handwrittenNote: ['Flutter', 'Mobile Apps', 'Clean Code', 'Better UX'],
    linkedin: SocialLink(
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/manoj-waghmare-90a883124/',
      handle: '/in/manoj-waghmare',
      icon: BrandIcons.linkedin,
    ),
    github: SocialLink(label: 'GitHub', url: _githubUrl, handle: '/mjwaghmare', icon: BrandIcons.github),
    youtube: SocialLink(label: 'YouTube', url: _youtubeUrl, handle: '@MWStudiooo', icon: BrandIcons.youtube),
  );

  static const aboutHighlights = [
    (value: '7+', icon: null, color: null, label: 'Years\nExperience'),
    (value: null, icon: Icons.work_rounded, color: Color(0xFF8B51FA), label: 'Mobile App\nDevelopment'),
    (value: null, icon: Icons.location_on_rounded, color: Color(0xFF5B85F7), label: 'Pune\nIndia'),
  ];

  /// Core platform logos, shown as large tiles above [skillGroups].
  static const techStack = [
    TechItemModel(name: 'Flutter', svgAsset: 'assets/icons/tech/flutter.svg'),
    TechItemModel(name: 'Dart', svgAsset: 'assets/icons/tech/dart.svg'),
    TechItemModel(name: 'Android', svgAsset: 'assets/icons/tech/android.svg'),
    TechItemModel(name: 'iOS', svgAsset: 'assets/icons/tech/apple.svg', monochrome: true),
  ];

  /// Grouped as in the resume's Technical Skills, most senior-relevant first.
  static const skillGroups = [
    SkillGroupModel(
      title: 'State & Architecture',
      icon: Icons.account_tree_outlined,
      skills: [
        'Provider',
        'BLoC/Cubit',
        'Clean Architecture',
        'Dependency Injection',
        'SOLID',
        'Design Patterns',
        'Futures & Streams',
      ],
    ),
    SkillGroupModel(
      title: 'Testing & Performance',
      icon: Icons.speed_rounded,
      skills: ['Unit tests', 'Widget tests', 'Integration tests', 'Debugging', 'Memory & performance'],
    ),
    SkillGroupModel(
      title: 'CI/CD & Tools',
      icon: Icons.rocket_launch_outlined,
      skills: ['Fastlane', 'Bitbucket Pipelines', 'Git', 'GitHub', 'Postman', 'JIRA'],
    ),
    SkillGroupModel(
      title: 'Networking & Data',
      icon: Icons.cloud_outlined,
      skills: ['REST APIs', 'WebSockets', 'Dio', 'Firebase', 'MongoDB', 'Hive'],
    ),
    SkillGroupModel(
      title: 'Integrations',
      icon: Icons.extension_outlined,
      skills: ['Stripe', 'OneSignal', 'Push notifications', 'Deep linking', 'Google Maps'],
    ),
    SkillGroupModel(
      title: 'Auth & Security',
      icon: Icons.lock_outline_rounded,
      skills: ['OAuth/SSO', 'JWT refresh', 'Secure storage', 'Biometric auth', 'Trusted-device auth'],
    ),
  ];

  static const experiences = [
    ExperienceModel(
      company: 'Apptware Solutions LLP',
      role: 'Senior Mobile Developer',
      period: '2021 - Present',
      description:
          'Build and maintain production Flutter apps for Android and iOS across multiple client projects, '
          'including greenfield apps taken from architecture to release as sole mobile engineer. Integrate '
          'real-time WebSockets, Stripe payments, push notifications and OAuth/SSO, and secure networking with '
          'JWT refresh interceptors and biometric authentication. Coordinate releases with Fastlane and '
          'Bitbucket Pipelines.',
    ),
    ExperienceModel(
      company: 'Aceventura Services',
      role: 'Android / Flutter Developer',
      period: '2018 - 2020',
      description:
          'Built and shipped native Android apps, plus some Flutter work, for both client projects and in-house '
          'products: responsive UIs, REST API integrations and platform-specific features. Diagnosed production '
          'issues, optimized performance and maintained existing codebases.',
    ),
    ExperienceModel(
      company: 'Freelance',
      role: 'Android Developer',
      period: '2017 - 2018',
      description:
          'Delivered Android features across multiple client apps: built to client specifications, integrated '
          'their backend APIs and resolved reported defects.',
    ),
  ];

  // Each banner is drawn from `category`, the headline and `bannerGradient`; client apps
  // never show their screenshots.
  static const projects = [
    ProjectModel(
      title: 'SmartMariner',
      // Project descriptions are sized to fill three lines on the desktop card.
      description:
          'Marketplace for boat owners, service providers and dealers. Sole mobile engineer, '
          'from greenfield to production.',
      type: ProjectType.professional,
      tags: ['Flutter', 'BLoC/Cubit', 'OAuth/SSO'],
      category: 'Marine marketplace',
      headline: 'Owners, providers',
      headlineAccent: 'and dealers',
      bannerGradient: [Color(0xFF007A70), Color(0xFF00453F)],
      url: 'https://apps.apple.com/us/app/smartmariner/id6757733631',
    ),
    ProjectModel(
      title: 'PCLive247',
      description:
          'Live auction app for sports cards with real-time WebSocket bidding, Stripe payments and push alerts.',
      type: ProjectType.professional,
      tags: ['Flutter', 'WebSockets', 'Real-time'],
      category: 'Sports cards',
      headline: 'Live auctions,',
      headlineAccent: 'real-time bids',
      bannerGradient: [Color(0xFF0A72DA), Color(0xFF003F9E)],
      url: 'https://apps.apple.com/us/app/pclive247/id6448715934',
    ),
    ProjectModel(
      title: 'Popverse',
      description:
          'Track, discover and manage your favorite TV shows and movies, with titles, ratings and trends '
          'from the TMDB API.',
      type: ProjectType.personal,
      tags: ['Flutter', 'TMDB API', 'Firebase'],
      category: 'Movie & TV tracker',
      headline: 'Every show,',
      headlineAccent: 'one watchlist',
      bannerGradient: [Color(0xFF8C6BC8), Color(0xFF3A2D6B)],
    ),
  ];
}
