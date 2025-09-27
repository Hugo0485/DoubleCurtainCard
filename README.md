# Double Curtain Card

[![Buy me a beer](https://img.shields.io/badge/Support-Buy%20me%20a%20beer-fdd734?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/hugo0485)
[![Last commit](https://img.shields.io/github/last-commit/Hugo0485/DoubleCurtainCard)](#)
![Downloads](https://img.shields.io/github/downloads/Hugo0485/DoubleCurtainCard/total)
[![Version](https://img.shields.io/github/v/release/Hugo0485/DoubleCurtainCard)](#)
[![Home Assistant Community](https://img.shields.io/badge/Home%20Assistant-Community%20Forum-319fee?logo=home-assistant)](https://community.home-assistant.io/t/lovelace-double-curtain-card/)

![Double curtain](doublecurtain.gif)

**Double Curtain Card** is a compact Lovelace card to control two curtain covers (left & right) from a single UI.

**Highlights**

- Dual sliders with live position (0–100)
- Percentage shown below each slider
- Optional preset per side (hidden when left empty)
- Open All / Close All buttons
- Per-side invert
- Optional blink during movement (toggle)
- Sends service on release
- Simple GUI editor (entity pickers, toggles, numbers)

---

## 🚀 Installation

<details open>
  <summary>Open in HACS (recommended)</summary>

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Hugo0485&repository=DoubleCurtainCard&category=plugin)

</details>

<details>
  <summary>HACS manual configuration (custom repository)</summary>

1. Open **HACS** in Home Assistant.  
2. Click **Custom repositories**.  
3. Add: `https://github.com/Hugo0485/DoubleCurtainCard.git` — Category: **Plugin**.  
4. Search for **Double Curtain Card** → **Install**.  
5. Ensure the resource URL is `/hacsfiles/double-curtain-card/double-curtain-card.js` (HACS sets this automatically for frontend plugins).
</details>

<details>
  <summary>Manual installation (without HACS)</summary>

1. Download the latest build:  
   [`double-curtain-card.js`](https://github.com/Hugo0485/DoubleCurtainCard/releases/latest/download/double-curtain-card.js)  
2. Put it in `<config>/www/`.  
3. Go to **Settings → Dashboards → Resources** and add:  
   - **URL**: `/local/double-curtain-card.js`  
   - **Resource type**: *JavaScript module*  
4. Reload your browser and add the card to your dashboard.
</details>

---

## ⚡ Quickstart

#### Add via GUI (recommended)
1. Open your dashboard → **Edit** → **Add card**.  
2. Search for **Double Curtain Card** and select it.  
3. In the visual editor, set:
   - **Name** (card title)  
   - **Left entity** → your left curtain `cover.*`  
   - **Right entity** → your right curtain `cover.*`  
   - **Left label** / **Right label**  
   - *(Optional)* **Left fixed position** / **Right fixed position** (0–100).  
     If left empty, the corresponding button is hidden.  
   - *(Optional)* **Choose your own MDI for fixed positions** ).  
   - *(Optional)* **Invert left** / **Invert right**
   - *(Optional)* **Blink while moving**`(toggles the blink animation during movement)`  
4. Click **Save**.

> The GUI editor mirrors the YAML options below. You can switch to YAML at any time.

```yaml
type: custom:double-curtain-card
name: Living Room Curtains
left_entity: cover.curtain_left
right_entity: cover.curtain_right
left_label: left curtain
right_label: right curtain

# Optional behavior flags
left_fixed_position: 10 # If there's no value buttons will disappear 
right_fixed_position: 10 # If there's no value buttons will disappear 
left_fixed_icon: mdi:crosshairs-gps # choose your own mdi
right_fixed_icon: mdi:crosshairs-gps # choose your own mdi
invert_left: false
invert_right: false
blink_motion: true
````

## Configuration

| Name                  | Type    | Default  | Description                                                            |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `name`                | string  | –        | Card title shown at the top     
| `left_label`          | string  | –        | Optional label shown for the left side       
| `left_entity`         | string  | required | Cover entity for the **left** curtain
| `left_fixed_position:`  | number  | –        | Position (0–100) for the left **Fixed poition** button; hidden if not provided  |
| `left_fixed_icon:` | MDI  | –        | Choose **MDI** icon for the left fixed position button |  
| `invert_left`         | boolean | `false`  | Invert open/close logic for the left slider  
| `right_label`         | string  | –        | Optional label shown for the right side                                  |
| `right_entity`        | string  | required | Cover entity for the **right** curtain                                 |                                      
| `right_fixed_position:` | number  | –        | Position (0–100) for the right **Fixed poition** button; hidden if not provided |
| `right_fixed_icon:` | MDI  | –        | Choose **MDI** icon for the right fixed position button |                          |
| `invert_right`        | boolean | `false`  | Invert open/close logic for the right slider                           |
| `blink_motion`        | boolean | `true`   | Turn on/off blink functionality                                        |
