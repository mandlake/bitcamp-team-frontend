'use client';

import { ILawyer, ILawyerDetail } from '@/components/_model/lawyer/lawyer';
import {
  getAllLawyer,
  getLawyersByLaw,
  searchLawyer,
} from '@/components/_service/lawyer/lawyer.service';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const LawyersBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();

  const [lawyers, setLawyers] = useState<ILawyer[]>([]);

  const options = [
    { value: '담당법률', label: '담당법률' },
    { value: '이름', label: '이름' },
    { value: '주소', label: '주소' },
    { value: '소속', label: '소속' },
  ];

  const getAllLawyers = async () => {
    await dispatch(getAllLawyer()).then((res: any) => {
      console.log(res);
      setLawyers(res.payload);
    });
  };

  const handleSearch = async () => {
    await dispatch(searchLawyer(watch('search'))).then((res: any) => {
      setLawyers(res.payload);
    });
  };

  const handleSearchByLaw = async () => {
    let laws = [] as string[];
    watch('search')
      .split(', ')
      .map((law: string) => {
        laws.push(law);
      });
    await dispatch(getLawyersByLaw(laws)).then((res: any) => {
      setLawyers(res.payload);
    });
  };

  const handleFind = async () => {
    if (watch('분야') === '담당법률') {
      handleSearchByLaw();
    } else if (
      watch('분야') === '이름' ||
      watch('분야') === '주소' ||
      watch('분야') === '소속'
    ) {
      handleSearch();
    } else {
      alert('분야를 선택해주세요');
    }
  };

  useEffect(() => {
    getAllLawyers();
  }, []);

  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <h1 className="text-5xl font-semibold font-chosunlo">
            LAWYERS BOARD
          </h1>
          <div className="w-[60vw] flex flex-col items-center gap-5">
            <div className="flex flex-row items-baseline justify-center w-[60vw] gap-5 px-5 py-2">
              <select
                className="w-[5vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch('분야')}
                {...register('분야')}
                name="분야"
              >
                <option>분야</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="w-[40vw] h-[5vh] flex border border-black flex-row justify-between ">
                <input
                  type="text"
                  className="w-80 focus:outline-none"
                  {...register('search')}
                />
                <button onClick={handleSearch}>
                  <Image
                    width={30}
                    height={20}
                    src={
                      'https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000'
                    }
                    alt={'find'}
                  />
                </button>
              </div>
            </div>
            <div className="w-auto flex flex-wrap justify-start items-stretch gap-3">
              {lawyers?.map((item: any) => (
                <div
                  key={item.id}
                  className="border border-[var(--color-Harbor-first)] h-72 w-[150px] rounded-md text-[var(--color-Harbor-first)] items-center justify-between flex flex-col p-4 font-chosunsg"
                  onClick={() => window.location.replace(`/lawyers/${item.id}`)}
                >
                  <Image
                    src={
                      item.detail?.photo ||
                      'https://img.icons8.com/?size=100&id=11730&format=png&color=000000'
                    }
                    className="mb-3 h-48 w-auto"
                    width={150}
                    height={150}
                    alt="lawyer-image"
                  />
                  <div className="flex flex-col items-center gap-1 w-28">
                    {item.detail?.premium && (
                      <div className="flex justify-center">
                        <Image
                          src="https://kr.object.ncloudstorage.com/bucket-lawmate-lawyer/premium_icon.png"
                          alt="premium icon"
                          width={20}
                          height={20}
                          className="inline-block mb-1"
                        />
                      </div>
                    )}
                    <div className="flex justify-center items-center">
                      <h1 className="text-lg font-semibold flex items-center">
                        {item.name} 변호사
                      </h1>
                    </div>
                    <div className="text-sm flex flex-row items-center gap-2 truncate w-auto max-w-full">
                      {item.detail?.law.map((law: any, index: number) => (
                        <div key={index}>#{law}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyersBoardPage;
