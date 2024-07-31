"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { getUserById } from "@/components/_service/user/user.service";
import { getProductById } from "@/components/_service/product/product-slice";
import { IUser } from "@/components/_model/user/user";
import { IProduct } from "@/components/_model/product/product";
import { userURL } from "@/components/common/url";
import { IPayment } from "@/components/_model/payment/payment";
import { savePayment } from "@/components/_service/payment/payment-service";

export default function Product() {
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

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("User id in Payment: " + decoded.id);
        dispatch(getUserById(decoded.id));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }

    if (user.id) {
      fetch(`${userURL}/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("MY-INFO: data: " + JSON.stringify(data));
        })
        .catch((error) => console.log("error: ", error));
    }
  }, [dispatch, user?.id]);

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
          name: product?.item_name,
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
              buyer: {
                id: user.id,
              },
              product: {
                id: selectedProductId as number,
              },
              // lawyer: {
              //   id: lawyer.id,
              // },
            };

            dispatch(savePayment(paymentData));
            const { data } = await axios.post(
              `${userURL}/payment/verifyIamport/${rsp.imp_uid}`,
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
          fetch(`${userURL}/payment/status`, {
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

  const handlePointUsage = async () => {
    if (price > 0) {
      if (Number(user.point) >= price) {
        const newPoint = Number(user.point) - price;

        try {
          const response = await axios.put(
            `${userURL}/modifyPoint`,
            {
              ...user,
              point: newPoint.toString(),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            // 사용자 정보를 업데이트하기 위해 Redux에 dispatch
            // dispatch(updateUserPoint(newPoint.toString()));

            alert("결제가 완료되었습니다.");
          } else {
            console.error("Failed to update point on the server");
            alert("결제가 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("Error occurred while updating point:", error);
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("잔액이 부족합니다. 결제를 진행할 수 없습니다.");
      }
    } else {
      alert("상품을 선택해주세요.");
    }
  };

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

  const productImage = (productId: number): string => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    return selectedProduct?.image || "/img/default.jpg";
  };

  return (
    <>
      <div className="overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="mt-6 mb-8 pl-12 text-2xl">상품 페이지</div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.length === 0 ? (
              <p className="mt-10">상품이 존재하지 않습니다.</p>
            ) : (
              products.map((product) => (
                <label
                  key={product.id}
                  className="group w-full min-h-72 aspect-h-1 aspect-w-1 overflow-hidden rounded-3xl bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-2xl cursor-pointer
                  hover:text-white hover:shadow-lg"
                  style={{
                    backgroundImage: `url(${productImage(product.id)})`,
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
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <div className="h-full w-full flex flex-col justify-end p-4 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.item_name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price} 포인트
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex gap-5 justify-end">
              <button
                className="mt-40 hover:bg-blue-400 items-center justify-center flex"
                onClick={() => requestPay(price)}
              >
                Pay
              </button>
              <button
                className="mt-40 hover:bg-blue-400 items-center justify-center flex"
                onClick={handlePointUsage}
              >
                Use point
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 grid-rows-2">
              <p className="text-[18px] mb-2 ">잔액 {user?.point} 포인트</p>
            </div>
            <svg className="h-20"> </svg>
          </div>
        </div>
      </div>
    </>
  );
}
