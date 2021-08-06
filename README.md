# MyBnB

## A full stack room booking website using NEXT.js.

Language - JavaScript.

Frontend - Next.js, SCSS

Authentication - Next-Auth.

State Management - React-Redux/Toolkit.

API - REST.

Backend - Node, next-connect.

Database - MongoDB(mongoose).

Payment - Stripe.

## 1) Common Routes

i) Home -> /

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/home.png' alt='home'>

ii) Room Details -> /room/:id

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/roomdetail1.png' alt='roomdetails'>

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/roomdetail2.png' alt='roomdetails'>

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/selectdate.png' alt='roomdetails'>

iii) Login -> /login

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/login.png' alt='login'>

iv) Register -> /register

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/register%20account.png' alt='Register'>

v) Forgot Password -> /password/forgot

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/forgot%20password.png' alt='Forgotpassword'>

vi) Reset Password -> /password/reset/:token

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/password%20reset.png' alt='Resetpassword'>

vii) 404 error

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/common/404.png' alt='error'>

## 2) User Routes

i) Room Booking/Payment -> via. Stripe

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/stripe%20payment.png' alt='Bookroom'>

ii) Submit Review -> /room/:id [Only if room is booked by user in past]

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/reviewsubmit.png' alt='Submitreview'>

iii) Profile View/Update-> /me/update

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/my%20profile.png' alt='Profile'>

iv) My Bookings -> /me/bookings

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/mybookings.png' alt='Bookings'>

v) Booking Detail -> /me/bookings/:id

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/booking%20detail%20user.png' alt='Bookingdetail'>

vi) Invoice -> pdf

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/user/invoice.png' alt='Invoice'>

## 3) Admin Routes

i) Create New Room -> /admin/rooms/new

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/new%20room.png' alt='NewRoom'>

ii) All Rooms -> /admin/rooms

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/all%20rooms.png' alt='Allrooms'>

iii) Room View/Update -> /admin/rooms/:id

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/room%20update.png' alt='Roomviewupdate'>

iV) All Room Reviews -> /admin/reviews

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/room%20reviews.png' alt='Roomreviews'>

V) All Users -> /admin/users

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/all%20user.png' alt='Allusers'>

Vi) User View/Update -> /admin/users/:id

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/udate%20user.png' alt='User'>

Vii) All Bookings -> /admin/bookings

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/all%20bookings.png' alt='Allbookings'>

Vii) Booking Details -> /admin/bookings/:id

<img src='https://github.com/iamvishalchandra/mybnb/blob/master/screenshots/admin/booking%20detail%20admin.png' alt='Bookingdetails'>
