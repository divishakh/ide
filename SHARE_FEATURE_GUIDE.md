# Share Feature Guide

## Overview

The Share Project feature allows you to share your code projects with others via unique links. You can create two types of shares:
- **View-Only**: Recipients can view the project but cannot make changes
- **Edit**: Recipients can view and edit the project files

## How to Share a Project

### Step 1: Open Share Dialog
1. Open your project in the IDE
2. Click the "Share Project" button in the toolbar (share icon)
3. The Share Project dialog opens

### Step 2: Generate a Share Link
1. Choose the type of link you want:
   - Click "Generate View-Only Link" for read-only access
   - Click "Generate Edit Link" for full editing access
2. Wait a moment for the link to be generated
3. The link appears in an input field

### Step 3: Copy and Share the Link
1. Click the copy button (icon next to the link)
2. The link is copied to your clipboard
3. Share the link with anyone you want to give access to

### Step 4: Open the Shared Project
1. Click "Open in New Tab" to test the link
2. Or paste the link in a browser to open it
3. The shared project opens in a special view

## Share Link Format

Share links look like this:
```
http://localhost:5173/share/abc123-def456-ghi789
```

The last part is a unique token that identifies the share.

## View-Only vs Edit Links

### View-Only Links
- Recipients can see all project files
- Recipients can browse through the code
- Recipients **cannot** make any changes
- Perfect for sharing examples or showcasing work
- Indicated by "View Only" badge in the header

### Edit Links
- Recipients can see all project files
- Recipients can browse through the code
- Recipients **can** edit and save changes
- Changes are saved to the original project
- Perfect for collaboration
- Indicated by "Can Edit" badge in the header

## Share Page Features

When someone opens a share link, they see:

### Header
- Project name and description
- Permission badge (View Only or Can Edit)
- "Open My IDE" button to go to their own IDE

### File Sidebar
- List of all files in the project
- Click any file to view it
- Selected file is highlighted

### Code Editor
- Full Monaco editor with syntax highlighting
- Line numbers and code formatting
- Read-only mode for view-only links
- Editable for edit links
- Shows "Read-only" indicator for view-only access

### Footer
- Share creation date
- Expiration date (if set)
- Branding

## Technical Details

### Database Structure

The `shares` table stores share information:
- `id`: Unique identifier
- `project_id`: The project being shared
- `share_token`: Unique token for the URL
- `permission`: 'view' or 'edit'
- `created_by`: User who created the share
- `created_at`: When the share was created
- `expires_at`: When the share expires (optional)
- `is_active`: Whether the share is active

### API Methods

**Create a share:**
```typescript
await sharesApi.create(projectId, permission, userId, expiresInDays);
```

**Get share by token:**
```typescript
const share = await sharesApi.getByToken(token);
```

**Get all shares for a project:**
```typescript
const shares = await sharesApi.getByProject(projectId);
```

**Deactivate a share:**
```typescript
await sharesApi.deactivate(shareId);
```

### Share Page Flow

1. User opens share link: `/share/{token}`
2. SharePage component loads
3. Fetches share data using token
4. Checks if share is valid and not expired
5. Loads the project data
6. Loads all project files
7. Displays the project with appropriate permissions
8. For edit links, allows saving changes back to database

### Security

- Share tokens are UUIDs (cryptographically random)
- Expired shares are automatically rejected
- Inactive shares cannot be accessed
- RLS policies control database access
- Edit permissions are enforced on the server

## Troubleshooting

### Share Link Not Working

**Error: "Share link not found or has expired"**
- The share may have been deleted
- The share may have expired
- Check if the link is complete and correct

**Error: "Project not found"**
- The project may have been deleted
- Database connection issue
- Check Supabase connection

**Error: "Failed to load shared project"**
- Network error
- Database error
- Check browser console for details

### Cannot Edit Shared Project

**Issue: Changes not saving**
- Check if you have an edit link (not view-only)
- Check browser console for errors
- Verify database connection
- Check RLS policies on files table

**Issue: Editor is read-only**
- You have a view-only link
- Request an edit link from the project owner

### Console Debugging

Open browser console (F12) to see:
- Share token being loaded
- Share data retrieved
- Project data loaded
- Files loaded
- Any errors that occur

Example console output:
```
Loading share with token: abc123-def456-ghi789
Share data: {id: "...", project_id: "...", permission: "view"}
Project data: {id: "...", name: "My Project"}
Files data: [{id: "...", name: "index.js"}, ...]
```

## Best Practices

### For Sharing
1. Use view-only links for public sharing
2. Use edit links only for trusted collaborators
3. Set expiration dates for temporary shares
4. Deactivate shares when no longer needed

### For Recipients
1. Don't share edit links publicly
2. Be careful when editing shared projects
3. Save your work frequently
4. Communicate with the project owner

## Future Enhancements

Potential improvements:
- Share expiration management
- Share analytics (view count, last accessed)
- Share permissions management
- Multiple permission levels
- Share comments/annotations
- Real-time collaboration
- Share notifications

## Examples

### Example 1: Sharing a Tutorial
```typescript
// Create a view-only link that expires in 30 days
const share = await sharesApi.create(
  projectId,
  'view',
  userId,
  30
);
const shareUrl = `${window.location.origin}/share/${share.share_token}`;
```

### Example 2: Collaborating on a Project
```typescript
// Create an edit link with no expiration
const share = await sharesApi.create(
  projectId,
  'edit',
  userId
);
const shareUrl = `${window.location.origin}/share/${share.share_token}`;
```

### Example 3: Checking Share Status
```typescript
// Get share by token
const share = await sharesApi.getByToken(token);

if (!share) {
  console.log('Share not found or expired');
} else if (share.permission === 'view') {
  console.log('View-only access');
} else {
  console.log('Edit access');
}
```

## Related Files

- `src/pages/SharePage.tsx` - Share page component
- `src/components/editor/ShareProjectDialog.tsx` - Share dialog
- `src/services/database.ts` - Share API methods
- `src/types/index.ts` - Share type definitions
- `src/routes.tsx` - Share route configuration

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Check RLS policies
4. Review COPY_BUTTON_FIX.md for button issues
5. Review AGGRESSIVE_BUTTON_FIX.md for dialog issues

---

**Status**: Share feature fully implemented

**Last Updated**: 2025-12-18

**Version**: 1.0
