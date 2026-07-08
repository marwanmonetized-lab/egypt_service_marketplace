# Egypt Service Marketplace - Mobile App Design

## Overview

A mobile-first service marketplace connecting customers with service providers (electricians, plumbers, barbers, chefs, cleaners, pest control, car wash) in Egypt. The app follows iOS Human Interface Guidelines for a native feel and assumes portrait orientation (9:16) with one-handed usage.

## Screen List

1. **Home Screen** - Service category browsing and featured providers
2. **Service Category Screen** - List of providers for a specific service
3. **Provider Detail Screen** - Full provider profile, ratings, availability, pricing
4. **Booking Screen** - Date/time selection and booking confirmation
5. **Cart/Checkout Screen** - Review booking details and payment options
6. **My Bookings Screen** - Active and past bookings
7. **Booking Detail Screen** - Track service provider, communicate, rate
8. **Profile Screen** - User account, settings, payment methods
9. **Search Screen** - Find services and providers by name/location
10. **Ratings & Reviews Screen** - View and submit reviews

## Primary Content and Functionality

### Home Screen
- **Hero Section:** "Find Services Near You" with location display
- **Service Categories:** Grid of 6-8 service types (Electrician, Plumber, Barber, Chef, Cleaner, Pest Control, Car Wash, etc.)
- **Featured Providers:** Carousel of top-rated providers
- **Quick Actions:** Search bar, filter by location
- **Functionality:** Tap category → Service List; Tap provider → Provider Detail

### Service Category Screen
- **Filter Options:** Location, price range, rating, availability
- **Provider List:** Cards showing provider name, rating, price, distance, availability
- **Sorting:** By rating, price, distance, newest
- **Functionality:** Tap provider → Provider Detail; Swipe to filter

### Provider Detail Screen
- **Header:** Provider photo, name, rating, review count
- **Services Offered:** List of services with pricing
- **Availability:** Calendar/time picker for next 7 days
- **Reviews Section:** Top reviews with customer photos
- **Action Button:** "Book Now" (primary CTA)
- **Functionality:** Select service → Booking Screen

### Booking Screen
- **Service Summary:** Service name, provider name, price
- **Date & Time Selection:** Calendar picker with available slots
- **Special Requests:** Text field for customer notes
- **Pricing Breakdown:** Service fee + taxes
- **Payment Method:** Select COD or card payment
- **Confirm Button:** "Confirm Booking"
- **Functionality:** Confirm → Payment → Booking Confirmation

### Cart/Checkout Screen
- **Booking Summary:** Service, date, time, provider
- **Total Price:** Itemized breakdown
- **Payment Options:** Cash on Delivery, Card, Fawry, Mobile Wallet
- **Delivery Address:** Confirm location for service
- **Promo Code:** Optional discount entry
- **Confirm Button:** "Complete Booking"

### My Bookings Screen
- **Tabs:** Active, Completed, Cancelled
- **Booking Cards:** Service type, provider name, date/time, status
- **Quick Actions:** Cancel, Reschedule, Contact Provider, Rate
- **Functionality:** Tap booking → Booking Detail

### Booking Detail Screen
- **Status Timeline:** Pending → Confirmed → On the Way → In Progress → Completed
- **Provider Info:** Photo, name, phone, location on map
- **Live Tracking:** Real-time provider location (if applicable)
- **Chat:** Direct messaging with provider
- **Service Details:** What was booked, pricing, notes
- **Action Buttons:** Cancel, Reschedule, Rate & Review

### Profile Screen
- **User Info:** Name, phone, email, profile photo
- **Saved Addresses:** Home, Work, Other
- **Payment Methods:** Saved cards, wallet balance
- **Settings:** Notifications, language, dark mode
- **Help & Support:** FAQ, contact support
- **Logout:** Sign out option

### Search Screen
- **Search Bar:** Search by service name, provider name
- **Recent Searches:** Quick access to previous searches
- **Popular Services:** Trending services
- **Location Filter:** Search within specific area
- **Results:** Filtered list of providers

### Ratings & Reviews Screen
- **Star Rating:** 1-5 star selection
- **Review Text:** Text field for detailed feedback
- **Photos:** Option to attach photos of completed work
- **Submit Button:** Post review

## Key User Flows

### Flow 1: Browse and Book a Service
1. User opens app → Home Screen
2. Tap service category (e.g., "Electrician")
3. Browse provider list with filters
4. Tap provider → View detailed profile and reviews
5. Tap "Book Now" → Select date/time
6. Review pricing → Select payment method
7. Confirm booking → Receive confirmation notification

### Flow 2: Track Active Booking
1. User opens app → My Bookings
2. Tap "Active" tab
3. Tap current booking → Booking Detail
4. View provider location on map
5. Chat with provider
6. Receive status updates in real-time

### Flow 3: Rate and Review
1. User completes booking
2. Receives notification to rate
3. Tap "Rate" → Ratings & Reviews Screen
4. Select stars, write review, add photos
5. Submit → Review posted

## Color Choices

The app uses a warm, trustworthy palette reflecting Egyptian market preferences:

| Element | Color | Usage |
|---------|-------|-------|
| **Primary** | #0a7ea4 (Teal Blue) | Buttons, highlights, active states |
| **Background** | #ffffff (Light) / #151718 (Dark) | Screen backgrounds |
| **Surface** | #f5f5f5 (Light) / #1e2022 (Dark) | Cards, elevated surfaces |
| **Foreground** | #11181C (Light) / #ECEDEE (Dark) | Primary text |
| **Muted** | #687076 (Light) / #9BA1A6 (Dark) | Secondary text |
| **Success** | #22C55E (Green) | Booking confirmed, completed |
| **Warning** | #F59E0B (Orange) | Pending, awaiting action |
| **Error** | #EF4444 (Red) | Cancellation, errors |
| **Border** | #E5E7EB (Light) / #334155 (Dark) | Dividers, card borders |

## Design Principles

- **Mobile-First:** Optimized for 9:16 portrait orientation
- **One-Handed Usage:** All interactive elements within thumb reach
- **Trust-Building:** Clear provider credentials, ratings, reviews prominently displayed
- **Localization:** Support for Arabic (Egyptian dialect), RTL layout
- **Accessibility:** Large tap targets (48x48 minimum), high contrast text
- **Performance:** Fast load times, smooth animations, minimal data usage
