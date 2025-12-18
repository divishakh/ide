# Greek-Style Fonts Implementation

## Overview

Athena's Code Chambers now uses classical Greek/Roman-inspired fonts for headings and titles, creating an elegant, scholarly aesthetic that matches the wisdom goddess Athena theme.

## Fonts Used

### 1. Cinzel (Primary Heading Font)
**Style**: Classical Roman capitals inspired by first-century Roman inscriptions
**Usage**: All headings (h1-h6)
**Characteristics**:
- Elegant, formal appearance
- Strong, authoritative presence
- Perfect for titles and important text
- Excellent readability at all sizes

**Example**: 
```
ATHENA'S CODE CHAMBERS
```

### 2. Philosopher (Alternative)
**Style**: Greek-inspired geometric sans-serif
**Usage**: Available via `.font-philosopher` class
**Characteristics**:
- Clean, modern interpretation of Greek letterforms
- Philosophical, intellectual feel
- Good for subtitles and descriptions

**Example**:
```
Wisdom Through Code
```

### 3. Cormorant Garamond (Elegant Serif)
**Style**: Classical Garamond revival with display features
**Usage**: Available via `.font-cormorant` class
**Characteristics**:
- Elegant, refined appearance
- Excellent for longer text passages
- Classical book typography feel

**Example**:
```
A browser-based code editor for learning and sharing
```

### 4. Inter (Body Text)
**Style**: Modern, highly readable sans-serif
**Usage**: Default body text
**Characteristics**:
- Optimized for screens
- Excellent readability
- Professional appearance

### 5. JetBrains Mono (Code)
**Style**: Monospace font designed for developers
**Usage**: Code blocks and editor
**Characteristics**:
- Clear distinction between characters
- Ligature support
- Optimized for coding

## Implementation

### HTML (index.html)
```html
<!-- Google Fonts - Greek/Classical style fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Philosopher:wght@400;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### CSS (index.css)
```css
/* Greek/Classical style fonts for headings */
h1, h2, h3, h4, h5, h6,
.font-heading {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: 0.02em;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
}

/* ... etc ... */

/* Alternative Greek-style font for subtitles */
.font-philosopher {
  font-family: 'Philosopher', sans-serif;
}

/* Elegant serif for body text when needed */
.font-cormorant {
  font-family: 'Cormorant Garamond', serif;
}
```

### Tailwind Config (tailwind.config.js)
```javascript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
  heading: ['Cinzel', 'serif'],
  philosopher: ['Philosopher', 'sans-serif'],
  cormorant: ['Cormorant Garamond', 'serif'],
}
```

## Usage Examples

### Automatic Heading Styling
All HTML heading tags automatically use Cinzel:
```jsx
<h1>Athena's Code Chambers</h1>
<h2>Welcome to Your Workspace</h2>
<h3>Recent Projects</h3>
```

### Using Tailwind Classes
```jsx
{/* Use Cinzel for any text */}
<div className="font-heading text-2xl">
  Custom Heading
</div>

{/* Use Philosopher for subtitles */}
<p className="font-philosopher text-lg">
  Wisdom Through Code
</p>

{/* Use Cormorant for elegant body text */}
<p className="font-cormorant text-base">
  A browser-based code editor for learning and sharing
</p>
```

### In Components
```jsx
// Landing page hero
<h1 className="text-5xl font-bold mb-4">
  Athena's Code Chambers
</h1>
<p className="font-philosopher text-xl text-muted-foreground">
  Where Wisdom Meets Code
</p>

// Project card
<h3 className="text-xl font-semibold mb-2">
  My Project
</h3>
<p className="font-cormorant text-sm text-muted-foreground">
  A collection of algorithms and data structures
</p>
```

## Font Weights Available

### Cinzel
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-Bold) - Default for headings
- 700 (Bold)
- 800 (Extra-Bold)
- 900 (Black)

### Philosopher
- 400 (Regular)
- 700 (Bold)

### Cormorant Garamond
- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-Bold)
- 700 (Bold)

## Typography Scale

### Heading Sizes
```css
h1: 2.5rem (40px) - weight: 700
h2: 2rem (32px) - weight: 600
h3: 1.5rem (24px) - weight: 600
h4: 1.25rem (20px) - weight: 600
h5: 1.125rem (18px) - weight: 600
h6: 1rem (16px) - weight: 600
```

### Letter Spacing
All headings have `letter-spacing: 0.02em` for better readability and classical appearance.

## Design Principles

### Why These Fonts?

1. **Cinzel for Headings**
   - Evokes classical Greek/Roman architecture
   - Strong, authoritative presence
   - Perfect for "Athena" theme (goddess of wisdom)
   - Excellent hierarchy and structure

2. **Philosopher for Subtitles**
   - Greek-inspired geometric design
   - Complements Cinzel without competing
   - Modern interpretation of classical forms
   - Reinforces the wisdom/philosophy theme

3. **Cormorant Garamond for Elegant Text**
   - Classical book typography
   - Scholarly, refined appearance
   - Good for longer descriptions
   - Pairs well with Cinzel

4. **Inter for Body Text**
   - Maximum readability on screens
   - Professional, modern appearance
   - Doesn't distract from content
   - Excellent contrast with Cinzel headings

5. **JetBrains Mono for Code**
   - Designed specifically for developers
   - Clear character distinction
   - Ligature support
   - Optimized for long coding sessions

## Accessibility

### Readability
- All fonts tested for readability at various sizes
- Sufficient contrast with background colors
- Clear distinction between characters
- Appropriate line heights for each font

### Performance
- Fonts loaded via Google Fonts CDN
- Preconnect for faster loading
- Display swap to prevent invisible text
- Only necessary weights loaded

### Fallbacks
```css
font-family: 'Cinzel', serif;
/* Falls back to system serif if Cinzel fails to load */

font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
/* Falls back to system fonts if Inter fails to load */
```

## Browser Support

All fonts work in:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Examples in the App

### Landing Page
```jsx
<h1 className="text-5xl font-bold mb-4">
  Athena's Code Chambers
</h1>
<p className="font-philosopher text-xl">
  Where Wisdom Meets Code
</p>
```

### IDE Page
```jsx
<h2 className="text-2xl font-semibold mb-6">
  Your Projects
</h2>
```

### Share Page
```jsx
<h1 className="text-xl font-bold">
  {project.name}
</h1>
<p className="font-cormorant text-sm">
  {project.description}
</p>
```

### Dialog Titles
```jsx
<DialogTitle className="text-xl font-semibold">
  Share Project
</DialogTitle>
```

## Customization

### Change Heading Font
To use a different font for headings, update `index.css`:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'YourFont', serif;
}
```

### Add More Fonts
1. Add to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

2. Add to `tailwind.config.js`:
```javascript
fontFamily: {
  yourfont: ['YourFont', 'fallback'],
}
```

3. Use in components:
```jsx
<div className="font-yourfont">Text</div>
```

## Performance Tips

### Optimize Font Loading
```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Use display=swap to prevent invisible text -->
<link href="...&display=swap" rel="stylesheet">
```

### Load Only Needed Weights
Instead of loading all weights (100-900), we only load:
- Cinzel: 400, 500, 600, 700, 800, 900
- Philosopher: 400, 700
- Cormorant: 300, 400, 500, 600, 700

This reduces the total font file size.

## Testing

### Visual Testing
1. Check all headings render in Cinzel
2. Verify font weights are correct
3. Test on different screen sizes
4. Check dark mode appearance

### Performance Testing
1. Check font loading time in Network tab
2. Verify no FOUT (Flash of Unstyled Text)
3. Test on slow connections
4. Check mobile performance

## Troubleshooting

### Fonts Not Loading
**Check 1**: Verify Google Fonts link in `index.html`
**Check 2**: Check browser console for errors
**Check 3**: Test internet connection
**Check 4**: Try clearing browser cache

### Wrong Font Displaying
**Check 1**: Verify CSS is applied (inspect element)
**Check 2**: Check for CSS conflicts
**Check 3**: Verify font-family spelling
**Check 4**: Check Tailwind config

### Performance Issues
**Check 1**: Reduce number of font weights
**Check 2**: Use font-display: swap
**Check 3**: Preconnect to Google Fonts
**Check 4**: Consider self-hosting fonts

## Resources

- [Cinzel on Google Fonts](https://fonts.google.com/specimen/Cinzel)
- [Philosopher on Google Fonts](https://fonts.google.com/specimen/Philosopher)
- [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## Summary

The Greek-style fonts create a cohesive, elegant design that:
- ✅ Matches the Athena/wisdom theme
- ✅ Provides excellent readability
- ✅ Creates clear visual hierarchy
- ✅ Looks professional and scholarly
- ✅ Works across all devices
- ✅ Loads quickly and efficiently

---

**Status**: Implemented
**Date**: 2025-12-18
**Fonts**: Cinzel, Philosopher, Cormorant Garamond, Inter, JetBrains Mono
