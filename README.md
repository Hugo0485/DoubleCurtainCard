# Mijn Gordijnen Card

A sleek Lovelace card to control two curtains side-by-side with Mushroom-style sliders, mirrored arrows, and a configurable “door” position.

![Screenshot](docs/screenshot.png)

## Features

- Two independent **cover** entities (left & right) in one card  
- **Mushroom-style** custom sliders (flat, no native `<input type="range">`)  
- **Curtain fill animation**: track fills from the outside toward the center when closing  
- **Mirrored arrows** per curtain (←/→) with correct open/close behavior  
- **Global controls**: Open all, Close all  
- **Door button** (right curtain only) with configurable percentage (`door_position`)  
- Works with any Home Assistant `cover` entity that supports `set_cover_position`  
- Optimized for modern dashboards, compact and professional look  

## Installation

### Manual
1. Copy `mijn-gordijnen-card.js` into your Home Assistant `www/` directory:
