"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { joinId } from "@/app/components/user/service/user.service";
import { IUser } from "@/app/components/user/model/user";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({} as IUser);

  const handleJoin = async () => {
    try {
      await dispatch(joinId(formData))
        .then((res: any) => {
          alert("success to join us");
          console.log(res.payload.userId);
        })
        .then(() => {
          router.push("/pages/users/login");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex align-middle justify-center items-center">
      <div className="font-roboto w-[25vw] h-[50vh] border border-gray-700 flex flex-col justify-center items-center gap-[1.111vh] bg-gray-200 p-[1.111vh]">
        <p>회원가입</p>
        <div>
          <p>이름</p>
          <input
            type="text"
            name="name"
            value={formData.firstName}
            onChange={(e: any) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <p>성</p>
          <input
            type="text"
            name="name"
            value={formData.lastName}
            onChange={(e: any) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <p>아이디</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e: any) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e: any) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input type="password" />
        </div>
        <div>
          <p>이메일</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e: any) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleJoin();
              }
            }}
          />
        </div>
        <button onClick={handleJoin}>회원가입</button>
      </div>
    </div>
  );
}

export default Join;
