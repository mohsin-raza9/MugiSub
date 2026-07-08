   {/* ── Main content container — matches page.tsx's content div ─ */}
      <div className="w-full min-w-0 p-3 lg:p-4 lg:ml-2 bg-[#cfd1d4] text-[#1a2536] font-sans flex flex-col gap-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-hidden">

        {/* ── Page title banner — matches "MAIN" banner on home page ─ */}
        <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 border border-[#1c2331] font-bold text-[15px] uppercase tracking-wide shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
          Admin Panel
        </div>

        {/* ── Layout: content + right sidebar ──────────────────────── */}
        <div className="flex gap-3">

          {/* ════ LEFT CONTENT ════════════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-3">

            {/* ─── DATABASE TAB ─────────────────────────────────── */}
            {activeTab === 'DATABASE' && (
              <>
                {/* Stat cards — styled like the site's table headers */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { label: 'Total Anime', value: animeList.length + 12838, badge: '+4.2%', icon: Tv, color: '#a11f1f' },
                    { label: 'Total Novels', value: novelsList.length + 8100, badge: '+1.8%', icon: BookOpen, color: '#1f3e70' },
                    { label: 'Total Users', value: '245,991', badge: '+12.5%', icon: Users, color: '#1a5c36' },
                    { label: 'Releases', value: releaseCount, badge: 'LIVE', icon: Zap, color: '#8b6914' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#bdbfc3] border border-[#999] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#34394d]">{s.label}</span>
                        <s.icon size={14} color={s.color} />
                      </div>
                      <div className="text-[22px] font-black text-[#1a2536] font-mono leading-none">{s.value}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.badge}</span>
                        <TrendingUp size={10} color={s.color} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity chart — styled like site's Recent Releases section */}
                <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                  <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                    <span>User Activity &amp; Registrations — 30-Day Analysis</span>
                    <span className="bg-[#34394d] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] font-sans">JUN 2025</span>
                  </div>
                  <div className="p-3">
                    <svg viewBox="0 0 900 150" className="w-full h-36">
                      <defs>
                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1f3e70" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#1f3e70" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      {/* Y-axis gridlines */}
                      {[35, 70, 105].map(y => (
                        <line key={y} x1="0" y1={y} x2="900" y2={y}
                          stroke="#999" strokeDasharray="3 3" strokeWidth="0.6" />
                      ))}
                      {/* Area fill */}
                      <path
                        d="M0,125 C60,118 100,120 180,112 S310,95 450,75 S610,95 720,88 S820,45 900,30 L900,148 L0,148 Z"
                        fill="url(#cg)"
                      />
                      {/* Line */}
                      <path
                        d="M0,125 C60,118 100,120 180,112 S310,95 450,75 S610,95 720,88 S820,45 900,30"
                        fill="none" stroke="#1f3e70" strokeWidth="2"
                      />
                      {/* Dots */}
                      {[[0, 125], [180, 112], [450, 75], [720, 88], [900, 30]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="3.5" fill="#1f3e70" stroke="#cfd1d4" strokeWidth="1.5" />
                      ))}
                      {/* X-axis labels */}
                      {[['JUN_01', 10], ['JUN_08', 195], ['JUN_15', 420], ['JUN_22', 640], ['JUN_30', 848]].map(([l, x]) => (
                        <text key={l} x={x} y="148" fontSize="9" fill="#34394d">{l}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Tables Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Latest Added Content — matches site table style */}
                  <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                    <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                      Latest Added Content
                    </div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">ID</th>
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Title</th>
                          <th className="px-2 py-1.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...animeList.slice(0, 2), ...novelsList.slice(0, 2)].map((item, i) => (
                          <tr key={item.id}
                            className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                            <td className="px-2 py-1.5 border-r border-[#999]/30 text-[#1f3e70] font-bold font-mono">{item.id}</td>
                            <td className="px-2 py-1.5 border-r border-[#999]/30">{item.title}</td>
                            <td className="px-2 py-1.5 text-center">
                              <span className={statusBadge('status' in item ? item.status : 'SYNCED')}>
                                {'status' in item ? item.status : 'SYNCED'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pending Approvals */}
                  <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                    <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                      Pending Approvals
                    </div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Type</th>
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Contributor</th>
                          <th className="px-2 py-1.5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PENDING_APPROVALS.map((p, i) => (
                          <tr key={p.type}
                            className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                            <td className="px-2 py-1.5 border-r border-[#999]/30 font-bold text-[#1f3e70] font-mono">{p.type}</td>
                            <td className="px-2 py-1.5 border-r border-[#999]/30">{p.contributor}</td>
                            <td className="px-2 py-1.5 text-center">
                              <button className="bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold px-2 py-0.5 border border-[#7a1515] cursor-pointer uppercase">
                                Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ─── TERMINAL TAB ─────────────────────────────────── */}
            {activeTab === 'TERMINAL' && (
              <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                  <span>System Terminal — Action History</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setLogs([]); addLog("ADMIN    : Terminal logs cleared."); }}
                      className="bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold px-2 py-0.5 border border-[#7a1515] cursor-pointer uppercase">
                      Clear
                    </button>
                    <button onClick={() => addLog("SYSTEM   : Logs backed up.")}
                      className="bg-[#1a5c36] hover:bg-[#236b40] text-white text-[9px] font-bold px-2 py-0.5 border border-[#134526] cursor-pointer uppercase">
                      Backup
                    </button>
                  </div>
                </div>
                <div
                  className="bg-[#111827] p-4 h-[500px] overflow-y-auto font-mono text-[11px] space-y-0.5"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a5c36 #0d1117' }}
                >
                  {logs.map((log, i) => {
                    let c = 'text-[#4ade80]';
                    if (log.includes('ADMIN')) c = 'text-[#60a5fa]';
                    if (log.includes('SYSTEM')) c = 'text-[#e2e8f0]';
                    return (
                      <div key={i} className={`${c} hover:bg-white/5 px-1 py-[2px] border-l-2 border-transparent hover:border-[#4ade80] transition-colors`}>
                        {log}
                      </div>
                    );
                  })}
                  {logs.length === 0 && (
                    <div className="text-[#4ade80]/40 italic">No logs. Perform an action to see history.</div>
                  )}
                </div>
              </div>
            )}

            {/* ─── USERS TAB ────────────────────────────────────── */}
            {activeTab === 'USERS' && (
              <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                  User Management
                </div>
                <div className="p-3">
                  <UsersTable />
                </div>
              </div>
            )}

            {/* ─── CONTENT TAB ──────────────────────────────────── */}
            {activeTab === 'CONTENT' && (
              <div className="space-y-3">
                {/* Anime Index */}
                <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                  <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                    <span>Anime Index</span>
                    <button onClick={() => setIsAddAnime(true)}
                      className="bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold px-2 py-0.5 border border-[#7a1515] cursor-pointer uppercase">
                      + Add
                    </button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">ID</th>
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Title</th>
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Type</th>
                        <th className="px-2 py-1.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {animeList.map((a, i) => (
                        <tr key={a.id}
                          className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                          <td className="px-2 py-1.5 border-r border-[#999]/30 font-mono font-bold text-[#1f3e70]">{a.id}</td>
                          <td className="px-2 py-1.5 border-r border-[#999]/30">{a.title}</td>
                          <td className="px-2 py-1.5 border-r border-[#999]/30 text-[10px] text-[#555]">{a.type}</td>
                          <td className="px-2 py-1.5 text-center"><span className={statusBadge(a.status)}>{a.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Novels Index */}
                <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                  <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                    <span>Novels Index</span>
                    <button onClick={() => setIsAddNovel(true)}
                      className="bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[9px] font-bold px-2 py-0.5 border border-[#15305a] cursor-pointer uppercase">
                      + Add
                    </button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">ID</th>
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Title</th>
                        <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Author</th>
                        <th className="px-2 py-1.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {novelsList.map((n, i) => (
                        <tr key={n.id}
                          className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                          <td className="px-2 py-1.5 border-r border-[#999]/30 font-mono font-bold text-[#1f3e70]">{n.id}</td>
                          <td className="px-2 py-1.5 border-r border-[#999]/30">{n.title}</td>
                          <td className="px-2 py-1.5 border-r border-[#999]/30 text-[10px] text-[#555]">{n.author}</td>
                          <td className="px-2 py-1.5 text-center"><span className={statusBadge(n.status)}>{n.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ════ RIGHT SIDEBAR ════════════════════════════════════ */}
          <div className="w-[200px] shrink-0 space-y-3">

            {/* Commands Grid Box */}
            <div className="bg-[#bdbfc3] border border-[#8c8f94] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">
              <div className="bg-[#2a3243] text-white font-mono font-bold text-[10px] tracking-wider px-2 py-1.5 uppercase border-b border-[#1a202c]">
                Commands
              </div>

              {/* Clean 3-Column Grid for Symmetric Actions */}
              <div className="p-2 space-y-2">
                <div className="grid grid-cols-3 gap-1.5">

                  {/* ADD ANIME BOX */}
                  <AddAnime />

                  {/* ADD EPISODE BOX */}
                  <button
                    onClick={() => setIsAddEpisode(true)}
                    className="flex flex-col items-center justify-center p-1.5 bg-[#4a4f5d] hover:bg-[#5c6273] text-white border border-[#34394d] transition-colors cursor-pointer rounded-sm group min-h-[58px]"
                  >
                    <PlayCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_EPISODE</span>
                  </button>

                  {/* SYSTEM SYNC BOX */}
                  <button
                    onClick={triggerSync}
                    className="flex flex-col items-center justify-center p-1.5 bg-[#1a5c36] hover:bg-[#227a48] text-white border border-[#113d24] transition-colors cursor-pointer rounded-sm group min-h-[58px]"
                  >
                    <RefreshCw size={15} className="mb-0.5 group-hover:rotate-45 transition-transform" />
                    <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">SYS_SYNC</span>
                  </button>

                </div>

                {/* Full Width Modernized History Bar */}
                <button
                  onClick={() => setActiveTab('TERMINAL')}
                  className="w-full flex items-center justify-center py-2 bg-[#8c6d1d] hover:bg-[#a68224] text-white border border-[#664f14] transition-colors cursor-pointer rounded-sm group"
                >
                  <div className="flex items-center gap-1.5">
                    <History size={13} className="group-hover:translate-x-[-1px] transition-transform" />
                    <span className="text-[9px] font-mono font-bold tracking-wider">VIEW HISTORY</span>
                  </div>
                </button>
              </div>

            </div>
            {/* Status Box */}


            <Statusbox />   


            {/* Navigate / Quick Links Box */}
            <div className="bg-[#bdbfc3] border border-[#8c8f94] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">
              <div className="bg-[#2a3243] text-white font-mono font-bold text-[10px] tracking-wider px-2 py-1.5 uppercase border-b border-[#1a202c]">
                Navigate
              </div>
              <ul className="py-1 text-[11px] bg-[#caccce]">
                {([['Database', 'DATABASE'], ['Terminal', 'TERMINAL'], ['Users', 'USERS'], ['Content', 'CONTENT']] as const).map(([l, t]) => (
                  <li key={t}>
                    <button
                      onClick={() => setActiveTab(t)}
                      className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a3243] hover:text-white text-[#2a3243] font-medium transition-colors cursor-pointer text-left"
                    >
                      <ChevronRight size={10} className="opacity-70" />
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>