# Double Curtain Card

[![Last commit](https://img.shields.io/github/last-commit/Hugo0485/DoubleCurtainCard)](#)
![Downloads](https://img.shields.io/github/downloads/Hugo0485/DoubleCurtainCard/total)
[![Version](https://img.shields.io/github/v/release/Hugo0485/DoubleCurtainCard)](#)
[![Open in HACS](https://img.shields.io/badge/Open%20in-HACS-41BDF5?logo=homeassistant&logoColor=white)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Hugo0485&repository=DoubleCurtainCard&category=plugin)
[![Home Assistant Community](https://img.shields.io/badge/Home%20Assistant-Community%20Forum-319fee?logo=home-assistant)](#)

![Double curtain](doublecurtain.gif)

**Double Curtain Card** is a compact Lovelace card to control two curtain covers (left & right) from a single UI.

**Highlights**
- Two sliders with live position (0–100)
- Percentage **centered below** each slider
- **Door buttons** (optional per side; target position in %)
- Global **Open All / Close All** buttons
- **Invert** per side (swap open/close logic for that cover)
- **Blink/animation** is correct even when inverted
- **GUI editor** (ha-form) – entity pickers, toggles, and number inputs
- Always **two columns** (left/right) side-by-side

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
   - *(Optional)* **Left door position** / **Right door position** (0–100).  
     If left empty, the corresponding **Door** button is hidden.  
   - *(Optional)* **Invert left** / **Invert right**
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
left_door_position: 10 # If there's no value buttons will disappear 
right_door_position: 10 # If there's no value buttons will disappear 
invert_left: false
invert_right: false
````

## Configuration

| Name                  | Type    | Default  | Description                                                            |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `left_entity`         | string  | required | Cover entity for the **left** curtain                                  |
| `right_entity`        | string  | required | Cover entity for the **right** curtain                                 |
| `name`                | string  | –        | Card title shown at the top                                            |
| `left_label`          | string  | –        | Optional label shown for the left side                                 |
| `right_label`         | string  | –        | Optional label shown for the right side                                |
| `left_door_position`  | number  | –        | Position (0–100) for the left **Door** button; hidden if not provided  |
| `right_door_position` | number  | –        | Position (0–100) for the right **Door** button; hidden if not provided |
| `invert_left`         | boolean | `false`  | Invert open/close logic for the left slider                            |
| `invert_right`        | boolean | `false`  | Invert open/close logic for the right slider                           |


