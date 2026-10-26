# Cruise Companion — phone web app

Static site built from `project/Cruise Companion.dc.html`. No build step: serve this folder over **HTTPS** and open it in Safari on the phone.

- On a phone (or when launched from the home screen) it fills the screen; on a desktop it shows the phone mock-up.
- Add to Home Screen: Safari → Share → *Add to Home Screen*. It opens full-screen with its own icon.
- React and the icon font are vendored in `vendor/`, and `sw.js` caches the app, so it opens on spotty ship Wi-Fi after the first visit. Bump `VERSION` in `sw.js` when you ship changes.
- Data lives in the phone's browser storage (`localStorage`, key `mt-cruise-v3`): each phone has its own copy.
- HTTPS is required for the camera and the offline cache.

Local preview: `python3 -m http.server -d web 8000`, then open http://localhost:8000.
