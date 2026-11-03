# Resonate visual system

The visual refresh follows the supplied Resonate Music App Styleboard.

- Orange: `#FF6A00`
- Black: `#111111`
- Ivory: `#F8F4E6`
- Charcoal: `#2A2A2A`
- Stone: `#D9D4C8`

`src/cssfiles/theme.css` owns the shared tokens and screen-level theme. Existing screen styles retain their layout rules. Shared icons are local SVG paths in `src/Icon.js`; decorative marks and illustrations in `public/assets/` are vector recreations based on the styleboard, so they scale without a bitmap background.

The sidebar is 208px wide, or 74px as an icon rail (64px on small screens). Its collapsed state is remembered in browser storage. On small screens, expanding it overlays the content rather than squeezing the page. Every icon-only navigation item has an accessible name and tooltip. The `/` shortcut opens Search when focus is outside a text field.

`DiscardButton` is shared by event and post creation. Edited forms require an explicit confirmation. Keep editing is focused first; Escape cancels the warning and preserves the form. An empty form can be discarded immediately. Closing event creation still preserves a draft, matching the existing event behaviour.

SVG artwork is decorative in the interface; the brand link has a text alternative. Orange action buttons use dark text for readable contrast. Reduced-motion preferences disable layout transitions.
