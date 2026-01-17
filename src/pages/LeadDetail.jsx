// Lead detail page
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLeadById } from "../store/leadsThunks.js";

export const LeadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLead = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await dispatch(fetchLeadById(id)).unwrap();
        setLead(result);
      } catch (err) {
        setError(err?.message || "Failed to load lead");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadLead();
    }
  }, [dispatch, id]);

  const createdDate = lead?.createdAt
    ? new Date(lead.createdAt).toLocaleDateString()
    : "-";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Lead Details
          </h1>

          {loading ? (
            <div className="mt-4 text-sm text-slate-600">Loading lead...</div>
          ) : error ? (
            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-slate-500">Name</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lead?.name}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Email</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lead?.email}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Phone</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lead?.phone || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Source</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lead?.source}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Stage</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lead?.stage}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500">Created Date</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {createdDate}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
