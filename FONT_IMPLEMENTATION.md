# Font Implementation Guide

## Overview

The website now uses a cohesive Greek-inspired font combination that emphasizes the Athena theme:

- **Body Text**: Philosopher (Greek-inspired, elegant serif)
- **Headings**: Cinzel Decorative (Greek-style decorative font)

## Font Choices

### Philosopher for Body Text

**Why Philosopher?**
- Directly inspired by Ancient Greek fonts and Agora typeface
- Elegant serif with classical aesthetic
- Excellent readability for body text
- Complements decorative headings perfectly
- Maintains the Greek/Athena theme throughout
- Free and open-source from Google Fonts

**Design Philosophy:**
Philosopher was designed by Jovanny Lemonad and is inspired by the Agora typeface, which was used in Ancient Greece. It brings a classical, philosophical aesthetic to the text while remaining highly readable.

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

**Design Philosophy:**
Cinzel Decorative is based on classical Roman inscriptions, creating a perfect pairing with Philosopher for a cohesive Greek/Roman classical aesthetic.

**Usage:**
- All heading levels (h1, h2, h3, h4, h5, h6)
- Page titles and section headers
- Any element with `.font-heading` class

## Why This Combination Works

### Cohesive Greek Theme
- **Philosopher**: Ancient Greek-inspired body font
- **Cinzel Decorative**: Roman/Greek decorative headings
- Both fonts share classical heritage
- Creates unified aesthetic throughout the site

### Visual Hierarchy
- Decorative headings draw attention
- Readable body text doesn't compete
- Clear distinction between content types
- Professional and elegant appearance

### Readability
- Philosopher: Excellent for extended reading
- Cinzel Decorative: Perfect for short, impactful headings
- Both fonts maintain clarity at various sizes
- Serif fonts provide classical, scholarly feel

## Implementation Details

### Font Loading

Fonts are loaded via Google Fonts CDN in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
```

### Font Families Defined

In `src/index.css`:

```css
body {
  font-family: 'Philosopher', 'Georgia', serif;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, .font-heading {
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}

p, span, div, a, button, input, textarea, select, label {
  font-family: 'Philosopher', 'Georgia', serif;
}
```

### Tailwind Configuration

In `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Philosopher', 'Georgia', 'serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
  heading: ['Cinzel Decorative', 'Cinzel', 'serif'],
}
```

## Font Weights

### Philosopher
- 400: Regular (default)
- 700: Bold

### Cinzel Decorative
- 400: Regular
- 700: Bold (default for headings)
- 900: Black

## Usage Examples

### Using Philosopher (Automatic)

All text automatically uses Philosopher:

```jsx
<p>This text uses Philosopher</p>
<button>This button text uses Philosopher</button>
<span>This span uses Philosopher</span>
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
<div className="font-sans">Uses Philosopher</div>
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

**For Philosopher:**
1. Georgia (classic serif font)
2. serif (system default)

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
- Philosopher: Excellent readability for body text, inspired by Ancient Greek fonts
- Cinzel Decorative: Good readability for headings, not recommended for body text

### Font Size
- Minimum body text size: 16px (1rem)
- Headings are appropriately sized for hierarchy
- Letter spacing adjusted for decorative font

### Contrast
- Fonts work well with both light and dark themes
- High contrast maintained for accessibility
- Serif fonts provide clear letter distinction

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
<h1 className="font-sans">Heading with Philosopher instead</h1>
<p className="font-heading">Body text with Cinzel Decorative</p>
```

## Alternative Fonts

If you want to try other Greek-inspired or complementary fonts:

### Other Greek-Style Options

1. **Cormorant Garamond** - Elegant serif, classical aesthetic
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
   ```

2. **Spectral** - Classical serif with excellent readability
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600;700&display=swap');
   ```

3. **Crimson Text** - Book-style serif, elegant
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
   ```

4. **Lora** - Well-balanced serif with calligraphic roots
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
   ```

## Testing

### Visual Testing

1. Start the app: `pnpm run dev`
2. Check all pages for proper font rendering
3. Verify headings use Cinzel Decorative
4. Verify body text uses Philosopher
5. Test on different browsers
6. Test on different screen sizes

### Console Testing

Open browser console and check for font loading:

```javascript
// Check if fonts are loaded
document.fonts.check('1em Philosopher'); // Should return true
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

✅ **Philosopher** for all body text - Greek-inspired, elegant, readable
✅ **Cinzel Decorative** for all headings - Greek/classical aesthetic
✅ Cohesive Greek/Athena theme throughout
✅ Proper fallback fonts configured
✅ Performance optimized with font-display: swap
✅ Fully accessible and responsive
✅ Works across all modern browsers

The font implementation creates a unified Greek/classical aesthetic that perfectly matches the Athena theme, with both fonts sharing classical heritage while maintaining excellent readability and professional appearance.

---

**Last Updated**: 2025-12-18
**Status**: Complete
**Tested**: Yes
