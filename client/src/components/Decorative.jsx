export default function Decorative() {
  return (
    <>
      {/* Decorative Stars */}
      <div className="fixed top-16 left-20 text-yellow-400 text-5xl z-0 pointer-events-none">⭐</div>
      <div className="fixed top-20 left-1/3 text-yellow-400 text-4xl z-0 pointer-events-none">
        ⭐
      </div>
      <div className="fixed top-14 right-1/4 text-yellow-400 text-5xl z-0 pointer-events-none">
        ⭐
      </div>

      {/* Decorative Circle */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full opacity-30 -mr-48 -mt-48 z-0 pointer-events-none"></div>

      {/* Decorative Clipboard Illustration */}
      <div className="fixed bottom-10 left-10 hidden lg:block z-0 pointer-events-none">
        <div className="text-8xl opacity-50">📋</div>
      </div>
    </>
  );
}
