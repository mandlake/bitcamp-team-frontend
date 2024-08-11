import { IPayment } from "@/components/_model/payment/payment";
import { userInstance } from "@/components/config/axios-config";

export const SaveAPI = async (payment: IPayment) => {
  console.log(`Payment API parameter: ${JSON.stringify(payment)}`);
  try {
    const response = await userInstance().post("user/payments/save", payment);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paymentStatusAPI = async (payment: IPayment) => {
  try {
    const response = await userInstance().post("user/payments/status", payment);
    // java 에서 Messenger.message에 값을 담음
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
