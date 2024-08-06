"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { getProductById } from "@/components/_service/product/product-slice";
import { IUser } from "@/components/_model/user/user";
import { IProduct } from "@/components/_model/product/product";
import { IPayment } from "@/components/_model/payment/payment";
import { savePayment } from "@/components/_service/payment/payment-service";
import UserId from "@/components/hooks/userId";
import { getUserById } from "@/components/_service/user/user.service";
import { userURL } from "@/components/common/url";

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function Product(props: any) {
  const { lawyerId } = props;
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [price, setPrice] = useState<number>(0);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const [transactions, setTransactions] = useState<any[]>([]);
  const userId = parseInt(UserId() || "");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${userURL}/product/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Products data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    loadProducts();
  }, [token]);

  const requestPay = async (productPrice: number) => {
    setPrice(productPrice);
    const confirmMessage = `결제할 금액은 ${productPrice}원 입니다. 계속 진행하시겠습니까?`;
    const isConfirmed = window.confirm(confirmMessage);
    window.IMP.init("imp78717406");
    if (!window.IMP) {
      console.error("IMP is not loaded");
      return;
    }

    if (isConfirmed) {
      window.IMP.init("imp78717406");
      if (!window.IMP) {
        console.error("IMP is not loaded");
        return;
      }

      window.IMP.request_pay(
        {
          id: user.id,
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          amount: price,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            // 서버로 결제 데이터 전송
            const paymentData: IPayment = {
              payment_uid: rsp.imp_uid,
              status: "PENDING",
              buyer: {
                id: userId as number,
              },
              product: {
                id: selectedProductId as number,
              },
              amount: productPrice,
            };

            dispatch(savePayment(paymentData));
            const { data } = await axios.post(
              `${userURL}/user/payments/verifyIamport/${rsp.imp_uid}`,
              rsp,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setTransactions([
              ...transactions,
              {
                id: rsp.imp_uid,
                price: productPrice,
                date: new Date().toLocaleString(),
              },
            ]);
          } else {
            console.log("Payment failed", rsp.error_msg);
            confirm("결제가 실패했습니다.");
          }
        }
      );
    } else {
      // 사용자가 확인하지 않은 경우 처리
      console.log("결제가 취소되었습니다.");
    }
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const loadScript = (src: any, callback: any) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        document.addEventListener("DOMContentLoaded", () => {
          const payment_uid = "O" + new Date().getTime();
          const totalPriceElement = document.getElementById("totalPrice");
          const totalPrice = totalPriceElement
            ? totalPriceElement.innerText
            : "";
          fetch(`${userURL}/user/payments/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_uid: payment_uid,
              price: totalPrice,
            }),
          });
        });
      });
    });
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const handleProductSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedProductId = Number(event.target.value);
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    );
    if (selectedProduct) {
      setSelectedProductId(selectedProductId);
      setPrice(selectedProduct.price);
    }
  };

  const handlePointUsage = async () => {};

  return (
    <div>
      <div className="flex justify-start gap-5">
        {products.length === 0 ? (
          <p className="mt-10 ">상품이 존재하지 않습니다.</p>
        ) : (
          products.map((product) => (
            <label
              key={product.id}
              className="border border-gray-300 rounded-2xl py-2 px-4 w-full"
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <input
                type="radio"
                name="product"
                value={product.id}
                onChange={handleProductSelect}
                className="h-3 w-3 cursor-pointer"
              />
              <br />
              {product.item_name} <br />
              {product.price} 포인트
            </label>
          ))
        )}
      </div>
      <br />
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          className="border border-gray-300 rounded-2xl py-2 px-4"
          onClick={() => requestPay(price)}
        >
          결제
        </button>
        <button
          className="border border-gray-300 rounded-2xl py-2 px-4"
          onClick={handlePointUsage}
        >
          포인트 결제
        </button>
      </div>
    </div>
  );
}
