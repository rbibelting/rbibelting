# Mobile responsiveness validation

17 November 2026. Tested the local project at http://localhost:8080 using Chromium mobile/touch emulation.

- All 25 public routes pass at 320, 360, 390, 430 and 768px: 125 page/viewport checks.
- No document horizontal overflow, broken loaded images, off-screen header controls, missing primary headings or browser page errors were detected.
- At all five widths, the menu opens, navigates to Contact and closes after the route updates. Search opens the matching V-Belts range. Product dialogs fit within the viewport. Quick enquiry preserves the selected product; empty form submission shows validation feedback.
- Additional checks with the Inter font loaded pass at 390×844 portrait and 844×390 landscape: conveyor range popup fits, contact FAQ expands, no horizontal overflow, phone/email URLs retain the configured business details.
- Home, contact and product screenshots were reviewed, including the conveyor popup after its opening animation finished.

The initial layout audit required no layout fixes. A subsequent accessibility review enlarged the mobile menu and search-close buttons from 36px to 44px, labeled the search-close action, and added the mobile navigation label plus menu expanded/control states. Evidence: [responsiveness-validation.json](responsiveness-validation.json).

Scope: these checks cover the local version in Chromium emulation. Physical iPhone/Safari and Android device checks, virtual keyboard behavior, production hosting, external widgets and actual receipt of email/WhatsApp enquiries were not validated. Third-party analytics/widget requests were blocked to avoid test traffic. No real enquiries were sent.

## Follow-up accessibility verification

The targeted follow-up checks cover all five widths after these changes: both controls measure at least 44×44 CSS pixels; expanded state updates; navigation closes the menu; search dismissal works; no horizontal overflow. Evidence: [accessibility-validation.json](accessibility-validation.json). Production build was rerun after the change.
