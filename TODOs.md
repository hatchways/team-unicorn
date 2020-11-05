# Team Unicorn - KanBan TODOs

## High Prio:

- Writing a readme
- Adding a demo functionality
  - No need for signup, just login with default data.
  - Create a new user, use cookies to ensure\* one account per demo.
  - Add a reset button to reset demo account to default state.

<sub>\*: If cookie exists, sign in to existing demo account. If not create a new demo acocunt and add the cookie. We can set a long expiry date.</sub>

## Integration & Old Tasks

- Merge/Integrate Calendar & Multiple boards to dev. Might want to consider the issues below while doing so. I'd recommend diving into the branch, splitting up functionality and adjusting/integrating bit by bit rather than merging the whole thing and try to fix & patch as we go along.

- Close open issues.

## QOL fixes

#### Consider each issue a separate ticket. Most of these go hand in hand with some other issues listed:

- General Backend fixes:

  - Consistent env variables for testing, development and production.
  - Consistent & predictable error messages.
  - Revise backend routes and remove unnecessary/unused models/routes.

- Layout Fixes:

  - Move user menu to the menu button. We can add a profile page and link the profile picture to that page. Could be a modal instead of a page as well.
  - Take a closer look at responsiveness and test with various screen sizes & browsers.

- Calendar:
  - Bug fixes.
  - Define a behaviour that's consistent & coherent with the rest of the app (right now, we don't really have a well-defined behaviour for creating cards on click and etc. AFAIK).
  - Context fixes (see below).
- Multiple boards:
  - Bug fixes.
  - Make backend and frontend async.
- Board:
  - Minor bug fixes.
  - Improved styling that's consistent with the rest of the app.
  - Make backend and frontend async (this is relevant to context and onDragEnd).
  - Dialog fixes/removals.
  - Add column buttons (I do have a problem with this but I'll put it down as a '?')
- Context:
  - Consistent use of context with multiple boards & calendar branch.

## New Features

- FS-Card Details:

  - Add remaining functionality to card details (tags, attachments, cover etc.) and integrate with the backend.

- FE-Card Component (blocked by FS-Card Details):

  - Create a card component to reflect what's in the mocks as well as:
  - Cover to edit background,
  - Display summary (a part of its description and maybe some of its tags)
  - Add a shortcut delete or lock button on the component (without needing to open its details)

- FS-Email Confirmation:

  - Send an email with a confirmation link to confirm users' emails.
  - Create a new page on the front end if necessary.
  - Integrate it with the backend (update user model)
  - Display a snackbar message upon successful/failed confirmation.
  - Display a message on dashboard/calendar pages for users whose emails have not been confirmed yet (can add a re-send confirmation link button too!).

- FS-Password Reset:

  - Add a "Forgot Password?" button to auth pages.
  - Create a new forgot password page and integrate the email api to coordinate a process to reset users' passwords.

- FE/FS-Manifest, About Page & SEO:

  - Fix title & logo, add a manifest file.
  - Write up a public about page (useful for SEO, demo & a good practice in general. Could recycle some material from the readme) Could be integrated into auth pages (scroll down) instead of a new page.
  - I don't yet know enough about SEO to list tasks/strategies of the top of my head, however, I believe considering some strategies to improve indexability of our content would be a good practice.

- BE-Unit Testing:

  - Write more, comprehensive BDD/TDD unit tests.
  - Split testing code into meaningful files/modules.

- DEVOPS-CI/CD (Icebox):
  - Integrate CI/CD using Circle-CI.
