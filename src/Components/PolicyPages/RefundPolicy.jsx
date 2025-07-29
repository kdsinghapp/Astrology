import React from "react";
import HOC from "../../Common/HOC";

const RefundPolicy = () => {
  return (
    <div>
      {" "}
      <section class="about_privacy">
        <div class="container content_fit_div">
          <div>
            <div style={{ textAlign: "left" }}>
              <h2>DELIVERY, CANCELLATION AND REFUND POLICY</h2>
              <p>
                We follow a strict no refund policy. Once the order for the service/s has been confirmed and the money has been deducted from the user’s wallet,
                you cannot cancel it at any given scenario, as the moment you confirm the order, the work on it starts the very moment. In certain scenarios,
                where the work does not start, Astropush reserves the right to decide whether to refund the paid amount or not. However, if the User intends to
                cancel a successfully placed order before execution, the User is required to contact the customer care team within 1 (one) hour of making the
                payment, thereafter it is totally at the discretion of Astropush and its management whether to issue refund or not.{" "}
              </p>
              <p>
                The delivery of reports and answers generally take 6-8 hours and we strive to maintain the delivery times. However, it is not guaranteed and
                shall vary case to case basis. If a user sees that delivery is delayed beyond this time then he should notify us immediately. We shall take all
                necessary action in order to expedite the process. No refund shall be processed under such circumstances.
              </p>
              <p>
                No refund shall be processed for the reason that in-correct information or data has been provided by the user. The User can request for change
                in the in-correct information or data provided, the request for such change shall be made with the customer care within 1 (one hour) of
                execution of the service rendered by the service provider.
              </p>
              <p>
                No refund shall be processed for providing a wrong contact number for the purpose of availing the “Call with Astrologer” feature. The User once
                opted for this feature is advised to keep the Contact Number in full coverage area and must answer the call when received. No refund shall be
                processed for any call which gets connected.
              </p>
              <p>
                The refunds, if any, shall be processed after deduction of the transaction charges levied by the Bank and/or the Payment Gateway or any other
                processing charge of our platform.
              </p>
              <p>The User agrees to receive certain specific emails and messages along with calls from the Website.</p>
            </div>
            <div style={{ textAlign: "left" }}>
              <h2>WALLET</h2>
              <p>
                To use any service on the platform, users are required to put money into the wallet on the platform. The money can be put in the wallet through
                various options provided like credit card, debit card, UPI, netbanking etc. The money put in the wallet is converted to credit. This credit is
                neither redeemable in currency nor refundable.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HOC(RefundPolicy);
