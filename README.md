# Bored. Play Hub Prototype

A mobile-first customer booking and staff operations prototype for **Bored. Games Cafe**.

## Included

- Branded landing page
- Quick table reservation flow
- Interactive game finder
- Event listing and ticket flow prototype
- Damansara Jaya and Tamarind Square branch profiles
- Private event quote builder
- Membership concept
- Staff dashboard demo
- Responsive mobile layout
- GitHub Pages deployment workflow

## Prototype routes

- `index.html` - customer-facing Play Hub
- `dashboard.html` - staff and owner dashboard demo

## Run locally

This is a static site. Open `index.html` directly, or start a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Publish with GitHub Pages

The repository includes `.github/workflows/pages.yml`.

1. Open **Settings > Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main`, or manually run the workflow from the Actions tab.

Expected live URL:

`https://shukritobi.github.io/Bored-games-cafe/`

## Notes

- All bookings, inventory, event and revenue records are demo data.
- No real payments are processed.
- Game covers are original abstract prototype artwork.
- A production version should connect to a database, authenticated staff accounts, a Malaysian payment gateway and WhatsApp messaging.
