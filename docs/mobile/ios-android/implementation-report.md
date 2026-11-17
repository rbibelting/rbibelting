# iOS and Android mobile optimization

17 November 2026. Local project at http://localhost:8080. Not deployed or pushed.

## Changes

- Adjusted mobile hero/section typography and reduced oversized section/card spacing without changing desktop heading layouts or business copy. The 320px header uses an icon-only search button with its accessible label retained; wider phones retain the visible Search label.
- Search now uses the existing accessible Dialog component: focus stays in the dialog, Escape/backdrop closes it, focus returns to the search control, body scrolling is locked and results scroll within the available viewport. Selecting a range or quick enquiry continues to open the existing product/enquiry dialog.
- Shared Button controls use 44px minimum touch dimensions on coarse pointers. Generic close buttons are 44px; product-range close controls were enlarged too.
- Form fields retain 16px text on touch devices, including tablet widths. Added name/company/phone/email autofill hints and appropriate phone/email keyboard hints. Browser zoom remains enabled.
- Enquiry, brochure and V-belt dialogs use dynamic viewport heights; generic dialogs have viewport margins and scrolling. Menu height now tracks the dynamic viewport.
- Added safe-area padding to the sticky header and content containers, and safe-area offsets to floating enquiry/WhatsApp buttons. Viewport metadata enables safe-area coverage and asks supporting Android browsers to resize content for the keyboard.

## Verification

The repeatable checker is `scripts/check-mobile-browsers.mjs`, using an existing external Playwright installation with Chromium and WebKit. No application package was added.

- Chromium with Pixel 7 mobile settings and WebKit with iPhone 13 settings: all 25 routes at 320×568, 390×844, 412×915, 768×1024 and 844×390. **250 page/viewport checks passed.**
- Each route returns 200, has one H1, no horizontal document overflow, form inputs of at least 16px, and header buttons within bounds with minimum 44px dimensions.
- Ten engine/viewport interaction runs passed: menu navigation/closing, invalid enquiry feedback, MOQ FAQ expansion, search sizing and focus restoration, product popup bounds/tabs, enquiry prefills and invalid-phone feedback.
- Both engines also pass search and enquiry dialog checks in a short 390×400 viewport, with form actions reachable by scrolling. This approximates limited space; it is not a physical keyboard test.
- No browser page errors were recorded. Real Google fonts were allowed for layout metrics; external analytics and widgets were blocked to avoid sending test traffic. No real enquiries were sent.
- Viewport screenshots were reviewed. Results and screenshots are in this directory.
- Production build, shared data checks, 25-route SSR SEO audit and structured-data validation passed. The existing full-project ESLint debt remains; full lint is not green. The new mobile checker and shared Dialog pass focused ESLint; Button retains its existing Fast Refresh export warning.

Physical iPhone/Safari and Android hardware testing, actual virtual keyboard/browser toolbar behavior, nonzero notch safe-area insets, third-party widgets and live production hosting remain to be verified on devices. WebKit/Chromium emulation does not prove every OS/browser version.

Implementation references: [viewport metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) and [safe-area environment variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env).

Re-run:

```sh
PLAYWRIGHT_MODULE=file:///path/to/playwright/index.mjs bun scripts/check-mobile-browsers.mjs http://localhost:8080
```
