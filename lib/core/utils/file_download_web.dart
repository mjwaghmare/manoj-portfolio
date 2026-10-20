import 'package:web/web.dart' as web;

/// Saves [url] as [fileName] through a temporary `<a download>` element.
/// A relative [url] resolves against the page's `<base href>`.
void downloadFile(String url, {required String fileName}) {
  final anchor = web.HTMLAnchorElement()
    ..href = url
    ..download = fileName;
  web.document.body?.append(anchor);
  anchor.click();
  anchor.remove();
}
