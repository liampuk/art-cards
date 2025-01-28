# Art Cards

A project to make a little card game with a few decks (pre-raphaelite/art nouveau/art deco etc.)

<img width="783" alt="image" src="https://github.com/user-attachments/assets/9fc95e9c-3103-4f98-9cce-cf16b8780d2d" />

To serve over https for motion debugging, add `VITE_ENABLE_SSL=true` to your `.env` file and generate certificates with:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem
```

## TODO

- [x] Fix layout/scroll
- [x] Fix border overflow
- [x] Lenis smooth scroll
- [x] Falling leaves with scroll
- [x] Sticky scroll section
- [x] Replace images with text
- [x] Implement sidebar buttons
- [x] Optimise images
- [x] SVG line animation on smooth scroll section
- [x] Text animation on smooth scroll section
- [x] Responsive sidebar
- [x] main section responsiveness
- [x] Remove framer motion
- [x] Fix rerenders with redux/zustand

### Main Page

- [x] Hero section with title and call to action button, and card to the right
- [x] With scroll, description animates out and card moves to centre. Card animates through shine with scroll with css fixed before finally scrolling off screen to the top
- [x] Smooth scroll with Lenis scroll

### Sidebar

- [x] Title
- [x] Buttons
- [x] link to portfolio

### Open pack page

- 3d pack?
- Challenges -> collect cards in series (hearts are trumps etc.) to get extra coins

- [x] Replace card image in pack with motion card
- [x] Animate 3 common cards
- [x] Add reset button
- [x] Add extra packs
- [x] Fix shadow layering
- [x] Pointer events none on hidden cards

### Collection page

- [x] grid of cards
- [x] showcase view

### Tutorial page

- writeup of
  - How the cards work
  - the leaves overlay
- link to blog

### Mobile

- Simple version, title and one card with suggestion to view on desktop
- gyrometer

### Saving collection

- Let user change their name
  - auto generate random name from greek myths?
- Save collection to local state, hashed with last card opened date time and name.
- QR code/option to copy url to collection

- Local storage
  - Encrypt date with number of packs opened, collection
  - if date different, reset number of opened packs
  - base64 encode url
  - maybe 30 characters max?

## Old Plan

<details>

<summary>Expand</summary>

## TODO

- [ ] Main page
- [ ] Side bar
- [ ] Set up backend server
- [ ] Add user auth
- [ ] Implement card opening

## Frontend

### Main Page

- Title and description on the left
- Card on the right
- With scroll, description animates out and card moves to centre. Card animates through shine with scroll with css fixed before finally scrolling off screen to the top
- [ ] Smooth scroll with Lenis scroll
- [ ] Build title section
- [ ] Sticky position section
- [ ]

### Open pack page

- 3d pack? Click to open?
- Challenges -> collect cards in series (hearts are trumps etc.) to get extra coins
- Log in/create account
- Pay to open more than one pack per day

### Collection page

- grid of cards
- create apple wallet qr code

### Tutorial page

- writeup of
  - How the cards work
  - the leaves overlay
- link to blog?

### Settings page

- only show if logged in
- not in main scroll single page
- modal?

### About

- small about section, footer

### Side bar

- section links
- settings if logged in
- log in/create account
- made by Liam

## Backend

- Add backend server
- Users db
- Auth

### Notes

- add payment for opening extra packs?
  - display rates
  - full refund
  - low price
- Mobile
  - Start with sidebar border and zoom to fullscreen on scroll?

</details>
