import React, { useState } from 'react';
import { 
  Search, Plus, Sun, Moon, MoreHorizontal, 
  User, MapPin, Activity, Phone, Mail, X, Trash2, Edit3
} from 'lucide-react';

const UserListApp = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Jacob Jones", email: "jackson.graham@example.com", city: "Dushanbe", status: "Inactive", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jenny Wilson", email: "jessica.hanson@example.com", city: "Kulob", status: "Inactive", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Guy Hawkins", email: "bill.sanders@example.com", city: "Dushanbe", status: "Inactive", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Cody Fisher", email: "michael.mitc@example.com", city: "Bokhtar", status: "Active", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Esther Howard", email: "felicia.reid@example.com", city: "Dushanbe", status: "Active", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Kristin Watson", email: "kenzi.lawson@example.com", city: "Khujand", status: "Active", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Dianne Russell", email: "deanna.curtis@example.com", city: "Dushanbe", status: "Inactive", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "Ronald Richards", email: "tim.jennings@example.com", city: "Hisor", status: "Active", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=8" },
  ]);

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCity, setFormCity] = useState("Dushanbe");

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    const matchesCity = cityFilter === "All" || u.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleCreateUser = () => {
    if (!formName || !formEmail) return alert("Заполни поля!");
    const newUser = {
      id: Date.now(),
      name: formName,
      email: formEmail,
      city: formCity,
      status: "Active",
      phone: "88888 0090",
      img: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    setUsers([newUser, ...users]);
    setFormName(""); setFormEmail(""); setShowAddModal(false);
  };

  const handleDelete = (id, e) => {
    e?.stopPropagation();
    setUsers(users.filter(u => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  const UserRow = ({ index }) => {
    const user = filteredUsers[index];
    if (!user) return null;
    return (
      <tr 
        onClick={() => setSelectedUser(user)}
        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
      >
        <td className="py-4 px-6 flex items-center gap-3">
          <img src={user.img} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </td>
        <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{user.city}</td>
        <td className="py-4 px-6">
          <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${
            user.status === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
          }`}>
            {user.status}
          </span>
        </td>
        <td className="py-4 px-6 text-gray-900 dark:text-gray-200 font-medium">{user.phone}</td>
        <td className="py-4 px-6 text-right relative group">
          <button onClick={(e) => handleDelete(user.id, e)} className="text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F0F0F] text-gray-900 dark:text-gray-100 transition-colors duration-300 p-8 font-sans">
        
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">User List</h1>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all active:scale-95"
            >
              <Plus size={20} /> NEW
            </button>
            <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
              <button onClick={() => setDarkMode(false)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${!darkMode ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}>
                <Sun size={16} /> <span className="text-xs font-bold">LIGHT</span>
              </button>
              <button onClick={() => setDarkMode(true)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-white shadow-md' : 'text-gray-500'}`}>
                <Moon size={16} /> <span className="text-xs font-bold">DARK</span>
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-3">
            <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full mt-1.5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="All">All status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">City</label>
            <select 
              value={cityFilter} 
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full mt-1.5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All cites</option>
              <option value="Dushanbe">Dushanbe</option>
              <option value="Kulob">Kulob</option>
              <option value="Khujand">Khujand</option>
              <option value="Bokhtar">Bokhtar</option>
              <option value="Hisor">Hisor</option>
            </select>
          </div>
          <div className="md:col-span-6">
            <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Search</label>
            <div className="relative mt-1.5">
              <input 
                type="text" 
                placeholder="Name, email, etc..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white dark:bg-[#161616] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#1A1A1A] text-gray-400 text-[11px] font-black uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6"><div className="flex items-center gap-2"><User size={14}/> Name</div></th>
                <th className="py-4 px-6"><div className="flex items-center gap-2"><MapPin size={14}/> Город</div></th>
                <th className="py-4 px-6"><div className="flex items-center gap-2"><Activity size={14}/> Status</div></th>
                <th className="py-4 px-6"><div className="flex items-center gap-2"><Phone size={14}/> Phone</div></th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              <UserRow index={0} />
              <UserRow index={1} />
              <UserRow index={2} />
              <UserRow index={3} />
              <UserRow index={4} />
              <UserRow index={5} />
              <UserRow index={6} />
              <UserRow index={7} />
              <UserRow index={8} />
              <UserRow index={9} />
              <UserRow index={10} />
              <UserRow index={11} />
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => setSelectedUser(null)} />
            <div className="relative w-full max-w-sm h-full bg-white dark:bg-[#121212] shadow-2xl p-10 animate-slide-left border-l border-gray-100 dark:border-gray-800">
              <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X/></button>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <img src={selectedUser.img} className="w-40 h-40 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4 dark:ring-offset-[#121212]" alt=""/>
                  <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-[#121212] ${selectedUser.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <h2 className="text-2xl font-bold mb-1">{selectedUser.name}</h2>
                <p className="text-blue-500 text-sm font-medium mb-10">{selectedUser.email}</p>

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl">
                    <MapPin className="text-blue-500" size={20}/>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">City</p><p className="font-semibold">{selectedUser.city}</p></div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl">
                    <Phone className="text-blue-500" size={20}/>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p><p className="font-semibold">{selectedUser.phone}</p></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full mt-12">
                  <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-all"><Edit3 size={16}/> EDIT</button>
                  <button onClick={() => handleDelete(selectedUser.id)} className="flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all"><Trash2 size={16}/> DELETE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Create User</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Name</label>
                  <input value={formName} onChange={e => setFormName(e.target.value)} type="text" className="w-full mt-1.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full name"/>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                  <input value={formEmail} onChange={e => setFormEmail(e.target.value)} type="email" className="w-full mt-1.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com"/>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">City</label>
                  <select value={formCity} onChange={e => setFormCity(e.target.value)} className="w-full mt-1.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl outline-none">
                    <option>Dushanbe</option><option>Kulob</option><option>Khujand</option><option>Bokhtar</option><option>Hisor</option>
                  </select>
                </div>
                <button onClick={handleCreateUser} className="w-full py-4 bg-[#1DA1F2] text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 mt-4 active:scale-95 transition-all">CREATE</button>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default UserListApp;