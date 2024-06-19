const LawLawPage = ({ isOpenLawLaw }: any) => {
  return (
    <>
      <div
        className={`absolute w-[60vw] z-0 bottom-0 right-0 h-screen bg-white/80 ${
          isOpenLawLaw
            ? "visible animate__animated animate__fadeInBottomRight"
            : "invisible"
        } flex flex-col justify-center items-center gap-3`}
      >
        <div className="w-[58vw] h-[50vh] bg-slate-400"></div>
        <div className="w-[58vw] h-[10vh] bg-slate-400"></div>
      </div>
    </>
  );
};

export default LawLawPage;
