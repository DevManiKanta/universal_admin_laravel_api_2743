# Translation Keys Reference

## Available Translation Keys

### Navigation & Menu
- `dashboard` - Dashboard
- `products` - Products
- `categories` - Categories
- `orders` - Orders
- `customers` - Customers
- `users` - Users
- `settings` - Settings
- `logout` - Logout

### Common Actions
- `add` - Add
- `edit` - Edit
- `delete` - Delete
- `save` - Save
- `cancel` - Cancel
- `search` - Search
- `filter` - Filter
- `apply` - Apply
- `close` - Close

### Status & Messages
- `loading` - Loading
- `error` - Error
- `success` - Success
- `noProductsFound` - No products found
- `noNewNotifications` - No new notifications
- `invalidCredentials` - Invalid credentials

### Products Page
- `addProduct` - Add Product
- `manageProductCatalog` - Manage your product catalog
- `searchProducts` - Search products...
- `productName` - Product Name
- `category` - Category
- `price` - Price
- `status` - Status
- `actions` - Actions
- `tableView` - Table View
- `gridView` - Grid View
- `image` - Image
- `brand` - Brand
- `noImage` - No Image

### Pagination
- `show` - Show
- `entries` - entries
- `prev` - Prev
- `next` - Next

### Login Page
- `login` - Login
- `emailOrPhone` - Email or Phone
- `enterEmailOrPhone` - Enter email or phone
- `password` - Password
- `enterPassword` - Enter password
- `signingIn` - Signing In...
- `signIn` - Sign In

### User Profile
- `profile` - Profile
- `profileSettings` - Profile Settings
- `changeLanguage` - Change Language
- `signOut` - Sign Out

### Language Selector
- `selectLanguage` - Select Language
- `poweredByGoogleTranslate` - Powered by Google Translate

### Sections
- `sections` - Sections
- `notifications` - Notifications

## How to Use

In any component:

```jsx
import { useLanguage } from "../context/LanguageContext";

export default function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t("dashboard")}</h1>;
}
```

## Adding New Keys

1. Add to English in `LanguageContext.jsx`:
```jsx
en: {
  myNewKey: "My Text",
  ...
}
```

2. Add to all 12 languages:
```jsx
es: { myNewKey: "Mi Texto", ... }
fr: { myNewKey: "Mon Texte", ... }
// ... etc
```

3. Use in component:
```jsx
{t("myNewKey")}
```

## Supported Languages

| Code | Language | Flag |
|------|----------|------|
| en | English | 🇺🇸 |
| es | Spanish | 🇪🇸 |
| fr | French | 🇫🇷 |
| de | German | 🇩🇪 |
| it | Italian | 🇮🇹 |
| pt | Portuguese | 🇵🇹 |
| ru | Russian | 🇷🇺 |
| ja | Japanese | 🇯🇵 |
| zh | Chinese | 🇨🇳 |
| ar | Arabic | 🇸🇦 |
| hi | Hindi | 🇮🇳 |
| ko | Korean | 🇰🇷 |
