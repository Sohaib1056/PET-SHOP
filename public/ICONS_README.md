# 🎨 Pet Shop Professional Icons

## Icon Files

### SVG Icons (Vector - Scalable)
- **`favicon.svg`** - Small favicon for browser tabs (32x32 optimized)
- **`paw.svg`** - Animated logo with gradient (512x512 with animations)
- **`logo.svg`** - Static professional logo (512x512)

### Icon Generator
- **`icon-generator.html`** - Open this file in a browser to generate PNG icons

## How to Generate PNG Icons

1. Open `icon-generator.html` in your web browser
2. Click "Download All (Auto)" button
3. Save the generated PNG files:
   - `favicon-16x16.png` - Tiny favicon
   - `favicon-32x32.png` - Small favicon
   - `paw-64x64.png` - Small icon
   - `paw-128x128.png` - Medium icon
   - `paw.png` - Main icon (256x256)
   - `paw-512x512.png` - Large icon
   - `paw-1024x1024.png` - Extra large icon (for Mac/iOS)

## Icon Design

### Colors
- **Primary Gradient**: #00B894 → #00947a (Teal green)
- **Paw Print**: White (#ffffff) with 95% opacity
- **Shadow**: Subtle drop shadow for depth

### Features
- ✨ Modern gradient background
- 🐾 Clean, professional paw print design
- 📱 Optimized for all screen sizes
- 🎭 Subtle animations on main logo
- 🔄 Responsive and scalable

## Usage

### Web App
- Browser tab: `favicon.svg`
- Touch icons: `logo.svg`
- PWA manifest: Defined in `manifest.json`

### Desktop App (Electron)
- Windows: Requires `paw.png` (256x256+)
- macOS: Requires `paw.png` (512x512+) 
- Linux: Requires `paw.png` (512x512+)

### Converting to ICO/ICNS
For native desktop formats, use online converters:
- **Windows (.ico)**: https://convertio.co/png-ico/
- **macOS (.icns)**: https://cloudconvert.com/png-to-icns

Upload `paw-512x512.png` or larger for best quality.

## Professional Guidelines

✅ **Do:**
- Use SVG for web (scalable, small file size)
- Use PNG for desktop apps (wide compatibility)
- Maintain aspect ratio when resizing
- Keep minimum size at 256x256 for desktop

❌ **Don't:**
- Compress too much (maintain quality)
- Change colors without updating brand guide
- Use low resolution for large displays

## Brand Colors Reference

```css
--primary: #00B894;
--primary-dark: #00947a;
--secondary: #00A8A8;
--accent-white: #ffffff;
```

---

**Last Updated:** November 2025  
**Icon Version:** 2.0 Professional
