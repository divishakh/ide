# Share Dialog Button Testing Checklist

## Pre-Test Setup

- [ ] Start the application: `pnpm run dev`
- [ ] Open browser: http://localhost:5173
- [ ] Open browser console: Press F12
- [ ] Login to the application
- [ ] Navigate to IDE
- [ ] Select or create a project

## Test 1: Open Share Dialog

- [ ] Click "Share Project" button in IDE toolbar
- [ ] Dialog opens successfully
- [ ] Dialog shows two sections: "View-Only Link" and "Edit Link"
- [ ] Both sections show generate buttons

## Test 2: Generate View-Only Link

- [ ] Click "Generate View-Only Link" button
- [ ] **Console Check**: See "View-Only button clicked!"
- [ ] **Console Check**: See "handleGenerateLink called with permission: view"
- [ ] **Visual Check**: Button text changes to "Generating..."
- [ ] **Console Check**: See "User: {id: '...', email: '...'}"
- [ ] **Console Check**: See "Creating share for project: ..."
- [ ] **Console Check**: See "Share created: {...}"
- [ ] **Visual Check**: Link appears in input field
- [ ] **Visual Check**: Toast notification shows success
- [ ] **Visual Check**: Copy button appears
- [ ] **Visual Check**: "Open in New Tab" button appears

## Test 3: Copy View-Only Link

- [ ] Click the copy button (icon button next to link)
- [ ] **Visual Check**: Icon changes to checkmark
- [ ] **Visual Check**: Toast shows "Copied to clipboard!"
- [ ] **Clipboard Check**: Paste link somewhere (Ctrl+V) - should be a valid URL
- [ ] **URL Check**: Link format is: `http://localhost:5173/share/{token}`

## Test 4: Open View-Only Link

- [ ] Click "Open in New Tab" button
- [ ] **Browser Check**: New tab opens
- [ ] **URL Check**: New tab URL matches the generated link
- [ ] **Page Check**: Share page loads (may show error if not implemented yet)

## Test 5: Generate Edit Link

- [ ] Return to Share Dialog
- [ ] Click "Generate Edit Link" button
- [ ] **Console Check**: See "Edit button clicked!"
- [ ] **Console Check**: See "handleGenerateLink called with permission: edit"
- [ ] **Visual Check**: Button text changes to "Generating..."
- [ ] **Console Check**: See "User: {id: '...', email: '...'}"
- [ ] **Console Check**: See "Creating share for project: ..."
- [ ] **Console Check**: See "Share created: {...}"
- [ ] **Visual Check**: Link appears in input field
- [ ] **Visual Check**: Toast notification shows success
- [ ] **Visual Check**: Copy button appears
- [ ] **Visual Check**: "Open in New Tab" button appears

## Test 6: Copy Edit Link

- [ ] Click the copy button (icon button next to edit link)
- [ ] **Visual Check**: Icon changes to checkmark
- [ ] **Visual Check**: Toast shows "Copied to clipboard!"
- [ ] **Clipboard Check**: Paste link somewhere (Ctrl+V) - should be a valid URL
- [ ] **URL Check**: Link format is: `http://localhost:5173/share/{token}`
- [ ] **Verify**: Edit link token is different from view-only link token

## Test 7: Open Edit Link

- [ ] Click "Open in New Tab" button for edit link
- [ ] **Browser Check**: New tab opens
- [ ] **URL Check**: New tab URL matches the generated edit link
- [ ] **Page Check**: Share page loads (may show error if not implemented yet)

## Test 8: Multiple Generations

- [ ] Close the dialog
- [ ] Open Share Dialog again
- [ ] **Visual Check**: Previously generated links are still shown
- [ ] Click "Generate View-Only Link" again
- [ ] **Console Check**: See "Share already exists" or new share created
- [ ] **Visual Check**: Link updates or stays the same

## Test 9: Button States

- [ ] Open Share Dialog
- [ ] Click "Generate View-Only Link"
- [ ] **Visual Check**: Button is disabled while loading
- [ ] **Visual Check**: Button shows "Generating..." text
- [ ] **Visual Check**: Cursor changes to not-allowed on disabled button
- [ ] **Visual Check**: Button opacity reduces when disabled
- [ ] **After generation**: Button disappears, replaced by link input

## Test 10: Hover Effects

- [ ] Hover over "Generate View-Only Link" button
- [ ] **Visual Check**: Background color changes (lighter)
- [ ] **Visual Check**: Cursor changes to pointer (hand)
- [ ] Hover over "Generate Edit Link" button
- [ ] **Visual Check**: Background color changes (darker blue)
- [ ] **Visual Check**: Cursor changes to pointer (hand)
- [ ] Hover over copy buttons
- [ ] **Visual Check**: Background color changes
- [ ] Hover over "Open in New Tab" buttons
- [ ] **Visual Check**: Background color changes

## Test 11: Error Handling

### Test Not Logged In (if possible)
- [ ] Logout
- [ ] Try to access IDE
- [ ] Should redirect to login or show error

### Test Invalid Project
- [ ] Try to share a non-existent project (modify URL)
- [ ] Should show error message

### Test Network Error
- [ ] Open DevTools → Network tab
- [ ] Set network to "Offline"
- [ ] Try to generate link
- [ ] **Console Check**: See error message
- [ ] **Visual Check**: Toast shows error
- [ ] **Visual Check**: Button returns to normal state

## Test 12: Cross-Browser Testing

### Chrome
- [ ] All buttons clickable
- [ ] Console logs appear
- [ ] Links generate successfully
- [ ] Copy works
- [ ] Open in new tab works

### Firefox
- [ ] All buttons clickable
- [ ] Console logs appear
- [ ] Links generate successfully
- [ ] Copy works
- [ ] Open in new tab works

### Safari (if available)
- [ ] All buttons clickable
- [ ] Console logs appear
- [ ] Links generate successfully
- [ ] Copy works
- [ ] Open in new tab works

### Edge (if available)
- [ ] All buttons clickable
- [ ] Console logs appear
- [ ] Links generate successfully
- [ ] Copy works
- [ ] Open in new tab works

## Test 13: Responsive Design

### Desktop (1920x1080)
- [ ] Dialog displays correctly
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Layout is clean

### Laptop (1366x768)
- [ ] Dialog displays correctly
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Layout is clean

### Tablet (768x1024)
- [ ] Dialog displays correctly
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Layout is clean

### Mobile (375x667)
- [ ] Dialog displays correctly
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Layout is clean

## Test 14: Accessibility

- [ ] Tab through dialog with keyboard
- [ ] **Keyboard Check**: Can focus on buttons
- [ ] **Keyboard Check**: Can activate buttons with Enter
- [ ] **Keyboard Check**: Can activate buttons with Space
- [ ] **Screen Reader Check**: Buttons have proper labels
- [ ] **Screen Reader Check**: Icons have proper alt text
- [ ] **Visual Check**: Focus indicator visible on buttons

## Test 15: Performance

- [ ] Click button multiple times rapidly
- [ ] **Check**: Only one API call is made (button disabled during loading)
- [ ] **Check**: No duplicate shares created
- [ ] **Check**: No console errors
- [ ] **Check**: UI remains responsive

## Expected Results Summary

### ✅ All Tests Should Pass
- Buttons are clickable
- Console logs appear correctly
- Links generate successfully
- Copy functionality works
- Open in new tab works
- Error handling works
- Cross-browser compatible
- Responsive on all screen sizes
- Accessible via keyboard
- Performance is good

### ❌ Known Limitations
- Share page may not be fully implemented yet (view/edit functionality)
- Requires Supabase database to be set up
- Requires user to be logged in

## Troubleshooting

### If any test fails:

1. **Check Console for Errors**
   - Red error messages?
   - What's the error message?

2. **Check Network Tab**
   - API calls failing?
   - What's the response status?
   - What's the error message?

3. **Check Supabase**
   - Is database set up?
   - Are credentials correct?
   - Does `shares` table exist?

4. **Check Authentication**
   - Are you logged in?
   - Is session valid?
   - Check user icon in header

5. **Read Documentation**
   - FINAL_BUTTON_FIX_SUMMARY.md
   - NATIVE_BUTTON_FIX.md
   - BUTTON_COMPARISON.md
   - README.md troubleshooting section

## Report Results

After testing, report:
- [ ] Which tests passed ✅
- [ ] Which tests failed ❌
- [ ] Console error messages (if any)
- [ ] Screenshots (if helpful)
- [ ] Browser and version used
- [ ] Operating system

---

**Testing Date**: _____________

**Tester Name**: _____________

**Overall Result**: ✅ PASS / ❌ FAIL

**Notes**:
