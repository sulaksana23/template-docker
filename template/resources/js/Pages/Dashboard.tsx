import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview Dashboard</h2>
                        <p className="text-slate-500 mt-1 text-sm font-medium">Selamat datang kembali! Berikut ringkasan performa hari ini.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="inline-flex items-center px-5 py-2.5 bg-white border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"/></svg>
                            Export Laporan
                        </button>
                        <button className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-sm font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                            Buat Transaksi
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Penjualan', value: 'Rp 45.2M', growth: '+12.5%', color: 'indigo', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { label: 'Pengguna Baru', value: '1,280', growth: '+25.5%', color: 'emerald', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                        { label: 'Rata-rata Order', value: 'Rp 120rb', growth: '-3.2%', color: 'rose', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                        { label: 'Produk Terjual', value: '542 Unit', growth: '+6.1%', color: 'amber', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-${stat.color}-100 text-${stat.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}/></svg>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.growth.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    {stat.growth}
                                </span>
                            </div>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Dashboard Modules */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Mockup Area */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Analisis Penjualan Mingguan</h3>
                                <p className="text-slate-500 text-sm">Visualisasi data transaksi 7 hari terakhir.</p>
                            </div>
                            <select className="bg-slate-50 border-slate-200 text-sm rounded-xl py-2 px-4 outline-none focus:ring-4 focus:ring-indigo-500/10">
                                <option>Minggu Ini</option>
                                <option>Minggu Lalu</option>
                            </select>
                        </div>
                        <div className="h-72 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group">
                           {/* Decorative background grid */}
                           <div className="absolute inset-0 opacity-20 pointer-events-none" 
                                style={{backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px'}}></div>
                           
                           <svg className="w-16 h-16 text-slate-300 group-hover:text-indigo-400 transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                           </svg>
                           <p className="text-slate-400 font-medium">Modul Grafik Siap Diintegrasikan (Chart.js / Recharts)</p>
                        </div>
                    </div>

                    {/* Active Sessions / Team */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Staff Aktif</h3>
                        <div className="space-y-6 flex-1">
                            {[
                                { name: 'Sulaksana', role: 'CTO', status: 'Online', lastActive: '2m ago' },
                                { name: 'Budi Rahma', role: 'Marketing', status: 'Meeting', lastActive: '15m ago' },
                                { name: 'Dewi Ayu', role: 'Support', status: 'Online', lastActive: 'now' },
                                { name: 'Antoni Putra', role: 'Developer', status: 'Away', lastActive: '1h ago' },
                            ].map((user, idx) => (
                                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${user.status === 'Online' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {user.status}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1">{user.lastActive}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all">
                            Lihat Semua Staff
                        </button>
                    </div>
                </div>

                {/* Recent Projects Table */}
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">Transaksi Terakhir</h3>
                        <Link href="#" className="text-indigo-600 text-sm font-bold hover:underline">Kelola Semua</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-4">ID Transaksi</th>
                                    <th className="px-8 py-4">Nama Pelanggan</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Total</th>
                                    <th className="px-8 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item} className="hover:bg-slate-50/30 transition-colors cursor-pointer group">
                                        <td className="px-8 py-5 text-sm font-bold text-slate-700">#TRX-00{item}84</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">C</div>
                                                <span className="text-sm text-slate-600">Customer {item}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                                                Sudah Dibayar
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-slate-800">Rp {(Math.random() * 500 + 100).toFixed(3)}</td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
