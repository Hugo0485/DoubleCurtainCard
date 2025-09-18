# Double curtain card

A Lovelace card to control two curtains side-by-side with clean sliders, mirrored arrow buttons, and an optional “door” button to set the right curtain to a specific position.

![Mijn Gordijnen Card Screenshot](docs/screenshot.png)

## Features

- Two independent **cover** entities (left & right) in one card  
- Sliders that visually close from the outside toward the center  
- Mirrored arrow buttons per curtain (←/→) with correct open/close behavior  
- Global controls: **Open all**, **Close all**  
- Optional **Door button** (right curtain only) with configurable percentage (`door_position`)  
- Works with any Home Assistant `cover` entity that supports `set_cover_position`  
- Compact and modern look  

## Installation

### Manual
1. Copy `mijn-gordijnen-card.js` into your Home Assistant `www/` directory:

2. Add the card as a resource in your dashboard settings:
- Go to **Settings → Dashboards → Resources**  
- Add a new resource:  
  - URL: `/local/mijn-gordijnen-card.js`  
  - Type: **JavaScript Module**
3. Restart Home Assistant or reload your browser cache (`Ctrl+Shift+R`).

## Usage

Add the following to your Lovelace configuration:

```yaml
type: custom:mijn-gordijnen-card
name: Living Room Curtains
left_entity: cover.leftcovers
right_entity: cover.rightcover
door_position: 30   # optional, sets right curtain to 30% when "Door" button is pressed

