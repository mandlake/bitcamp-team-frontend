import { ILawPayment } from "@/components/_model/lawpayment/lawpayment";
import { userInstance } from "@/components/config/axios-config";

export const SaveAPI = async (lawPayment: ILawPayment) => {
  console.log(`LawPayment API parameter: ${JSON.stringify(lawPayment)}`);
  try {
    const response = await userInstance().post("law/payments/save", lawPayment);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const lawPaymentStatusAPI = async (lawPayment: ILawPayment) => {
  try {
    const response = await userInstance().post("law/payments/status", lawPayment);
    // java 에서 Messenger.message에 값을 담음
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const confirmLawPaymentAPI = async (lawPayment: ILawPayment) => {
  try {
    const response = await userInstance().post(
      "law/payments/confirm",
      lawPayment
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const cancelLawPaymentAPI = async (lawPayment: ILawPayment) => {
  try {
    const response = await userInstance().post("law/payments/cancel", lawPayment);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findLawPaymentByLawyerAPI = async (id: number) => {
  try {
    const response = await userInstance().get(`law/payments/findLawyer/${id}`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
