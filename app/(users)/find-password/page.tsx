'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lawyerNo: '',
  });
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        'https://api.hojoo.lawmate.site/lawyers/resetPassword',
        null,
        {
          params: {
            lawyerNo: formData.lawyerNo,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Password reset successfully.');
      } else {
        setMessage('Failed to reset password.');
      }
    } catch (error) {
      console.error('There was an error resetting the password!', error);
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div
          id="find-password"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            비밀번호를 <br />
            잃어버리셨나요?
          </p>
          <div>
            <label htmlFor="lawyerNo">
              <input
                type="text"
                id="lawyerNo"
                name="lawyerNo"
                placeholder="lawyerNo"
                value={formData.lawyerNo}
                onChange={(e) =>
                  setFormData({ ...formData, lawyerNo: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              onClick={handleResetPassword}
              className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white font-bold"
            >
              Find Password
            </button>
          </div>
          {message && (
            <div className="w-[22vw] flex flex-col p-[1.111vh]">
              <p className="text-gray-700 text-sm">{message}</p>
            </div>
          )}
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              I know my password. Let me login.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
