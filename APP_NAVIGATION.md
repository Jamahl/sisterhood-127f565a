# App Navigation & Screen Architecture

Complete overview of screens, navigation flows, and interactions for the Sisterhood mobile app.

---

## Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        MobileFrame                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Active Screen                           │  │
│  │                                                            │  │
│  │   HomeScreen | SistersScreen | GiftsScreen |              │  │
│  │   NotificationsScreen | ProfileScreen                     │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      BottomNav                             │  │
│  │   🏠 Home  |  👯 Sisters  |  🎁 Gifts  |  🔔  |  👤 Profile │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Main Tab Screens (5 tabs)

### 1. HomeScreen (`home`)
**Purpose**: Main feed displaying mood updates from sisters

**Components**:
- Header with greeting + NotificationBell
- SisterhoodTabs (filter by sisterhood)
- MoodStatus (share your mood)
- Feed of MoodCard items

**Interactions**:
| Action | Result |
|--------|--------|
| Tap NotificationBell | Opens NotificationPanel (overlay) |
| Tap sisterhood tab | Filters feed to that sisterhood |
| Select mood in MoodStatus | Shares mood, shows toast |
| Tap notification in panel | Closes panel, scrolls to & highlights post |

**Overlays**:
- `NotificationPanel` - Full-screen overlay showing clickable notifications

---

### 2. SistersScreen (`sisters`)
**Purpose**: Manage sisterhoods and view members

**Components**:
- Header with "More" icon (admin) + Plus button
- Horizontal sisterhood selector tabs
- Member list (CircleMember cards)

**Interactions**:
| Action | Result |
|--------|--------|
| Tap sisterhood tab | Filters to show that sisterhood's members |
| Tap Plus button | Opens "Create Sisterhood" Drawer |
| Tap More icon (admin only) | Opens management Drawer |
| Tap member card | View member details |

**Drawers (Bottom Sheets)**:
1. **Create Sisterhood Drawer**
   - Select emoji
   - Enter sisterhood name
   - On create → auto-opens Invite Sisters Drawer

2. **Manage Sisterhood Drawer** (admin only)
   - Rename sisterhood
   - Change emoji
   - Invite more sisters
   - Leave/Delete sisterhood

3. **Invite Sisters Drawer**
   - Copy link button
   - Share via WhatsApp
   - Share via SMS

---

### 3. GiftsScreen (`gifts`)
**Purpose**: Browse and send care packages

**Components**:
- Header with Plus button
- Info card about care packages
- Filter tabs (All, Care Package, $5, $10, $15, Comfort, Treats)
- Grid of CarePackageCard items

**Interactions**:
| Action | Result |
|--------|--------|
| Tap filter tab | Filters gift grid |
| Tap Plus button | (Not yet implemented) |
| Tap gift card | (Not yet implemented - would open gift details) |

---

### 4. NotificationsScreen (`notifications`)
**Purpose**: View all notifications chronologically

**Components**:
- Header
- Auto-notifications info banner
- List of NotificationCard items

**Notification Types**:
- `love` - Someone sent love
- `gift` - Care package received
- `alert` - Sister needs support / cycle reminder
- `circle` - Someone joined sisterhood

**Interactions**:
| Action | Result |
|--------|--------|
| Tap notification | (Not implemented - could deep-link) |

---

### 5. ProfileScreen (`profile`)
**Purpose**: User profile, stats, and settings hub

**Components**:
- Profile card with avatar, name, edit button
- Quick Cycle Tracker button
- Stats grid (Love Sent, Gifts Given, Days Tracked)
- Settings menu list

**Menu Items → Sub-screens**:
| Menu Item | Opens |
|-----------|-------|
| My Gift Wishlist | WishlistScreen |
| Cycle Settings | CycleTracker Drawer |
| My Address | AddressScreen |
| Notification Preferences | NotificationSettingsScreen |
| Privacy & Sharing | PrivacyScreen |
| Edit Profile button | EditProfileScreen |

---

## Sub-Screens (pushed from ProfileScreen)

### WishlistScreen
**Path**: Profile → My Gift Wishlist
**Purpose**: Manage items you'd like to receive

**Components**:
- Header with back button + Plus button
- Add item form (expandable)
- List of wishlist items with delete option

**Interactions**:
| Action | Result |
|--------|--------|
| Tap back arrow | Returns to ProfileScreen |
| Tap Plus | Expands add item form |
| Submit form | Adds item, shows toast |
| Tap trash icon | Deletes item, shows toast |
| Tap external link | Opens link in browser |

---

### AddressScreen
**Path**: Profile → My Address
**Purpose**: Manage shipping address for care packages

**Components**:
- Header with back button
- Address card (view/edit mode)
- Privacy notice

**Interactions**:
| Action | Result |
|--------|--------|
| Tap back arrow | Returns to ProfileScreen |
| Tap Edit Address | Switches to edit mode |
| Tap Save | Saves address, shows toast, exits edit mode |
| Tap Cancel | Exits edit mode without saving |

---

### NotificationSettingsScreen
**Path**: Profile → Notification Preferences
**Purpose**: Toggle notification types

**Components**:
- Header with back button
- List of toggle switches
- Push notification info banner

**Toggle Options**:
- Mood Updates
- Love Received
- Comments
- Gift Reminders
- Cycle Reminders
- New Sisters
- Birthday Reminders

---

### PrivacyScreen
**Path**: Profile → Privacy & Sharing
**Purpose**: Control what sisters can see

**Components**:
- Header with back button
- Privacy toggle switches
- Info notices

**Toggle Options**:
- Share Mood Updates
- Show Cycle Day
- Share Address for Gifts
- Receive Love

---

### EditProfileScreen
**Path**: Profile → Edit button on profile card
**Purpose**: Update profile information

**Components**:
- Header with back button + Save button
- Profile photo with camera button
- Form fields (name, username, bio, birthday)
- Live preview card

**Interactions**:
| Action | Result |
|--------|--------|
| Tap back arrow | Returns to ProfileScreen |
| Tap camera/Change Photo | Opens file picker |
| Select photo | Updates avatar preview, shows toast |
| Tap birthday field | Opens calendar popover |
| Tap Save | Saves profile, shows toast, returns to Profile |

---

## Drawers (Bottom Sheets)

### CycleTracker Drawer
**Triggered from**: Profile → Cycle Settings OR Quick Cycle Card
**Purpose**: Log period and view cycle predictions

**Component**: `CycleTracker` inside Drawer

---

### Create Sisterhood Drawer
**Triggered from**: Sisters → Plus button
**Purpose**: Create a new sisterhood group

**Flow**: Create → Success → Auto-opens Invite Drawer

---

### Invite Sisters Drawer
**Triggered from**: After creating sisterhood OR Manage Sisterhood
**Purpose**: Share invite link

**Share Options**:
- Copy Link
- WhatsApp
- SMS

---

## Navigation State Management

```typescript
// Main navigation (Index.tsx)
const [activeTab, setActiveTab] = useState("home");
// Possible values: "home" | "sisters" | "gifts" | "notifications" | "profile"

// ProfileScreen sub-navigation
type SubScreen = "wishlist" | "address" | "notifications" | "privacy" | "editProfile" | null;
const [activeSubScreen, setActiveSubScreen] = useState<SubScreen>(null);

// HomeScreen overlay
const [showNotifications, setShowNotifications] = useState(false);

// SistersScreen drawers
const [showCreateDialog, setShowCreateDialog] = useState(false);
const [showManageSheet, setShowManageSheet] = useState(false);
const [showInviteDialog, setShowInviteDialog] = useState(false);

// ProfileScreen drawer
const [cycleDrawerOpen, setCycleDrawerOpen] = useState(false);
```

---

## Component Hierarchy

```
App
└── Index
    └── MobileFrame
        ├── [ActiveScreen]
        │   ├── HomeScreen
        │   │   ├── NotificationBell → NotificationPanel (overlay)
        │   │   ├── SisterhoodTabs
        │   │   ├── MoodStatus
        │   │   └── MoodCard[]
        │   │
        │   ├── SistersScreen
        │   │   ├── SisterhoodTabs (horizontal scroll)
        │   │   ├── CircleMember[]
        │   │   └── Drawer (Create/Manage/Invite)
        │   │
        │   ├── GiftsScreen
        │   │   └── CarePackageCard[]
        │   │
        │   ├── NotificationsScreen
        │   │   └── NotificationCard[]
        │   │
        │   └── ProfileScreen
        │       ├── CycleTracker (in Drawer)
        │       └── [SubScreen]
        │           ├── WishlistScreen
        │           ├── AddressScreen
        │           ├── NotificationSettingsScreen
        │           ├── PrivacyScreen
        │           └── EditProfileScreen
        │
        └── BottomNav
```

---

## Expo/React Native Migration Notes

### Navigation Pattern Changes
| Web (Current) | React Native (Target) |
|---------------|----------------------|
| `useState` + conditional render | React Navigation Stack/Tab navigators |
| `Drawer` component | `@gorhom/bottom-sheet` or React Native Modal |
| Internal state routing | `navigation.navigate()` / `navigation.goBack()` |
| URL-based (if any) | Screen names in navigator |

### Screen-to-Navigator Mapping
```
TabNavigator (BottomNav)
├── HomeStack
│   └── HomeScreen
│   └── NotificationPanel (Modal)
├── SistersStack
│   └── SistersScreen
│   └── CreateSisterhoodSheet (Modal)
│   └── InviteSheet (Modal)
├── GiftsScreen
├── NotificationsScreen
└── ProfileStack
    └── ProfileScreen
    └── WishlistScreen
    └── AddressScreen
    └── NotificationSettingsScreen
    └── PrivacyScreen
    └── EditProfileScreen
    └── CycleTrackerSheet (Modal)
```

---

## Shared Components

| Component | Used In | Purpose |
|-----------|---------|---------|
| MoodCard | HomeScreen | Display mood update |
| CircleMember | SistersScreen, CircleScreen | Display sister info |
| NotificationCard | NotificationsScreen | Display notification |
| CarePackageCard | GiftsScreen | Display gift item |
| NotificationBell | HomeScreen | Trigger notification panel |
| SisterhoodTabs | HomeScreen, SistersScreen | Filter by sisterhood |
| CycleTracker | ProfileScreen (drawer) | Log/view cycle |
