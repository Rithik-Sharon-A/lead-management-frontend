// Dashboard page
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeadsTable } from "../components/LeadsTable.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { fetchAnalytics, fetchLeads } from "../store/leadsThunks.js";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { analytics, loading, page, totalPages } = useSelector(
    (state) => state.leads
  );
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchLeads({ search, stage, page: 1 }));
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, stage]);

  const totalLeads = analytics?.totalLeads ?? 0;
  const convertedLeads = analytics?.convertedLeads ?? 0;
  const byStage = analytics?.byStage ?? {};
  const safeTotalPages = Math.max(totalPages || 0, 1);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    dispatch(fetchLeads({ search, stage, page: nextPage }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
        <header className="sticky top-0 z-10">
          <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Lead Management Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                High-level lead analytics overview.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </header>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading analytics...
          </div>
        ) : (
          <section className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Leads</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {totalLeads}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Converted Leads</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {convertedLeads}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Leads by Stage</p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>New</span>
                  <span className="font-medium">{byStage.New ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contacted</span>
                  <span className="font-medium">{byStage.Contacted ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Converted</span>
                  <span className="font-medium">{byStage.Converted ?? 0}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500">
                Search
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
                <span className="text-slate-400">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by name or email"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                />
              </div>
            </div>
            <div className="sm:w-56">
              <label className="block text-xs font-medium text-slate-500">
                Stage
              </label>
              <select
                value={stage}
                onChange={(event) => {
                  setStage(event.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="">All stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
          </div>
          <LeadsTable />
          <Pagination
            page={page || currentPage}
            totalPages={safeTotalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </main>
  );
};
