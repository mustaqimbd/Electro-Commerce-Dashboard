# ElectroCommerce Admin Dashboard
## 🌐 Live Demo
[ElectroCommerce Dashboard](https://electrocommerce.dashboard.mustaqim.site)

## 📝 Project Overview

The **ElectroCommerce Admin Dashboard** is a **comprehensive management system** designed for administrators to efficiently handle products, orders, and customer interactions. It ensures seamless product and order management with a user-friendly interface and powerful backend integrations.

### **Key Functionalities:**
- 🔹 **Product Management:** Create, update, and manage products with categories, images, brands, tags, and statuses.
- 🔹 **Order Management:** View, filter, edit, and process customer orders efficiently.
- 🔹 **State Management:** Implement **Redux** for handling global states for products and orders.
- 🔹 **Authentication & Security:** Secure access to admin functionalities with authentication and **role-based access control**.
- 🔹 **UI/UX:** Built using **Shadcn UI** and a **custom design system** for a user experience.

## 🚀 Features (Developed by Me)

### **Product Management Interface**

#### **Product List View**
- Display all products with filtering options (categories, subcategories, brands, etc.).
- Search functionality to quickly find products.
- Pagination for managing large datasets.
- Bulk actions for updating or deleting multiple products at once.

#### **Create/Edit Product Form**
- Fields for **name, description, price, attribute, variation, inventory, category, subcategory,  brand, and tags**.
- Image upload and gallery management.
- Product status toggling (e.g., **Featured** products).

### **Order Management Interface**

#### **Order List View**
- Display all orders with search, filter, and sorting options.
- Filters by **order ID, customer details, order status and date**.
- Pagination and batch actions (bulk update or cancellation).

#### **Order Detail View**
- Comprehensive order summary including **order ID, date, customer info, shipping address, payment details, and status**.
- View and manage ordered products within each order.
- Options to **update order status, add internal notes, and print invoices**.
- Confirmation modals for critical actions (e.g., cancel, refund).

### **Customer Information Management**
- Display and edit **customer details**.
- View **customer order history**.
- Save and cancel changes with proper validation.

### **Order Status Management**
- Dropdown menu to change order status with **color-coded indicators**.
- Toast notifications for status updates.

### **Order Bulk Actions**
- Checkbox selection for multiple orders.
- Perform bulk actions like **mark as shipped or cancel orders**.

## 🔒 Authentication & Authorization
- Ensure **only authenticated users** access the dashboard.
- **Role-based access control** for different admin privileges.
  

## 📚 Tech Stack
- **Frontend:** Next.js, Redux.js, TypeScript, Tailwind CSS, Shadcn
- **Authentication:** JWT
- **Validation:** Yup, Zod

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/mustaqimbd/Electro-Commerce-Dashboard.git
cd Electro-Commerce-Dashboard

# Copy .env.local.example to .env.local and configure the environment variables
cp .env.local.example .env.local

# Install dependencies
npm install

# Run the application
npm run dev
```
### Environment Variables
Make sure to configure the `.env.local` file with appropriate values.

## 👥 Team

Developed by **Md. Mustaqim Khan** and **Md. Abir Mahmud**.
