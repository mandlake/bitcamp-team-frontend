const MenuPage = () => {
  return (
    <>
      <div className="font-bold text-[var(--color-Harbor-first)] w-screen h-screen text-[80px] flex flex-row items-center justify-between">
        <div className="flex flex-col items-center w-[40vw] h-[70vh] gap-[72px] justify-center m-[10vw]">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className=" border-b-2 flex flex-row items-baseline gap-4"
            >
              <h1>Menues</h1>
              <p className="font-normal text-[38px] w-[20vw]">sub</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center w-[40vw] h-[70vh] gap-[72px] justify-center"></div>
      </div>
    </>
  );
};

export default MenuPage;
