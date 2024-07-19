import Image from "next/image";

export const LongLeftArrow = ({ onClick }: any) => {
  return (
    <>
      <Image
        src="https://img.icons8.com/?size=100&id=99996&format=png&color=000000"
        alt="send"
        width={23}
        height={23}
        className="object-cover"
        onClick={onClick}
      />
    </>
  );
};

export const LongRightArrow = ({ onClick }: any) => {
  return (
    <>
      <Image
        src="https://img.icons8.com/?size=100&id=15816&format=png&color=000000"
        alt="send"
        width={23}
        height={23}
        className="object-cover"
        onClick={onClick}
      />
    </>
  );
};
