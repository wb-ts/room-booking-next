import { User, Room, Booking } from "@models/modelsIndex";
import { catchAsyncErrors } from "@middlewares/middlewaresIndex";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";
import stripe from "stripe";

const { checkout, webhooks } = stripe(process.env.STRIPE_SECRET_KEY);

//Generate stripe checkout session => /api/v1/checkout_session/:roomId
export const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  const { roomId, checkInDate, checkOutDate, daysOfStay, amount } = req.query;
  //Get Room Data
  const { _id, name: roomName, images } = await Room.findById(roomId);

  const { origin } = absoluteUrl(req);

  //Create Stripe Checkout Session

  const session = await checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/me/bookings`,
    cancel_url: `${origin}/me/bookings/${_id}`,
    customer_email: req.user.email,
    client_reference_id: roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: roomName,
        images: [`${images[0].url}`],
        amount: Number(amount) * 100,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    success: true,
    session,
  });
});

//Create new booking after payment => /api/v1/payment/webhook

export const stripeCheckoutWebhook = catchAsyncErrors(async (req, res) => {
  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];
    const event = webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const {
        client_reference_id,
        customer_email: email,
        amount_total,
        payment_intent: id,
        payment_status: status,
        metadata,
      } = session;
      const room = client_reference_id;
      const user = (await User.findOne({ email })).id;
      const amountPaid = amount_total / 100;
      const paymentInfo = {
        id,
        status,
      };

      const { checkInDate, checkOutDate, daysOfStay } = metadata;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        amountPaid,
        daysOfStay,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in stripe checkout", error);
  }
});
