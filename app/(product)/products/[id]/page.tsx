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
  const product: IProduct = useSelector(getProductById);
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
          id: userId,
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          amount: price,
          lawyer: lawyerId,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            // 서버로 결제 데이터 전송
            const paymentData: IPayment = {
              impUid: rsp.imp_uid,
              status: "PENDING",
              buyer: {
                id: userId as number,
              },
              product: {
                id: selectedProductId || 0,
              },
              amount: productPrice,
              lawyer: lawyerId,
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
          const imp_uid = "O" + new Date().getTime();
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
              imp_uid: imp_uid,
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
    console.log("선택한 상품 id: " + selectedProductId);
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    );
    if (selectedProduct) {
      setSelectedProductId(selectedProductId);
      setPrice(selectedProduct.price);
    }
  };

  const handlePointUsage = async () => {
    if (selectedProductId === null || selectedProductId === 0) {
      alert("포인트 결제를 진행할 제품을 선택해주세요.");
      return;
    }

    // const impUid = await getImpUid();
    const impUid = "imp_157435462997";

    if (!impUid) {
      alert("impUid를 가져오는 데 실패했습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${userURL}/user/payments/usePoint`,
        {
          id: userId,
          amount: price,
          status: "PENDING",
          product: {
            id: selectedProductId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
          },
          params: {
            impUid, // impUid를 요청 파라미터로 추가
          },
        }
      );

      if (response.data.message === "SUCCESS") {
        alert("포인트 결제가 성공적으로 완료되었습니다.");
        // 추가적인 상태 업데이트 또는 UI 갱신 로직을 여기에 추가
      } else {
        alert(response.data.message || "포인트 결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("포인트 결제 요청 중 오류 발생:", error);
      alert("포인트 결제 처리 중 오류가 발생했습니다.");
    }
  };

  // 예시: impUid를 가져오는 함수 (구체적인 구현은 상황에 따라 다릅니다)
  const getImpUid = async () => {
    try {
      // 여기에 impUid를 생성하거나 가져오는 로직을 추가하세요
      // 예시: API 호출 또는 다른 로직을 통해 impUid를 가져옴
      const response = await axios.get(
        `${userURL}/some-endpoint-to-get-impUid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.impUid;
    } catch (error) {
      console.error("impUid를 가져오는 중 오류 발생:", error);
      return null;
    }
  };

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
          포인트로 결제
        </button>
      </div>
    </div>
  );
}
