
<a name="readme-top"></a>

<br />
<div align="center">
  <a href="#">
    <img src="https://i.ibb.co/jrkSY3h/360-F-285880059-f-WY8w-T2d0m-Tpx-FZr-XL7w25-MQJz-Tsx-Aq-T-removebg-preview.png" alt="Logo" >
  </a>


  
</div>


<!-- ABOUT THE PROJECT -->
## About The Project


* RMT MUSIC is a music and music instruments learning platform. we provide lots of instructor and classes.

* Fist of all our website provide online course like music class, instrument class , vocal class etc.

* Website home page contain navbar, banner/ slider section , popular class , popular instructors, about section , contact section and footer section.

* A normal user can buy a class using stripe payment.

* Website main admin can make instructor or make admin.

* Instructor Added a class and update a class and see there all student and class data.

* When Instructor add a class then admin approved this class then public otherwise denied and send feedback to Instructor.

## Usage Technology

* React JS, Node JS, MongodB, Express JS
* Tailwind CSS, Daiysi Ui, Custom CSS,
* React Router, Firebase, JWT, Axios, Tanstack Query



### Live Website Link 
[Click me to go to RMT MUSIC!](https://summer-school-f942c.web.app/)

## Environment Variables Setup

This project requires the following environment variables to be set in a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API Base URL
VITE_API_BASE_URL=https://school-server-gamma.vercel.app

# Image Upload Service (IMGBB)
VITE_IMGBB=your_imgbb_api_key

# Stripe Payment
VITE_STRIPE=your_stripe_publishable_key
```

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the required environment variables
4. Run the development server: `npm run dev`
5. Build for production: `npm run build`