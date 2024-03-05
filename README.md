# Shortner Backend

Welcome to the Shortner Backend project! This repository contains the backend implementation for a URL shortening service. Simplify long URLs, track their usage, and enhance user experience with this efficient backend.

## Getting Started

To get started with the Shortner Backend, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/eCodeVoyager/Url-Shortner-Backend.git

2. **Install Dependencies:**
   ```bash
   cd shortner-backend
   npm install
   ```

3. **Configure the Environment:**
   Create a `.env` file in the root directory and set the necessary environment variables. You may use the provided `.env.example` as a template.

4. **Run the Application:**
   ```bash
   npm start
   ```

## API Endpoints

- **Shorten URL:**
  - Endpoint: `POST /shorten`
  - Description: Shorten a long URL and generate a unique short URL.

- **Redirect Short URL:**
  - Endpoint: `GET /:shortUrl`
  - Description: Redirect users to the original long URL when accessing the shortened URL.

- **Retrieve Short URL Details:**
  - Endpoint: `GET /shorted/:shortUrl`
  - Description: Obtain details about a specific short URL, including analytics and logs.

## Usage

Integrate the Shortner Backend into your application to simplify URLs and track their usage efficiently.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the Shortner Backend! If you have any questions or feedback, please don't hesitate to reach out.
