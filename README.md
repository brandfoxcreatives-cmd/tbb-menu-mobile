# Taal Bayview Bistro — Mobile Menu Ordering

A mobile-first, customer-facing ordering app: browse the menu with prices and photos,
build an order, and submit it — it shows up instantly on the staff Order Board's
Kitchen Display, Order History, and Dashboard, because **this is a separate app that
shares the exact same Firebase project** as the staff Order Board.

Meant to be opened via a QR code at each table (or a takeout counter tablet) —
customers browse, add items, enter their table number, and place the order
themselves. No login required.

## How it shares data with the staff app

- **Same Firebase project** — same six `VITE_FIREBASE_*` values as the staff Order
  Board app (`taal-bayview-order-board`).
- **Same `orders` collection** — an order placed here is written with the identical
  structure the staff app uses, so it appears on Kitchen Display right away.
- **Same daily order-number counter** (`counters/{date}`) — order numbers stay
  unified across both apps; a mobile order and a cashier-entered order never collide.
- **Same `stock/availability` doc** — items marked Out of Stock in the staff app's
  Menu & Stock page are automatically hidden/disabled here too, in real time.
- **Same `meta/menuImages` doc** — photos uploaded in the staff app's Settings page
  show up here automatically; nothing to upload twice.
- **Same `src/data/menuData.js`** — copied directly from the staff app so item IDs
  match exactly. **If you ever edit the menu (add/remove/rename items) in the staff
  app, copy the same updated `menuData.js` into this project too**, or the two apps'
  item IDs will drift apart and stock/photos won't line up correctly between them.

Orders placed here are tagged `orderSource: 'QR / Mobile Self-Order'` so staff can
tell at a glance (in Order History or on the printed receipt) which orders came from
a customer's phone versus the cashier.

## Customer info required before ordering

The very first time someone opens the app on a device, they're shown a short form
(Name, Facebook Name, Mobile Number, Address — all but Facebook Name required)
before they can browse the menu. It's saved to that device so it only needs to be
filled in once; a small "edit info" link in the header lets them update it later.
These details are attached to every order placed from that device
(`customerName`, `customerFacebookName`, `customerContact`, `customerAddress`), so
staff always have a way to reach the customer — visible in Order History and on the
printed receipt in the staff app.

## Header

Taller header with a smaller, secondary-weight "What would you like today?" line, so
the restaurant name and the My Orders button have more room to breathe instead of
competing with a large heading.

## My Orders — checking on an order later

No login is needed. When someone places an order, its ID is remembered in that
device's browser storage (not tied to a person, just that phone/browser — clearing
browser data will clear this list). A **🧾 My Orders** button sits in the top-right of
the menu screen (badge shows how many), and also appears as a link right after
placing an order.

Tapping it shows every order placed from that device, each with a live status badge,
most recent first (capped at the most recent 20). Tapping an individual order opens
its full live tracker (same Order Received → Preparing → Ready → Served steps as the
confirmation screen) plus its item list and total — so a guest can check back on an
order from earlier in the meal, or from a previous visit, without asking staff.

## What it does NOT include

On purpose, to keep this app focused purely on ordering:
- No Kitchen Display, Dashboard, Menu & Stock management, or Settings — that's all in
  the staff app.
- No advance/scheduled orders — this is for placing an order right now, at the table.
- No PDF/PNG export — customers can screenshot their confirmation screen if needed.

## Local development

```bash
npm install
npm run dev
```

## Deploy (same pattern as the staff app: GitHub → Vercel)

1. Push this folder to its **own** new GitHub repo (separate from the staff app's
   repo) — e.g. `taal-bayview-menu-mobile`.
2. Import it into Vercel as a new project.
3. Add the same six `VITE_FIREBASE_*` environment variables as the staff app (same
   Firebase project, same values) in Vercel → Settings → Environment Variables,
   before the first deploy.
4. Deploy. You'll get a separate `*.vercel.app` URL (and can point a separate
   subdomain at it, e.g. `order.taalbayviewbistro.com`, the same way as the staff
   app's domain was set up).
5. Generate a QR code pointing at that URL (any free QR generator) and print/place it
   on each table.

## Firestore rules note

This app only ever needs to: read `stock/availability` and `meta/menuImages`, and
create documents in `orders` plus read/update `counters/{date}`. It never deletes
anything and never touches Storage directly (it only displays image URLs the staff
app already uploaded). The same open rule already set up for the staff app covers
this automatically — no additional Firestore/Storage rule changes needed.

## Orders now go through staff approval first

Every order placed here is saved with `status: 'awaiting_approval'` — it's tagged
`orderSource: 'Facebook'` automatically (matching how the ordering link gets shared)
and shows up as a review popup on the staff app's Dashboard. A staff member approves
it (which is what actually sends it to the kitchen) or declines it. The customer's
own tracker screen reflects this with an "Awaiting Confirmation" step before "Order
Received," so they're not left thinking their order started cooking before a human
has actually looked at it.
