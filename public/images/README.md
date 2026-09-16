# Photography

Drop files here, then point `photos` in `src/lib/site.ts` at them. Until a
path is set, the slot renders a labelled placeholder frame — never a broken
image.

| File                  | Slot                   | Crop | Min width |
| --------------------- | ---------------------- | ---- | --------- |
| `george-portrait.jpg` | About page             | 4:5  | 1200px    |
| `george-standing.jpg` | Home page, founder     | 4:5  | 1200px    |
| `george-stage.jpg`    | About page band        | 21:9 | 2000px    |

The stage band only renders when `founderStage` is set, so leaving it null
removes the section entirely rather than showing an empty frame.

## Direction — brand board §06

Real people doing real work: integrators on site, monitoring center
operators, owners in conversation. Bright, natural light with lots of white
and daylight — it should echo Mist, not a dark security aesthetic. George as
the face of the firm: relaxed and approachable at ESX, on stage, or across a
table.

Avoid: padlocks, hooded hackers, glowing shields, generic handshake stock.

Next.js serves these through its image optimizer, so commit the full-size
originals — don't pre-shrink them. Resizing and WebP conversion happen at
request time.
