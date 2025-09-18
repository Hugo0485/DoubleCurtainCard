# DoubleCurtainCard

"Mijn Gordijnen Card" is a modern card for Home Assistant that controls two separate curtains (left and right) in one compact view. It features flat sliders that visually “close” from the outside toward the center, mirrored arrow buttons per curtain, global Open all / Close all actions, and a optionale configurable Door button that sets the right curtain to a specific percentage.

Feature bullets

- Two independent cover entities (left & right) in one card
- Curtain fill animation: color moves from outside → inside when closing
- Mirrored arrows per curtain (←/→) with correct open/close semantics
- Global controls: Open all, Close all
- optionale Door button (right curtain only) with configurable % (door_position)
- Works with any HA cover supporting set_cover_position (e.g. Z-Wave Forest rails)
