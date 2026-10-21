{{flutter_js}}
{{flutter_build_config}}

_flutter.loader.load({
  serviceWorkerSettings: {
    serviceWorkerVersion: {{flutter_service_worker_version}},
  },
  config: {
    // GitHub Pages can't send the COOP/COEP headers that multi-threaded skwasm needs, so the
    // engine would run single-threaded anyway; saying so up front skips the console warning.
    forceSingleThreadedSkwasm: true,
  },
});
