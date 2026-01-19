# Sisterhood App - React Native/Expo Migration Guide

## 📁 Project Structure

```
src/
├── components/           # UI Components (need platform conversion)
│   ├── screens/         # Screen-level components → RN Screens
│   └── ui/              # shadcn components → Replace with RN equivalents
├── data/                # Mock data (platform-agnostic ✅)
│   └── mockData.ts
├── hooks/               # Custom hooks (platform-agnostic ✅)
│   ├── index.ts         # Central exports
│   ├── useFeed.ts       # Feed management
│   ├── useNotifications.tsx
│   ├── useSettings.ts   # User settings
│   ├── useSisterhoods.ts # Groups management
│   ├── useUser.ts       # User profile
│   └── useWishlist.ts   # Gift wishlist
├── types/               # TypeScript types (platform-agnostic ✅)
│   └── index.ts
└── utils/               # Utility functions (platform-agnostic ✅)
    ├── helpers.ts
    └── index.ts
```

## 🚀 Migration Steps

### 1. Initialize Expo Project

```bash
npx create-expo-app sisterhood-app --template expo-template-blank-typescript
cd sisterhood-app
```

### 2. Install Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-reanimated react-native-gesture-handler
npm install @gorhom/bottom-sheet  # For drawer-like sheets
npm install react-native-svg      # For icons

# State Management
npm install @tanstack/react-query
npm install zustand               # Or keep React Context

# Storage
npm install @react-native-async-storage/async-storage

# Date handling
npm install date-fns

# Icons (replace lucide-react)
npm install react-native-vector-icons
# Or use: @expo/vector-icons (included with Expo)
```

### 3. Copy Platform-Agnostic Code

These can be copied **directly** with minimal changes:

| Source | Destination | Changes Needed |
|--------|-------------|----------------|
| `src/types/` | `src/types/` | None ✅ |
| `src/data/` | `src/data/` | None ✅ |
| `src/hooks/` | `src/hooks/` | Replace toast with RN equivalent |
| `src/utils/` | `src/utils/` | None ✅ |

### 4. Component Migration Map

| Web Component | React Native Equivalent |
|---------------|------------------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image>` |
| `<ScrollView>` (Tailwind) | `<ScrollView>` or `<FlatList>` |
| Tailwind classes | StyleSheet objects |
| shadcn/ui | NativeBase, Tamagui, or custom |
| lucide-react | @expo/vector-icons |
| Drawer component | @gorhom/bottom-sheet |

### 5. Navigation Setup

Replace the web-based tab navigation:

```tsx
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sisters" component={SistersScreen} />
        <Tab.Screen name="Gifts" component={GiftsScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### 6. Styling Migration

Convert Tailwind to StyleSheet:

```tsx
// Before (Web with Tailwind)
<div className="bg-card rounded-3xl p-5 shadow-card">

// After (React Native)
<View style={styles.card}>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
```

Or use NativeWind for Tailwind-like syntax in RN:
```bash
npm install nativewind
npm install --dev tailwindcss
```

### 7. Storage Migration

Replace localStorage/useState with AsyncStorage:

```tsx
// Before
const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);

// After
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadItems = async () => {
  const stored = await AsyncStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : INITIAL_WISHLIST;
};

const saveItems = async (items: WishlistItem[]) => {
  await AsyncStorage.setItem('wishlist', JSON.stringify(items));
};
```

## 📱 Screen-by-Screen Migration

### HomeScreen
- Replace `div` with `View`
- Replace `MobileFrame` with SafeAreaView
- Use FlatList for the posts feed
- Keep `useFeed()` and `useUser()` hooks as-is

### SistersScreen  
- Use SectionList for grouped sisters
- Replace Drawer with @gorhom/bottom-sheet
- Keep `useSisterhoods()` hook as-is

### ProfileScreen
- Use React Navigation stack for sub-screens
- Keep all business logic hooks

## 🎨 Design Tokens

Create a theme file to match the web design:

```tsx
// src/theme/colors.ts
export const colors = {
  primary: '#D4A5A5',
  background: '#FFFBF5',
  card: '#FFFFFF',
  sage: '#E8F5E9',
  lavender: '#E8E4F0',
  blush: '#FFE4E6',
  peach: '#FFE5D0',
  // ... etc
};
```

## ✅ Migration Checklist

- [ ] Initialize Expo project
- [ ] Install dependencies
- [ ] Copy types, data, utils, hooks
- [ ] Set up navigation
- [ ] Create theme/colors file
- [ ] Migrate HomeScreen
- [ ] Migrate SistersScreen
- [ ] Migrate GiftsScreen
- [ ] Migrate NotificationsScreen
- [ ] Migrate ProfileScreen + sub-screens
- [ ] Set up AsyncStorage persistence
- [ ] Connect to Supabase (optional)
- [ ] Test on iOS simulator
- [ ] Test on Android emulator

## 🔗 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/) - Tailwind for RN
- [Tamagui](https://tamagui.dev/) - Universal UI kit
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo)
