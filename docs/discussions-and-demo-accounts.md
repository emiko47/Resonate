# Discussions and demo accounts

- Each discussion can be collapsed independently. Its replies and any in-progress inline reply remain intact when collapsed; the full discussion list can also be hidden.
- Nested replies have thread guides, parent-author links, and chronological placement. The discussion-order selector sorts the top-level discussions.
- Each post has its own browser-local reply storage. The route selects the matching sample post instead of always showing the first one. Long posts can be expanded without trapping readers in a second scrolling panel.
- Login and create-account screens at `/login` and `/signup` are explicitly labelled course-project demos. They accept sample details, keep only the demo name/email in local storage, and never store or transmit passwords. No authentication service or real account is created.
- Demo sign-up/login returns to the original app page. The header shows the active demo identity and a Log out action. Browsing stays available without a demo session.

Tests cover collapse/draft preservation, targeted replies and reload persistence, post selection and discussion ordering, confirmation validation, demo login/logout/restoration, absence of saved passwords, and internal return URLs.
