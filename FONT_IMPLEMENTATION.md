# Font Implementation Guide

## Overview

The website now uses a custom font combination that emphasizes the Greek/Athena theme:

- **Body Text**: Roboto (clean, modern, highly readable)
- **Headings**: Cinzel Decorative (Greek-style decorative font)

## Font Choices

### Roboto for Body Text

**Why Roboto?**
- Clean and modern sans-serif font
- Excellent readability on all screen sizes
- Wide range of weights (300, 400, 500, 700, 900)
- Optimized for digital displays
- Professional appearance
- Free and open-source from Google Fonts

**Usage:**
- All body text, paragraphs, and general content
- Buttons, inputs, labels, and form elements
- Navigation items
- Default font for all text elements

### Cinzel Decorative for Headings

**Why Cinzel Decorative?**
- Classical Roman/Greek aesthetic
- Decorative and elegant appearance
- Perfect for the Athena theme
- Maintains readability while being distinctive
- Free and open-source from Google Fonts

**Note about Greek Freak:**
The original request was for "Greek Freak by Pinisiart" for headings. However, this font is not available through public CDNs (CDN Fonts has Cloudflare protection). Cinzel Decorative was chosen as an excellent alternative because:
- Similar Greek/classical aesthetic
- Decorative and distinctive style
- Readily available from Google Fonts
- Better browser compatibility
- Consistent loading performance

**Usage:**
- All heading levels (h1, h2, h3, h4, h5, h6)
- Page titles and section headers
- Any element with `.font-heading` class

## Implementation Details

### Font Loading

Fonts are loaded via Google Fonts CDN in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
```

### Font Families Defined

In `src/index.css`:

```css
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, .font-heading {
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}

p, span, div, a, button, input, textarea, select, label {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Tailwind Configuration

In `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
  heading: ['Cinzel Decorative', 'Cinzel', 'serif'],
}
```

## Font Weights

### Roboto
- 300: Light
- 400: Regular (default)
- 500: Medium
- 700: Bold
- 900: Black

### Cinzel Decorative
- 400: Regular
- 700: Bold (default for headings)
- 900: Black

## Usage Examples

### Using Roboto (Automatic)

All text automatically uses Roboto:

```jsx
<p>This text uses Roboto</p>
<button>This button text uses Roboto</button>
<span>This span uses Roboto</span>
```

### Using Cinzel Decorative (Automatic for Headings)

All headings automatically use Cinzel Decorative:

```jsx
<h1>Main Title</h1>
<h2>Section Header</h2>
<h3>Subsection</h3>
```

### Using Font Classes

You can also use Tailwind classes:

```jsx
<div className="font-sans">Uses Roboto</div>
<div className="font-heading">Uses Cinzel Decorative</div>
<div className="font-mono">Uses monospace for code</div>
```

## Heading Sizes

All headings use Cinzel Decorative with these sizes:

- **h1**: 2.5rem (40px)
- **h2**: 2rem (32px)
- **h3**: 1.5rem (24px)
- **h4**: 1.25rem (20px)
- **h5**: 1.125rem (18px)
- **h6**: 1rem (16px)

## Performance

### Font Loading Strategy

- `font-display: swap` - Text is visible immediately with fallback font, then swaps to custom font when loaded
- Fonts are loaded from Google Fonts CDN (fast, cached globally)
- Only necessary font weights are loaded

### Fallback Fonts

If custom fonts fail to load, the system falls back to:

**For Roboto:**
1. -apple-system (macOS/iOS)
2. BlinkMacSystemFont (Chrome on macOS)
3. Segoe UI (Windows)
4. sans-serif (system default)

**For Cinzel Decorative:**
1. Cinzel (similar but less decorative)
2. serif (system default)

## Browser Compatibility

Both fonts are widely supported:

- ✅ Chrome/Edge 4+
- ✅ Firefox 3.5+
- ✅ Safari 3.1+
- ✅ Opera 10+
- ✅ IE 9+

## Accessibility

### Readability
- Roboto: Excellent readability at all sizes
- Cinzel Decorative: Good readability for headings, not recommended for body text

### Font Size
- Minimum body text size: 16px (1rem)
- Headings are appropriately sized for hierarchy
- Letter spacing adjusted for decorative font

### Contrast
- Fonts work well with both light and dark themes
- High contrast maintained for accessibility

## Customization

### Changing Font Weights

To use different font weights:

```jsx
<h1 className="font-normal">Regular weight heading</h1>
<h1 className="font-bold">Bold heading (default)</h1>
<h1 className="font-black">Extra bold heading</h1>
```

### Changing Font Size

```jsx
<h1 className="text-4xl">Larger heading</h1>
<h2 className="text-xl">Smaller heading</h2>
```

### Mixing Fonts

```jsx
<h1 className="font-sans">Heading with Roboto instead</h1>
<p className="font-heading">Body text with Cinzel Decorative</p>
```

## Alternative: Using Greek Freak Font

If you have access to the Greek Freak font files, you can add them manually:

### Step 1: Add Font Files

Place font files in `public/fonts/`:
- `greek-freak.woff2`
- `greek-freak.woff`

### Step 2: Update CSS

In `src/index.css`:

```css
@font-face {
  font-family: 'Greek Freak';
  src: url('/fonts/greek-freak.woff2') format('woff2'),
       url('/fonts/greek-freak.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

h1, h2, h3, h4, h5, h6, .font-heading {
  font-family: 'Greek Freak', 'Cinzel Decorative', serif;
}
```

### Step 3: Update Tailwind Config

In `tailwind.config.js`:

```javascript
fontFamily: {
  heading: ['Greek Freak', 'Cinzel Decorative', 'serif'],
}
```

## Testing

### Visual Testing

1. Start the app: `pnpm run dev`
2. Check all pages for proper font rendering
3. Verify headings use Cinzel Decorative
4. Verify body text uses Roboto
5. Test on different browsers
6. Test on different screen sizes

### Console Testing

Open browser console and check for font loading:

```javascript
// Check if fonts are loaded
document.fonts.check('1em Roboto'); // Should return true
document.fonts.check('1em "Cinzel Decorative"'); // Should return true
```

## Troubleshooting

### Fonts Not Loading

**Issue**: Fonts appear as fallback fonts

**Solutions:**
1. Check browser console for font loading errors
2. Verify Google Fonts CDN is accessible
3. Check network tab for font file requests
4. Clear browser cache
5. Try incognito/private mode

### Headings Look Wrong

**Issue**: Headings don't use decorative font

**Solutions:**
1. Verify CSS is loaded correctly
2. Check for conflicting CSS rules
3. Inspect element to see computed font-family
4. Ensure no inline styles override font

### Performance Issues

**Issue**: Fonts loading slowly

**Solutions:**
1. Fonts are cached after first load
2. Use `font-display: swap` (already implemented)
3. Consider preloading fonts in `index.html`
4. Check network connection

## Files Modified

1. **src/index.css**
   - Added Roboto and Cinzel Decorative imports
   - Updated body font to Roboto
   - Updated heading fonts to Cinzel Decorative
   - Added explicit font-family for all text elements

2. **tailwind.config.js**
   - Updated `fontFamily.sans` to Roboto
   - Updated `fontFamily.heading` to Cinzel Decorative
   - Removed unused font families

## Summary

✅ **Roboto** for all body text - clean, modern, readable
✅ **Cinzel Decorative** for all headings - Greek/classical aesthetic
✅ Proper fallback fonts configured
✅ Performance optimized with font-display: swap
✅ Fully accessible and responsive
✅ Works across all modern browsers

The font implementation maintains the Greek/Athena theme while ensuring excellent readability and performance.

---

**Last Updated**: 2025-12-18
**Status**: Complete
**Tested**: Yes
