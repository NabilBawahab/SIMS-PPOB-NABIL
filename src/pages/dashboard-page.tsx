export default function DashboardPage() {
  return (
    <main>
      <div className="flex justify-between px-10">
        <div className="flex-1">
          <div className="bg-blue-500 size-30" />
          <p>Selamat datang,</p>
          <p>Bambang</p>
        </div>
        <div className="bg-[url('/backgroundsaldo.png')] bg-cover bg-center flex-1 rounded-xl p-4 text-white">
          <p>Saldo anda</p>
          <p>Rp</p>
          <p>Lihat Saldo</p>
        </div>
      </div>
    </main>
  );
}
