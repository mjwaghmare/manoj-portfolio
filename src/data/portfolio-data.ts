export interface SocialLink {
  label: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'youtube';
}

export interface Profile {
  name: string;
  initials: string;
  logoAsset: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  resumeUpdated: { iso: string; label: string };
  photoAsset: string;
  headline: string;
  headlineAccent: string;
  heroIntroLines: string[];
  about: string;
  contactMessage: string;
  handwrittenNote: string[];
  linkedin: SocialLink;
  github: SocialLink;
  youtube: SocialLink;
}

export interface AboutHighlight {
  value?: string | null;
  icon?: 'work' | 'location' | null;
  iconColor?: string | null;
  label: string;
}

export interface TechItem {
  name: string;
  svgAsset: string;
  monochrome?: boolean;
}

export interface SkillGroup {
  title: string;
  icon: 'architecture' | 'speed' | 'rocket' | 'cloud' | 'extension' | 'security';
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export type ProjectType = 'professional' | 'personal';

export interface Project {
  title: string;
  description: string;
  type: ProjectType;
  tags: string[];
  category: string;
  headline: string;
  headlineAccent: string;
  bannerGradient: [string, string];
  url?: string;
  screens?: string[];
}

export const PortfolioData = {
  githubUrl: 'https://github.com/mjwaghmare',
  youtubeUrl: 'https://www.youtube.com/@MWStudiooo',
  moreProjectsUrl: 'https://github.com/mjwaghmare',

  profile: {
    name: 'Manoj Waghmare',
    initials: 'MW',
    logoAsset: '/images/mwstudio_logo.webp',
    role: 'Senior Mobile Developer',
    location: 'Pune, India',
    email: 'mjwaghmare@gmail.com',
    resumeUrl: '/Manoj_Waghmare_Resume.pdf',
    // Matches the PDF's own modified date. Update both when the resume changes.
    resumeUpdated: { iso: '2026-10-17', label: 'Oct 2026' },
    photoAsset: '/images/mj.webp',
    headline: 'Building high\u2011performance mobile experiences',
    headlineAccent: 'mobile experiences',
    heroIntroLines: ['7+ years building scalable, production-ready', 'apps for Android and iOS.'],
    about:
      "I'm a Senior Flutter Developer with over 7 years of experience in mobile application development. " +
      "I build scalable, production-ready cross-platform apps for Android and iOS, focusing on performance, " +
      "clean architecture and user experience. I enjoy solving complex problems, working in Agile teams, " +
      "and turning ideas into reliable products.",
    contactMessage:
      "Building a mobile product or scaling a Flutter app? Let's talk architecture, real-time features " +
      "and getting to production.",
    handwrittenNote: ['Flutter', 'Mobile Apps', 'Clean Code', 'Better UX'],
    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/manoj-waghmare-90a883124/',
      handle: '/in/manoj-waghmare',
      icon: 'linkedin',
    },
    github: {
      label: 'GitHub',
      url: 'https://github.com/mjwaghmare',
      handle: '/mjwaghmare',
      icon: 'github',
    },
    youtube: {
      label: 'YouTube',
      url: 'https://www.youtube.com/@MWStudiooo',
      handle: '@MWStudiooo',
      icon: 'youtube',
    },
  } as Profile,

  aboutHighlights: [
    { value: '7+', icon: null, iconColor: null, label: 'Years\nExperience' },
    { value: null, icon: 'work', iconColor: '#8B51FA', label: 'Mobile App\nDevelopment' },
    { value: null, icon: 'location', iconColor: '#5B85F7', label: 'Pune\nIndia' },
  ] as AboutHighlight[],

  techStack: [
    { name: 'Flutter', svgAsset: '/icons/tech/flutter.svg' },
    { name: 'Dart', svgAsset: '/icons/tech/dart.svg' },
    { name: 'Android', svgAsset: '/icons/tech/android.svg' },
    { name: 'iOS', svgAsset: '/icons/tech/apple.svg', monochrome: true },
  ] as TechItem[],

  skillGroups: [
    {
      title: 'State & Architecture',
      icon: 'architecture',
      skills: [
        'Provider',
        'BLoC/Cubit',
        'Clean Architecture',
        'Dependency Injection',
        'SOLID',
        'Design Patterns',
        'Futures & Streams',
      ],
    },
    {
      title: 'Testing & Performance',
      icon: 'speed',
      skills: ['Unit tests', 'Widget tests', 'Integration tests', 'Debugging', 'Memory & performance'],
    },
    {
      title: 'CI/CD & Tools',
      icon: 'rocket',
      skills: ['Fastlane', 'Bitbucket Pipelines', 'Git', 'GitHub', 'Postman', 'JIRA'],
    },
    {
      title: 'Networking & Data',
      icon: 'cloud',
      skills: ['REST APIs', 'WebSockets', 'Dio', 'Firebase', 'MongoDB', 'Hive'],
    },
    {
      title: 'Integrations',
      icon: 'extension',
      skills: ['Stripe', 'OneSignal', 'Push notifications', 'Deep linking', 'Google Maps'],
    },
    {
      title: 'Auth & Security',
      icon: 'security',
      skills: ['OAuth/SSO', 'JWT refresh', 'Secure storage', 'Biometric auth', 'Trusted-device auth'],
    },
  ] as SkillGroup[],

  experiences: [
    {
      company: 'Apptware Solutions LLP',
      role: 'Senior Mobile Developer',
      period: '2021 - Present',
      description:
        'Build and maintain production Flutter apps for Android and iOS across multiple client projects, ' +
        'including greenfield apps taken from architecture to release as sole mobile engineer. Integrate ' +
        'real-time WebSockets, Stripe payments, push notifications and OAuth/SSO, and secure networking with ' +
        'JWT refresh interceptors and biometric authentication. Coordinate releases with Fastlane and ' +
        'Bitbucket Pipelines.',
    },
    {
      company: 'Aceventura Services',
      role: 'Android / Flutter Developer',
      period: '2018 - 2020',
      description:
        'Built and shipped native Android apps, plus some Flutter work, for both client projects and in-house ' +
        'products: responsive UIs, REST API integrations and platform-specific features. Diagnosed production ' +
        'issues, optimized performance and maintained existing codebases.',
    },
    {
      company: 'Freelance',
      role: 'Android Developer',
      period: '2017 - 2018',
      description:
        'Delivered Android features across multiple client apps: built to client specifications, integrated ' +
        'their backend APIs and resolved reported defects.',
    },
  ] as Experience[],

  projects: [
    {
      title: 'Marine Marketplace',
      description:
        'Marketplace for boat owners, service providers and dealers. Sole mobile engineer, ' +
        'from greenfield to production.',
      type: 'professional',
      tags: ['Flutter', 'BLoC/Cubit', 'OAuth/SSO'],
      category: 'Marine marketplace',
      headline: 'Owners, providers',
      headlineAccent: 'and dealers',
      bannerGradient: ['#007A70', '#00453F'],
    },
    {
      title: 'Live Auction App',
      description:
        'Live auction app for sports cards with real-time WebSocket bidding, Stripe payments and push alerts.',
      type: 'professional',
      tags: ['Flutter', 'WebSockets', 'Real-time'],
      category: 'Sports cards',
      headline: 'Live auctions,',
      headlineAccent: 'real-time bids',
      bannerGradient: ['#0A72DA', '#003F9E'],
    },
    {
      title: 'PopVerse',
      description:
        'Track, discover and manage your favorite TV shows and movies, with titles, ratings and trends ' +
        'from the TMDB API.',
      type: 'personal',
      tags: ['Flutter', 'TMDB API', 'Firebase'],
      category: 'Movie & TV tracker',
      headline: 'Every show,',
      headlineAccent: 'one watchlist',
      bannerGradient: ['#8C6BC8', '#3A2D6B'],
      url: 'https://github.com/mjwaghmare/TellyBinge',
    },
  ] as Project[],
};
