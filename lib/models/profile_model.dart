import 'package:flutter/widgets.dart';

class SocialLink {
  const SocialLink({required this.label, required this.url, required this.handle, required this.icon});

  final String label;
  final String url;

  /// Short display form of the URL, e.g. `/username`.
  final String handle;
  final IconData icon;
}

class ProfileModel {
  const ProfileModel({
    required this.name,
    required this.initials,
    required this.logoAsset,
    required this.role,
    required this.location,
    required this.email,
    required this.resumeUrl,
    required this.headline,
    required this.headlineAccent,
    required this.heroIntroLines,
    required this.about,
    required this.contactMessage,
    required this.linkedin,
    required this.github,
    required this.youtube,
    this.photoAsset,
    this.handwrittenNote = const [],
  });

  final String name;
  final String initials;

  /// Brand logo shown in the header and footer (transparent background works on both themes).
  final String logoAsset;
  final String role;
  final String location;
  final String email;

  /// Absolute URL, or a path relative to the site root (files in `web/`).
  final String resumeUrl;

  /// Main hero heading. The name and role appear in a small label above it.
  final String headline;

  /// Ending of [headline] painted with the brand gradient; must be a suffix of it.
  final String headlineAccent;

  /// Short hero summary; lines are kept on wide screens and joined on narrower ones.
  final List<String> heroIntroLines;
  final String about;
  final String contactMessage;
  final SocialLink linkedin;
  final SocialLink github;
  final SocialLink youtube;

  /// Optional portrait in `assets/images/`. A transparent cut-out works best.
  /// A monogram is shown when null.
  final String? photoAsset;

  /// Handwritten lines beside the portrait. Empty hides the note.
  final List<String> handwrittenNote;

  /// Social profiles in display order.
  List<SocialLink> get socialLinks => [linkedin, github, youtube];
}
