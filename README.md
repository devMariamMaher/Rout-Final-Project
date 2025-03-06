# E-Commerce Website

## Description
This is a fully functional e-commerce website built using **Angular 19** and **Tailwind CSS**. Users can browse products, add items to their cart and wishlist, and proceed to checkout. The website supports two payment methods:
- **Cash on Delivery (COD):** Users are redirected to an order details page after placing an order.
- **Online Payment:** Users are redirected to a payment website to complete their transaction, then navigated back to the order details page.

### Features:
- **User Authentication:** Register, login, logout, and password reset.
- **Cart & Wishlist Management:** Add, remove, and adjust product quantities.
- **Order Tracking:** View order history and details.
- **Product & Category Display:** Browse all products, categories, and brands.
- **Responsive Design:** Optimized for all screen sizes.
- **Interactive UI:** Owl-carousel for product sliders and a seamless user experience.

## How to Run the Project Locally

### Prerequisites
Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [Angular CLI](https://angular.io/cli) (ensure it's updated to support Angular 19):
  ```sh
  npm install -g @angular/cli
  ```
- A modern web browser (Google Chrome, Firefox, etc.)

### Steps to Run

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo-name
   ```
3. Install dependencies:
   ```sh
   npm i
   ```
4. Start the development server:
   ```sh
   ng s --o
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```
   The e-commerce website should now be running locally in your browser.

## Technologies Used:
- **Angular 19** (Framework)
- **Tailwind CSS** (Styling)
- **Owl-Carousel** (Product Slider)
- **RxJS & Services** (API Handling)
- **Angular Routing** (Navigation)

For any questions or issues, feel free to open an **issue** or contribute to the project. 🚀
