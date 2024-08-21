# JR Store - Angular 17 Application

## Description

JR Store is a cutting-edge web application built with **Angular 17**, designed to offer a seamless and intuitive shopping experience. The application implements advanced features like **state management** using **NgRx Signals** and a highly responsive UI crafted with **Tailwind CSS**. The architecture adheres to **SOLID principles** and **Clean Code practices** to ensure a scalable, maintainable, and high-quality codebase.

## Features

- **Product Management**: Comprehensive management of product listings, with options to sort and filter products effectively.
- **Checkout Process**: A streamlined and user-friendly checkout experience that handles orders efficiently.
- **Order Management**: Detailed tracking and management of orders, with robust filtering and sorting capabilities.
- **State Management**: Implemented using **NgRx Signals**, providing a reactive approach to managing the application's state, particularly for orders and the shopping cart.
- **Responsive Design**: Tailored to work seamlessly across all device types with **Tailwind CSS**.
- **API Integration**: Connects to a mock API for product data simulation, ensuring a smooth integration process.
- **Sorting and Filtering**: Products can be sorted by price in ascending or descending order, enhancing the user's browsing experience.
- **SOLID Principles**: The application is structured to promote scalability and ease of maintenance.
- **Clean Code**: Rigorous coding standards are followed to ensure the code is clean, readable, and easy to maintain.

## Technologies Used

- **[Angular 17](https://angular.io/):** Framework for building mobile and desktop web applications.
- **[NgRx Signals](https://ngrx.io/):** State management library used for reactive programming.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for creating responsive designs.
- **[Mock API](https://fakestoreapi.com/):** Simulated API for product data, allowing for effective testing and development.

## Project Setup

### 1. Install Dependencies

To install the required dependencies, navigate to the project directory and run:

```bash
npm install
```

### 2. Run the Project Locally

To start the application locally, use:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Application Structure

- **Routing**: Configured in `app.route.ts`, handling the navigation flow across the application.
- **State Management**: Managed with `OrderStore` and `CartStore`, leveraging **NgRx Signals** for a reactive experience.
- **API Integration**: The `ProductsService` interacts with a mock API to simulate product data, with features for loading, retrieving by ID, and sorting products.
- **UI Components**: Styled using **Tailwind CSS** to ensure a consistent and responsive design.
- **SOLID Principles**: The architecture is designed for maintainability and future-proofing, ensuring the system can evolve with ease.
- **Clean Code Practices**: Ensured throughout the codebase to maintain high standards of readability and quality.

### Example Routes

- **Products Page**: `path: '/products'`
- **Product Details**: `path: '/products/:id'`
- **Checkout Page**: `path: '/checkout'`
- **Orders Page**: `path: '/orders'`

### State Management

- **OrderStore**: Provides methods for updating, adding, filtering, and deleting orders, ensuring efficient order management.
- **CartStore**: Handles cart operations, including adding, removing, and updating products in the cart.

### API Integration

- **ProductsService**: Utilizes Angular's `HttpClient` to interface with a mock API, offering methods to load products, retrieve product details by ID, and sort products by price.

## Testing the Application

To run unit tests, use:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests to help improve the project.

## License

This project is licensed under the [MIT License](LICENSE).
